import { Calendar, User, ArrowRight, TrendingUp, Globe, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Insights = () => {
  const featuredPost = {
    title: "The Future of African-American Trade Relations",
    excerpt: "Exploring emerging opportunities and partnerships between the United States and African markets in 2025 and beyond.",
    category: "Global Trade",
    date: "January 15, 2025",
    author: "LoveAmeriAfrikah Team",
    readTime: "5 min read",
    image: "🌍"
  };

  const articles = [
    {
      title: "Digital Transformation in International Trade",
      excerpt: "How technology is reshaping cross-border business operations and creating new opportunities.",
      category: "Technology",
      date: "January 10, 2025",
      readTime: "4 min read",
      icon: TrendingUp
    },
    {
      title: "Healthcare Supply Chain Management Best Practices",
      excerpt: "Essential strategies for maintaining quality and efficiency in medical equipment distribution.",
      category: "Healthcare",
      date: "January 5, 2025",
      readTime: "6 min read",
      icon: Briefcase
    },
    {
      title: "Sustainable Business Practices in Africa",
      excerpt: "How companies are integrating environmental responsibility into their operations across the continent.",
      category: "Sustainability",
      date: "December 28, 2024",
      readTime: "5 min read",
      icon: Globe
    },
    {
      title: "Marketing Strategies for Cross-Cultural Success",
      excerpt: "Key insights for effectively reaching diverse markets in different cultural contexts.",
      category: "Marketing",
      date: "December 20, 2024",
      readTime: "4 min read",
      icon: TrendingUp
    },
    {
      title: "The Role of AI in Modern Business Consultancy",
      excerpt: "How artificial intelligence is enhancing decision-making and client services.",
      category: "AI & Technology",
      date: "December 15, 2024",
      readTime: "7 min read",
      icon: Briefcase
    },
    {
      title: "Building Strong International Partnerships",
      excerpt: "Lessons learned from successful cross-continental business collaborations.",
      category: "Business Strategy",
      date: "December 10, 2024",
      readTime: "5 min read",
      icon: Globe
    }
  ];

  const categories = [
    "All Posts",
    "Global Trade",
    "Healthcare",
    "Technology",
    "Marketing",
    "Business Strategy",
    "Sustainability"
  ];

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
                variant={index === 0 ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="overflow-hidden border-2 hover:border-accent/50 transition-colors">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="bg-gradient-to-br from-accent/20 to-accent/5 p-16 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-9xl">{featuredPost.image}</span>
                    </div>
                  </div>
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
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                    </div>
                    <Button variant="default" className="w-fit">
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Recent Articles</h2>
            <p className="text-muted-foreground">
              Stay updated with the latest insights from our experts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {articles.map((article, index) => (
              <Card key={index} className="border-2 hover:border-accent/50 transition-all hover:-translate-y-1 flex flex-col">
                <CardContent className="p-8 flex-1 flex flex-col">
                  <div className="inline-flex p-3 rounded-xl bg-accent/10 w-fit mb-4">
                    <article.icon className="h-6 w-6 text-accent" />
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
                      {article.date}
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  <Button variant="ghost" className="w-full mt-4 justify-between group">
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Articles
            </Button>
          </div>
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
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8">
                Subscribe
              </Button>
            </div>
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
