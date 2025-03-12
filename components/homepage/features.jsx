'use client';
import React from 'react';
import { LuCode2 } from 'react-icons/lu';
import { HiMiniAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdOutlineAlarmOn } from 'react-icons/md';
import { PiHeadCircuit } from 'react-icons/pi';
import { AiOutlineExport } from 'react-icons/ai';
import { FaHandHoldingDollar } from 'react-icons/fa6';

export default function Features() {
  return (
    <div className="bg-black py-10 dark:bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-3xl font-bold text-white dark:text-black">
          Features
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-4 text-center dark:bg-black">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <LuCode2 className="text-2xl" />
              <h3 className="text-lg font-bold">No Code required</h3>
            </div>
            <p>
              Create powerful AI prompts without writing a single line of code!
            </p>
          </div>

          <div className="rounded-xl bg-white p-4 text-center dark:bg-black">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <HiMiniAdjustmentsHorizontal className="text-xl" />

              <h3 className="text-lg font-bold">Customizable variables</h3>
            </div>
            <p>Tailor your prompts with customizable variables for precision</p>
          </div>
          <div className="rounded-xl bg-white p-4 text-center dark:bg-black">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <MdOutlineAlarmOn className="text-2xl" />
              <h3 className="text-lg font-bold">Real-Time Preview</h3>
            </div>
            <p>See and edit your prompt performs before you finalize it</p>
          </div>
          <div className="rounded-xl bg-white p-4 text-center dark:bg-black">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <PiHeadCircuit className="text-2xl" />
              <h3 className="text-lg font-bold">Chain of thoughts</h3>
            </div>
            <p>
              Guide the AI step-by-step for more thoughtful, coherent responses
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 text-center dark:bg-black">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <AiOutlineExport className="text-xl" />
              <h3 className="text-lg font-bold">Export Options</h3>
            </div>
            <p>
              Easily copy and export prompts for emails, social media, chatbots,
              and more
            </p>
          </div>
          <div className="rounded-xl bg-white p-4 text-center dark:bg-black">
            <div className="mb-2 flex items-center justify-center space-x-2">
              <FaHandHoldingDollar className="text-2xl" />
              <h3 className="text-lg font-bold">Affordable pricing</h3>
            </div>
            <p>
              Affordable pricing plans to suit all types of users and use cases
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
