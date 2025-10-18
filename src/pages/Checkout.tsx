import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Phone, Loader2 } from "lucide-react";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
  };
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          products (
            id,
            name,
            price
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      
      if (!data || data.length === 0) {
        navigate("/cart");
        return;
      }
      
      setCartItems(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast({
        title: "Error",
        description: "Failed to load cart",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.products.price * item.quantity),
      0
    );
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shippingAddress.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your shipping address",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "mpesa" && !phoneNumber.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your M-Pesa phone number",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const total = calculateTotal();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total,
          payment_method: paymentMethod,
          shipping_address: shippingAddress,
          phone_number: phoneNumber,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Process payment based on method
      if (paymentMethod === "mpesa") {
        // Call M-Pesa payment edge function
        const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
          "mpesa-payment",
          {
            body: {
              orderId: order.id,
              phoneNumber,
              amount: total,
            },
          }
        );

        if (paymentError) throw paymentError;

        toast({
          title: "Payment initiated",
          description: "Please complete the payment on your phone",
        });
      } else {
        // For card/PayPal, redirect to Stripe (to be implemented with Stripe integration)
        toast({
          title: "Order placed",
          description: "Payment processing will be completed shortly",
        });
      }

      // Clear cart
      const { error: clearError } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id);

      if (clearError) console.error("Error clearing cart:", clearError);

      // Redirect to success page
      navigate("/");
      toast({
        title: "Order successful",
        description: "Your order has been placed successfully",
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your order",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32">
          <p className="text-center text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-primary mb-8">Checkout</h1>

          <form onSubmit={handleCheckout}>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Shipping & Payment Info */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-semibold text-xl mb-4">Shipping Address</h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Full Address</Label>
                        <Textarea
                          id="address"
                          placeholder="Enter your complete shipping address"
                          value={shippingAddress}
                          onChange={(e) => setShippingAddress(e.target.value)}
                          required
                          rows={4}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h2 className="font-semibold text-xl mb-4">Payment Method</h2>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="mpesa" id="mpesa" />
                        <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer">
                          <Phone className="h-4 w-4" />
                          M-Pesa
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-4 w-4" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "mpesa" && (
                      <div className="mt-4">
                        <Label htmlFor="phone">M-Pesa Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+254712345678"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h2 className="font-semibold text-xl mb-6">Order Summary</h2>

                    <div className="space-y-3 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.products.name} x{item.quantity}
                          </span>
                          <span>${(item.products.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}

                      <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-primary">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={processing}
                    >
                      {processing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Place Order"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
