import { Star, MapPin, Calendar, Plus, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Instructors = () => {
  const instructors = [
    {
      id: 1,
      name: "Lisa Martinez",
      email: "lisa@dubaifit.com",
      phone: "+971 50 123 4567",
      specialties: ["Vinyasa", "Power Yoga", "Meditation"],
      experience: "8 years",
      rating: 4.9,
      totalClasses: 1240,
      monthlyClasses: 32,
      availability: "Mon-Fri, 6AM-8PM",
      bio: "Certified yoga instructor with expertise in traditional Hatha and modern Vinyasa flows.",
      status: "Active"
    },
    {
      id: 2,
      name: "David Kumar",
      email: "david@dubaifit.com",
      phone: "+971 50 234 5678",
      specialties: ["Meditation", "Breathwork", "Yin Yoga"],
      experience: "12 years",
      rating: 4.8,
      totalClasses: 890,
      monthlyClasses: 24,
      availability: "Tue-Sun, 10AM-6PM",
      bio: "Mindfulness expert specializing in meditation and therapeutic yoga practices.",
      status: "Active"
    },
    {
      id: 3,
      name: "Sarah Thompson",
      email: "sarah@dubaifit.com",
      phone: "+971 50 345 6789",
      specialties: ["Hot Yoga", "Bikram", "Advanced Poses"],
      experience: "6 years",
      rating: 4.7,
      totalClasses: 654,
      monthlyClasses: 28,
      availability: "Mon-Sat, 5PM-9PM",
      bio: "Hot yoga specialist with advanced training in Bikram and heated flow practices.",
      status: "Active"
    },
    {
      id: 4,
      name: "Maya Patel",
      email: "maya@dubaifit.com",
      phone: "+971 50 456 7890",
      specialties: ["Restorative", "Prenatal", "Gentle Flow"],
      experience: "10 years",
      rating: 5.0,
      totalClasses: 1100,
      monthlyClasses: 20,
      availability: "Wed-Sun, 8AM-4PM",
      bio: "Gentle yoga expert focusing on restorative practices and prenatal care.",
      status: "On Leave"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "default";
      case "On Leave": return "secondary";
      case "Inactive": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Management</h1>
          <p className="text-muted-foreground">Manage your yoga instructors and their schedules</p>
        </div>
        <Button className="bg-gradient-wellness text-white shadow-wellness hover:shadow-elegant transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Add New Instructor
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {instructors.map((instructor) => (
          <Card key={instructor.id} className="shadow-card hover:shadow-wellness transition-all duration-300">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-gradient-wellness text-white text-lg">
                    {instructor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground">{instructor.name}</h3>
                    <Badge variant={getStatusColor(instructor.status)}>
                      {instructor.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-sm">{instructor.rating}</span>
                    </div>
                    <span className="text-muted-foreground text-sm">
                      • {instructor.experience} experience
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {instructor.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  {instructor.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {instructor.availability}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {instructor.specialties.map((specialty) => (
                    <Badge key={specialty} variant="outline">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{instructor.totalClasses}</div>
                  <div className="text-xs text-muted-foreground">Total Classes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{instructor.monthlyClasses}</div>
                  <div className="text-xs text-muted-foreground">This Month</div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Schedule
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Instructors;