import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings & Configuration</h2>
        <p className="text-muted-foreground">System settings and integrations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Company Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Company name, logo, contact info...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">SMTP settings, email templates...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Gateways</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Stripe, Flutterwave, PayPal settings...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">OpenAI, Maps, Payment API keys...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Currency Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Multi-currency: USD, KES, GHS, TZS...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Database backup and maintenance...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;
