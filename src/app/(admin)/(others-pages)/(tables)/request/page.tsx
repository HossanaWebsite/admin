"use client";

import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DynamicTable from "@/components/tables/DynamicTable";

interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface Request {
  fullname: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zip: string;
  reason: string;
  notes?: string;
}

const requestColumns: ColumnConfig<Request>[] = [
  { key: "fullname", header: "Full Name" },
  { key: "email", header: "Email" },
  { key: "phone", header: "Phone Number" },
  { key: "address", header: "Address" },
  { key: "apartment", header: "Apartment" },
  { key: "city", header: "City" },
  { key: "state", header: "State" },
  { key: "zip", header: "Zip Code" },
  { key: "reason", header: "Reason" },
  {
    key: "notes",
    header: "Notes",
    render: (note: string) =>
      note ? note : <span className="text-gray-400 italic">—</span>,
  },
];

export default function RequestTablePage() {
  const [requestData, setRequestData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/request")
      .then((res) => res.json())
      .then((data) => setRequestData(data))
      .catch((err) => console.error("Failed to fetch requests", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <PageBreadcrumb pageTitle="Request" />

      {loading ? (
        <div className="text-center text-gray-500 mt-10">Loading...</div>
      ) : requestData.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No request data found.</div>
      ) : (
        <DynamicTable columns={requestColumns} data={requestData} />
      )}
    </div>
  );
}
