import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, ArrowLeft, Clock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;

      if (data) {
        setPost(data);
        // Increment view count
        await supabase
          .from('blog_posts')
          .update({ views: (data.views || 0) + 1 })
          .eq('id', data.id);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <p className="text-muted-foreground">Loading article...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/insights">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link to="/insights">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Insights
              </Button>
            </Link>

            {/* Article Header */}
            <div className="mb-12">
              <Badge variant="outline" className="mb-4">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-xl text-muted-foreground mb-6">
                  {post.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.published_at ? format(new Date(post.published_at), 'MMMM dd, yyyy') : 'N/A'}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.views || 0} views
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {Math.ceil((post.content?.length || 0) / 1000)} min read
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.featured_image && (
              <div className="mb-12 rounded-lg overflow-hidden">
                <img 
                  src={post.featured_image} 
                  alt={post.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Discuss with Reven CTA */}
            {post.enable_reven_discussion && (
              <div className="mt-16 p-8 border-2 border-accent/20 rounded-lg bg-gradient-to-br from-accent/5 to-accent/10">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Have Questions About This Article?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Chat with Reven AI to discuss this article, get clarifications, or explore topics in depth
                </p>
                <Link to="/reven">
                  <Button variant="default">
                    Discuss with Reven AI
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
