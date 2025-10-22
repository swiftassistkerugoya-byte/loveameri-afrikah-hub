import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CompanySettings {
  company_name: string;
  company_email: string;
  company_phone: string;
  company_address: string;
  payment_gateway: string;
  currency: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<CompanySettings>({
    company_name: "",
    company_email: "",
    company_phone: "",
    company_address: "",
    payment_gateway: "",
    currency: "USD",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("company_settings")
        .select("*")
        .eq("setting_key", "company_info")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setSettingsId(data.id);
        const value = data.setting_value as any;
        if (value && typeof value === 'object') {
          setSettings(value as CompanySettings);
        }
      }
    } catch (error: any) {
      toast.error("Failed to fetch settings");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (settingsId) {
        const { error } = await supabase
          .from("company_settings")
          .update({
            setting_value: settings as any,
          })
          .eq("id", settingsId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("company_settings")
          .insert([{
            setting_key: "company_info",
            setting_value: settings as any,
          }])
          .select()
          .single();

        if (error) throw error;
        setSettingsId(data.id);
      }

      toast.success("Settings saved successfully");
    } catch (error: any) {
      toast.error("Failed to save settings");
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings & Configuration</h2>
        <p className="text-muted-foreground">System settings and integrations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="company_name">Company Name</Label>
            <Input
              id="company_name"
              value={settings.company_name}
              onChange={(e) =>
                setSettings({ ...settings, company_name: e.target.value })
              }
              placeholder="Your Company Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_email">Company Email</Label>
            <Input
              id="company_email"
              type="email"
              value={settings.company_email}
              onChange={(e) =>
                setSettings({ ...settings, company_email: e.target.value })
              }
              placeholder="info@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_phone">Company Phone</Label>
            <Input
              id="company_phone"
              value={settings.company_phone}
              onChange={(e) =>
                setSettings({ ...settings, company_phone: e.target.value })
              }
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_address">Company Address</Label>
            <Textarea
              id="company_address"
              value={settings.company_address}
              onChange={(e) =>
                setSettings({ ...settings, company_address: e.target.value })
              }
              placeholder="123 Business St, City, Country"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment & Currency</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="payment_gateway">Payment Gateway</Label>
            <Input
              id="payment_gateway"
              value={settings.payment_gateway}
              onChange={(e) =>
                setSettings({ ...settings, payment_gateway: e.target.value })
              }
              placeholder="Stripe, PayPal, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Input
              id="currency"
              value={settings.currency}
              onChange={(e) =>
                setSettings({ ...settings, currency: e.target.value })
              }
              placeholder="USD, EUR, KES, etc."
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
