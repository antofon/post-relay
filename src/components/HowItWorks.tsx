import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  MessageSquare,
  Download,
  Eye,
  ArrowRight
} from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Users,
      title: "Track Your Customers",
      description: "Monitor customer behavior, orders, and engagement patterns in real-time.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: BarChart3,
      title: "View Analytics",
      description: "See clear charts and graphs showing your business performance and trends.",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: MessageSquare,
      title: "Manage Communications",
      description: "Handle customer messages and refund requests all in one place.",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: TrendingUp,
      title: "Make Better Decisions",
      description: "Use insights from your data to grow your business and improve customer satisfaction.",
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const features = [
    {
      icon: Eye,
      title: "Easy to Read",
      description: "Simple charts and numbers that anyone can understand"
    },
    {
      icon: Download,
      title: "Export Data",
      description: "Download your data anytime for reports or backup"
    },
    {
      icon: MessageSquare,
      title: "Customer Messages",
      description: "See and respond to customer questions quickly"
    },
    {
      icon: TrendingUp,
      title: "Track Growth",
      description: "Watch your business grow with clear performance metrics"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">How PostRelay Works</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          PostRelay helps you understand your customers and grow your business with simple, 
          easy-to-use analytics and management tools.
        </p>
      </div>

      {/* How It Works Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          return (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-sm font-bold text-gray-400">Step {index + 1}</span>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-300 hidden lg:block" />
                  )}
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {step.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* What You Can Do */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What You Can Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Getting Started */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-900">Ready to Get Started?</CardTitle>
          <CardDescription className="text-blue-700 text-base">
            Click on "Customer Analytics" in the sidebar to see your dashboard in action.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-900 mb-1">📊 View Analytics</div>
                <div className="text-blue-700">See charts of your customer data</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-900 mb-1">💬 Check Messages</div>
                <div className="text-blue-700">Read customer communications</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="font-semibold text-blue-900 mb-1">📈 Track Growth</div>
                <div className="text-blue-700">Monitor your business performance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Is this data real?</h3>
            <p className="text-gray-600 text-sm">
              This is a demo dashboard with sample data to show you how PostRelay works. 
              In a real setup, this would show your actual business data.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Can I export my data?</h3>
            <p className="text-gray-600 text-sm">
              Yes! Use the "Download Data" button at the top right to export your analytics 
              data as a file you can open in Excel or other programs.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">How often is data updated?</h3>
            <p className="text-gray-600 text-sm">
              Your dashboard updates in real-time as customers interact with your business, 
              so you always see the latest information.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Do I need technical skills?</h3>
            <p className="text-gray-600 text-sm">
              Not at all! PostRelay is designed to be simple and easy to use. 
              If you can read a chart, you can use PostRelay.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
