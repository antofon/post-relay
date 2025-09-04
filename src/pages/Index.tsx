import { useState } from "react";
import { OrderSimulator } from "@/components/OrderSimulator";
import { NotificationPreview } from "@/components/NotificationPreview";
import { WebhookDashboard } from "@/components/WebhookDashboard";
import { MetricsDashboard } from "@/components/MetricsDashboard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  status: 'placed' | 'confirmed' | 'shipped' | 'delivered';
  items: string[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customerName: "Sarah Johnson",
      customerPhone: "+1 (555) 123-4567",
      customerEmail: "sarah.johnson@email.com",
      status: "placed",
      items: ["Wireless Headphones", "Phone Case"],
      total: 129.99,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const [notifications, setNotifications] = useState<Array<{
    id: string;
    orderId: string;
    type: 'sms' | 'email';
    status: string;
    message: string;
    timestamp: Date;
  }>>([]);

  const handleOrderStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status: newStatus, updatedAt: new Date() };
        
        // Simulate notification sending
        const notificationId = `${orderId}-${newStatus}-${Date.now()}`;
        const message = getNotificationMessage(newStatus, updatedOrder);
        
        // Add SMS notification
        setNotifications(prev => [...prev, {
          id: notificationId + '-sms',
          orderId,
          type: 'sms',
          status: newStatus,
          message: message.sms,
          timestamp: new Date()
        }]);

        // Add Email notification
        setNotifications(prev => [...prev, {
          id: notificationId + '-email',
          orderId,
          type: 'email',
          status: newStatus,
          message: message.email,
          timestamp: new Date()
        }]);

        return updatedOrder;
      }
      return order;
    }));
  };

  const getNotificationMessage = (status: Order['status'], order: Order) => {
    const messages = {
      placed: {
        sms: `Hi ${order.customerName}! 🎉 Your order #${order.id} has been placed successfully. Total: $${order.total}. We'll keep you updated!`,
        email: `Order Confirmation - Your order #${order.id} totaling $${order.total} has been received and is being processed.`
      },
      confirmed: {
        sms: `Great news ${order.customerName}! 📦 Your order #${order.id} has been confirmed and will be shipped soon.`,
        email: `Order Confirmed - Your order #${order.id} has been confirmed and is being prepared for shipment.`
      },
      shipped: {
        sms: `📮 Your order #${order.id} is on its way! Track your package and expect delivery within 2-3 business days.`,
        email: `Order Shipped - Your order #${order.id} has been shipped and is on its way to you.`
      },
      delivered: {
        sms: `✅ Delivered! Your order #${order.id} has arrived. Thanks for choosing us, ${order.customerName}!`,
        email: `Order Delivered - Your order #${order.id} has been successfully delivered. Thank you for your business!`
      }
    };
    return messages[status];
  };

  const [activeView, setActiveView] = useState<'simulator' | 'notifications' | 'webhooks' | 'metrics'>('simulator');

  const sidebarItems = [
    { id: 'simulator', label: 'Order Simulator', icon: '📦' },
    { id: 'notifications', label: 'Live Notifications', icon: '🔔' },
    { id: 'webhooks', label: 'Webhook Dashboard', icon: '🔗' },
    { id: 'metrics', label: 'Analytics', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Dark Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">PR</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Post Relay</h1>
              <p className="text-xs text-gray-400">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-sm ${
                  activeView === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">User</p>
              <p className="text-xs text-gray-400 truncate">user@postrelay.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="ml-4 lg:ml-0">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                {sidebarItems.find(item => item.id === activeView)?.label}
              </h2>
              <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                Overview
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V3h0z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 lg:p-6 bg-gray-50 overflow-auto">
          {activeView === 'simulator' && (
            <div className="space-y-4 lg:space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                      <span className="text-orange-600 text-base lg:text-lg">📦</span>
                    </div>
                    <div className="ml-3 lg:ml-4 min-w-0">
                      <p className="text-xs lg:text-sm font-medium text-gray-500 truncate">Total Orders</p>
                      <p className="text-lg lg:text-2xl font-semibold text-gray-900">{orders.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <span className="text-blue-600 text-base lg:text-lg">🔔</span>
                    </div>
                    <div className="ml-3 lg:ml-4 min-w-0">
                      <p className="text-xs lg:text-sm font-medium text-gray-500 truncate">Notifications</p>
                      <p className="text-lg lg:text-2xl font-semibold text-gray-900">{notifications.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <span className="text-green-600 text-base lg:text-lg">✅</span>
                    </div>
                    <div className="ml-3 lg:ml-4 min-w-0">
                      <p className="text-xs lg:text-sm font-medium text-gray-500 truncate">Delivered</p>
                      <p className="text-lg lg:text-2xl font-semibold text-gray-900">{orders.filter(o => o.status === 'delivered').length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                      <span className="text-purple-600 text-base lg:text-lg">💰</span>
                    </div>
                    <div className="ml-3 lg:ml-4 min-w-0">
                      <p className="text-xs lg:text-sm font-medium text-gray-500 truncate">Revenue</p>
                      <p className="text-lg lg:text-2xl font-semibold text-gray-900">${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <OrderSimulator 
                    orders={orders} 
                    onStatusChange={handleOrderStatusChange}
                    onAddOrder={(order) => setOrders(prev => [...prev, order])}
                  />
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <NotificationPreview notifications={notifications} orders={orders} />
                </div>
              </div>
            </div>
          )}

          {activeView === 'notifications' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <NotificationPreview notifications={notifications} orders={orders} showAll />
            </div>
          )}

          {activeView === 'webhooks' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <WebhookDashboard notifications={notifications} />
            </div>
          )}

          {activeView === 'metrics' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <MetricsDashboard orders={orders} notifications={notifications} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;