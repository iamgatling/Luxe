import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns Policy',
  description: 'Our returns and refunds policy.',
}

export default function ReturnsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Returns & Refunds Policy</h1>

      <div className="prose max-w-none space-y-6 text-muted-foreground">
        <p>
          Thank you for shopping with us. If you are not entirely satisfied with your purchase, we're here to help.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Returns</h2>
        <p>
          You have 30 calendar days to return an item from the date you received it.
          To be eligible for a return, your item must be unused and in the same condition that you received it.
          Your item must be in the original packaging.
          Your item needs to have the receipt or proof of purchase.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Refunds</h2>
        <p>
          Once we receive your item, we will inspect it and notify you that we have received your returned item.
          We will immediately notify you on the status of your refund after inspecting the item.
        </p>
        <p>
          If your return is approved, we will initiate a refund to your credit card (or original method of payment).
          You will receive the credit within a certain amount of days, depending on your card issuer's policies.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Shipping</h2>
        <p>
          You will be responsible for paying for your own shipping costs for returning your item.
          Shipping costs are nonrefundable.
          If you receive a refund, the cost of return shipping will be deducted from your refund.
        </p>

        <h2 className="text-xl font-semibold text-foreground">Contact Us</h2>
        <p>
          If you have any questions on how to return your item to us, contact us.
        </p>
      </div>
    </div>
  )
}
