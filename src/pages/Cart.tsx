import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
    stock: number;
  };
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
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
            price,
            image_url,
            stock
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      setCartItems(data || []);
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

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", itemId);

      if (error) throw error;
      fetchCart();
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;
      
      toast({
        title: "Item removed",
        description: "Item removed from cart",
      });
      fetchCart();
    } catch (error) {
      console.error("Error removing item:", error);
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + (item.products.price * item.quantity),
      0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-32">
          <p className="text-center text-muted-foreground">Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <Card className="p-12 text-center">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
              <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
              <Button onClick={() => navigate("/marketplace")}>
                Continue Shopping
              </Button>
            </Card>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden shrink-0">
                          {item.products.image_url ? (
                            <img
                              src={item.products.image_url}
                              alt={item.products.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingCart className="h-8 w-8 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">
                            {item.products.name}
                          </h3>
                          <p className="text-xl font-bold text-primary mb-4">
                            ${item.products.price.toFixed(2)}
                          </p>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.id, parseInt(e.target.value) || 1)
                                }
                                className="w-16 text-center"
                                min="1"
                                max={item.products.stock}
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.products.stock}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeItem(item.id)}
                              className="gap-2"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-lg">
                            ${(item.products.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div>
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-6">Order Summary</h3>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span className="text-primary">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => navigate("/checkout")}
                      className="w-full"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>

                    <Button
                      onClick={() => navigate("/marketplace")}
                      variant="outline"
                      className="w-full mt-3"
                    >
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
