import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AdminProducts = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Product Management</h2>
          <p className="text-muted-foreground">Manage marketplace & supply products</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Product management features coming soon...</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>Features to implement:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Add/Edit/Delete Products</li>
              <li>Upload product images</li>
              <li>Manage categories (Water, Equipment, Healthcare, Merchandise)</li>
              <li>Stock management</li>
              <li>Featured products toggle</li>
              <li>SEO optimization</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProducts;
