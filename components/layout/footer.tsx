'use client'
import React from 'react';
import Link from 'next/link';

const Footer = () =>  {
  return (
    <footer
      className='sm:fixed  sm:bottom-0 sm:left-0 sm:w-full z-50 flex justify-between bg-accent p-1 px-4 shadow shadow-current '
    >
      <p className=" text-sm text-gray-600 hidden md:block">
        &copy; GNX Group. All rights reserved.
      </p>
      <div className="flex lg:space-x-2 space-x-1  text-xs text-gray-500 ">
        <Link href="/terms-and-conditions" className="hover:text-black">
          Terms of Use
        </Link>
        <span>|</span>
        <Link href="/privacy" className="hover:text-black">
          Privacy Policy
        </Link>
        <span>|</span>
        <Link href="/cookies-policy" className="hover:text-black">
          Cookie Policy
        </Link>
        <span>|</span>
        <Link href="/contact-us" className="hover:text-black">
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
