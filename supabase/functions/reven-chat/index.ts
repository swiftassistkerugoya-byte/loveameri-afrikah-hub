import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, conversationId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch Reven configuration
    const { data: config } = await supabase
      .from('reven_config')
      .select('*')
      .single();

    // Fetch company data for comprehensive knowledge
    const [products, services, branches, blogPosts, team] = await Promise.all([
      supabase.from('products').select('*').eq('is_active', true),
      supabase.from('services').select('*'),
      supabase.from('branches').select('*'),
      supabase.from('blog_posts').select('*').eq('published', true),
      supabase.from('team_members').select('*')
    ]);

    // Build comprehensive system prompt
    const companyInfo = `
## LoveAmeriAfrikah Enterprises Overview
We are a leading technology and logistics company serving Africa and America.

### Our Products:
${products.data?.map(p => `- ${p.name}: ${p.description} (Price: $${p.price}, Stock: ${p.stock_quantity})`).join('\n') || 'No products available'}

### Our Services:
${services.data?.map(s => `- ${s.name}: ${s.description} (Price: $${s.price})`).join('\n') || 'No services available'}

### Our Branches:
${branches.data?.map(b => `- ${b.name} (${b.city}, ${b.country}): ${b.address} | Phone: ${b.phone} | Email: ${b.email}`).join('\n') || 'No branches listed'}

### Our Team:
${team.data?.map(t => `- ${t.name} (${t.role}): ${t.bio || 'Team member'}`).join('\n') || 'Team information coming soon'}

### Latest Insights:
${blogPosts.data?.slice(0, 5).map(b => `- ${b.title}: ${b.excerpt}`).join('\n') || 'No blog posts available'}
`;

    const systemPrompt = `You are Reven, the AI virtual assistant for LoveAmeriAfrikah Enterprises.

${config?.greeting_message || 'Hello! I\'m here to help you with any questions about our company.'}

PERSONALITY & TONE:
- Tone: ${config?.tone || 'professional'}
- Personality: ${config?.personality || 'friendly and helpful'}
- Always be informative, accurate, and helpful
- Provide specific details from our company data when relevant

${companyInfo}

CAPABILITIES:
- Answer questions about our products, services, and pricing
- Provide information about our branch locations and contact details
- Share insights from our latest blog posts
- Guide users through our offerings
- Assist with general inquiries about the company
- Help with product recommendations based on user needs
- Provide team information when asked

IMPORTANT GUIDELINES:
- Always respond in a ${config?.tone || 'professional'} tone with a ${config?.personality || 'friendly'} personality
- When discussing products, mention availability and pricing
- For branch information, provide complete contact details
- Suggest relevant blog posts when appropriate
- Be concise but comprehensive in your responses
- If you don't have specific information, politely let the user know`;

    console.log('Sending request to AI with', messages.length, 'messages');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const message = data.choices[0].message;

    // Save conversation history if conversationId provided
    if (conversationId) {
      const userMessage = messages[messages.length - 1];
      
      await supabase.from('conversation_messages').insert([
        { conversation_id: conversationId, role: 'user', content: userMessage.content },
        { conversation_id: conversationId, role: 'assistant', content: message.content }
      ]);

      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
    }

    console.log('Successfully generated response');
    
    return new Response(JSON.stringify({ reply: message.content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in reven-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
