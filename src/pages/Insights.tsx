import { Calendar, User, ArrowRight, TrendingUp, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const Insights = () => {
  const { toast } = useToast();
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All Posts") {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category === selectedCategory));
    }
  }, [selectedCategory, blogPosts]);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
      setFilteredPosts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load blog posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: 'Newsletter Subscriber',
            email: email,
            message: 'Newsletter subscription request',
            type: 'newsletter',
            status: 'unread'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
      setEmail("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  const categories = [
    "All Posts",
    ...Array.from(new Set(blogPosts.map(post => post.category)))
  ];

  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  const regularPosts = filteredPosts.filter(post => !post.featured || post.id !== featuredPost?.id);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Insights & Articles</h1>
            <p className="text-xl text-white/90">
              Industry insights, thought leadership, and updates from our team
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-muted/50 sticky top-20 z-40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="overflow-hidden border-2 hover:border-accent/50 transition-colors">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {featuredPost.featured_image ? (
                      <div className="bg-gradient-to-br from-accent/20 to-accent/5 p-16 flex items-center justify-center">
                        <img 
                          src={featuredPost.featured_image} 
                          alt={featuredPost.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="bg-gradient-to-br from-accent/20 to-accent/5 p-16 flex items-center justify-center">
                        <TrendingUp className="h-32 w-32 text-accent" />
                      </div>
                    )}
                    <div className="p-12 flex flex-col justify-center">
                      <Badge variant="secondary" className="w-fit mb-4">
                        Featured Post
                      </Badge>
                      <Badge variant="outline" className="w-fit mb-6">
                        {featuredPost.category}
                      </Badge>
                      <h2 className="text-3xl font-bold text-primary mb-4">
                        {featuredPost.title}
                      </h2>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {featuredPost.published_at ? format(new Date(featuredPost.published_at), 'MMMM dd, yyyy') : 'N/A'}
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {featuredPost.views || 0} views
                        </div>
                      </div>
                      <Link to={`/insights/${featuredPost.slug}`}>
                        <Button variant="default" className="w-fit">
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Recent Articles</h2>
            <p className="text-muted-foreground">
              Stay updated with the latest insights from our experts
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading articles...</p>
            </div>
          ) : regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No articles found in this category.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {regularPosts.slice(0, 6).map((article) => (
                <Card key={article.id} className="border-2 hover:border-accent/50 transition-all hover:-translate-y-1 flex flex-col">
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <div className="inline-flex p-3 rounded-xl bg-accent/10 w-fit mb-4">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <Badge variant="outline" className="w-fit mb-4">
                      {article.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {article.published_at ? format(new Date(article.published_at), 'MMM dd, yyyy') : 'N/A'}
                      </div>
                      <span>{article.views || 0} views</span>
                    </div>
                    <Link to={`/insights/${article.slug}`}>
                      <Button variant="ghost" className="w-full mt-4 justify-between group">
                        Read More
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Subscribe to our newsletter for the latest insights, articles, and updates
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8">
                Subscribe
              </Button>
            </form>
            <p className="text-sm text-white/70 mt-4">
              Join 500+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Discuss with Reven */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Have Questions About an Article?
              </h3>
              <p className="text-muted-foreground mb-6">
                Chat with Reven AI to discuss any article, get summaries, or explore topics in depth
              </p>
              <Link to="/reven">
                <Button variant="default">
                  Discuss with Reven AI
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Insights;
