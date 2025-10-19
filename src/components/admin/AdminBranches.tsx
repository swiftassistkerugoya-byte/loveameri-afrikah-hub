import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AdminBranches = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Branches & Locations</h2>
          <p className="text-muted-foreground">Manage branch offices across different countries</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Branch
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Branch Offices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Branch management features coming soon...</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>Features to implement:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Add/Edit/Delete branches</li>
              <li>Location details and contact info</li>
              <li>Google Maps integration</li>
              <li>Working hours management</li>
              <li>Active/Hidden toggle</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBranches;
