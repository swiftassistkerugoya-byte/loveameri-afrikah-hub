import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderId, phoneNumber, amount } = await req.json();
    
    console.log("Processing M-Pesa payment:", { orderId, phoneNumber, amount });

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // TODO: Integrate with actual M-Pesa API (Safaricom Daraja API or payment gateway)
    // This is a placeholder implementation
    // You'll need to:
    // 1. Get M-Pesa API credentials (Consumer Key, Consumer Secret)
    // 2. Get OAuth token from M-Pesa
    // 3. Initiate STK Push to customer's phone
    // 4. Handle callback to confirm payment
    
    // For now, we'll just update the order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        payment_status: 'processing',
        phone_number: phoneNumber 
      })
      .eq('id', orderId);

    if (updateError) {
      throw updateError;
    }

    // In production, you would:
    // - Call M-Pesa STK Push API
    // - Wait for callback confirmation
    // - Update order payment_status to 'completed' or 'failed'

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Payment initiated. Please complete on your phone.",
        orderId 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("M-Pesa payment error:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Payment processing failed";
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});
