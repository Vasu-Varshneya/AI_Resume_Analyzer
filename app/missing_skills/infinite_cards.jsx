"use client";
 
import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/ui/infinite-cards";
export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-black dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
 
const testimonials = [
  {
    quote:
      " Operating Systems Concepts: (https://www.coursera.org/courses?query=operating%20systems, https://www.tutorialspoint.com/operating_system/index.htm)",
  },
  {
    quote:
      " Data Structures and Algorithms (DSA): (https://www.coursera.org/specializations/data-structures-algorithms, https://www.geeksforgeeks.org/data-structures/)",
  },
  {
    quote: "Version Control (Azure DevOps): (https://learn.microsoft.com/en-us/azure/devops/user-guide/what-is-azure-devops?view=azure-devops, https://www.visualstudio.com/learn/)",
  },
];