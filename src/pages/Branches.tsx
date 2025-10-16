import { MapPin, Phone, Mail, Clock, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Branches = () => {
  const branches = [
    {
      country: "🇺🇸 United States",
      city: "Hagerstown, Maryland",
      address: "28 North Cleveland Ave, Hagerstown, Maryland 21740, USA",
      phone: "+1 (XXX) XXX-XXXX",
      email: "usa@loveameriafrikah.com",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM EST",
      mapUrl: "https://maps.google.com/?q=28+North+Cleveland+Ave+Hagerstown+Maryland+21740+USA",
      color: "from-blue-600/10 to-blue-600/5"
    },
    {
      country: "🇰🇪 Kenya",
      city: "Nairobi",
      address: "Precious Plaza Building, Suite #30, Naivasha Road, Kawangware, Nairobi City",
      phone: "+254 XXX XXX XXX",
      email: "kenya@loveameriafrikah.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM EAT",
      mapUrl: "https://maps.google.com/?q=Precious+Plaza+Building+Naivasha+Road+Kawangware+Nairobi+Kenya",
      color: "from-green-600/10 to-green-600/5"
    },
    {
      country: "🇹🇿 Tanzania",
      city: "Arusha",
      address: "Njiru Road, Arusha",
      phone: "+255 XXX XXX XXX",
      email: "tanzania@loveameriafrikah.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM EAT",
      mapUrl: "https://maps.google.com/?q=Njiru+Road+Arusha+Tanzania",
      color: "from-yellow-600/10 to-yellow-600/5"
    },
    {
      country: "🇬🇭 Ghana",
      city: "Accra",
      address: "Lunch City, Liberation Road, Accra",
      phone: "+233 XXX XXX XXX",
      email: "ghana@loveameriafrikah.com",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM GMT",
      mapUrl: "https://maps.google.com/?q=Lunch+City+Liberation+Road+Accra+Ghana",
      color: "from-red-600/10 to-red-600/5"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Global Presence</h1>
            <p className="text-xl text-white/90">
              Serving clients across four countries with dedicated local teams
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Offices</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Continents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12 border-2 border-border text-center">
              <MapPin className="h-16 w-16 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-3">Interactive Global Map</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our offices are strategically located to serve clients across the USA and Africa. 
                Visit us at any of our locations or contact us for more information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Branch Locations */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Office Locations</h2>
            <p className="text-xl text-muted-foreground">
              Visit us or get in touch with your nearest office
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {branches.map((branch, index) => (
              <Card key={index} className="border-2 hover:border-accent/50 transition-all hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className={`p-8 bg-gradient-to-br ${branch.color}`}>
                    <h3 className="text-3xl font-bold text-primary mb-2">{branch.country}</h3>
                    <p className="text-lg text-muted-foreground mb-6">{branch.city}</p>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-primary mb-1">Address</p>
                          <p className="text-sm text-muted-foreground">{branch.address}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-primary mb-1">Phone</p>
                          <a href={`tel:${branch.phone}`} className="text-sm text-muted-foreground hover:text-accent">
                            {branch.phone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-primary mb-1">Email</p>
                          <a href={`mailto:${branch.email}`} className="text-sm text-muted-foreground hover:text-accent">
                            {branch.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-primary mb-1">Office Hours</p>
                          <p className="text-sm text-muted-foreground">{branch.hours}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-border">
                      <a href={branch.mapUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" className="w-full">
                          View on Google Maps
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Can't Find Your Location?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            We serve clients globally. Contact us to discuss how we can support your business
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8">
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Branches;
