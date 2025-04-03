
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import UserManagement from '@/components/admin/UserManagement';
import BlogEditor from '@/components/admin/BlogEditor';
import AdvertisementManager from '@/components/admin/AdvertisementManager';
import StudyMaterialEditor from '@/components/admin/StudyMaterialEditor';

const AdminPanel = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="studyMaterials" className="space-y-4">
        <TabsList className="grid grid-cols-4 gap-4">
          <TabsTrigger value="studyMaterials">Study Materials</TabsTrigger>
          <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
          <TabsTrigger value="ads">Advertisements</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="studyMaterials">
          <Card>
            <CardContent className="p-6">
              <StudyMaterialEditor />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="blogs">
          <Card>
            <CardContent className="p-6">
              <BlogEditor />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ads">
          <Card>
            <CardContent className="p-6">
              <AdvertisementManager />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardContent className="p-6">
              <UserManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
