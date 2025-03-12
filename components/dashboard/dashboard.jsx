'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Organizations from '@/components/dashboard/organizations/organizations';
import Repositories from './repositories/repositories';
import Users from './users/users';
import RefreshTime from '@/components/Branch/RefreshTime';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState('organizations');
  const [resetRefresh, setResetRefresh] = useState(false)
  const orgRef = useRef(null);
  const repoRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    const urlTab = searchParams.get('tab');
    if (urlTab) {
      setActiveTab(urlTab);
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
   
    setActiveTab(tab);
    localStorage.setItem('activeTab', tab);
   if (tab) {
      router.push(`?tab=${tab}`);
    } else {
      router.push(``);
    }
  };

  const handleRefresh = () => {    
    setResetRefresh(false)
    if (activeTab === 'organizations') {
      orgRef.current?.handleRefresh();
    } else if (activeTab === 'repositories') {
      repoRef.current?.handleRefresh();
    } else if (activeTab === 'users') {
      userRef.current?.handleRefresh();
    }
  };
const handleResetRefresh = () => {
  setResetRefresh(true)
}
  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between pt-12">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex w-full justify-end lg:w-1/2">
          <RefreshTime disabled={false} onRefresh={handleRefresh} resetRefresh={resetRefresh} setResetRefresh={setResetRefresh} />
        </div>
      </div>
      <div className="pt-0">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger
              className="w-auto px-4"
              value="organizations"
              onClick={() => handleTabChange('organizations')}
            >
              Organization
            </TabsTrigger>
            <TabsTrigger
              className="w-auto px-4"
              value="repositories"
              onClick={() => handleTabChange('repositories')}
            >
              Repositories
            </TabsTrigger>
            <TabsTrigger
              className="w-auto px-4"
              value="users"
              onClick={() => handleTabChange('users')}
            >
              Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="organizations" className="min-h-[80vh]">
            <Organizations ref={orgRef} onDropDownChange={handleResetRefresh}/>
          </TabsContent>
          <TabsContent value="repositories" className="min-h-[80vh]">
            <Repositories ref={repoRef} onDropDownChange={handleResetRefresh} />
          </TabsContent>
          <TabsContent value="users" className="min-h-[80vh]">
            <Users ref={userRef} onDropDownChange={handleResetRefresh} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
