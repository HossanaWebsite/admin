
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

import DynamicTable from "@/components/tables/DynamicTable";
import Image from "next/image";

interface Testimonial {
  name: string;
  position: string;
  testimony: string;
  picture: string;
  isActive: boolean;
}

const testimonialData: Testimonial[] = [
  {
    name: "Lindsey",
    position: "CEO",
    testimony: "Great service!",
    picture: "/images/user/user-21.jpg",
    isActive: true,
  },
  {
    name: "Michael",
    position: "Designer",
    testimony: "Very helpful.",
    picture: "/images/user/user-22.jpg",
    isActive: false,
  },
];

const testimonialColumns: ColumnConfig<Testimonial>[] = [
  {
    key: "picture",
    header: "Picture",
    render: (src) => (
      <Image src={src} width={40} height={40} alt="User" className="rounded-full" />
    ),
  },
  { key: "name", header: "Name" },
  { key: "position", header: "Position" },
  { key: "testimony", header: "Testimony" },
  {
    key: "isActive",
    header: "Active",
    render: (value) =>
      value ? (
        <span className="text-green-500 font-medium">Yes</span>
      ) : (
        <span className="text-red-500 font-medium">No</span>
      ),
  },
];


export default function TestimonialTablePage() {
  return (
       <div>
            <PageBreadcrumb pageTitle="Testimomials" />
            <DynamicTable columns={testimonialColumns} data={testimonialData} />
       </div>
  );
}
