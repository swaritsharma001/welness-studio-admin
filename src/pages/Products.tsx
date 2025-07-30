import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

import cookie from 'js-cookie';

const Products = () => {
  const token = cookie.get('token');
  const backend = import.meta.env.VITE_API_URL;

  const { toast } = useToast();

  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    category: '',
    image: '',
    description: '',
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${backend}/api/store/items`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setProducts(data.items || []);
      setFiltered(data.items || []);
    } catch (err: any) {
      toast({ title: 'Fail', description: err.message, variant: 'destructive' });
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch(`${backend}/api/store/allOrder`, {
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
      setOrders(data.orders || []);
    } catch (err: any) {
      toast({
        title: 'Order Fetch Failed',
        description: err.message,
        variant: 'destructive',
      });
    }
    setLoadingOrders(false);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filteredData = products.filter((p) =>
      p.name.toLowerCase().includes(term.toLowerCase())
    );
    setFiltered(filteredData);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: 0,
      category: '',
      image: '',
      description: '',
    });
    setEditId(null);
    setEditMode(false);
    setIsDialogOpen(false);
  };

  const handleAddOrUpdate = async () => {
    const url = editMode
      ? `${backend}/api/store/update/${editId}`
      : `${backend}/api/store/add`;
    const method = editMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const raw = await res.text();
        throw new Error('Unexpected response: ' + raw.slice(0, 100));
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to save item');
      toast({ title: editMode ? 'Updated' : 'Added successfully' });
      resetForm();
      fetchProducts();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleEdit = (p: any) => {
    setFormData(p);
    setEditMode(true);
    setEditId(p._id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;

    try {
      const res = await fetch(`${backend}/api/store/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token || ''}` },
      });

      const contentType = res.headers.get('content-type');
      const text = await res.text();
      if (!contentType?.includes('application/json')) {
        throw new Error('Received non-JSON: ' + text.slice(0, 100));
      }

      const data = JSON.parse(text);
      if (!res.ok) throw new Error(data.message);
      toast({ title: 'Deleted' });
      fetchProducts();
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`${backend}/api/store/updateOrderStatus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token || ''}`,
        },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast({ title: 'Order status updated' });
      fetchOrders();
    } catch (err: any) {
      toast({ title: 'Status Update Failed', description: err.message });
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage Products & Orders</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-white">
              <Plus className="w-4 h-4 mr-2" />
              {editMode ? 'Edit Product' : 'Add Product'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editMode ? 'Edit' : 'Add'} Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {['name', 'price', 'category', 'description', 'image'].map((field) => (
                <div key={field}>
                  <Label>{field.toUpperCase()}</Label>
                  <Input
                    type={field === 'price' ? 'number' : 'text'}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: field === 'price' ? +e.target.value : e.target.value })
                    }
                  />
                </div>
              ))}
              {formData.image && formData.image.startsWith('http') && (
                <img src={formData.image} alt="Preview" className="w-20 h-20 object-contain rounded border" />
              )}
              <Button className="w-full" onClick={handleAddOrUpdate}>
                {editMode ? 'Update' : 'Add'} Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 🔍 Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute h-4 w-4 left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search products..." value={searchTerm} onChange={(e) => handleSearch(e.target.value)} className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* 🛒 Product List */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <Card key={p._id}>
            <CardContent className="p-4 flex gap-4 items-start">
              <div className="w-16 h-16 flex-shrink-0 bg-muted rounded flex items-center justify-center">
                {p.image?.startsWith('http') ? (
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain rounded" />
                ) : (
                  <span className="text-3xl">{p.image || '📦'}</span>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-muted-foreground">{p.category}</p>
                <p className="text-primary font-bold">AED {p.price}</p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(p)}>
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(p._id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 📦 Orders */}
      <div>
        <h2 className="text-2xl font-semibold">All Orders</h2>
        {loadingOrders ? (
          <p>Loading...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="grid gap-4 mt-4">
            {orders.map((order) => (
              <Card key={order._id}>
                <CardHeader>
                  <CardTitle>Order #{order._id.slice(-5)}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>User:</strong> {order.userId?.name} ({order.userId?.email})</p>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Address:</strong> {order.address?.[0]
                    ? `${order.address[0].street}, ${order.address[0].city}, ${order.address[0].state} - ${order.address[0].pincode}`
                    : 'N/A'}
                  </p>
                  <p><strong>Phone:</strong> {order.address?.[0]?.phone || 'N/A'}</p>
                  <ul className="text-sm text-muted-foreground list-disc ml-6">
                    {order.products.map((item: any, i: number) => (
                      <li key={i}>
                        {item.productId?.name || 'N/A'} × {item.quantity} (AED {item.productId?.price || '?'})
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 w-48">
                    <Select value={order.status} onValueChange={(val) => updateOrderStatus(order._id, val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
