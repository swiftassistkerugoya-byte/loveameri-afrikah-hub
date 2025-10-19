import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

const AdminRevenConfig = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Bot className="h-6 w-6" />
          Reven AI Configuration
        </h2>
        <p className="text-muted-foreground">Configure and train your AI assistant</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personality Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configure AI greeting, tone, and personality...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Knowledge Base</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage FAQ and predefined responses...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">View chat logs and satisfaction metrics...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Configure response delays and auto-email...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRevenConfig;
