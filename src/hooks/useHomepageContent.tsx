import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HomepageContent {
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

export const useHomepageContent = () => {
  return useQuery({
    queryKey: ["homepage-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .eq("page_key", "homepage")
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;
      
      if (data?.content) {
        return { ...defaultContent, ...(data.content as any) } as HomepageContent;
      }
      
      return defaultContent;
    },
  });
};
