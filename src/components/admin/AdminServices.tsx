import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AdminServices = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Service Management</h2>
          <p className="text-muted-foreground">Manage company services and offerings</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Service management features coming soon...</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>Features to implement:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Add/Edit/Delete Services</li>
              <li>Service descriptions with AI generation</li>
              <li>Price range configuration</li>
              <li>CTA links and buttons</li>
              <li>Homepage display toggle</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminServices;
