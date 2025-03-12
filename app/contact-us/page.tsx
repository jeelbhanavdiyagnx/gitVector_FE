'use client';
import ContactForm from '@/app/contact-us/components/contact-usForm';
import withAuth from '@/app/withAuth';

function Page() {
  return (
    <div>
      <ContactForm/>
    </div>
  )
}


export default withAuth(Page);