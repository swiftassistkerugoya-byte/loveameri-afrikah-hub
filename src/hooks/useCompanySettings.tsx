import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface CompanySettings {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  payment_gateway: string;
  currency: string;
}

const defaultSettings: CompanySettings = {
  company_name: "Your Company",
  company_email: "info@company.com",
  company_phone: "+1 234 567 8900",
  company_address: "123 Business St, City, Country",
  payment_gateway: "",
  currency: "USD",
};

export const useCompanySettings = () => {
  return useQuery({
    queryKey: ["company-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("company_settings")
        .select("*")
        .eq("setting_key", "company_info")
        .maybeSingle();

      if (error) throw error;
      
      if (data?.setting_value) {
        return data.setting_value as unknown as CompanySettings;
      }
      
      return defaultSettings;
    },
  });
};
