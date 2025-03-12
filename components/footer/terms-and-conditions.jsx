'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto px-4" style={{ marginBottom: '40px' }}>
      <style jsx>{`
        p {
          font-size: 1rem;
          line-height: 1.5rem;
        }
      `}</style>
      <div className="mt-8 pb-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Terms of use</h1>
        <p className="mt-2 px-1 text-gray-500">Git Vector</p>
      </div>
      <Separator />

      <div className="mt-4 space-y-8 text-lg">
        <p>
          <strong className="text-2xl">1. Acceptance of Terms</strong>
          <br />
          By accessing or using{' '}
          <a href="http://githubanalytics.io/" className="text-blue-600">
            Git Vector
          </a>{' '}
          (the &quot;Service&quot;), provided by GNX Infinity Pvt Ltd
          (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;), you agree to be bound by these Terms and Conditions
          (&quot;Terms&quot;). If you do not agree to all of these Terms, you
          must discontinue use of the Service immediately.
        </p>

        <p>
          <strong className="text-2xl">2. Eligibility</strong>
          <br />
          To use our Service, you must be at least 18 years old and have the
          legal authority to enter into a binding contract. By agreeing to these
          Terms, you represent that you meet these requirements.
        </p>

        <p>
          <strong className="text-2xl">3. Account Registration</strong>
          <br />
          - To use certain features of the Service, you may be required to
          create an account.
          <br />
          - You are responsible for maintaining the confidentiality of your
          account and password and for restricting access to your device.
          <br />- You agree to accept responsibility for all activities that
          occur under your account.
        </p>

        <p>
          <strong className="text-2xl">4. Subscription and Payment</strong>
          <br />- <strong className="text-xl">Subscription Fees:</strong>
          <br /> Access to the Service requires a subscription. The applicable
          subscription fees will be disclosed at the time of purchase.
          <br />- <strong className="text-xl">Payment:</strong>
          <br /> You agree to pay all fees associated with your subscription in
          accordance with the billing terms in effect at the time the fee
          becomes payable.
          <br />- <strong className="text-xl">Billing Cycle:</strong>
          <br /> Fees will be billed on a [monthly/annual] basis as selected
          when you subscribe. You authorize us to charge your provided payment
          method for recurring fees.
          <br />- <strong className="text-xl">Refunds:</strong>
          <br /> Subscription fees are non-refundable except where required by
          law.
        </p>

        <p>
          <strong className="text-2xl">5. License and Access</strong>
          <br />
          - We grant you a limited, non-exclusive, non-transferable license to
          use the Service.
          <br />- You agree not to use the Service in any manner that could
          damage, disable, overburden, or impair the Service or interfere with
          any other party’s use of the Service.
        </p>

        <p>
          <strong className="text-2xl">6. User Responsibilities</strong>
          <br />- <strong className="text-xl">Prohibited Uses:</strong>
          <br /> You agree not to use the Service for any unlawful purposes or
          in violation of any applicable laws.
          <br />- <strong className="text-xl">Content Ownership:</strong>
          <br /> You retain ownership of all data you submit or create through
          the Service. However, by using the Service, you grant us a worldwide,
          non-exclusive license to use, store, and process your content as
          necessary for the Service.
        </p>

        <p>
          <strong className="text-2xl">7. Intellectual Property</strong>
          <br />- All intellectual property rights related to the Service,
          including but not limited to software, text, images, logos, and
          trademarks, belong to us or our licensors. You agree not to copy,
          modify, distribute, or create derivative works from any part of the
          Service without our written consent.
        </p>

        <p>
          <strong className="text-2xl">8. Termination</strong>
          <br />
          - We reserve the right to suspend or terminate your account and access
          to the Service at our sole discretion, without notice, for conduct
          that violates these Terms or is otherwise harmful to us or other
          users.
          <br />- You may terminate your account at any time by contacting us or
          through the account settings feature. Termination will not relieve you
          of your obligation to pay any fees due.
        </p>

        <p>
          <strong className="text-2xl">9. Disclaimer of Warranties</strong>
          <br />
          The Service is provided &quot;as is&quot; and &quot;as
          available.&quot; We do not make any warranties, whether express or
          implied, including but not limited to the implied warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>

        <p>
          <strong className="text-2xl">10. Limitation of Liability</strong>
          <br />
          To the fullest extent permitted by law, we shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages, or
          any loss of profits or revenues, whether incurred directly or
          indirectly, or any loss of data, use, goodwill, or other intangible
          losses, resulting from your use of the Service.
        </p>

        <p>
          <strong className="text-2xl">11. Indemnification</strong>
          <br />
          You agree to indemnify and hold GNX Infinity Pvt Ltd harmless from any
          claims, liabilities, damages, losses, and expenses, including legal
          fees, arising out of your use of the Service or violation of these
          Terms.
        </p>

        <p>
          <strong className="text-2xl">12. Governing Law</strong>
          <br />
          These Terms shall be governed by and construed in accordance with the
          laws of India, without regard to its conflict of law principles. Any
          disputes arising out of or related to these Terms or the use of the
          Service shall be subject to the exclusive jurisdiction of the courts
          in Greater Noida, Uttar Pradesh, India.
        </p>

        <p>
          <strong className="text-2xl">13. Changes to Terms</strong>
          <br />
          We reserve the right to modify or update these Terms at any time. Any
          changes will be effective immediately upon posting the revised Terms
          on the website. Your continued use of the Service following any
          changes signifies your acceptance of the new Terms.
        </p>

        <p>
          <strong className="text-2xl">14. Contact Information</strong>
          <br />
          If you have any questions about these Terms, please contact us at:
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
          Email: <a href="mailto:legal@gnxgroup.org">legal@gnxgroup.org</a>
        </p>
      </div>
    </div>
  );
}
