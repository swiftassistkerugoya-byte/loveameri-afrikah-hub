import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Bot } from "lucide-react";

interface RevenConfig {
  id: string;
  greeting_message: string;
  tone: string;
  personality: string;
  response_delay: number;
  auto_email_on_missed: boolean;
}

const AdminRevenConfig = () => {
  const [config, setConfig] = useState<RevenConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from("reven_config")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setConfig(data);
      } else {
        const { data: newConfig, error: insertError } = await supabase
          .from("reven_config")
          .insert({
            greeting_message: "Hello! How can I assist you today?",
            tone: "friendly",
            personality: "assistant",
            response_delay: 0,
            auto_email_on_missed: false,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setConfig(newConfig);
      }
    } catch (error: any) {
      toast.error("Failed to fetch config");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from("reven_config")
        .update({
          greeting_message: config.greeting_message,
          tone: config.tone,
          personality: config.personality,
          response_delay: config.response_delay,
          auto_email_on_missed: config.auto_email_on_missed,
        })
        .eq("id", config.id);

      if (error) throw error;
      toast.success("Configuration saved successfully");
    } catch (error: any) {
      toast.error("Failed to save configuration");
      console.error("Error:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading configuration...</div>;
  }

  if (!config) return null;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Reven AI Configuration
        </h2>
        <p className="text-muted-foreground">Configure and train your AI assistant</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personality Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="greeting">Greeting Message</Label>
            <Textarea
              id="greeting"
              value={config.greeting_message}
              onChange={(e) =>
                setConfig({ ...config, greeting_message: e.target.value })
              }
              placeholder="Hello! How can I assist you today?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <Select
              value={config.tone}
              onValueChange={(value) => setConfig({ ...config, tone: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="personality">Personality</Label>
            <Select
              value={config.personality}
              onValueChange={(value) =>
                setConfig({ ...config, personality: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assistant">Assistant</SelectItem>
                <SelectItem value="advisor">Advisor</SelectItem>
                <SelectItem value="consultant">Consultant</SelectItem>
                <SelectItem value="guide">Guide</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Response Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="delay">Response Delay (seconds)</Label>
            <Input
              id="delay"
              type="number"
              value={config.response_delay}
              onChange={(e) =>
                setConfig({
                  ...config,
                  response_delay: parseInt(e.target.value) || 0,
                })
              }
              min="0"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-Email on Missed</Label>
              <p className="text-sm text-muted-foreground">
                Send email when chat is missed
              </p>
            </div>
            <Switch
              checked={config.auto_email_on_missed}
              onCheckedChange={(checked) =>
                setConfig({ ...config, auto_email_on_missed: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Configuration"}
        </Button>
      </div>
    </div>
  );
};

export default AdminRevenConfig;
