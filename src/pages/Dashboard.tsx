import { Users, Calendar, DollarSign, TrendingUp, Clock, Star } from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import adminHero from "@/assets/admin-hero.jpg";

const Dashboard = () => {
  const recentActivity = [
    { id: 1, user: "Sarah Johnson", action: "Booked Vinyasa Flow", time: "2 minutes ago", type: "booking" },
    { id: 2, user: "Mike Chen", action: "Completed Meditation class", time: "15 minutes ago", type: "completed" },
    { id: 3, user: "Emma Davis", action: "Purchased yoga mat", time: "1 hour ago", type: "purchase" },
    { id: 4, user: "Alex Wilson", action: "Cancelled Hot Yoga session", time: "2 hours ago", type: "cancelled" },
  ];

  const upcomingClasses = [
    { id: 1, name: "Morning Vinyasa", instructor: "Lisa Martinez", time: "8:00 AM", spots: "12/15" },
    { id: 2, name: "Meditation & Mindfulness", instructor: "David Kumar", time: "10:30 AM", spots: "8/10" },
    { id: 3, name: "Hot Yoga", instructor: "Sarah Thompson", time: "6:00 PM", spots: "15/15", waitlist: 3 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div 
          className="h-48 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${adminHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/70"></div>
          <div className="relative z-10 flex h-full items-center justify-between px-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome back, Admin! 🧘‍♀️
              </h1>
              <p className="text-white/90 text-lg">
                Your wellness studio is thriving today
              </p>
            </div>
            <div className="text-right text-white">
              <div className="text-sm opacity-90">Today's Date</div>
              <div className="text-xl font-semibold">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Members"
          value="2,847"
          description="Active users this month"
          icon={Users}
          trend={{ value: 12, positive: true }}
        />
        <StatsCard
          title="Today's Classes"
          value="18"
          description="Scheduled sessions"
          icon={Calendar}
          trend={{ value: 5, positive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value="$24,680"
          description="From memberships & products"
          icon={DollarSign}
          trend={{ value: 8, positive: true }}
        />
        <StatsCard
          title="Avg. Class Rating"
          value="4.9"
          description="From 156 reviews this week"
          icon={Star}
          trend={{ value: 2, positive: true }}
        />
      </div>

      {/* Recent Activity & Upcoming Classes */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-gradient-wellness flex items-center justify-center text-white text-xs font-medium">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.user}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      activity.type === 'booking' ? 'default' :
                      activity.type === 'completed' ? 'secondary' :
                      activity.type === 'purchase' ? 'outline' : 'destructive'
                    }>
                      {activity.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Today's Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                  <div>
                    <h4 className="font-medium text-foreground">{classItem.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      with {classItem.instructor}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-primary">{classItem.time}</div>
                    <div className="text-xs text-muted-foreground">
                      {classItem.spots}
                      {classItem.waitlist && (
                        <span className="text-warning ml-1">
                          +{classItem.waitlist} waiting
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-4">
                View Full Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;