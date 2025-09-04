import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Order } from "@/pages/Index";
import { Package, Clock, Truck, CheckCircle, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderSimulatorProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: Order['status']) => void;
  onAddOrder: (order: Order) => void;
}

export function OrderSimulator({ orders, onStatusChange, onAddOrder }: OrderSimulatorProps) {
  const { toast } = useToast();
  const [isAddingOrder, setIsAddingOrder] = useState(false);
  const [newOrderForm, setNewOrderForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    items: '',
    total: ''
  });

  const statusConfig = {
    placed: { 
      icon: Clock, 
      color: 'bg-warning text-warning-foreground shadow-[0_0_15px_hsl(var(--warning)/0.3)]', 
      label: 'Order Placed',
      next: 'confirmed',
      gradient: 'bg-gradient-to-r from-warning to-warning/80'
    },
    confirmed: { 
      icon: Package, 
      color: 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]', 
      label: 'Confirmed',
      next: 'shipped',
      gradient: 'bg-gradient-primary'
    },
    shipped: { 
      icon: Truck, 
      color: 'bg-accent text-accent-foreground shadow-[0_0_15px_hsl(var(--accent)/0.3)]', 
      label: 'Shipped',
      next: 'delivered',
      gradient: 'bg-gradient-to-r from-accent to-accent/80'
    },
    delivered: { 
      icon: CheckCircle, 
      color: 'bg-success text-success-foreground shadow-[0_0_15px_hsl(var(--success)/0.3)]', 
      label: 'Delivered',
      next: null,
      gradient: 'bg-gradient-success'
    }
  };

  const handleStatusChange = (orderId: string, currentStatus: Order['status']) => {
    const nextStatus = statusConfig[currentStatus].next;
    if (nextStatus) {
      onStatusChange(orderId, nextStatus as Order['status']);
      toast({
        title: "Status Updated",
        description: `Order ${orderId} updated to ${statusConfig[nextStatus as Order['status']].label}`,
      });
    }
  };

  const handleAddOrder = () => {
    if (!newOrderForm.customerName || !newOrderForm.customerEmail) {
      toast({
        title: "Missing Fields",
        description: "Please fill in customer name and email",
        variant: "destructive"
      });
      return;
    }

    const newOrder: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customerName: newOrderForm.customerName,
      customerPhone: newOrderForm.customerPhone || '+1 (555) 000-0000',
      customerEmail: newOrderForm.customerEmail,
      status: 'placed',
      items: newOrderForm.items.split(',').map(item => item.trim()).filter(Boolean),
      total: parseFloat(newOrderForm.total) || 99.99,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onAddOrder(newOrder);
    setNewOrderForm({
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      items: '',
      total: ''
    });
    setIsAddingOrder(false);
    
    toast({
      title: "Order Created",
      description: `New order ${newOrder.id} created successfully`,
    });
  };

  return (
    <Card className="card-elevated border-0 overflow-hidden">
      <CardHeader className="bg-gradient-card border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl text-gradient-primary flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-primary text-white shadow-primary">
                <Package className="h-6 w-6" />
              </div>
              Order Status Simulator
            </CardTitle>
            <CardDescription className="text-base">
              Click to advance orders through the fulfillment pipeline
            </CardDescription>
          </div>
          <Button 
            onClick={() => setIsAddingOrder(!isAddingOrder)}
            size="sm"
            className="btn-primary-gradient gap-2 px-6"
          >
            <Plus className="h-4 w-4" />
            Add Order
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {isAddingOrder && (
          <Card className="p-6 bg-gradient-card border border-primary/20 shadow-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-[0.02]" />
            <div className="relative space-y-6">
              <h3 className="text-lg font-semibold text-gradient-primary mb-4">Create New Order</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName" className="text-sm font-medium">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={newOrderForm.customerName}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                    placeholder="John Doe"
                    className="transition-all duration-300 focus:shadow-primary/20 focus:shadow-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail" className="text-sm font-medium">Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={newOrderForm.customerEmail}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                    placeholder="john@example.com"
                    className="transition-all duration-300 focus:shadow-primary/20 focus:shadow-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerPhone" className="text-sm font-medium">Phone (optional)</Label>
                  <Input
                    id="customerPhone"
                    value={newOrderForm.customerPhone}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    className="transition-all duration-300 focus:shadow-primary/20 focus:shadow-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="total" className="text-sm font-medium">Total ($)</Label>
                  <Input
                    id="total"
                    type="number"
                    step="0.01"
                    value={newOrderForm.total}
                    onChange={(e) => setNewOrderForm(prev => ({ ...prev, total: e.target.value }))}
                    placeholder="99.99"
                    className="transition-all duration-300 focus:shadow-primary/20 focus:shadow-lg"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="items" className="text-sm font-medium">Items (comma separated)</Label>
                <Input
                  id="items"
                  value={newOrderForm.items}
                  onChange={(e) => setNewOrderForm(prev => ({ ...prev, items: e.target.value }))}
                  placeholder="Product 1, Product 2"
                  className="transition-all duration-300 focus:shadow-primary/20 focus:shadow-lg"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleAddOrder} className="btn-primary-gradient px-6">
                  Create Order
                </Button>
                <Button 
                  onClick={() => setIsAddingOrder(false)} 
                  variant="outline" 
                  className="px-6 hover:bg-primary/5"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        )}

        {orders.map((order, index) => {
          const config = statusConfig[order.status];
          const StatusIcon = config.icon;
          
          return (
            <Card 
              key={order.id} 
              className="p-6 notification-card hover:shadow-elevated transform hover:-translate-y-1 transition-all duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${config.color} animate-glow`}>
                    <StatusIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{order.id}</h3>
                    <p className="text-muted-foreground font-medium">{order.customerName}</p>
                  </div>
                </div>
                <Badge className={`${config.color} px-4 py-2 text-sm font-semibold`}>
                  {config.label}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gradient-card rounded-lg border border-border/50">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Items:</span>
                    <span className="font-semibold">{order.items.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Total:</span>
                    <span className="font-bold text-lg text-gradient-primary">${order.total}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Updated:</span>
                    <span className="font-semibold">{order.updatedAt.toLocaleTimeString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Status:</span>
                    <span className="font-semibold capitalize">{order.status}</span>
                  </div>
                </div>
              </div>

              {config.next && (
                <Button 
                  onClick={() => handleStatusChange(order.id, order.status)}
                  className={`w-full ${config.gradient} text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 py-3 text-base font-semibold`}
                >
                  Advance to {statusConfig[config.next as Order['status']].label}
                </Button>
              )}

              {!config.next && (
                <div className="text-center py-3 text-success font-semibold flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Order Complete - All Notifications Sent
                </div>
              )}
            </Card>
          );
        })}

        {orders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No orders yet</p>
            <p>Click "Add Order" to create your first order</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}