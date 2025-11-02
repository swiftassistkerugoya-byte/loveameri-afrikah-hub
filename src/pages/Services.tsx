import { useEffect, useState } from "react";
import { Building2, TrendingUp, Package, Droplet, Heart, Globe2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Services = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const iconMap: Record<string, any> = {
    "Building2": Building2,
    "TrendingUp": TrendingUp,
    "Globe2": Globe2,
    "Package": Package,
    "Heart": Heart,
    "Droplet": Droplet
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-white/90">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-16">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.hero_image || "Package"] || Package;
                const colors = [
                  "from-blue-600/10 to-blue-600/5",
                  "from-green-600/10 to-green-600/5",
                  "from-indigo-600/10 to-indigo-600/5",
                  "from-purple-600/10 to-purple-600/5",
                  "from-red-600/10 to-red-600/5",
                  "from-cyan-600/10 to-cyan-600/5"
                ];
                const color = colors[index % colors.length];

                return (
                  <Card key={service.id} className="overflow-hidden border-2 hover:border-accent/50 transition-all">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className={`p-12 bg-gradient-to-br ${color}`}>
                          <div className="inline-flex p-4 rounded-xl bg-white shadow-sm mb-6">
                            <IconComponent className="h-12 w-12 text-primary" />
                          </div>
                          <h3 className="text-3xl font-bold text-primary mb-4">{service.title}</h3>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            {service.description}
                          </p>
                          {service.price_range && (
                            <p className="text-accent font-semibold mb-6">{service.price_range}</p>
                          )}
                          <Link to={service.cta_link || "/contact"}>
                            <Button variant="default" className="bg-primary hover:bg-primary/90">
                              Get a Quote
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                        <div className="p-12 bg-muted/30">
                          <h4 className="text-xl font-semibold text-primary mb-6">Service Details</h4>
                          <div className="prose prose-sm text-muted-foreground">
                            {service.description}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Contact us today to discuss how our services can help your business grow
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8">
                Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/reven">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold px-8">
                Chat with Reven AI
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
