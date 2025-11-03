import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface HomepageContent {
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  stats_countries: string;
  stats_offices: string;
  stats_clients: string;
  stats_support: string;
  mission_title: string;
  mission_description: string;
}

const defaultContent: HomepageContent = {
  hero_title: "LoveAmeriAfrikah Enterprises Ltd",
  hero_subtitle: "General Merchants & Business Consultants",
  hero_description: "Equipment Supply | Healthcare Solutions | International Trade",
  stats_countries: "4",
  stats_offices: "5+",
  stats_clients: "100+",
  stats_support: "24/7",
  mission_title: "Connecting Africa to the World",
  mission_description: "Through smart trade, expert management, and innovative solutions",
};

const AdminHomepage = () => {
  const [content, setContent] = useState<HomepageContent>(defaultContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [contentId, setContentId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .eq("page_key", "homepage")
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        setContentId(data.id);
        setContent({ ...defaultContent, ...(data.content as any) });
      }
    } catch (error: any) {
      toast.error("Failed to load homepage content");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (contentId) {
        const { error } = await supabase
          .from("cms_pages")
          .update({ content: content as any, updated_at: new Date().toISOString() })
          .eq("id", contentId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("cms_pages")
          .insert([{
            page_key: "homepage",
            title: "Homepage Content",
            content: content as any,
          }])
          .select()
          .single();

        if (error) throw error;
        if (data) setContentId(data.id);
      }

      queryClient.invalidateQueries({ queryKey: ["homepage-content"] });
      toast.success("Homepage content saved successfully");
    } catch (error: any) {
      toast.error("Failed to save homepage content");
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Homepage Content</h2>
        <p className="text-muted-foreground">Edit homepage hero section, stats, and mission</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero_title">Main Title</Label>
            <Input
              id="hero_title"
              value={content.hero_title}
              onChange={(e) => setContent({ ...content, hero_title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_subtitle">Subtitle</Label>
            <Input
              id="hero_subtitle"
              value={content.hero_subtitle}
              onChange={(e) => setContent({ ...content, hero_subtitle: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero_description">Description</Label>
            <Textarea
              id="hero_description"
              value={content.hero_description}
              onChange={(e) => setContent({ ...content, hero_description: e.target.value })}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics Section</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="stats_countries">Countries</Label>
            <Input
              id="stats_countries"
              value={content.stats_countries}
              onChange={(e) => setContent({ ...content, stats_countries: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stats_offices">Offices</Label>
            <Input
              id="stats_offices"
              value={content.stats_offices}
              onChange={(e) => setContent({ ...content, stats_offices: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stats_clients">Clients</Label>
            <Input
              id="stats_clients"
              value={content.stats_clients}
              onChange={(e) => setContent({ ...content, stats_clients: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stats_support">Support</Label>
            <Input
              id="stats_support"
              value={content.stats_support}
              onChange={(e) => setContent({ ...content, stats_support: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mission Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mission_title">Mission Title</Label>
            <Input
              id="mission_title"
              value={content.mission_title}
              onChange={(e) => setContent({ ...content, mission_title: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mission_description">Mission Description</Label>
            <Textarea
              id="mission_description"
              value={content.mission_description}
              onChange={(e) => setContent({ ...content, mission_description: e.target.value })}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving} className="w-full">
        {saving ? "Saving..." : "Save Homepage Content"}
      </Button>
    </div>
  );
};

export default AdminHomepage;
