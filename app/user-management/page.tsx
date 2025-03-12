'use client';
import UserManagement from "@/components/userManagement/UserManagement";
import withAuth from '@/app/withAuth';

function Page() {
  return <UserManagement />;
}

export default withAuth(Page);