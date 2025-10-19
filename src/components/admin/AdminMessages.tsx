import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminMessages = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Messages & Inquiries</h2>
        <p className="text-muted-foreground">Manage customer messages and inquiries</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Message management features coming soon...</p>
          <div className="mt-4 space-y-2 text-sm">
            <p>Features to implement:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Inbox from Contact Form, AI Chat, WhatsApp</li>
              <li>Filter by message type</li>
              <li>Reply with AI assistance</li>
              <li>Archive old messages</li>
              <li>AI summarization</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMessages;
