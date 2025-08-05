"use client"

import type React from "react"

import { useState } from "react"
import type { DonationFormData, Donation } from "../../lib/donation"

interface DonationFormProps {
  onSubmit: (donation: Omit<Donation, "id" | "createdAt">) => void
  onCancel?: () => void
  isModal?: boolean
}

export function DonationForm({ onSubmit, onCancel, isModal = false }: DonationFormProps) {
  const [formData, setFormData] = useState<DonationFormData>({
    donorName: "",
    amount: "",
    paymentMethod: "Cash",
    dateOfDonation: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const [errors, setErrors] = useState<Partial<DonationFormData>>({})

  const paymentMethods: Donation["paymentMethod"][] = [
    "Cash",
    "Zelle",
    "Venmo",
    "Check",
    "Credit Card",
    "Bank Transfer",
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<DonationFormData> = {}

    if (!formData.donorName.trim()) {
      newErrors.donorName = "Donor name is required"
    }

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
    }

    if (!formData.dateOfDonation) {
      newErrors.dateOfDonation = "Date is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    onSubmit({
      donorName: formData.donorName.trim(),
      amount: Number.parseFloat(formData.amount),
      paymentMethod: formData.paymentMethod,
      dateOfDonation: formData.dateOfDonation,
      notes: formData.notes.trim() || undefined,
    })

    // Reset form
    setFormData({
      donorName: "",
      amount: "",
      paymentMethod: "Cash",
      dateOfDonation: new Date().toISOString().split("T")[0],
      notes: "",
    })
  }

  const handleInputChange = (field: keyof DonationFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const containerClass = isModal
    ? "space-y-4"
    : "rounded-sm border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark"

  return (
    <div className={containerClass}>
      {!isModal && (
        <div className="border-b border-stroke pb-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Add New Donation</h3>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Donor Name */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Donor Name <span className="text-meta-1">*</span>
            </label>
            <input
              type="text"
              value={formData.donorName}
              onChange={(e) => handleInputChange("donorName", e.target.value)}
              placeholder="Enter donor name"
              className={`w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                errors.donorName ? "border-meta-1" : "border-stroke"
              }`}
            />
            {errors.donorName && <p className="mt-1 text-sm text-meta-1">{errors.donorName}</p>}
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Amount <span className="text-meta-1">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="0.00"
              className={`w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                errors.amount ? "border-meta-1" : "border-stroke"
              }`}
            />
            {errors.amount && <p className="mt-1 text-sm text-meta-1">{errors.amount}</p>}
          </div>

          {/* Payment Method */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">Payment Method</label>
            <select
              value={formData.paymentMethod}
              onChange={(e) => handleInputChange("paymentMethod", e.target.value)}
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Date of Donation <span className="text-meta-1">*</span>
            </label>
            <input
              type="date"
              value={formData.dateOfDonation}
              onChange={(e) => handleInputChange("dateOfDonation", e.target.value)}
              className={`w-full rounded border-[1.5px] bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
                errors.dateOfDonation ? "border-meta-1" : "border-stroke"
              }`}
            />
            {errors.dateOfDonation && <p className="mt-1 text-sm text-meta-1">{errors.dateOfDonation}</p>}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="mb-2.5 block text-black dark:text-white">Notes (Optional)</label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Additional notes about the donation..."
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
          >
            Add Donation
          </button>
          {isModal && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
