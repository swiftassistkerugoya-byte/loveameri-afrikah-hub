import { Building2, TrendingUp, Package, Droplet, Heart, Globe2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Building2,
      title: "Business & Management Consultancy",
      description: "Transform your business with our expert consultancy services. We provide strategic planning, corporate branding, organizational development, and market analysis to help your business thrive in today's competitive landscape.",
      features: [
        "Corporate Planning & Strategy",
        "Brand Development & Positioning",
        "Organizational Management",
        "Market Research & Analysis",
        "Business Process Optimization"
      ],
      color: "from-blue-600/10 to-blue-600/5"
    },
    {
      icon: TrendingUp,
      title: "Marketing & Management",
      description: "Elevate your brand with comprehensive marketing strategies and professional management solutions. Our team helps you reach your target audience and achieve sustainable growth.",
      features: [
        "Digital Marketing Strategy",
        "Brand Management",
        "Content Marketing",
        "Social Media Management",
        "Performance Analytics"
      ],
      color: "from-green-600/10 to-green-600/5"
    },
    {
      icon: Globe2,
      title: "General Merchandising",
      description: "Access global markets through our extensive trade network. We facilitate import/export operations and wholesale distribution across continents.",
      features: [
        "Import/Export Services",
        "Wholesale Distribution",
        "Supply Chain Management",
        "Trade Facilitation",
        "Logistics Coordination"
      ],
      color: "from-indigo-600/10 to-indigo-600/5"
    },
    {
      icon: Package,
      title: "Equipment Supply",
      description: "Get access to quality equipment and essential supplies for various industries. We source and deliver the tools you need to operate efficiently.",
      features: [
        "Industrial Equipment",
        "Safety Equipment",
        "Office Supplies",
        "Utility Tools",
        "Custom Procurement"
      ],
      color: "from-purple-600/10 to-purple-600/5"
    },
    {
      icon: Heart,
      title: "Healthcare Supplies",
      description: "Reliable medical equipment and healthcare essentials to support quality patient care. We provide hospital-grade supplies and hygiene products.",
      features: [
        "Medical Equipment",
        "Hospital Consumables",
        "Hygiene Products",
        "Safety Gear",
        "Healthcare Essentials"
      ],
      color: "from-red-600/10 to-red-600/5"
    },
    {
      icon: Droplet,
      title: "Bottled Water Distribution",
      description: "Clean, pure, and sustainable bottled water solutions for businesses and individuals. Our products meet the highest quality standards.",
      features: [
        "Premium Bottled Water",
        "Bulk Distribution",
        "Custom Branding Options",
        "Sustainable Packaging",
        "Regular Delivery Service"
      ],
      color: "from-cyan-600/10 to-cyan-600/5"
    }
  ];

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
          <div className="space-y-16">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden border-2 hover:border-accent/50 transition-all">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className={`p-12 bg-gradient-to-br ${service.color}`}>
                      <div className="inline-flex p-4 rounded-xl bg-white shadow-sm mb-6">
                        <service.icon className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-3xl font-bold text-primary mb-4">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <Link to="/contact">
                        <Button variant="default" className="bg-primary hover:bg-primary/90">
                          Get a Quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="p-12 bg-muted/30">
                      <h4 className="text-xl font-semibold text-primary mb-6">What We Offer</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                              <div className="h-2 w-2 rounded-full bg-accent" />
                            </div>
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
