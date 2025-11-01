import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, Shield, LayoutDashboard, LogOut, Package, Briefcase, 
  FileText, MapPin, Bot, ShoppingCart, MessageSquare, 
  BarChart3, Settings, FileCode, Activity, UserCog 
} from "lucide-react";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminRoles from "@/components/admin/AdminRoles";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminServices from "@/components/admin/AdminServices";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminBranches from "@/components/admin/AdminBranches";
import AdminRevenConfig from "@/components/admin/AdminRevenConfig";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminMessages from "@/components/admin/AdminMessages";
import AdminClients from "@/components/admin/AdminClients";
import AdminAnalytics from "@/components/admin/AdminAnalytics";
import AdminCMS from "@/components/admin/AdminCMS";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminActivityLogs from "@/components/admin/AdminActivityLogs";
import AdminTeam from "@/components/admin/AdminTeam";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (!session) {
          navigate("/auth");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (error) {
        console.error("Error checking admin status:", error);
        toast({
          title: "Error",
          description: "Failed to verify admin access",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(!!data);
      setLoading(false);

      if (!data) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdminStatus();
  }, [user, navigate, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Overview Cards */}
          {activeTab === "overview" && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">
                    Registered users
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Admin Users
                  </CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">-</div>
                  <p className="text-xs text-muted-foreground">
                    Users with admin role
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setActiveTab("users")}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Manage Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    View and manage all users
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-2 border-b pb-4 overflow-x-auto">
            <Button size="sm" variant={activeTab === "overview" ? "default" : "outline"} onClick={() => setActiveTab("overview")}>
              <LayoutDashboard className="h-4 w-4 mr-2" />Overview
            </Button>
            <Button size="sm" variant={activeTab === "products" ? "default" : "outline"} onClick={() => setActiveTab("products")}>
              <Package className="h-4 w-4 mr-2" />Products
            </Button>
            <Button size="sm" variant={activeTab === "services" ? "default" : "outline"} onClick={() => setActiveTab("services")}>
              <Briefcase className="h-4 w-4 mr-2" />Services
            </Button>
            <Button size="sm" variant={activeTab === "blog" ? "default" : "outline"} onClick={() => setActiveTab("blog")}>
              <FileText className="h-4 w-4 mr-2" />Blog
            </Button>
            <Button size="sm" variant={activeTab === "branches" ? "default" : "outline"} onClick={() => setActiveTab("branches")}>
              <MapPin className="h-4 w-4 mr-2" />Branches
            </Button>
            <Button size="sm" variant={activeTab === "reven" ? "default" : "outline"} onClick={() => setActiveTab("reven")}>
              <Bot className="h-4 w-4 mr-2" />Reven AI
            </Button>
            <Button size="sm" variant={activeTab === "orders" ? "default" : "outline"} onClick={() => setActiveTab("orders")}>
              <ShoppingCart className="h-4 w-4 mr-2" />Orders
            </Button>
            <Button size="sm" variant={activeTab === "messages" ? "default" : "outline"} onClick={() => setActiveTab("messages")}>
              <MessageSquare className="h-4 w-4 mr-2" />Messages
            </Button>
            <Button size="sm" variant={activeTab === "users" ? "default" : "outline"} onClick={() => setActiveTab("users")}>
              <Users className="h-4 w-4 mr-2" />Users
            </Button>
            <Button size="sm" variant={activeTab === "roles" ? "default" : "outline"} onClick={() => setActiveTab("roles")}>
              <Shield className="h-4 w-4 mr-2" />Roles
            </Button>
            <Button size="sm" variant={activeTab === "analytics" ? "default" : "outline"} onClick={() => setActiveTab("analytics")}>
              <BarChart3 className="h-4 w-4 mr-2" />Analytics
            </Button>
            <Button size="sm" variant={activeTab === "cms" ? "default" : "outline"} onClick={() => setActiveTab("cms")}>
              <FileCode className="h-4 w-4 mr-2" />CMS
            </Button>
            <Button size="sm" variant={activeTab === "settings" ? "default" : "outline"} onClick={() => setActiveTab("settings")}>
              <Settings className="h-4 w-4 mr-2" />Settings
            </Button>
            <Button size="sm" variant={activeTab === "logs" ? "default" : "outline"} onClick={() => setActiveTab("logs")}>
              <Activity className="h-4 w-4 mr-2" />Logs
            </Button>
            <Button size="sm" variant={activeTab === "team" ? "default" : "outline"} onClick={() => setActiveTab("team")}>
              <UserCog className="h-4 w-4 mr-2" />Team
            </Button>
          </div>

          {/* Content */}
          {activeTab === "products" && <AdminProducts />}
          {activeTab === "services" && <AdminServices />}
          {activeTab === "blog" && <AdminBlog />}
          {activeTab === "branches" && <AdminBranches />}
          {activeTab === "reven" && <AdminRevenConfig />}
          {activeTab === "orders" && <AdminOrders />}
          {activeTab === "messages" && <AdminMessages />}
          {activeTab === "users" && <AdminUsers />}
          {activeTab === "roles" && <AdminRoles />}
          {activeTab === "analytics" && <AdminAnalytics />}
          {activeTab === "cms" && <AdminCMS />}
          {activeTab === "settings" && <AdminSettings />}
          {activeTab === "logs" && <AdminActivityLogs />}
          {activeTab === "team" && <AdminTeam />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
