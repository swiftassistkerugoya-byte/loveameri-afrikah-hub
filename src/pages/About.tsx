import { useEffect, useState } from "react";
import { Target, Eye, Award, Users, Mail, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const About = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast({
        title: "Error",
        description: "Failed to load team members",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-white/90">
              Building bridges between continents through excellence in trade and consultancy
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-primary mb-8 text-center">Who We Are</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="text-lg leading-relaxed">
                LoveAmeriAfrikah Enterprises Ltd is a dynamic international business consultancy and general merchant 
                company with a strong presence across the United States and Africa. Founded with the vision of 
                creating seamless trade connections between continents, we have grown into a trusted partner for 
                businesses seeking to expand their global footprint.
              </p>
              <p className="text-lg leading-relaxed">
                Our journey began with a simple yet powerful idea: to bridge the gap between African and American 
                markets through strategic partnerships, quality products, and expert consultancy services. Today, 
                we operate from multiple locations across four countries, serving diverse clients with dedication 
                and professionalism.
              </p>
              <p className="text-lg leading-relaxed">
                From business consultancy to healthcare solutions, equipment supply to bottled water distribution, 
                we offer a comprehensive range of services designed to meet the evolving needs of modern enterprises. 
                Our commitment to excellence and innovation drives everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="p-8">
                <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-6">
                  <Eye className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To become Africa's most trusted link to global commerce and healthcare, 
                  fostering sustainable partnerships that drive economic growth and improve 
                  quality of life across continents.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="p-8">
                <div className="inline-flex p-4 rounded-xl bg-accent/10 mb-6">
                  <Target className="h-10 w-10 text-accent" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To deliver quality products, professional consultancy, and reliable management 
                  solutions that empower businesses to thrive in the global marketplace while 
                  maintaining the highest standards of integrity and service excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { title: "Excellence", description: "We strive for excellence in every service we provide" },
              { title: "Integrity", description: "Honesty and transparency guide all our business relationships" },
              { title: "Innovation", description: "We embrace innovation to stay ahead in a changing world" },
              { title: "Partnership", description: "Building lasting relationships with clients and stakeholders" },
              { title: "Sustainability", description: "Committed to sustainable business practices" },
              { title: "Empowerment", description: "Empowering businesses and communities to succeed" }
            ].map((value, index) => (
              <Card key={index} className="text-center border-2 hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <Award className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-primary mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Leadership Team</h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading team members...</p>
            </div>
          ) : teamMembers.length > 0 ? (
            <div className="grid gap-6 max-w-5xl mx-auto">
              {teamMembers.map((member) => (
                <Card key={member.id} className="border-2 hover:border-accent/50 transition-all hover:shadow-card">
                  <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24 shrink-0">
                      <AvatarImage src={member.image_url} alt={member.name} />
                      <AvatarFallback className="bg-accent/10 text-accent text-xl">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                      <p className="text-accent font-medium mb-2">{member.role}</p>
                      {member.bio && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{member.bio}</p>
                      )}
                    </div>
                    <div className="flex md:flex-col gap-3 text-sm shrink-0">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted">
                          <Mail className="h-4 w-4" />
                          <span className="hidden sm:inline truncate max-w-[150px]">{member.email}</span>
                        </a>
                      )}
                      {member.phone && (
                        <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted">
                          <Phone className="h-4 w-4" />
                          <span className="hidden sm:inline">{member.phone}</span>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex p-6 rounded-2xl bg-accent/10 mb-6">
                <Users className="h-16 w-16 text-accent" />
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our leadership team comprises experienced professionals with deep expertise in 
                international trade, business management, and healthcare solutions. Together, 
                they guide our strategic direction and ensure we deliver exceptional value to 
                our clients across all markets we serve.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
