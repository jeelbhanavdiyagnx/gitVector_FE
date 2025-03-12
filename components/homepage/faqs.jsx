'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { faqItems } from '@/constants/data';

export default function FAQs() {
  return (
    <div className="bg-black text-white dark:bg-white dark:text-black">
      <div className="container py-6">
        <h2 className="pb-4 text-center text-2xl font-bold">
          General FAQ for Prompt Canvas
        </h2>
        <Accordion type="single" collapsible className="mb-4 w-full">
          {faqItems.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer.includes('-') ? (
                  <div>
                    {faq.answer
                      .split('\n')
                      .map((line, index) => {
                        // Check if the line starts with a bullet point
                        if (line.trim().startsWith('-')) {
                          return (
                            <ul key={index} className="ml-6 list-disc">
                              <li>{line.replace('-', '').trim()}</li>
                            </ul>
                          );
                        }
                        return <p key={index} className="mb-2">{line.trim()}</p>;
                      })}
                  </div>
                ) : (
                  <p>{faq.answer}</p>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

