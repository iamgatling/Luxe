"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

export interface ShippingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface ShippingFormProps {
  onSubmit: (data: ShippingFormData) => void
  isLoading?: boolean
}

export function ShippingForm({ onSubmit, isLoading }: ShippingFormProps) {
  const [formData, setFormData] = useState<ShippingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  })

  const [errors, setErrors] = useState<Partial<ShippingFormData>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (errors[name as keyof ShippingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<ShippingFormData> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State/Province is required"
    if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
        </div>


        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="mt-1"
            />
            {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="mt-1"
            />
            {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="mt-1"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="mt-1"
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>
        </div>


        <div>
          <Label htmlFor="addressLine1" className="text-sm font-medium">
            Street Address
          </Label>
          <Input
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            placeholder="123 Main Street"
            className="mt-1"
          />
          {errors.addressLine1 && <p className="text-xs text-destructive mt-1">{errors.addressLine1}</p>}
        </div>


        <div>
          <Label htmlFor="addressLine2" className="text-sm font-medium">
            Apartment, suite, etc. (optional)
          </Label>
          <Input
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            placeholder="Apt 4B"
            className="mt-1"
          />
        </div>


        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city" className="text-sm font-medium">
              City
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
              className="mt-1"
            />
            {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
          </div>
          <div>
            <Label htmlFor="state" className="text-sm font-medium">
              State/Province
            </Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="NY"
              className="mt-1"
            />
            {errors.state && <p className="text-xs text-destructive mt-1">{errors.state}</p>}
          </div>
          <div>
            <Label htmlFor="postalCode" className="text-sm font-medium">
              Postal Code
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="10001"
              className="mt-1"
            />
            {errors.postalCode && <p className="text-xs text-destructive mt-1">{errors.postalCode}</p>}
          </div>
        </div>


        <div>
          <Label htmlFor="country" className="text-sm font-medium">
            Country
          </Label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="MX">Mexico</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="JP">Japan</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <Button type="submit" size="lg" disabled={isLoading} className="w-full">
          {isLoading ? "Processing..." : "Continue to Payment"}
        </Button>
      </form>
    </Card>
  )
}
