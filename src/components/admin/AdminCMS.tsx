import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface CmsPage {
  id: string;
  page_key: string;
  title: string;
  content: any;
  created_at: string;
}

const AdminCMS = () => {
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<CmsPage | null>(null);
  const [formData, setFormData] = useState({
    page_key: "",
    title: "",
    content: "",
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPages(data || []);
    } catch (error: any) {
      toast.error("Failed to fetch pages");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingPage) {
        const { error } = await supabase
          .from("cms_pages")
          .update({
            page_key: formData.page_key,
            title: formData.title,
            content: { text: formData.content },
          })
          .eq("id", editingPage.id);

        if (error) throw error;
        toast.success("Page updated successfully");
      } else {
        const { error } = await supabase.from("cms_pages").insert({
          page_key: formData.page_key,
          title: formData.title,
          content: { text: formData.content },
        });

        if (error) throw error;
        toast.success("Page created successfully");
      }

      setDialogOpen(false);
      setEditingPage(null);
      setFormData({ page_key: "", title: "", content: "" });
      queryClient.invalidateQueries({ queryKey: ["cms-pages"] });
      fetchPages();
    } catch (error: any) {
      toast.error("Failed to save page");
      console.error("Error:", error);
    }
  };

  const handleEdit = (page: CmsPage) => {
    setEditingPage(page);
    setFormData({
      page_key: page.page_key,
      title: page.title,
      content: page.content?.text || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this page?")) return;

    try {
      const { error } = await supabase.from("cms_pages").delete().eq("id", id);

      if (error) throw error;
      toast.success("Page deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["cms-pages"] });
      fetchPages();
    } catch (error: any) {
      toast.error("Failed to delete page");
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading pages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Content Management System</h2>
          <p className="text-muted-foreground">Manage website content and pages</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPage(null);
                setFormData({ page_key: "", title: "", content: "" });
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Page
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPage ? "Edit Page" : "Create New Page"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="page_key">Page Key</Label>
                <Input
                  id="page_key"
                  value={formData.page_key}
                  onChange={(e) =>
                    setFormData({ ...formData, page_key: e.target.value })
                  }
                  placeholder="home, about, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingPage ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Pages ({pages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Key</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.page_key}</TableCell>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(page)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(page.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCMS;
