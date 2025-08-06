"use client";

import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DynamicTable from "@/components/tables/DynamicTable";

interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface Event {
  title: string;
  summary: string;
  url: string;
  address: string;
  organizer: {
    phone: string;
    email: string;
  };
  isActive: boolean;
  day: string;
  location: string;
}

const eventColumns: ColumnConfig<Event>[] = [
  { key: "title", header: "Title" },
  { key: "summary", header: "Summary" },
  {
    key: "url",
    header: "URL",
    render: (url: string) => (
      <a href={url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    ),
  },
  // { key: "location", header: "Address" },
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

export default function EventTablePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/event")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to fetch events", err)).finally(()=>setLoading(false));
  }, []);

  return (
  <div>
    <PageBreadcrumb pageTitle="Events" />

    {loading ? (
      <p className="text-gray-500 italic">Loading...</p>
    ) : events.length === 0 ? (
      <p className="text-gray-400 italic mt-4">No events found.</p>
    ) : (
      <DynamicTable columns={eventColumns} data={events} />
    )}
  </div>
);
}
