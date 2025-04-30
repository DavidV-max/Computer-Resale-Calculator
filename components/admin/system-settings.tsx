"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, RefreshCw } from "lucide-react"

export default function SystemSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure application settings and parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="calculation">Calculation</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="site-name">Site Name</Label>
                <Input id="site-name" defaultValue="Computer Resale Calculator" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="site-description">Site Description</Label>
                <Input id="site-description" defaultValue="Get accurate market valuations for all your IT equipment" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input id="contact-email" type="email" defaultValue="support@example.com" />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-analytics" defaultChecked />
                <Label htmlFor="enable-analytics">Enable Analytics</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculation" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="depreciation-rate">Default Depreciation Rate</Label>
                <div className="flex items-center space-x-4">
                  <Slider id="depreciation-rate" defaultValue={[20]} max={50} step={1} className="flex-1" />
                  <span className="w-12 text-center">20%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-age">Maximum Device Age (years)</Label>
                <Select defaultValue="10">
                  <SelectTrigger id="max-age">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 years</SelectItem>
                    <SelectItem value="7">7 years</SelectItem>
                    <SelectItem value="10">10 years</SelectItem>
                    <SelectItem value="15">15 years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="cad">CAD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="enable-market-adjustment" defaultChecked />
                <Label htmlFor="enable-market-adjustment">Enable Market Trend Adjustment</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input id="primary-color" type="color" defaultValue="#4f46e5" className="w-16 h-10" />
                  <Input defaultValue="#4f46e5" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex items-center space-x-2">
                  <Input id="secondary-color" type="color" defaultValue="#8b5cf6" className="w-16 h-10" />
                  <Input defaultValue="#8b5cf6" className="flex-1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select defaultValue="inter">
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" />
                <Label htmlFor="dark-mode">Enable Dark Mode</Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="backup" className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>Database Backup</Label>
                <div className="flex items-center space-x-2">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Download Backup</Button>
                  <p className="text-sm text-slate-500">Last backup: 2 days ago</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Restore from Backup</Label>
                <div className="flex items-center space-x-2">
                  <Input type="file" />
                  <Button variant="outline">Upload</Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="auto-backup">Automatic Backup Schedule</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="auto-backup">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" /> Reset
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Save className="h-4 w-4 mr-2" /> Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
