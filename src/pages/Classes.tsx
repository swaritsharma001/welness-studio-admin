import { useState } from "react";
import { Calendar, Clock, Users, Plus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Classes = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayClasses = [
    {
      id: 1,
      name: "Morning Vinyasa Flow",
      instructor: "Lisa Martinez",
      time: "8:00 AM - 9:30 AM",
      duration: "90 min",
      capacity: 15,
      booked: 12,
      waitlist: 0,
      room: "Studio A",
      level: "Intermediate",
      status: "Active"
    },
    {
      id: 2,
      name: "Meditation & Mindfulness",
      instructor: "David Kumar",
      time: "10:30 AM - 11:30 AM",
      duration: "60 min",
      capacity: 10,
      booked: 8,
      waitlist: 0,
      room: "Meditation Room",
      level: "All Levels",
      status: "Active"
    },
    {
      id: 3,
      name: "Hot Yoga Session",
      instructor: "Sarah Thompson",
      time: "6:00 PM - 7:30 PM",
      duration: "90 min",
      capacity: 15,
      booked: 15,
      waitlist: 3,
      room: "Hot Studio",
      level: "Advanced",
      status: "Full"
    },
    {
      id: 4,
      name: "Restorative Yoga",
      instructor: "Maya Patel",
      time: "7:45 PM - 8:45 PM",
      duration: "60 min",
      capacity: 12,
      booked: 6,
      waitlist: 0,
      room: "Studio B",
      level: "Beginner",
      status: "Active"
    }
  ];

  const upcomingClasses = [
    {
      id: 5,
      name: "Sunrise Yoga",
      instructor: "Lisa Martinez",
      date: "Tomorrow",
      time: "6:30 AM - 7:30 AM",
      capacity: 12,
      booked: 4,
      room: "Studio A"
    },
    {
      id: 6,
      name: "Power Yoga",
      instructor: "Mike Johnson",
      date: "Tomorrow",
      time: "7:00 PM - 8:30 PM",
      capacity: 18,
      booked: 11,
      room: "Main Studio"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "Full": return "destructive";
      case "Cancelled": return "secondary";
      default: return "outline";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "secondary";
      case "Intermediate": return "default";
      case "Advanced": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Classes & Bookings</h1>
          <p className="text-muted-foreground">Manage your class schedule and student bookings</p>
        </div>
        <Button className="bg-gradient-wellness text-white shadow-wellness hover:shadow-elegant transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Add New Class
        </Button>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today's Classes</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Today's Schedule - {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-foreground">
                            {classItem.name}
                          </h3>
                          <Badge variant={getStatusColor(classItem.status)}>
                            {classItem.status}
                          </Badge>
                          <Badge variant={getLevelColor(classItem.level)}>
                            {classItem.level}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {classItem.time} ({classItem.duration})
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {classItem.room}
                          </div>
                          <div>
                            Instructor: <span className="font-medium">{classItem.instructor}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="h-4 w-4" />
                            <span className="font-medium">
                              {classItem.booked}/{classItem.capacity}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {classItem.waitlist > 0 && (
                              <span className="text-warning">
                                +{classItem.waitlist} waiting
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Upcoming Classes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map((classItem) => (
                  <div
                    key={classItem.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div>
                      <h3 className="font-semibold text-foreground">{classItem.name}</h3>
                      <div className="text-sm text-muted-foreground">
                        {classItem.date} • {classItem.time} • {classItem.room}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        with {classItem.instructor}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-4 w-4" />
                        {classItem.booked}/{classItem.capacity}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {classItem.capacity - classItem.booked} spots left
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Calendar View</h3>
                <p className="text-muted-foreground">
                  Full calendar integration would be implemented here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Classes;