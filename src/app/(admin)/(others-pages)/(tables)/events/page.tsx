
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
// import Image from "next/image";
interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

import DynamicTable from "@/components/tables/DynamicTable";

interface Event {
  title: string;
  summary: string;
  url: string;
  // image: string;
  address: string;
  organizer: {
    phone: string;
    email: string;
  };
  isActive: boolean;
  day: string; // ISO date or string like 'Monday'
  location: string;
}


const eventData: Event[] = [
  {
    title: "Tech Meetup 2025",
    summary: "Networking event for developers",
    url: "https://eventsite.com/tech-meetup",
    // image: "/images/event/event-1.jpg",
    address: "123 Event St, Addis Ababa",
    organizer: {
      phone: "+251911000111",
      email: "organizer@example.com",
    },
    isActive: true,
    day: "Monday",
    location: "Hilton Hotel",
  },
  {
    title: "Startup Demo Day",
    summary: "Pitch your startup to investors",
    url: "https://eventsite.com/demo-day",
    // image: "/images/event/event-2.jpg",
    address: "456 Startup Lane, Bahir Dar",
    organizer: {
      phone: "+251922000222",
      email: "demo@startupevent.org",
    },
    isActive: false,
    day: "Friday",
    location: "Lakeside Center",
  },
];



const eventColumns: ColumnConfig<Event>[] = [
  { key: "title", header: "Title" },
  { key: "summary", header: "Summary" },
  {
    key: "url",
    header: "URL",
    render: (url: string) => (
      <a href={url} className="text-blue-600 underline" target="_blank">
        {url}
      </a>
    ),
  },
  // {
  //   key: "image",
  //   header: "Image",
  //   render: (src: string) => (
  //     <Image src={src} width={60} height={40} alt="Event" className="rounded" />
  //   ),
  // },
  { key: "address", header: "Address" },
  {
    key: "organizer",
    header: "Organizer",
    render: (org: Event["organizer"]) => (
      <div className="flex flex-col">
        <span>{org.phone}</span>
        <span className="text-gray-500 text-xs">{org.email}</span>
      </div>
    ),
  },
  {
    key: "isActive",
    header: "Active",
    render: (active: boolean) =>
      active ? (
        <span className="text-green-600 font-medium">Yes</span>
      ) : (
        <span className="text-red-500 font-medium">No</span>
      ),
  },
  { key: "day", header: "Day" },
  { key: "location", header: "Location" },
];



export default function TestimonialTablePage() {
  return (
       <div>
            <PageBreadcrumb pageTitle="Events" />
            <DynamicTable columns={eventColumns} data={eventData} />;
       </div>
  );
}
