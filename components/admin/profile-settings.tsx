"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, User, Lock, Bell, Shield, Upload } from "lucide-react"

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <User className="h-4 w-4" /> General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Sessions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Admin" />
                <AvatarFallback className="text-xl">AD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <p className="text-sm text-slate-500 mb-2">Upload a new profile picture</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" /> Upload
                  </Button>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Admin" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="admin@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input id="jobTitle" defaultValue="System Administrator" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                    <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                    <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                    <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                    <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-slate-500">Use an authenticator app to generate one-time codes</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Authentication</p>
                  <p className="text-sm text-slate-500">Receive a code via SMS to verify your identity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Authentication</p>
                  <p className="text-sm text-slate-500">Receive a code via email to verify your identity</p>
                </div>
                <Switch />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Updates</p>
                  <p className="text-sm text-slate-500">Receive emails about system updates and maintenance</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Security Alerts</p>
                  <p className="text-sm text-slate-500">Receive emails about security incidents and alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">User Activity</p>
                  <p className="text-sm text-slate-500">Receive emails about new user registrations and activities</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Newsletter</p>
                  <p className="text-sm text-slate-500">Receive monthly newsletter and product updates</p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">In-App Notifications</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">System Alerts</p>
                  <p className="text-sm text-slate-500">Receive notifications about system status and alerts</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Users</p>
                  <p className="text-sm text-slate-500">Receive notifications when new users register</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Active Sessions</h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-sm text-slate-500">Windows 11 • Chrome • 192.168.1.105</p>
                    <p className="text-xs text-slate-400 mt-1">Started: April 29, 2023 at 14:32</p>
                  </div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Mobile Session</p>
                    <p className="text-sm text-slate-500">iOS 16 • Safari • 192.168.1.110</p>
                    <p className="text-xs text-slate-400 mt-1">Started: April 28, 2023 at 09:15</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
                <div className="flex items-start justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Tablet Session</p>
                    <p className="text-sm text-slate-500">iPadOS 16 • Safari • 192.168.1.115</p>
                    <p className="text-xs text-slate-400 mt-1">Started: April 27, 2023 at 16:42</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Revoke
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Revoke All Other Sessions
              </Button>
            </div>

            <div className="space-y-4 mt-6">
              <h3 className="text-lg font-medium">Session Settings</h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="sessionTimeout">Session Timeout</Label>
                  <Select defaultValue="60">
                    <SelectTrigger id="sessionTimeout">
                      <SelectValue placeholder="Select timeout" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="240">4 hours</SelectItem>
                      <SelectItem value="480">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="rememberSessions" defaultChecked />
                  <Label htmlFor="rememberSessions">Remember sessions for 30 days</Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t pt-6">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}
