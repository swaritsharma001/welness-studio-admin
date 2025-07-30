import { useState, useEffect } from 'react';
import { Plus, Trash2, Star, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api/yoga',
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AdminInstructors = () => {
  const { toast } = useToast();

  const [instructors, setInstructors] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newInstructor, setNewInstructor] = useState({
    name: '',
    image: '',
    rating: 5,
    price: '',
    description: '',
  });

  const [bookings, setBookings] = useState([]);

  const fetchInstructors = async () => {
    try {
      const res = await api.get('/instructor');
      setInstructors(res.data);
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch instructors', variant: 'destructive' });
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await api.get('/allBookedInstrector');
      const valid = res.data.filter(b => b.userId && b.instructorId);
      setBookings(valid);
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch bookings', variant: 'destructive' });
    }
  };

  useEffect(() => {
    fetchInstructors();
    fetchBookings();
  }, []);

  const handleAddInstructor = async () => {
    const { name, image, rating, price, description } = newInstructor;
    if (!name || !image || !rating || !price || !description) {
      toast({ title: 'Error', description: 'All fields required', variant: 'destructive' });
      return;
    }

    try {
      await api.post('/instructor/add', { name, image, rating, price, description });
      setIsDialogOpen(false);
      setNewInstructor({ name: '', image: '', rating: 5, price: '', description: '' });
      fetchInstructors();
      toast({ title: 'Success', description: 'Instructor added successfully' });
    } catch {
      toast({ title: 'Error', description: 'Failed to add instructor', variant: 'destructive' });
    }
  };

  const handleRemoveInstructor = async (id) => {
    try {
      await api.delete(`/instructor/${id}`);
      fetchInstructors();
      toast({ title: 'Success', description: 'Instructor removed successfully' });
    } catch {
      toast({ title: 'Error', description: 'Failed to delete instructor', variant: 'destructive' });
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.post('/updateStatusIns', { id, status });
      fetchBookings();
      toast({ title: 'Updated', description: `Status updated to ${status}` });
    } catch {
      toast({ title: 'Error', description: 'Status update failed', variant: 'destructive' });
    }
  };

  return (
    <div className="space-y-10 p-4 sm:p-6 lg:p-10">
      {/* Instructor Management */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Instructor Management</h1>
          <p className="text-muted-foreground">Add and manage yoga instructors</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-wellness text-white shadow-wellness">
              <Plus className="h-4 w-4 mr-2" />
              Add Instructor
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Instructor</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" value={newInstructor.name} onChange={(e) => setNewInstructor({ ...newInstructor, name: e.target.value })} /></div>
              <div><Label htmlFor="image">Image URL</Label><Input id="image" value={newInstructor.image} onChange={(e) => setNewInstructor({ ...newInstructor, image: e.target.value })} /></div>
              <div><Label htmlFor="description">Description</Label><Input id="description" value={newInstructor.description} onChange={(e) => setNewInstructor({ ...newInstructor, description: e.target.value })} /></div>
              <div><Label htmlFor="price">Price</Label><Input id="price" type="number" value={newInstructor.price} onChange={(e) => setNewInstructor({ ...newInstructor, price: e.target.value })} /></div>
              <div><Label htmlFor="rating">Rating</Label><Input id="rating" type="number" step="0.1" value={newInstructor.rating} onChange={(e) => setNewInstructor({ ...newInstructor, rating: parseFloat(e.target.value) })} /></div>
              <Button onClick={handleAddInstructor} className="w-full">Add Instructor</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <Card key={instructor._id}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={instructor.image} />
                  <AvatarFallback>{instructor.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{instructor.name}</h3>
                  <div className="text-sm text-muted-foreground">AED {instructor.price}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium text-sm">{instructor.rating}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleRemoveInstructor(instructor._id)} className="flex-1">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Booked Sessions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Booked Sessions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookings.map((b) => (
            <Card key={b._id}>
              <CardContent className="p-4 space-y-2">
                <div className="text-lg font-semibold">{b.userId.name}</div>
                <div className="text-sm text-muted-foreground">Instructor: {b.instructorId.name}</div>
                <div className="text-sm">Date: {new Date(b.date).toLocaleDateString()}</div>
                <div className="text-sm">Time: {b.time}</div>
                <div className="text-sm">Mobile: {b.mobile}</div>
                <div className="text-sm">Status: <span className="font-medium">{b.status}</span></div>
                <div className="flex gap-2 mt-2">
                  {["pending", "confirmed", "cancelled"].map((s) => (
                    <Button key={s} size="sm" variant={s === b.status ? "default" : "outline"} onClick={() => updateStatus(b._id, s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminInstructors;