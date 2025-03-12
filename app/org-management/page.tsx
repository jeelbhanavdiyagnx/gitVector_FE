'use client';
import withAuth from '@/app/withAuth';
import OrgManagement from "@/components/OrgManagement/OrgManagement";

function Page() {
  return <OrgManagement />;
}

export default withAuth(Page);