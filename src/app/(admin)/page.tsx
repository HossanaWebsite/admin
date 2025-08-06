import type { Metadata } from "next";
import React from "react";
import DemographicCard from "@/components/ecommerce/DemographicCard";

export const metadata: Metadata = {
  title:
    "AHESM Admin Dashboard",
  description: "Admin dahsboard",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>


    </div>
  );
}
