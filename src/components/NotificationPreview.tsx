import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Order } from "@/pages/Index";
import { MessageSquare, Mail, Clock, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  orderId: string;
  type: 'sms' | 'email';
  status: string;
  message: string;
  timestamp: Date;
}

interface NotificationPreviewProps {
  notifications: Notification[];
  orders: Order[];
  showAll?: boolean;
}

export function NotificationPreview({ notifications, orders, showAll = false }: NotificationPreviewProps) {
  const recentNotifications = showAll ? notifications : notifications.slice(-6);
  
  const smsNotifications = recentNotifications.filter(n => n.type === 'sms');
  const emailNotifications = recentNotifications.filter(n => n.type === 'email');

  const getStatusColor = (status: string) => {
    const colors = {
      placed: 'bg-warning/10 text-warning border-warning/20',
      confirmed: 'bg-primary/10 text-primary border-primary/20',
      shipped: 'bg-accent/10 text-accent border-accent/20',
      delivered: 'bg-success/10 text-success border-success/20'
    };
    return colors[status as keyof typeof colors] || 'bg-muted/10 text-muted-foreground border-muted/20';
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => {
    const order = orders.find(o => o.id === notification.orderId);
    const isEmail = notification.type === 'email';
    
    return (
      <Card className={cn(
        "notification-card overflow-hidden relative",
        isEmail ? "border-l-4 border-l-info shadow-info/10" : "border-l-4 border-l-success shadow-success/10"
      )}>
        <div className="absolute inset-0 bg-gradient-to-r opacity-[0.02]" />
        <CardContent className="p-6 relative">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-xl flex-shrink-0 shadow-lg",
              isEmail 
                ? "bg-gradient-to-br from-info to-info/80 text-white shadow-info/20" 
                : "bg-gradient-to-br from-success to-success/80 text-white shadow-success/20"
            )}>
              {isEmail ? <Mail className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
            </div>
            
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex items-center gap-3 mb-3">
                <Badge 
                  variant="outline" 
                  className={cn(
                    "px-3 py-1 font-semibold",
                    getStatusColor(notification.status)
                  )}
                >
                  {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground font-medium">
                  {notification.timestamp.toLocaleTimeString()}
                </span>
                <div className={cn(
                  "status-dot",
                  isEmail ? "status-info" : "status-success"
                )} />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-lg">
                    {isEmail ? '📧 Email' : '📱 SMS'} → {order?.customerName || 'Customer'}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {isEmail ? 'Email Sent' : 'SMS Delivered'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {isEmail ? order?.customerEmail : order?.customerPhone}
                </div>
              </div>
              
              <div className={cn(
                "p-4 rounded-xl relative overflow-hidden",
                isEmail 
                  ? "bg-info-light border border-info/20" 
                  : "bg-success-light border border-success/20"
              )}>
                <div className="absolute inset-0 bg-gradient-to-r opacity-5" />
                <div className="relative">
                  <div className="text-sm font-medium mb-2 text-foreground/80">
                    {isEmail ? 'Email Content:' : 'SMS Message:'}
                  </div>
                  <div className="text-sm leading-relaxed font-medium">
                    {notification.message}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                <span>Order ID: {notification.orderId}</span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-success" />
                  Delivered successfully
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className="card-elevated border-0 h-fit">
      <CardHeader className="bg-gradient-card border-b border-border/50">
        <CardTitle className="text-2xl flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-success text-white shadow-success">
            <MessageSquare className="h-6 w-6" />
          </div>
          <span className="text-gradient-primary">Live Notifications</span>
        </CardTitle>
        <CardDescription className="text-base">
          Real-time SMS and email notifications triggered by order status changes
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="relative">
              <Clock className="h-16 w-16 mx-auto mb-4 opacity-50 float-animation" />
              <div className="absolute inset-0 bg-gradient-primary opacity-5 blur-2xl rounded-full" />
            </div>
            <p className="text-lg font-medium">No notifications sent yet</p>
            <p>Change an order status to see notifications appear</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Tabs defaultValue="all" className="space-y-6">
              <div className="flex justify-center">
                <TabsList className="bg-white/80 backdrop-blur-sm shadow-card border border-white/20 p-1 rounded-xl">
                  <TabsTrigger 
                    value="all"
                    className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white data-[state=active]:shadow-primary rounded-lg transition-all duration-300 px-6"
                  >
                    All ({notifications.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sms"
                    className="data-[state=active]:bg-gradient-success data-[state=active]:text-white data-[state=active]:shadow-success rounded-lg transition-all duration-300 px-6"
                  >
                    📱 SMS ({smsNotifications.length})
                  </TabsTrigger>
                  <TabsTrigger 
                    value="email"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-info data-[state=active]:to-info/80 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 px-6"
                  >
                    📧 Email ({emailNotifications.length})
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="slide-up-fade">
                <ScrollArea className={showAll ? "h-[600px]" : "h-[500px]"}>
                  <div className="space-y-4 pr-4">
                    {recentNotifications
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map((notification, index) => (
                        <div 
                          key={notification.id} 
                          className="slide-up-fade" 
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <NotificationCard notification={notification} />
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="sms" className="slide-up-fade">
                <ScrollArea className={showAll ? "h-[600px]" : "h-[500px]"}>
                  <div className="space-y-4 pr-4">
                    {smsNotifications
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map((notification, index) => (
                        <div 
                          key={notification.id} 
                          className="slide-up-fade" 
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <NotificationCard notification={notification} />
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="email" className="slide-up-fade">
                <ScrollArea className={showAll ? "h-[600px]" : "h-[500px]"}>
                  <div className="space-y-4 pr-4">
                    {emailNotifications
                      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                      .map((notification, index) => (
                        <div 
                          key={notification.id} 
                          className="slide-up-fade" 
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <NotificationCard notification={notification} />
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>

            {!showAll && notifications.length > 6 && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-center gap-2 text-muted-foreground bg-gradient-card p-4 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="font-medium">
                    Showing {Math.min(6, notifications.length)} of {notifications.length} notifications
                  </span>
                  <div className="flex gap-1 ml-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}