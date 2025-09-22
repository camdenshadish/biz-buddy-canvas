import { 
  MessageCircle, 
  Users, 
  Clock, 
  TrendingUp, 
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts";

const dailyData = [
  { date: "Mon", conversations: 12, responseTime: 2.3 },
  { date: "Tue", conversations: 19, responseTime: 1.8 },
  { date: "Wed", conversations: 15, responseTime: 2.1 },
  { date: "Thu", conversations: 25, responseTime: 1.9 },
  { date: "Fri", conversations: 22, responseTime: 2.0 },
  { date: "Sat", conversations: 8, responseTime: 2.5 },
  { date: "Sun", conversations: 5, responseTime: 3.1 },
];

const topicsData = [
  { name: "Product Support", value: 35, color: "hsl(var(--primary))" },
  { name: "Sales Inquiry", value: 28, color: "hsl(var(--success))" },
  { name: "Technical Issues", value: 20, color: "hsl(var(--warning))" },
  { name: "General Questions", value: 17, color: "hsl(var(--accent))" },
];

const metrics = [
  {
    title: "Total Conversations",
    value: "1,248",
    change: "+12.5%",
    changeType: "positive" as const,
    icon: MessageCircle,
  },
  {
    title: "Active Users",
    value: "856",
    change: "+8.2%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "Avg Response Time",
    value: "2.1s",
    change: "-0.3s",
    changeType: "positive" as const,
    icon: Clock,
  },
  {
    title: "Resolution Rate",
    value: "94.2%",
    change: "+2.1%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
];

export function AnalyticsDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Monitor your AI agent's performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <Badge 
                variant={metric.changeType === "positive" ? "default" : "destructive"}
                className="mt-1 text-xs"
              >
                {metric.change}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Conversations Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Daily Conversations
            </CardTitle>
            <CardDescription>
              Conversation volume over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="conversations" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Response Time Trends
            </CardTitle>
            <CardDescription>
              Average response time in seconds
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="responseTime" 
                  fill="hsl(var(--success))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Topics Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Conversation Topics
          </CardTitle>
          <CardDescription>
            Most common conversation topics this week
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Tooltip />
                <RechartsPieChart data={topicsData} cx="50%" cy="50%" outerRadius={80}>
                  {topicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </RechartsPieChart>
              </RechartsPieChart>
            </ResponsiveContainer>
            
            <div className="space-y-3">
              {topicsData.map((topic) => (
                <div key={topic.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: topic.color }}
                    />
                    <span className="text-sm font-medium">{topic.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{topic.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}