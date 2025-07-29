import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

interface ShopItem {
  _id?: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export default function AdminShop() {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<ShopItem>({
    name: "",
    price: 0,
    category: "",
    description: "",
    image: ""
  });

  const { toast } = useToast();

  // ✅ Fetch store items from backend on mount
  useEffect(() => {
    fetch("/api/store/items")
      .then(res => res.json())
      .then(data => setItems(data.items || []))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load store items",
          variant: "destructive"
        })
      );
  }, []);

  // ✅ Add item to backend
  const handleAddItem = async () => {
    if (!newItem.name.trim() || !newItem.category.trim()) {
      return toast({
        title: "Error",
        description: "Please enter item name and category",
        variant: "destructive",
      });
    }

    try {
      const res = await fetch("/api/store/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify(newItem),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add item");

      setItems((prev) => [...prev, data.item]);
      setNewItem({ name: "", price: 0, category: "", description: "", image: "" });
      setIsDialogOpen(false);
      toast({ title: "Success", description: "Item added to store" });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store Items</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Name</Label>
                <Input
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
              </div>
              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label>Category</Label>
                <Input
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
              </div>
              <div>
                <Label>Image URL</Label>
                <Input
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                />
              </div>
              <Button onClick={handleAddItem} className="w-full">Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item._id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.category}</p>
            </CardHeader>
            <CardContent>
              <img
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <p className="font-semibold">₹{item.price}</p>
              <p className="text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}