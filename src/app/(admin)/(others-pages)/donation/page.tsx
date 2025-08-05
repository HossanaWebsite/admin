"use client"

import { useState } from "react"
import type { Donation } from "../../../../lib/donation"
import { DonationForm } from "../../../../components/donation/donation-form"
import { DonationsTable } from "../../../../components/donation/donations-table"

// Sample data to demonstrate the table layout
const sampleDonations: Donation[] = [
  {
    id: "1",
    donorName: "John Smith",
    amount: 250.0,
    paymentMethod: "Credit Card",
    dateOfDonation: "2024-01-15",
    notes: "Monthly recurring donation",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    donorName: "Sarah Johnson",
    amount: 100.0,
    paymentMethod: "Zelle",
    dateOfDonation: "2024-01-14",
    notes: "In memory of grandmother",
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    donorName: "Michael Brown",
    amount: 500.0,
    paymentMethod: "Check",
    dateOfDonation: "2024-01-12",
    notes: "Annual donation for scholarship fund",
    createdAt: "2024-01-12T09:15:00Z",
  },
  {
    id: "4",
    donorName: "Emily Davis",
    amount: 75.0,
    paymentMethod: "Venmo",
    dateOfDonation: "2024-01-10",
    createdAt: "2024-01-10T16:45:00Z",
  },
  {
    id: "5",
    donorName: "Robert Wilson",
    amount: 1000.0,
    paymentMethod: "Bank Transfer",
    dateOfDonation: "2024-01-08",
    notes: "Corporate sponsorship donation",
    createdAt: "2024-01-08T11:00:00Z",
  },
]

export default function DonationTracking() {
  const [donations, setDonations] = useState<Donation[]>(sampleDonations)

  const handleAddDonation = (newDonation: Omit<Donation, "id" | "createdAt">) => {
    const donation: Donation = {
      ...newDonation,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    }

    setDonations((prev) => [donation, ...prev])
  }

  const handleDeleteDonation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      setDonations((prev) => prev.filter((donation) => donation.id !== id))
    }
  }

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)

  return (
    <div className="mx-auto max-w-7xl">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-title-md2 font-semibold text-black dark:text-white">Manual Donation Entry</h1>
        <p className="text-regular text-body dark:text-bodydark">Record and manage donation entries manually</p>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 15.1156C6.13751 15.1156 2.0625 11.0406 2.0625 6.17808C2.0625 5.51464 2.59219 4.98495 3.25563 4.98495H18.7444C19.4078 4.98495 19.9375 5.51464 19.9375 6.17808C19.9375 11.0406 15.8625 15.1156 11 15.1156ZM4.13751 6.77808C4.13751 9.85464 6.92344 12.3281 10.3125 12.9469V6.77808H4.13751ZM11.6875 12.9469C15.0766 12.3281 17.8625 9.85464 17.8625 6.77808H11.6875V12.9469Z"
                fill=""
              />
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                ${totalDonations.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </h4>
              <span className="text-sm font-medium">Total Donations</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 0C4.925 0 0 4.925 0 11s4.925 11 11 11 11-4.925 11-11S17.075 0 11 0zm0 20c-4.963 0-9-4.037-9-9s4.037-9 9-9 9 4.037 9 9-4.037 9-9 9z"
                fill=""
              />
              <path d="M11 5c-0.552 0-1 0.448-1 1v5c0 0.552 0.448 1 1 1s1-0.448 1-1V6c0-0.552-0.448-1-1-1z" fill="" />
              <circle cx="11" cy="14" r="1" fill="" />
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">{donations.length}</h4>
              <span className="text-sm font-medium">Total Entries</span>
            </div>
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            <svg
              className="fill-primary dark:fill-white"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9344 19.7313 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1875 2.16563 17.8063 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
                fill=""
              />
              <path
                d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.59390 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
                fill=""
              />
            </svg>
          </div>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                ${donations.length > 0 ? (totalDonations / donations.length).toFixed(2) : "0.00"}
              </h4>
              <span className="text-sm font-medium">Average Donation</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add Donation Form */}
      <div className="mb-6">
        <DonationForm onSubmit={handleAddDonation} />
      </div>

      {/* Donations Table */}
      <DonationsTable donations={donations} onDelete={handleDeleteDonation} />
    </div>
  )
}
