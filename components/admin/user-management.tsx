"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  UserPlus,
  Search,
  Filter,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCog,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserManagement() {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [selectedRole, setSelectedRole] = useState("all")

  // Mock user data
  const users = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Administrator",
      status: "active",
      lastLogin: "Just now",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 123-4567",
      createdAt: "2023-01-15",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "Manager",
      status: "active",
      lastLogin: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 234-5678",
      createdAt: "2023-02-20",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      status: "inactive",
      lastLogin: "3 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 345-6789",
      createdAt: "2023-03-10",
    },
    {
      id: 4,
      name: "Robert Johnson",
      email: "robert@example.com",
      role: "Viewer",
      status: "active",
      lastLogin: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 456-7890",
      createdAt: "2023-03-15",
    },
    {
      id: 5,
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Manager",
      status: "active",
      lastLogin: "5 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 567-8901",
      createdAt: "2023-03-22",
    },
    {
      id: 6,
      name: "Michael Wilson",
      email: "michael@example.com",
      role: "Editor",
      status: "pending",
      lastLogin: "Never",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 678-9012",
      createdAt: "2023-04-05",
    },
    {
      id: 7,
      name: "Sarah Brown",
      email: "sarah@example.com",
      role: "Viewer",
      status: "active",
      lastLogin: "12 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 789-0123",
      createdAt: "2023-04-10",
    },
    {
      id: 8,
      name: "David Miller",
      email: "david@example.com",
      role: "Viewer",
      status: "blocked",
      lastLogin: "2 weeks ago",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 890-1234",
      createdAt: "2023-04-15",
    },
  ]

  // Filter users based on active tab and selected role
  const filteredUsers = users.filter((user) => {
    const statusMatch = activeTab === "all" || user.status === activeTab
    const roleMatch = selectedRole === "all" || user.role.toLowerCase() === selectedRole
    return statusMatch && roleMatch
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500">
            <UserCheck className="h-3 w-3 mr-1" /> Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="bg-yellow-500">
            <EyeOff className="h-3 w-3 mr-1" /> Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-blue-500">
            <Eye className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "blocked":
        return (
          <Badge className="bg-red-500">
            <UserX className="h-3 w-3 mr-1" /> Blocked
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <UserPlus className="h-4 w-4 mr-2" /> Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Enter the details for the new user. Click save when you're done.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="administrator">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sendInvite" defaultChecked />
                  <Label htmlFor="sendInvite">Send welcome email with password setup instructions</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsAddUserOpen(false)}>
                  Add User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-slate-400" />
              <Input placeholder="Search users..." className="w-64" />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="administrator">Administrator</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto flex items-center space-x-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-3.5 w-3.5" /> Export
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <UserCog className="h-4 w-4 mr-2" /> Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
