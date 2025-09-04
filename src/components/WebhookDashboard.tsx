import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Webhook, Globe, Code, CheckCircle, AlertCircle, Copy, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface Notification {
  id: string;
  orderId: string;
  type: 'sms' | 'email';
  status: string;
  message: string;
  timestamp: Date;
}

interface WebhookDashboardProps {
  notifications: Notification[];
}

export function WebhookDashboard({ notifications }: WebhookDashboardProps) {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('https://your-app.com/webhooks/order-status');
  const [activeEndpoint, setActiveEndpoint] = useState('/api/webhooks/order-status');
  const [webhookHistory, setWebhookHistory] = useState<any[]>([]);
  const [isTestingWebhook, setIsTestingWebhook] = useState(false);
  
  const webhookEndpoints = [
    {
      name: 'Order Status Updates',
      url: '/api/webhooks/order-status',
      method: 'POST',
      description: 'Triggered when order status changes',
      active: true
    },
    {
      name: 'SMS Delivery Status',
      url: '/api/webhooks/sms-status',
      method: 'POST', 
      description: 'Receives SMS delivery confirmations',
      active: true
    },
    {
      name: 'Email Delivery Status',
      url: '/api/webhooks/email-status',
      method: 'POST',
      description: 'Receives email delivery confirmations', 
      active: false
    }
  ];

  const generateWebhookPayload = (notification: Notification, endpoint: string) => {
    const basePayload = {
      timestamp: notification.timestamp.toISOString(),
      data: {
        order_id: notification.orderId,
        status: notification.status,
        notification: {
          id: notification.id,
          type: notification.type,
          message: notification.message,
          sent_at: notification.timestamp.toISOString()
        }
      }
    };

    switch (endpoint) {
      case '/api/webhooks/sms-status':
        return {
          event: 'sms.delivery.updated',
          ...basePayload,
          data: {
            ...basePayload.data,
            sms_status: 'delivered',
            provider: 'twilio',
            message_sid: `SM${Math.random().toString(36).substr(2, 32)}`
          }
        };
      case '/api/webhooks/email-status':
        return {
          event: 'email.delivery.updated',
          ...basePayload,
          data: {
            ...basePayload.data,
            email_status: 'delivered',
            provider: 'sendgrid',
            message_id: `${Math.random().toString(36).substr(2, 32)}.mail`
          }
        };
      default:
        return {
          event: 'order.status.updated',
          ...basePayload
        };
    }
  };

  const copyEndpointToWebhookUrl = (endpointUrl: string) => {
    const fullUrl = `https://your-app.com${endpointUrl}`;
    setWebhookUrl(fullUrl);
    setActiveEndpoint(endpointUrl);
    navigator.clipboard.writeText(fullUrl);
    toast({
      title: "Endpoint copied",
      description: "Endpoint URL copied to webhook URL field"
    });
  };

  const testWebhook = async () => {
    setIsTestingWebhook(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a mock notification for testing
    const mockNotification: Notification = {
      id: `TEST-${Date.now()}`,
      orderId: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      type: activeEndpoint.includes('sms') ? 'sms' : 'email',
      status: 'delivered',
      message: `Test webhook call from ${activeEndpoint}`,
      timestamp: new Date()
    };

    const payload = generateWebhookPayload(mockNotification, activeEndpoint);
    const success = Math.random() > 0.2; // 80% success rate for tests
    
    const webhookCall = {
      ...mockNotification,
      payload,
      success,
      endpoint: activeEndpoint,
      isTest: true
    };

    setWebhookHistory(prev => [webhookCall, ...prev.slice(0, 9)]);
    setIsTestingWebhook(false);
    
    toast({
      title: success ? "Webhook test successful" : "Webhook test failed",
      description: success ? "Test payload sent successfully" : "Test failed - check endpoint configuration",
      variant: success ? "default" : "destructive"
    });
  };

  // Update webhook history when notifications change
  useEffect(() => {
    const newWebhooks = notifications
      .slice(-5)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .map(notification => ({
        ...notification,
        payload: generateWebhookPayload(notification, '/api/webhooks/order-status'),
        success: Math.random() > 0.1,
        endpoint: '/api/webhooks/order-status',
        isTest: false
      }));
    
    setWebhookHistory(prev => {
      const combined = [...newWebhooks, ...prev.filter(w => w.isTest)];
      return combined.slice(0, 10);
    });
  }, [notifications]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Webhook payload copied successfully"
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Webhook Configuration */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-primary text-white">
              <Webhook className="h-5 w-5" />
            </div>
            Webhook Endpoints
          </CardTitle>
          <CardDescription>
            Configure webhook URLs to receive real-time order status updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Primary Webhook URL</Label>
            <div className="flex gap-2">
              <Input
                id="webhookUrl"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-app.com/webhooks/order-status"
              />
              <Button 
                variant="outline" 
                size="sm"
                onClick={testWebhook}
                disabled={isTestingWebhook}
                className="gap-1"
              >
                {isTestingWebhook ? (
                  <>
                    <Zap className="h-3 w-3 animate-spin" />
                    Testing...
                  </>
                ) : (
                  'Test'
                )}
              </Button>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Available Endpoints
            </h4>
            {webhookEndpoints.map((endpoint, index) => (
              <Card key={index} className="p-4 bg-muted/30">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        {endpoint.url}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyEndpointToWebhookUrl(endpoint.url)}
                        className="gap-1 h-7 px-2"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <h5 className="font-medium">{endpoint.name}</h5>
                    <p className="text-sm text-muted-foreground">
                      {endpoint.description}
                    </p>
                  </div>
                  <Badge 
                    variant={endpoint.active ? "default" : "outline"}
                    className={endpoint.active ? "bg-success" : ""}
                  >
                    {endpoint.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Webhook Calls */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-success text-white">
              <Code className="h-5 w-5" />
            </div>
            Recent Webhook Calls
          </CardTitle>
          <CardDescription>
            Live webhook payloads triggered by order status changes
          </CardDescription>
        </CardHeader>
        <CardContent>
          {webhookHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Code className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No webhook calls yet</p>
              <p className="text-sm">Update an order status to see webhooks fire</p>
            </div>
          ) : (
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {webhookHistory.map((webhook, index) => (
                  <Card key={webhook.id} className="p-4 bg-gradient-card">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-full ${
                          webhook.success 
                            ? "bg-success text-success-foreground" 
                            : "bg-destructive text-destructive-foreground"
                        }`}>
                          {webhook.success ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          POST {webhook.endpoint}
                        </Badge>
                        {webhook.isTest && (
                          <Badge variant="secondary" className="text-xs">
                            TEST
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {webhook.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(JSON.stringify(webhook.payload, null, 2))}
                        className="gap-1"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                    </div>

                    <div className="bg-black/5 rounded-lg p-3 border">
                      <pre className="text-xs overflow-x-auto text-foreground/80">
                        {JSON.stringify(webhook.payload, null, 2)}
                      </pre>
                    </div>

                    <div className="mt-2 text-xs text-muted-foreground">
                      Response: {webhook.success ? '200 OK' : '500 Internal Server Error'} • 
                      {Math.round(Math.random() * 100 + 50)}ms
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}