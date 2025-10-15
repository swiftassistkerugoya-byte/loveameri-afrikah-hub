import { Bot, Zap, Clock, Globe, MessageCircle, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Reven = () => {
  const capabilities = [
    {
      icon: MessageCircle,
      title: "Customer Inquiries",
      description: "Answer questions about services, products, and company information"
    },
    {
      icon: Zap,
      title: "Instant Quotes",
      description: "Generate and send quotations for products and services"
    },
    {
      icon: Clock,
      title: "Appointment Booking",
      description: "Schedule consultations and meetings with our team"
    },
    {
      icon: CheckCircle,
      title: "Order Status",
      description: "Check delivery status and track orders in real-time"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Communicate in multiple languages for global reach"
    },
    {
      icon: Bot,
      title: "Smart Automation",
      description: "Automated email confirmations and follow-ups"
    }
  ];

  const features = [
    "24/7 Availability - Never miss a customer inquiry",
    "Instant Responses - No waiting time for basic questions",
    "Multi-Channel Support - WhatsApp, Email, and Web Chat",
    "Learning System - Improves responses over time",
    "Seamless Handoff - Transfers complex issues to human agents",
    "Data Analytics - Track customer interactions and insights"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS00IDR2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0tNCA0djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30">
              <Bot className="h-6 w-6 text-accent" />
              <span className="text-accent font-semibold">AI-Powered Virtual Assistant</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Meet Reven 💬
            </h1>
            <p className="text-2xl mb-4 text-white/90">
              Your 24/7 Intelligent Business Assistant
            </p>
            <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
              Reven is our AI-powered assistant that helps clients get instant answers, 
              request quotes, and manage orders anytime, anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 shadow-glow">
                Start Chat Now
                <MessageCircle className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Chat Interface */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-2 shadow-card">
              <CardContent className="p-0">
                {/* Chat Header */}
                <div className="bg-gradient-primary text-white p-6 rounded-t-lg">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Reven AI</h3>
                      <p className="text-sm text-white/80">Online • Typically replies instantly</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-6 space-y-4 bg-muted/50 min-h-[400px]">
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Bot className="h-5 w-5 text-accent" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                      <p className="text-sm text-foreground">
                        Hello! I'm Reven, your virtual assistant at LoveAmeriAfrikah Enterprises. 
                        How can I help you today?
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end">
                    <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-4 shadow-sm max-w-[80%]">
                      <p className="text-sm">
                        I need information about your bottled water products
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Bot className="h-5 w-5 text-accent" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-[80%]">
                      <p className="text-sm text-foreground">
                        Great! We offer premium purified water in three sizes: 500ml, 1.5L, and bulk options (5L & 18L). 
                        All our water is BPA-free, pH balanced, and comes in eco-friendly packaging. Would you like 
                        a detailed quote or information about bulk pricing?
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-border bg-background">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type your message..." 
                      className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                      disabled
                    />
                    <Button size="lg" className="px-6">
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">What Reven Can Do</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI to serve your business needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {capabilities.map((capability, index) => (
              <Card key={index} className="border-2 hover:border-accent/50 transition-all hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-6">
                    <capability.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{capability.title}</h3>
                  <p className="text-muted-foreground">{capability.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent shrink-0 mt-1" />
                  <p className="text-foreground font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">How Reven Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center border-2">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent font-bold text-2xl mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Ask Your Question</h3>
                <p className="text-muted-foreground">
                  Type your inquiry through chat, WhatsApp, or email
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent font-bold text-2xl mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Get Instant Response</h3>
                <p className="text-muted-foreground">
                  Reven processes your request and provides accurate information
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2">
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent font-bold text-2xl mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">Take Action</h3>
                <p className="text-muted-foreground">
                  Receive quotes, book appointments, or connect with our team
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Bot className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Smart Assistance?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Start chatting with Reven now and get instant help with your business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 shadow-glow">
              Start Chat with Reven
              <MessageCircle className="ml-2 h-5 w-5" />
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8">
                Contact Human Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Reven;
