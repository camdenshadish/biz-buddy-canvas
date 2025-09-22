import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Shield, Bot, Save } from "lucide-react";
import { getLindyConfig, saveLindyConfig, type LindyConfig } from "@/lib/lindy-api";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [lindyConfig, setLindyConfig] = useState<LindyConfig>({
    agentId: '',
    webhookUrl: '',
    apiKey: ''
  });

  useEffect(() => {
    const config = getLindyConfig();
    if (config) {
      setLindyConfig(config);
    }
  }, []);

  const handleSaveLindyConfig = () => {
    if (!lindyConfig.agentId || !lindyConfig.webhookUrl) {
      toast({
        title: "Validation Error",
        description: "Please provide both Agent ID and Webhook URL",
        variant: "destructive",
      });
      return;
    }

    saveLindyConfig(lindyConfig);
    toast({
      title: "Configuration Saved",
      description: "Lindy agent configuration has been saved successfully",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <SettingsIcon className="h-6 w-6" />
          Settings
        </h1>
        <p className="text-muted-foreground">Configure your AI agent and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Lindy AI Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Lindy AI Agent Configuration
            </CardTitle>
            <CardDescription>
              Connect your Lindy AI agent to enable real conversations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="agent-id">Lindy Agent ID</Label>
              <Input 
                id="agent-id" 
                placeholder="Enter your Lindy agent ID" 
                value={lindyConfig.agentId}
                onChange={(e) => setLindyConfig(prev => ({ ...prev, agentId: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input 
                id="webhook-url" 
                placeholder="https://your-lindy-webhook-url.com" 
                value={lindyConfig.webhookUrl}
                onChange={(e) => setLindyConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="api-key">API Key (Optional)</Label>
              <Input 
                id="api-key" 
                type="password"
                placeholder="Enter API key if required" 
                value={lindyConfig.apiKey}
                onChange={(e) => setLindyConfig(prev => ({ ...prev, apiKey: e.target.value }))}
              />
            </div>
            <Button onClick={handleSaveLindyConfig} className="bg-gradient-primary hover:opacity-90">
              <Save className="mr-2 h-4 w-4" />
              Save Lindy Configuration
            </Button>
            <div className="text-sm text-muted-foreground">
              <p>To get your Lindy webhook URL:</p>
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Go to your Lindy dashboard</li>
                <li>Create or select your agent</li>
                <li>Add a webhook trigger</li>
                <li>Copy the webhook URL and paste it above</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email alerts for important events
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Get weekly analytics summaries
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Privacy
            </CardTitle>
            <CardDescription>
              Manage your security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Data Encryption</Label>
                <p className="text-sm text-muted-foreground">
                  Encrypt all conversation data
                </p>
              </div>
              <Switch defaultChecked disabled />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Store Conversation History</Label>
                <p className="text-sm text-muted-foreground">
                  Keep chat history for analytics
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-gradient-primary hover:opacity-90">Save All Changes</Button>
      </div>
    </div>
  );
};

export default Settings;