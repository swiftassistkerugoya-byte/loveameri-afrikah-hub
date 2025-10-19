import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminCMS = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Content Management System</h2>
        <p className="text-muted-foreground">Manage website content and pages</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Static Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage Home, About, Mission & Vision...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Library</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Upload and manage images, banners...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Profiles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage team member profiles...</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Upload company certificates and licenses...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCMS;
