import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Image from 'next/image';

export default function CardComponent({ item, commitMessage }) {
  const formatText = (text) => {
    return text.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  };

  const renderNestedMetrics = (metricItem) => {
    return (
      <ul className="list-disc pl-5">
        {Object.keys(metricItem)
          .filter((key) => key !== "metric")
          .map((key, index) => {
            const nestedItem = metricItem[key];
            if (nestedItem.line_number && nestedItem.comment) {
              return (
                <li key={index}>
                  <strong>Line {nestedItem.line_number}:</strong> {nestedItem.comment}
                </li>
              );
            }
            if (nestedItem.suggestion) {
              return (
                <li key={index}>
                  {nestedItem.suggestion}
                </li>
              );
            }
            if (nestedItem.issue) {
              return (
                <li key={index}>
                  {nestedItem.issue}
                </li>
              );
            }
            if (nestedItem.improvement) {
              return (
                <li key={index}>
                  {nestedItem.improvement}
                </li>
              );
            }
            if (nestedItem) {
              return (
                <li key={index}>
                  {nestedItem}
                </li>
              );
            }
            return null;
          })}
      </ul>
    );
  };

  return (
    <Card
      className={` flex w-auto min-w-[280px] max-w-full flex-col gap-1 px-4 pb-4 shadow-md transition-all duration-200 ${item.category === "overview_summary" && "lg:col-span-2"
        }  hover:shadow-lg`}
    >

      <CardHeader className="w-full space-y-0 px-2 pb-1 pt-3">

        <div className="flex w-full items-center p-1 pt-2 gap-2">
          <div className='border-2 shadow-lg w-12 rounded-md p-2'>
            <Image src={`/ReviewCards/${item.category}.svg`}
              width={45}
              height={45} />
          </div>
          <CardTitle className=" text-base whitespace-nowrap">
            {formatText(item.category)}
            {item.category === "overview_summary" ? ":" : ""}
          </CardTitle>
          {item.category === "overview_summary" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="text-start pr-1 text-base flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                  <CardTitle className="pr-1 text-base flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {commitMessage}
                  </CardTitle>
                </TooltipTrigger>
                <TooltipContent className='bg-white text-[#71717A]'>
                  <p>{commitMessage}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent className="w-full px-2">
        <Accordion
          type="multiple"
          collapsible="true"
          className="mt-2 flex w-full flex-col gap-2"
        >
          {item.metrics.map((metricItem, index) =>
            metricItem.metric === "final_score" ? (
              <p
                key={index}
                className="pt-1 text-sm font-normal leading-6 text-[#18181A] dark:text-gray-500"
              >
                <strong>Final Score:</strong> {metricItem.value}/10
              </p>
            ) : (
              <AccordionItem key={index} value={`item-${index}`} className="w-full">
                <AccordionTrigger className="flex w-auto items-start justify-between py-2 text-start text-sm font-medium text-[#71717A]">
                  {item.category === "overview_summary"
                    ? formatText(metricItem.metric)
                    : formatText(metricItem.metric) +
                    ": " +
                    (metricItem.score ? `${metricItem.score}/10` : "")}
                </AccordionTrigger>
                <AccordionContent className="pt-1 text-sm font-normal leading-6 text-[#18181A] dark:text-gray-500">
                  {metricItem.value ? (
                   <p>
                   <strong>Description:</strong>{" "}
                   {metricItem.value.split(/(\d+\.\s)/).map((part, index) =>
                     /^\d+\.\s/.test(part) ? <><br />{part}</> : part
                   )}
                 </p>
                  ) : metricItem.description ? (
                    <p>
                      <strong>Description:</strong> {metricItem.description}
                    </p>
                  ) : Object.keys(metricItem).some((key) =>
                    key.match(/^\d+$/)
                  ) ? (
                    renderNestedMetrics(metricItem)
                  ) : (
                    <p>
                      <strong>Description:</strong>{" "}
                      {Object.keys(metricItem)
                        .filter((key) => key !== "metric")
                        .map((key) => metricItem[key])
                        .join(", ")
                        .replace(/, ([^,]*)$/, " and $1")}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            )
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
}

