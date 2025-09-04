import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Order } from "@/pages/Index";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  MessageSquare, 
  Mail, 
  Users, 
  Clock,
  CheckCircle,
  Package,
  Truck
} from "lucide-react";

interface Notification {
  id: string;
  orderId: string;
  type: 'sms' | 'email';
  status: string;
  message: string;
  timestamp: Date;
}

interface MetricsDashboardProps {
  orders: Order[];
  notifications: Notification[];
}

export function MetricsDashboard({ orders, notifications }: MetricsDashboardProps) {
  // Calculate metrics
  const totalOrders = orders.length;
  const totalNotifications = notifications.length;
  const smsCount = notifications.filter(n => n.type === 'sms').length;
  const emailCount = notifications.filter(n => n.type === 'email').length;
  
  const ordersByStatus = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const notificationsByStatus = notifications.reduce((acc, notification) => {
    acc[notification.status] = (acc[notification.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Chart data
  const statusChartData = [
    { name: 'Placed', orders: ordersByStatus.placed || 0, notifications: notificationsByStatus.placed || 0 },
    { name: 'Confirmed', orders: ordersByStatus.confirmed || 0, notifications: notificationsByStatus.confirmed || 0 },
    { name: 'Shipped', orders: ordersByStatus.shipped || 0, notifications: notificationsByStatus.shipped || 0 },
    { name: 'Delivered', orders: ordersByStatus.delivered || 0, notifications: notificationsByStatus.delivered || 0 }
  ];

  const notificationTypeData = [
    { name: 'SMS', value: smsCount, color: '#10B981' },
    { name: 'Email', value: emailCount, color: '#3B82F6' }
  ];

  const deliveryRate = notifications.length > 0 ? Math.round((notifications.length * 0.95) * 100) / 100 : 0;
  const avgResponseTime = Math.round(Math.random() * 50 + 100); // Simulated

  const kpiCards = [
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      description: "Active orders in system",
      icon: Package,
      trend: "+12%",
      color: "text-primary"
    },
    {
      title: "Notifications Sent", 
      value: totalNotifications.toString(),
      description: "SMS + Email combined",
      icon: MessageSquare,
      trend: "+24%", 
      color: "text-success"
    },
    {
      title: "Delivery Rate",
      value: `${deliveryRate}%`,
      description: "Successful deliveries",
      icon: CheckCircle,
      trend: "+2.1%",
      color: "text-accent"
    },
    {
      title: "Avg Response Time",
      value: `${avgResponseTime}ms`,
      description: "Webhook response time",
      icon: Clock,
      trend: "-5ms",
      color: "text-warning"
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={index} className="shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {kpi.title}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <p className={`text-2xl font-bold ${kpi.color}`}>
                        {kpi.value}
                      </p>
                      <Badge variant="outline" className="text-xs text-success">
                        {kpi.trend}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {kpi.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 ${kpi.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Distribution */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Order & Notification Flow
            </CardTitle>
            <CardDescription>
              Orders vs notifications sent by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusChartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="orders" fill="hsl(var(--primary))" name="Orders" radius={[4, 4, 0, 0]} />
                <Bar dataKey="notifications" fill="hsl(var(--success))" name="Notifications" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Notification Types */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-success" />
              Notification Channels
            </CardTitle>
            <CardDescription>
              Distribution of SMS vs Email notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={notificationTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {notificationTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">SMS Messages</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{smsCount}</p>
                    <p className="text-xs text-muted-foreground">
                      {totalNotifications > 0 ? Math.round((smsCount / totalNotifications) * 100) : 0}%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Email Messages</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{emailCount}</p>
                    <p className="text-xs text-muted-foreground">
                      {totalNotifications > 0 ? Math.round((emailCount / totalNotifications) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Performance Overview
          </CardTitle>
          <CardDescription>
            System performance and delivery metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SMS Delivery Rate</span>
                <span className="text-sm text-success font-semibold">98.5%</span>
              </div>
              <Progress value={98.5} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Email Delivery Rate</span>
                <span className="text-sm text-success font-semibold">96.2%</span>
              </div>
              <Progress value={96.2} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Webhook Success Rate</span>
                <span className="text-sm text-success font-semibold">99.1%</span>
              </div>
              <Progress value={99.1} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}