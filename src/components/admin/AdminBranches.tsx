import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, MapPin } from "lucide-react";

interface Branch {
  id: string;
  country: string;
  address: string;
  contact_info: string;
  whatsapp: string | null;
  working_hours: string | null;
  image_url: string | null;
  google_maps_link: string | null;
  is_active: boolean;
}

const AdminBranches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [formData, setFormData] = useState({
    country: "",
    address: "",
    contact_info: "",
    whatsapp: "",
    working_hours: "",
    image_url: "",
    google_maps_link: "",
    is_active: true,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const { data, error } = await supabase
        .from("branches")
        .select("*")
        .order("country", { ascending: true });

      if (error) throw error;
      setBranches(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBranch) {
        const { error } = await supabase
          .from("branches")
          .update(formData)
          .eq("id", editingBranch.id);

        if (error) throw error;
        toast({ title: "Success", description: "Branch updated successfully" });
      } else {
        const { error } = await supabase.from("branches").insert([formData]);
        if (error) throw error;
        toast({ title: "Success", description: "Branch created successfully" });
      }

      resetForm();
      fetchBranches();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      country: branch.country,
      address: branch.address,
      contact_info: branch.contact_info,
      whatsapp: branch.whatsapp || "",
      working_hours: branch.working_hours || "",
      image_url: branch.image_url || "",
      google_maps_link: branch.google_maps_link || "",
      is_active: branch.is_active,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this branch?")) return;

    try {
      const { error } = await supabase.from("branches").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Success", description: "Branch deleted successfully" });
      fetchBranches();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEditingBranch(null);
    setFormData({
      country: "",
      address: "",
      contact_info: "",
      whatsapp: "",
      working_hours: "",
      image_url: "",
      google_maps_link: "",
      is_active: true,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingBranch ? "Edit Branch" : "Add New Branch"}</CardTitle>
          <CardDescription>Manage your branch offices worldwide</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_info">Contact Info *</Label>
                <Input
                  id="contact_info"
                  value={formData.contact_info}
                  onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                  required
                  placeholder="Phone, Email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+1234567890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="working_hours">Working Hours</Label>
                <Input
                  id="working_hours"
                  value={formData.working_hours}
                  onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
                  placeholder="Mon-Fri 9AM-5PM"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google_maps_link">Google Maps Link</Label>
                <Input
                  id="google_maps_link"
                  value={formData.google_maps_link}
                  onChange={(e) => setFormData({ ...formData, google_maps_link: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Active Branch</Label>
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                {editingBranch ? "Update" : "Create"} Branch
              </Button>
              {editingBranch && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branches List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : branches.length === 0 ? (
              <p>No branches found</p>
            ) : (
              branches.map((branch) => (
                <Card key={branch.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4 flex-1">
                        {branch.image_url && (
                          <img
                            src={branch.image_url}
                            alt={branch.country}
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold text-lg">{branch.country}</h3>
                            {!branch.is_active && (
                              <span className="text-xs px-2 py-1 bg-destructive/10 text-destructive rounded">
                                Inactive
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{branch.address}</p>
                          <p className="text-sm mt-2">📞 {branch.contact_info}</p>
                          {branch.whatsapp && (
                            <p className="text-sm">💬 WhatsApp: {branch.whatsapp}</p>
                          )}
                          {branch.working_hours && (
                            <p className="text-sm">🕒 {branch.working_hours}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(branch)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(branch.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBranches;
