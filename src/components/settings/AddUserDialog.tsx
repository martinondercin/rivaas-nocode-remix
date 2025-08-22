import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AddUserDialog = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [activeUser, setActiveUser] = useState(true);

  const handleSaveUser = () => {
    if (!name || !email || !role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "User added",
      description: `${name} has been added as ${role}.`,
    });

    // Reset form
    setName("");
    setEmail("");
    setRole("");
    setActiveUser(true);
  };

  const handleSaveAndAddAnother = () => {
    handleSaveUser();
    // Keep dialog open for adding another user
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setRole("");
    setActiveUser(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-verify-green text-white hover:bg-verify-green/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-lg font-semibold">Add New User</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="h-6 w-6 rounded-sm"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="company-email" className="text-sm font-medium">
              Company Email
            </Label>
            <Input
              id="company-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Company Email"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="role" className="text-sm font-medium">
              Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between py-2">
            <Label htmlFor="active-user" className="text-sm font-medium">
              Active User:
            </Label>
            <Switch
              id="active-user"
              checked={activeUser}
              onCheckedChange={setActiveUser}
            />
          </div>
        </div>

        <div className="flex justify-between pt-4 gap-3">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleSaveAndAddAnother}
            className="flex-1 bg-verify-green text-white hover:bg-verify-green/90"
          >
            Save & Add Another User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserDialog;
