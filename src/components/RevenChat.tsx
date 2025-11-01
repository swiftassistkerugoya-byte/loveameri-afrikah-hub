import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, History, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

export const RevenChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      initializeChat();
      loadConversations();
    }
  }, [isOpen]);

  const initializeChat = async () => {
    // Fetch greeting from config
    const { data: config } = await supabase
      .from('reven_config')
      .select('greeting_message')
      .single();

    const greeting = config?.greeting_message || 
      "Hello! I'm Reven, your virtual assistant at LoveAmeriAfrikah Enterprises. How can I help you today?";

    // Create new conversation
    const { data: newConv, error } = await supabase
      .from('conversations')
      .insert({ title: 'New Conversation' })
      .select()
      .single();

    if (!error && newConv) {
      setConversationId(newConv.id);
      setMessages([{ role: "assistant", content: greeting }]);
    } else {
      setMessages([{ role: "assistant", content: greeting }]);
    }
  };

  const loadConversations = async () => {
    const { data } = await supabase
      .from('conversations')
      .select('id, title, created_at')
      .order('updated_at', { ascending: false })
      .limit(10);

    if (data) {
      setConversations(data);
    }
  };

  const loadConversation = async (convId: string) => {
    const { data } = await supabase
      .from('conversation_messages')
      .select('role, content')
      .eq('conversation_id', convId)
      .order('created_at');

    if (data) {
      setMessages(data as Message[]);
      setConversationId(convId);
      setShowHistory(false);
    }
  };

  const deleteConversation = async (convId: string) => {
    await supabase.from('conversations').delete().eq('id', convId);
    loadConversations();
    if (convId === conversationId) {
      initializeChat();
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("reven-chat", {
        body: { 
          messages: [...messages, userMessage],
          conversationId 
        },
      });

      if (error) throw error;

      if (data?.reply) {
        const assistantMessage = { role: "assistant" as const, content: data.reply };
        setMessages((prev) => [...prev, assistantMessage]);
        
        // Update conversation title with first user message
        if (messages.length === 1 && conversationId) {
          const title = input.slice(0, 50) + (input.length > 50 ? '...' : '');
          await supabase
            .from('conversations')
            .update({ title })
            .eq('id', conversationId);
        }
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-glow z-50"
      >
        <Bot className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-card z-50 flex flex-col">
      <CardContent className="p-0 flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-gradient-primary text-white p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-bold">Reven AI</h3>
              <p className="text-sm text-white/80">Online • Replies instantly</p>
            </div>
          </div>
          <div className="flex gap-2">
            <DropdownMenu open={showHistory} onOpenChange={setShowHistory}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <History className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                <div className="p-2">
                  <p className="text-sm font-semibold mb-2">Recent Conversations</p>
                  {conversations.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No history yet</p>
                  ) : (
                    conversations.map((conv) => (
                      <div key={conv.id} className="flex items-center justify-between mb-1">
                        <DropdownMenuItem
                          className="flex-1 cursor-pointer"
                          onClick={() => loadConversation(conv.id)}
                        >
                          <span className="truncate">{conv.title}</span>
                        </DropdownMenuItem>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conv.id);
                          }}
                          className="h-6 w-6 p-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      initializeChat();
                      setShowHistory(false);
                    }}
                  >
                    New Chat
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : ""}`}
            >
              {message.role === "assistant" && (
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-accent" />
                </div>
              )}
              <div
                className={`rounded-2xl p-3 max-w-[80%] ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-background shadow-sm rounded-tl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-accent" />
              </div>
              <div className="bg-background shadow-sm rounded-2xl rounded-tl-none p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce delay-100" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-border bg-background rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent bg-background"
              disabled={isLoading}
            />
            <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
