import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MailOpen, Archive, MessageSquare, Send } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  type: string;
  status: string;
  user_id: string | null;
  created_at: string;
}

const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
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

  const updateMessageStatus = async (messageId: string, status: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ status })
        .eq("id", messageId);

      if (error) throw error;
      
      toast({ title: "Message status updated" });
      fetchMessages();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <Mail className="h-4 w-4" />;
      case "read":
        return <MailOpen className="h-4 w-4" />;
      case "archived":
        return <Archive className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "unread":
        return "default";
      case "read":
        return "secondary";
      case "replied":
        return "outline";
      case "archived":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "product":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "consultancy":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "ai_chat":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "whatsapp":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      default:
        return "";
    }
  };

  const filteredMessages = messages.filter(msg => {
    const typeMatch = filterType === "all" || msg.type === filterType;
    const statusMatch = filterStatus === "all" || msg.status === filterStatus;
    return typeMatch && statusMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Messages & Inquiries</h2>
          <p className="text-muted-foreground">Manage customer messages and support requests</p>
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="consultancy">Consultancy</SelectItem>
              <SelectItem value="ai_chat">AI Chat</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{messages.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {messages.filter(m => m.status === "unread").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Replied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {messages.filter(m => m.status === "replied").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Archived</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {messages.filter(m => m.status === "archived").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Messages ({filteredMessages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading messages...</div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No messages found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>From</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message) => (
                  <TableRow key={message.id} className={message.status === "unread" ? "bg-accent/5" : ""}>
                    <TableCell>
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {getStatusIcon(message.status)}
                          {message.name}
                        </div>
                        <div className="text-xs text-muted-foreground">{message.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">
                        {message.subject || "No subject"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeBadgeColor(message.type)}>
                        {message.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={message.status}
                        onValueChange={(value) => updateMessageStatus(message.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <Badge variant={getStatusBadgeVariant(message.status)}>
                            {message.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unread">Unread</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(message.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              if (message.status === "unread") {
                                updateMessageStatus(message.id, "read");
                              }
                            }}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Message Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-semibold">From</p>
                                <p className="text-sm">{message.name}</p>
                              </div>
                              <div>
                                <p className="text-sm font-semibold">Email</p>
                                <p className="text-sm">{message.email}</p>
                              </div>
                              {message.phone && (
                                <div>
                                  <p className="text-sm font-semibold">Phone</p>
                                  <p className="text-sm">{message.phone}</p>
                                </div>
                              )}
                              <div>
                                <p className="text-sm font-semibold">Type</p>
                                <Badge variant="outline" className={getTypeBadgeColor(message.type)}>
                                  {message.type}
                                </Badge>
                              </div>
                            </div>
                            {message.subject && (
                              <div>
                                <p className="text-sm font-semibold mb-1">Subject</p>
                                <p className="text-sm">{message.subject}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-semibold mb-2">Message</p>
                              <div className="p-4 bg-muted rounded-lg">
                                <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-semibold mb-2">Reply (Email Draft)</p>
                              <Textarea 
                                placeholder="Type your reply here..."
                                rows={4}
                                className="mb-2"
                              />
                              <Button className="w-full">
                                <Send className="h-4 w-4 mr-2" />
                                Send Reply via Email
                              </Button>
                              <p className="text-xs text-muted-foreground mt-2">
                                Note: Email sending requires email service configuration
                              </p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMessages;
