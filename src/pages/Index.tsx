import { ArrowRight, Building2, TrendingUp, Package, Droplet, Heart, Globe2, CheckCircle, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  const services = [
    {
      icon: Building2,
      title: "Business Consultancy",
      description: "Expert corporate planning, branding, and strategic business solutions",
      color: "text-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Marketing & Management",
      description: "Professional marketing strategies and organizational management",
      color: "text-green-600"
    },
    {
      icon: Package,
      title: "Equipment Supply",
      description: "Quality equipment and essential supplies for various industries",
      color: "text-purple-600"
    },
    {
      icon: Droplet,
      title: "Bottled Water",
      description: "Clean, pure, and sustainable bottled water distribution",
      color: "text-cyan-600"
    },
    {
      icon: Heart,
      title: "Healthcare Solutions",
      description: "Medical equipment, essentials, and hygiene products",
      color: "text-red-600"
    },
    {
      icon: Globe2,
      title: "Global Trade",
      description: "International import/export and wholesale distribution",
      color: "text-indigo-600"
    }
  ];

  const stats = [
    { value: "4", label: "Countries" },
    { value: "5+", label: "Offices" },
    { value: "100+", label: "Clients" },
    { value: "24/7", label: "Support" }
  ];

  const whyChooseUs = [
    { title: "Global Reach", description: "Operating across USA and Africa with established presence" },
    { title: "Proven Experience", description: "Years of expertise in international trade and consultancy" },
    { title: "Fast Delivery", description: "Efficient logistics and reliable supply chain management" },
    { title: "AI Support", description: "24/7 intelligent customer support through Reven AI" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bS00IDR2Mmgydi0yaC0yem0wLTR2Mmgydi0yaC0yem0tNCA0djJoMnYtMmgtMnptMC00djJoMnYtMmgtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10" />
        
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-block mb-4 px-4 py-2 bg-accent/20 backdrop-blur-sm rounded-full border border-accent/30">
              <span className="text-accent font-semibold">Global Trade & Business Excellence</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              LoveAmeriAfrikah<br />
              <span className="bg-gradient-gold bg-clip-text text-transparent">Enterprises Ltd</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-4 text-white/90 font-light">
              General Merchants & Business Consultants
            </p>
            <p className="text-lg mb-8 text-white/80">
              Equipment Supply | Healthcare Solutions | International Trade
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/services">
                <Button size="lg" variant="default" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 shadow-glow">
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/reven">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chat with Reven AI
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Strip */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Connecting Africa to the World
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Through smart trade, expert management, and innovative solutions
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions for businesses across continents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 border-2 hover:border-accent/50">
                <CardContent className="p-8">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 mb-6 group-hover:scale-110 transition-transform ${service.color}`}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button size="lg" variant="outline" className="border-2 border-primary hover:bg-primary hover:text-primary-foreground">
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Why Choose Us</h2>
            <p className="text-xl text-muted-foreground">Excellence in every aspect of our service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                  <CheckCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get in touch with our team today and discover how we can help you achieve your goals
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 shadow-glow">
              Contact Us Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
