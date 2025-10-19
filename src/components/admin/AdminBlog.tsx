import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AdminBlog = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Blog & Insights Management</h2>
          <p className="text-muted-foreground">Create and manage blog posts and insights</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Blog management features coming soon...</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>Features to implement:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>WYSIWYG editor for posts</li>
              <li>Categories: Trade, Healthcare, Marketing, AI</li>
              <li>AI-generated summaries</li>
              <li>"Discuss with Reven" integration</li>
              <li>Featured posts</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBlog;
