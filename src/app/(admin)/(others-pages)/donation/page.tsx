"use client"

import { useEffect, useState } from "react"
import type { Donation } from "../../../../lib/donation"
import { DonationForm } from "../../../../components/donation/donation-form"
import { DonationsTable } from "../../../../components/donation/donations-table"

export default function DonationTracking() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch donations from backend on mount
  const fetchDonations = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/donations")
      if (!res.ok) throw new Error("Failed to fetch donations")
      const data: Donation[] = await res.json()
      setDonations(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDonations()
  }, [])

  // Add donation by POSTing to backend, then refetch list
  const handleAddDonation = async (newDonation: Omit<Donation, "id" | "createdAt">) => {
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDonation),
      })
      if (!res.ok) throw new Error("Failed to add donation")
      await fetchDonations() // refresh donations after adding
    } catch (error) {
      alert("Failed to add donation.")
      console.error(error)
    }
  }

  // Delete donation locally, you can extend to backend delete if API available
const deleteDonation = async (id: number) => {
  try {
    const res = await fetch(`/api/donations?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete donation");
    }

    // Refresh the donation list or re-fetch data
    console.log("Donation deleted successfully");
  } catch (err) {
    console.error(err);
  }
};



  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6">
        <h1 className="text-title-md2 font-semibold text-black dark:text-white">Manual Donation Entry</h1>
        <p className="text-regular text-body dark:text-bodydark">Record and manage donation entries manually</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
            {/* SVG omitted for brevity */}
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
        {/* Other summary cards here */}
      </div>

      {/* Add Donation Form */}
      <div className="mb-6">
        <DonationForm onSubmit={handleAddDonation} />
      </div>

      {/* Loading, error, or Donations Table */}
      {loading ? (
        <p>Loading donations...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <DonationsTable donations={donations} onDelete={deleteDonation} />
      )}
    </div>
  )
}
