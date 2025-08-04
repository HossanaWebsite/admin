
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

import DynamicTable from "@/components/tables/DynamicTable";

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


const requestData: Request[] = [
  {
    fullname: "John Doe",
    email: "john@example.com",
    phone: "+251911223344",
    address: "123 Main Street",
    apartment: "Apt 4B",
    city: "Addis Ababa",
    state: "Addis",
    zip: "1000",
    reason: "Service inquiry",
    notes: "Please call after 5pm.",
  },
  {
    fullname: "Sarah Smith",
    email: "sarah@example.com",
    phone: "+251922334455",
    address: "456 Pine Ave",
    apartment: "",
    city: "Bahir Dar",
    state: "Amhara",
    zip: "6000",
    reason: "Support",
    notes: "",
  },
];


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


export default function TestimonialTablePage() {
  return (
       <div>
            <PageBreadcrumb pageTitle="Request" />
            <DynamicTable columns={requestColumns} data={requestData} />
       </div>
  );
}
