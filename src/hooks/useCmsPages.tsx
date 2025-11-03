import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CmsPage {
  id: string;
  page_key: string;
  title: string;
  content: {
    text?: string;
  };
  created_at: string;
}

export const useCmsPages = () => {
  return useQuery({
    queryKey: ["cms-pages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .neq("page_key", "homepage")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CmsPage[];
    },
  });
};
