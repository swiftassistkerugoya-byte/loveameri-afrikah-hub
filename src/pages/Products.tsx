import { Droplet, Package, Heart, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Products = () => {
  const bottledWaterProducts = [
    {
      name: "Premium Purified Water",
      size: "500ml",
      description: "Pure, refreshing water perfect for on-the-go",
      features: ["BPA-Free", "pH Balanced", "Mineral Enhanced"],
      price: "Bulk pricing available"
    },
    {
      name: "Family Size Water",
      size: "1.5L",
      description: "Ideal for families and office use",
      features: ["Eco-Friendly Packaging", "Natural Minerals", "Quality Assured"],
      price: "Bulk pricing available"
    },
    {
      name: "Bulk Water Supply",
      size: "5L & 18L",
      description: "Large volume solutions for businesses",
      features: ["Commercial Grade", "Sustainable", "Regular Delivery"],
      price: "Contact for pricing"
    }
  ];

  const equipmentProducts = [
    {
      category: "Medical Equipment",
      items: ["Diagnostic Tools", "Patient Monitoring", "Safety Gear", "Hospital Consumables"]
    },
    {
      category: "Industrial Equipment",
      items: ["Power Tools", "Safety Equipment", "Material Handling", "Maintenance Tools"]
    },
    {
      category: "Office Supplies",
      items: ["Furniture", "Technology", "Stationery", "Communication Systems"]
    },
    {
      category: "Safety Equipment",
      items: ["PPE Gear", "First Aid", "Fire Safety", "Emergency Supplies"]
    }
  ];

  const healthcareProducts = [
    {
      name: "Hospital Consumables",
      description: "Essential daily supplies for healthcare facilities",
      icon: Heart
    },
    {
      name: "Hygiene Products",
      description: "Professional-grade hygiene and sanitation products",
      icon: Package
    },
    {
      name: "Medical Equipment",
      description: "Quality medical devices and diagnostic equipment",
      icon: Heart
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-white/90">
              Quality products delivered across continents
            </p>
          </div>
        </div>
      </section>

      {/* Bottled Water Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Droplet className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-primary mb-4">Premium Bottled Water</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Clean, pure, and sustainable water solutions for every need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {bottledWaterProducts.map((product, index) => (
              <Card key={index} className="border-2 hover:border-accent/50 transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-sm">{product.size}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{product.name}</h3>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-accent mb-4">{product.price}</p>
                    <Link to="/contact">
                      <Button variant="outline" className="w-full">
                        Request Quote
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Supply Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Package className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-primary mb-4">Equipment Supply</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive range of equipment for various industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {equipmentProducts.map((category, index) => (
              <Card key={index} className="border-2 hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/contact">
              <Button size="lg" variant="default">
                Request Custom Procurement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Healthcare Solutions Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Heart className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-primary mb-4">Healthcare Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional healthcare supplies for medical facilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {healthcareProducts.map((product, index) => (
              <Card key={index} className="text-center border-2 hover:border-accent/50 transition-all hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-6">
                    <product.icon className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Contact us for bulk pricing, custom orders, and delivery schedules
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8">
                Get Quote
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

export default Products;
