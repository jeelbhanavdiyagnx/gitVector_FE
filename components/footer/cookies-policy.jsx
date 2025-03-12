'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';

export default function CookiesPolicy() {
  return (
    <div className="container mx-auto px-4" style={{ marginBottom: '40px' }}>
      <style jsx>{`
        p {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      `}</style>

      <div className="mt-8 pb-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Cookies Policy</h1>
        <p className="mt-2 px-1 text-gray-500">Git Vector</p>
      </div>
      <Separator />

      <div className="mt-4 space-y-8 text-lg">
        <p>
          <strong>Last Updated:</strong> September 2024
        </p>

        <p>
          This Cookies Policy explains how <b>Git Vector</b> (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;), operated by{' '}
          <b>GNX Infinity Pvt Ltd</b>, uses cookies and similar tracking
          technologies on our website{' '}
          <a href="http://githubanalytics.io/" className="text-blue-600">
            http://githubanalytics.io/
          </a>{' '}
          (the &quot;Website&quot;). By continuing to use the Website, you
          consent to the use of cookies in accordance with this policy.
        </p>

        <p>
          <strong className="text-xl">1. What Are Cookies?</strong>
          <br />
          Cookies are small text files that are stored on your device (computer,
          tablet, smartphone, etc.) when you visit a website. They help the
          website recognize your device and store some information about your
          preferences or past actions, making future visits smoother and more
          personalized.
        </p>

        <p>
          <strong className="text-xl">2. Types of Cookies We Use</strong>
          <br />
          We use the following types of cookies on our Website:
          <br />
          <br />
          <strong className="text-lg">a. Necessary Cookies</strong>
          <br />
          These cookies are essential for the basic functions of the Website.
          Without them, the website might not function properly. They are
          typically set in response to actions made by you, such as logging in
          or filling out forms.
          <br />
          <br />- Example: Authentication cookies that help users log into their
          accounts securely.
        </p>

        <p>
          <strong className="text-lg">
            b. Performance and Analytics Cookies
          </strong>
          <br />
          These cookies help us understand how visitors interact with our
          Website by collecting and reporting information anonymously. We use
          this data to improve the performance and user experience of the
          Website.
          <br />
          <br />- Example: Google Analytics cookies, which track user behavior
          on our Website (e.g., which pages are visited, how long users spend on
          a page).
        </p>

        <p>
          <strong className="text-lg">c. Functionality Cookies</strong>
          <br />
          Functionality cookies enable the Website to remember your preferences
          and provide enhanced, personalized features.
          <br />
          <br />- Example: Remembering your preferred language or region
          selection.
        </p>

        <p>
          <strong className="text-lg">
            d. Advertising and Targeting Cookies
          </strong>
          <br />
          These cookies are used to deliver relevant advertisements to you,
          limit the number of times you see a particular ad, and measure the
          effectiveness of ad campaigns. They may also be used to track your
          behavior across websites and build a profile based on your interests.
          <br />
          <br />- Example: Cookies used by third-party advertising networks.
        </p>

        <p>
          <strong className="text-xl">3. How We Use Cookies</strong>
          <br />
          We use cookies to:
          <br />
          - Personalize your experience on the Website.
          <br />
          - Analyze Website traffic and usage.
          <br />
          - Provide social media features.
          <br />
          - Manage and display advertisements.
          <br />
          - Improve the Website&apos;s performance and functionality.
          <br />
        </p>

        <p>
          <strong className="text-xl">4. Third-Party Cookies</strong>
          <br />
          In some cases, third-party cookies are used on our Website. These
          cookies are set by external companies (such as analytics and
          advertising partners) to track your online activity and enhance your
          experience. We do not have control over these cookies and their use is
          subject to the privacy policies of the respective third parties.
          <br />
          <br />- Example: Google Analytics, Facebook Pixel, and other
          third-party advertising networks.
        </p>

        <p>
          <strong className="text-xl">5. How to Manage Cookies</strong>
          <br />
          You can control and manage cookies in several ways:
          <br />
          <br />
          <strong>a. Browser Settings</strong>
          <br />
          Most web browsers allow you to manage cookie settings through their
          preferences. You can set your browser to block cookies or alert you
          when cookies are being set. However, disabling certain cookies may
          impact the functionality of our Website.
        </p>

        <p>
          <strong>b. Opting Out of Analytics</strong>
          <br />
          You can opt-out of Google Analytics by installing the{' '}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            className="text-blue-600"
          >
            Google Analytics Opt-out Browser Add-on
          </a>
          .
        </p>

        <p>
          <strong>c. Third-Party Tools</strong>
          <br />
          Some third-party websites offer tools to manage cookie preferences,
          such as{' '}
          <a href="http://www.youronlinechoices.com/" className="text-blue-600">
            Your Online Choices
          </a>{' '}
          and{' '}
          <a
            href="https://www.networkadvertising.org/"
            className="text-blue-600"
          >
            Network Advertising Initiative
          </a>
          .
        </p>

        <p>
          <strong className="text-xl">6. Cookie Retention Periods</strong>
          <br />
          Cookies remain on your device for varying periods depending on whether
          they are &quot;session cookies&quot; or &quot;persistent
          cookies.&quot; Session cookies expire when you close your browser,
          while persistent cookies remain on your device until they expire or
          are deleted manually.
        </p>

        <p>
          <strong className="text-xl">7. Updates to This Policy</strong>
          <br />
          We may update this Cookies Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. Any changes will be effective immediately upon posting the
          updated policy on the Website. Your continued use of the Website after
          such updates constitutes your consent to the updated policy.
        </p>

        <p>
          <strong className="text-xl">8. Contact Us</strong>
          <br />
          If you have any questions about this Cookies Policy, please contact
          us:
          <br />
          <br />
          GNX Infinity Pvt Ltd
          <br />
          A-144, Paramount Golf Forest Villas,
          <br />
          Plot No. BGH, Site - C, Surajpur Gr Noida,
          <br />
          Greater Noida, Uttar Pradesh, 201306, India
          <br />
          Email:{' '}
          <a href="mailto:legal@gnxgroup.org" className="text-blue-600">
            legal@gnxgroup.org
          </a>
        </p>
      </div>
    </div>
  );
}
