import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Download,
  Eye,
  ArrowRight,
  Filter,
  PieChart,
  Mail,
  Settings,
  CheckCircle
} from "lucide-react";

export function HowItWorks() {
  const dashboardFeatures = [
    {
      title: "Customer Analytics Dashboard",
      description: "Get a complete view of your customer data with interactive charts and real-time metrics",
      image: "dashboard-overview",
      features: ["1,368 total customers", "68,192 refund requests", "Real-time updates", "Interactive filters"]
    },
    {
      title: "Smart Filtering System", 
      description: "Customize your view with our intelligent filter system - show only what matters to you",
      image: "filter-system",
      features: ["Toggle sections on/off", "Save custom views", "Quick access controls", "Responsive design"]
    },
    {
      title: "Data Visualization",
      description: "Transform complex data into clear, actionable insights with beautiful charts and graphs",
      image: "charts-graphs",
      features: ["Interactive pie charts", "Monthly trend analysis", "Device breakdowns", "Geographic data"]
    },
    {
      title: "Customer Communication Hub",
      description: "Manage all customer interactions from one central location with message threading",
      image: "messages",
      features: ["Real-time messages", "Customer profiles", "Response tracking", "Communication history"]
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <Badge className="mb-4 px-4 py-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
          ✨ Product Demo
        </Badge>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          PostRelay Customer Analytics
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Transform your customer data into actionable insights with our intuitive analytics dashboard. 
          See exactly how PostRelay helps you understand your customers and grow your business.
        </p>
      </div>

      {/* Main Dashboard Preview */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Analytics Dashboard</h2>
          <p className="text-gray-600">A complete view of your customer data and business performance</p>
        </div>
        
        {/* Mock Dashboard Interface */}
        <div className="bg-white rounded-xl shadow-lg border p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Customer Analytics</h3>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download Data
            </Button>
          </div>
          
          {/* Filter Controls Preview */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4 text-sm">
              <span className="font-medium text-gray-700">Show sections:</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span>Refund Chart & Countries</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                <span className="text-gray-500">Product Views Chart</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                <span className="text-gray-500">Messages</span>
              </div>
            </div>
          </div>
          
          {/* Mock Data Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">All time</p>
                  <p className="text-2xl font-bold text-gray-900">1,368</p>
                </div>
                <div className="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-yellow-700" />
                </div>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Refund requests</p>
                  <p className="text-2xl font-bold text-gray-900">68,192</p>
                </div>
                <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-700" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Mock Chart */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center justify-center h-32">
              <PieChart className="w-16 h-16 text-gray-400" />
              <div className="ml-4 text-gray-500">
                <p className="font-medium">Interactive Charts & Graphs</p>
                <p className="text-sm">Real data visualization</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Feature Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {dashboardFeatures.map((feature, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="space-y-2">
                  {feature.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Interactive Demo Section */}
      <Card className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-blue-100 mb-6 text-lg">
            Click "Customer Analytics" in the sidebar to interact with the live demo dashboard
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <Filter className="w-8 h-8 mx-auto mb-2 text-blue-300" />
              <p className="text-sm font-medium">Smart Filters</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-300" />
              <p className="text-sm font-medium">Live Data</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <Settings className="w-8 h-8 mx-auto mb-2 text-blue-300" />
              <p className="text-sm font-medium">Full Control</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Facts */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why PostRelay?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Eye, title: "Easy to Use", desc: "No technical skills required" },
            { icon: Download, title: "Export Ready", desc: "Download data anytime" },
            { icon: TrendingUp, title: "Real-time", desc: "Live updates as they happen" },
            { icon: MessageSquare, title: "All-in-One", desc: "Everything in one dashboard" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
