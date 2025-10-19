import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminClients = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Client Management</h2>
        <p className="text-muted-foreground">View and manage registered clients</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Client management features coming soon...</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>Features to implement:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>View all registered users</li>
              <li>Purchase history</li>
              <li>Export user data</li>
              <li>Account management</li>
              <li>Client tags (B2B, B2C, Partner)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminClients;
