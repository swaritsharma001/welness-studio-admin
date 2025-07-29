import { FileText, Image, MessageSquare, Edit3, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Content = () => {
  const heroContent = {
    title: "Transform Your Mind & Body",
    subtitle: "Join Dubai's premier wellness community for yoga, meditation, and holistic health",
    ctaText: "Start Your Journey",
    backgroundImage: "Serene yoga studio with natural lighting"
  };

  const testimonials = [
    {
      id: 1,
      name: "Sarah Al-Mansouri",
      text: "Dubai Fit Movement transformed my approach to wellness. The instructors are incredible!",
      rating: 5,
      image: "👩‍💼",
      status: "Published"
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      text: "Best yoga studio in Dubai. The hot yoga classes are exactly what I needed.",
      rating: 5,
      image: "👨‍💻",
      status: "Published"
    },
    {
      id: 3,
      name: "Maria Santos",
      text: "The meditation sessions helped me find peace in busy Dubai life.",
      rating: 5,
      image: "👩‍🎨",
      status: "Draft"
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "5 Benefits of Hot Yoga in Dubai's Climate",
      excerpt: "Discover how hot yoga can help you adapt to Dubai's desert environment...",
      author: "Lisa Martinez",
      date: "2024-01-15",
      status: "Published",
      views: 1240
    },
    {
      id: 2,
      title: "Meditation Techniques for Busy Professionals",
      excerpt: "Simple mindfulness practices you can do anywhere in the city...",
      author: "David Kumar",
      date: "2024-01-12",
      status: "Published",
      views: 890
    },
    {
      id: 3,
      title: "Yoga Props: Essential Equipment Guide",
      excerpt: "Everything you need to enhance your yoga practice at home...",
      author: "Sarah Thompson",
      date: "2024-01-10",
      status: "Draft",
      views: 0
    }
  ];

  const studioInfo = {
    name: "Dubai Fit Movement",
    description: "Premier yoga and wellness studio in the heart of Dubai",
    address: "Sheikh Zayed Road, Dubai Marina",
    phone: "+971 4 123 4567",
    email: "hello@dubaifitmovement.com",
    hours: "Daily 6:00 AM - 10:00 PM",
    amenities: ["Hot Yoga Studio", "Meditation Room", "Changing Rooms", "Retail Shop", "Parking"]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "default";
      case "Draft": return "secondary";
      case "Pending": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Content Management</h1>
          <p className="text-muted-foreground">Manage your website content and marketing materials</p>
        </div>
        <Button className="bg-gradient-wellness text-white shadow-wellness hover:shadow-elegant transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="studio">Studio Info</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5 text-primary" />
                Homepage Hero Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <label className="text-sm font-medium">Main Title</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="text-lg font-semibold">{heroContent.title}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Subtitle</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">{heroContent.subtitle}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">CTA Button Text</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="font-medium">{heroContent.ctaText}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Background Image</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">{heroContent.backgroundImage}</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Hero Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                Customer Testimonials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl">{testimonial.image}</div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{testimonial.name}</h3>
                          <Badge variant={getStatusColor(testimonial.status)}>
                            {testimonial.status}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-2">
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-yellow-500">
                            {'★'.repeat(testimonial.rating)}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              {testimonial.status === 'Published' ? 'Unpublish' : 'Publish'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Blog Posts & Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{post.title}</h3>
                          <Badge variant={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>By {post.author}</span>
                          <span>{post.date}</span>
                          {post.status === 'Published' && (
                            <span>{post.views} views</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          {post.status === 'Published' ? 'Unpublish' : 'Publish'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="studio" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Studio Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Studio Name</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="font-semibold">{studioInfo.name}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p>{studioInfo.phone}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p>{studioInfo.email}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Operating Hours</label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p>{studioInfo.hours}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Description</label>
                <div className="mt-1 p-3 bg-muted rounded-lg">
                  <p className="text-muted-foreground">{studioInfo.description}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Address</label>
                <div className="mt-1 p-3 bg-muted rounded-lg">
                  <p>{studioInfo.address}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Amenities</label>
                <div className="mt-1 p-3 bg-muted rounded-lg">
                  <div className="flex flex-wrap gap-2">
                    {studioInfo.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button className="w-full">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Studio Information
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Content;