import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Package, ShoppingCart } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Yoga Studio Admin Panel
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Manage your yoga studio with ease
          </p>
          
          <Button 
            onClick={() => navigate('/login')}
            className="bg-gradient-wellness text-white shadow-wellness hover:shadow-elegant transition-all duration-300 text-lg px-8 py-3"
          >
            <Shield className="h-5 w-5 mr-2" />
            Admin Login
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
          <Card className="shadow-card hover:shadow-wellness transition-all duration-300">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Instructor Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Add, edit, and manage your yoga instructors with ratings and profiles.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-wellness transition-all duration-300">
            <CardHeader className="text-center">
              <Package className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Shop Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Manage your yoga products, pricing, and inventory with ease.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-wellness transition-all duration-300">
            <CardHeader className="text-center">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center">
                Track and manage customer orders with status filtering.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
