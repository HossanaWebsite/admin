"use client";

import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DynamicTable from "@/components/tables/DynamicTable";
import Image from "next/image";

interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface Testimonial {
  name: string;
  position: string;
  testimony: string;
  pic: string;        // updated to match your model
  isActive: boolean;
}

const testimonialColumns: ColumnConfig<Testimonial>[] = [
  {
    key: "pic",
    header: "Picture",
    render: (src) => (
      <Image
        src={src || "/images/user/user-21.jpg"}
        width={40}
        height={40}
        alt="User"
        className="rounded-full"
      />
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
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("/api/testimony");
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error("Failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Testimonials" />
      {loading ? (
        <p>Loading...</p>
      )  : testimonials.length === 0 ? (
      <p className="text-gray-400 italic mt-4">No Testimonial found.</p>
    ) :  (
        <DynamicTable columns={testimonialColumns} data={testimonials} />
      )}
    </div>
  );
}
