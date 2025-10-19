-- Create messages table for customer inquiries
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'general', -- general, product, consultancy, ai_chat, whatsapp
  status TEXT NOT NULL DEFAULT 'unread', -- unread, read, replied, archived
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Admins can view all messages
CREATE POLICY "Admins can view all messages"
ON public.messages
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Admins can update messages
CREATE POLICY "Admins can update messages"
ON public.messages
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Anyone can create messages (contact form)
CREATE POLICY "Anyone can create messages"
ON public.messages
FOR INSERT
WITH CHECK (true);

-- Users can view their own messages
CREATE POLICY "Users can view their own messages"
ON public.messages
FOR SELECT
USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX idx_messages_status ON public.messages(status);
CREATE INDEX idx_messages_type ON public.messages(type);
CREATE INDEX idx_messages_created_at ON public.messages(created_at DESC);

-- Trigger for updating updated_at
CREATE TRIGGER update_messages_updated_at
BEFORE UPDATE ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();