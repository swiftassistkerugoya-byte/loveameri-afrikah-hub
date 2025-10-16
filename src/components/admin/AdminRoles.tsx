import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
}

const AdminRoles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("email");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
      return;
    }

    setProfiles(data || []);
  };

  const handleAssignRole = async () => {
    if (!selectedUser || !selectedRole) {
      toast({
        title: "Error",
        description: "Please select both a user and a role",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("user_roles")
      .insert([{
        user_id: selectedUser,
        role: selectedRole as "admin" | "moderator" | "user",
      }]);

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Info",
          description: "User already has this role",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to assign role",
          variant: "destructive",
        });
      }
      return;
    }

    toast({
      title: "Success",
      description: "Role assigned successfully",
    });

    setSelectedUser("");
    setSelectedRole("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
        <CardDescription>Assign roles to users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Select User</label>
            <Select value={selectedUser} onValueChange={setSelectedUser}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a user" />
              </SelectTrigger>
              <SelectContent>
                {profiles.map((profile) => (
                  <SelectItem key={profile.id} value={profile.id}>
                    {profile.email} {profile.full_name ? `(${profile.full_name})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Select Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleAssignRole} disabled={loading}>
            {loading ? "Assigning..." : "Assign Role"}
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-medium mb-2">Available Roles:</h3>
          <div className="flex gap-2">
            <Badge variant="default">Admin</Badge>
            <Badge variant="secondary">Moderator</Badge>
            <Badge variant="outline">User</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Admins have full access to the dashboard and can manage users and roles.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRoles;
