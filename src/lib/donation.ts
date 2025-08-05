export interface Donation {
  id: string
  donorName: string
  amount: number
  paymentMethod: "Cash" | "Zelle" | "Venmo" | "Check" | "Credit Card" | "Bank Transfer"
  dateOfDonation: string
  notes?: string
  createdAt: string
}

export interface DonationFormData {
  donorName: string
  amount: string
  paymentMethod: Donation["paymentMethod"]
  dateOfDonation: string
  notes: string
}
