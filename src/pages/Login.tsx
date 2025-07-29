import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import axios from "axios";
import cookie from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const backend = import.meta.env.VITE_API_URL;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${backend}/api/users/admin/login`, {
        email: username,
        password,
      });

      // Save token in cookie
      cookie.set("token", res.data.token);

      toast({
        title: "Login successful",
        description: "Welcome to admin dashboard",
      });

      navigate('/admin/instructors');
    } catch (err: any) {
      
      toast({
        title: "Login failed",
        
        description: err.response?.data?.message || "Invalid",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md shadow-wellness">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">Admin Login</CardTitle>
          <p className="text-muted-foreground">Enter your credentials to access the admin panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-wellness text-white shadow-wellness hover:shadow-elegant transition-all duration-300"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login to Admin Panel'}
            </Button>
            <div className="text-xs text-muted-foreground text-center">
              Wellness studio admin panel
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;