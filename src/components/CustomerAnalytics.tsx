import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  Users, 
  Eye,
  Facebook,
  Twitter,
  Instagram,
  Globe
} from "lucide-react";

interface CustomerAnalyticsProps {
  orders: any[];
  notifications: any[];
  onShowModal?: (title: string, content: string, data?: Record<string, any>) => void;
}

export function CustomerAnalytics({ orders, notifications, onShowModal }: CustomerAnalyticsProps) {
  // Filter state for showing/hiding different sections
  const [filters, setFilters] = useState({
    refundChart: true,
    productViews: true,
    shareProducts: true,
    messages: true,
    topCustomers: true
  });

  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  // Mock data to match the target design
  const overviewData = [
    { title: "All time", value: "1,368", icon: "👥", color: "text-yellow-600", bgColor: "bg-yellow-100" },
    { title: "Refund requests", value: "68,192", icon: "💳", color: "text-blue-600", bgColor: "bg-blue-100" },
  ];

  const deviceData = [
    { name: 'Desktop', value: 4.8, color: '#3B82F6' },
    { name: 'Mobile', value: 0.3, color: '#10B981' },
    { name: 'Tablet', value: 94.8, color: '#F59E0B' }
  ];

  const productViews = [
    { name: 'Jan', views: 400 },
    { name: 'Feb', views: 300 },
    { name: 'Mar', views: 500 },
    { name: 'Apr', views: 280 },
    { name: 'May', views: 590 },
    { name: 'Jun', views: 320 }
  ];

  const topCustomers = [
    { name: "Jennifer Black", avatar: "/placeholder.svg", status: "active" },
    { name: "John Cooper", avatar: "/placeholder.svg", status: "active" },
    { name: "Courtney Henry", avatar: "/placeholder.svg", status: "active" }
  ];

  const products = [
    {
      name: "Effects of water stress",
      price: "$19.99",
      rating: 4.8,
      image: "/placeholder.svg"
    },
    {
      name: "Classic game console",
      price: "$68.00",
      rating: 4.8,
      image: "/placeholder.svg"
    }
  ];

  const messages = [
    { user: "Marcus McKinney", message: "Message goes here 👍", time: "2 minutes ago", avatar: "/placeholder.svg" },
    { user: "Kristin Watson", message: "Message goes here 👍", time: "5 minutes ago", avatar: "/placeholder.svg" },
    { user: "Cameron Williamson", message: "Message goes here 👍", time: "12 minutes ago", avatar: "/placeholder.svg" },
    { user: "Jane Cooper", message: "Message goes here 👍", time: "18 minutes ago", avatar: "/placeholder.svg" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              onShowModal?.('Time Range Selector', 'Select your preferred time range for analytics:\n\n• Last 7 days\n• Last 30 days\n• Last 90 days\n• All time\n• Custom range');
            }}
          >
            All time
          </Button>
        </div>
      </div>

      {/* Filter Controls */}
      <Card className="p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-sm font-medium text-gray-700">Show sections:</span>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="refundChart"
              checked={filters.refundChart}
              onCheckedChange={() => handleFilterChange('refundChart')}
            />
            <label
              htmlFor="refundChart"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Refund Chart & Countries
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="productViews"
              checked={filters.productViews}
              onCheckedChange={() => handleFilterChange('productViews')}
            />
            <label
              htmlFor="productViews"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Product Views Chart
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="shareProducts"
              checked={filters.shareProducts}
              onCheckedChange={() => handleFilterChange('shareProducts')}
            />
            <label
              htmlFor="shareProducts"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Share Products
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="messages"
              checked={filters.messages}
              onCheckedChange={() => handleFilterChange('messages')}
            />
            <label
              htmlFor="messages"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Messages
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="topCustomers"
              checked={filters.topCustomers}
              onCheckedChange={() => handleFilterChange('topCustomers')}
            />
            <label
              htmlFor="topCustomers"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Top Customers
            </label>
          </div>
        </div>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {overviewData.map((item, index) => (
          <Card 
            key={index} 
            className="p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
            onClick={() => {
              if (index === 0) {
                onShowModal?.('All Time Analytics', 'Comprehensive customer analytics overview', {
                  totalCustomers: 1368,
                  newThisMonth: 127,
                  activeUsers: 892,
                  churnRate: '3.2%',
                  averageSession: '12 min'
                });
              } else {
                onShowModal?.('Refund Requests Details', 'Complete refund management overview', {
                  totalRequests: 68192,
                  pending: 234,
                  processed: 67958,
                  avgProcessingTime: '2.3 days',
                  refundRate: '4.1%'
                });
              }
            }}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{item.title}</p>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">{item.value}</span>
                </div>
              </div>
              <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Refund Requests - Entire card conditional */}
          {filters.refundChart && (
          <Card className="p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Refund requests</h3>
              <Badge variant="outline" className="text-xs">All time</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Recent refund requests • <button 
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                onClick={() => {
                  onShowModal?.('Refund Requests', 'Navigate to detailed refund management', {
                    pendingRefunds: 234,
                    processedRefunds: 67958,
                    avgProcessingTime: '2.3 days',
                    totalAmount: '$1,234,567',
                    successRate: '98.5%'
                  });
                }}
              >
                Show requests →
              </button>
            </p>
            <div className="text-sm text-gray-500 mb-4">
              Send messages
            </div>
            
            {/* Top Device */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">Top device</h4>
              <div className="flex items-center justify-center mb-4">
                <div className="relative w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={deviceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {deviceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">4.8%</span>
                  <span className="text-gray-600">0.3%</span>
                  <span className="text-gray-600">94.8%</span>
                </div>
              </div>
            </div>

            {/* Top Countries */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">Top countries</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-100 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-600">🇺🇸 United States</div>
                  <div className="text-sm font-medium">20%</div>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-600">🇨🇦 Canada</div>
                  <div className="text-sm font-medium">15%</div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg text-center">
                  <div className="text-xs text-gray-600">🇬🇧 United Kingdom</div>
                  <div className="text-sm font-medium">10%</div>
                </div>
              </div>
            </div>
          </Card>
          )}

          {/* Product Views */}
          {filters.productViews && (
          <Card className="p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Product views</h3>
              <Badge variant="outline" className="text-xs">All time</Badge>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={productViews}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />
                <Bar 
                  dataKey="views" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  onClick={(data) => {
                    onShowModal?.(`Product Views - ${data.name}`, 'Detailed analytics for this time period', {
                      views: data.views,
                      clickThroughRate: `${Math.round(Math.random() * 10 + 5)}%`,
                      conversionRate: `${Math.round(Math.random() * 5 + 2)}%`,
                      revenue: `$${Math.round(Math.random() * 5000 + 1000)}`,
                      bounceRate: `${Math.round(Math.random() * 20 + 30)}%`
                    });
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          )}

          {/* Share Your Products */}
          {filters.shareProducts && (
          <Card className="p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share your products</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {products.map((product, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => {
                    onShowModal?.(`Product: ${product.name}`, 'Complete product analytics and details', {
                      price: product.price,
                      rating: `${product.rating}/5`,
                      viewsThisMonth: Math.round(Math.random() * 1000 + 500),
                      sales: Math.round(Math.random() * 50 + 10),
                      inventory: `${Math.round(Math.random() * 100 + 20)} units`,
                      revenue: `$${Math.round(Math.random() * 10000 + 5000)}`
                    });
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-gray-900 mb-1">{product.name}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => {
                  onShowModal?.('Share to Facebook', 'Share your products and analytics on Facebook', {
                    platform: 'Facebook',
                    reach: '2.8M potential users',
                    engagement: '4.2% avg rate',
                    bestTime: '7-9 PM weekdays'
                  });
                }}
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  onShowModal?.('Share to Twitter', 'Share insights and products on Twitter', {
                    platform: 'Twitter',
                    reach: '450K potential users',
                    engagement: '2.8% avg rate',
                    bestTime: '9-10 AM weekdays'
                  });
                }}
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  onShowModal?.('Share to Instagram', 'Share visual content on Instagram', {
                    platform: 'Instagram',
                    reach: '1.2M potential users',
                    engagement: '6.1% avg rate',
                    bestTime: '6-8 PM daily'
                  });
                }}
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </Button>
            </div>
          </Card>
          )}
        </div>

        {/* Right Column - Messages */}
        <div className="space-y-6">
          {filters.messages && (
          <Card className="p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Message</h3>
            </div>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">{message.user}</span>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              size="sm"
              onClick={() => {
                onShowModal?.('Message Center', 'Access complete customer communication hub', {
                  totalMessages: 1247,
                  unreadMessages: 23,
                  avgResponseTime: '2.4 hours',
                  satisfactionRate: '94.2%',
                  activeThreads: 156
                });
              }}
            >
              View all messages
            </Button>
          </Card>
          )}

          {/* Top Customers */}
          {filters.topCustomers && (
          <Card className="p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top customers</h3>
            <div className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    onShowModal?.(`Customer: ${customer.name}`, 'Complete customer profile and analytics', {
                      status: customer.status,
                      totalOrders: Math.round(Math.random() * 20 + 5),
                      lifetimeValue: `$${Math.round(Math.random() * 2000 + 500)}`,
                      lastOrder: `${Math.round(Math.random() * 30 + 1)} days ago`,
                      preferredContact: 'Email',
                      joinDate: '2 years ago'
                    });
                  }}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={customer.avatar} />
                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {customer.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              size="sm"
              onClick={() => {
                onShowModal?.('Customer Management', 'Access complete customer database and analytics', {
                  totalCustomers: 1368,
                  activeCustomers: 892,
                  newCustomers: 127,
                  customerSegments: 8,
                  avgLifetimeValue: '$1,247',
                  retentionRate: '78.5%'
                });
              }}
            >
              View all
            </Button>
          </Card>
          )}
        </div>
      </div>
    </div>
  );
}
