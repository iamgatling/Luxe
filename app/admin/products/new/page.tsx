import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "@/components/admin/product-form"

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Add Product</h1>
        <p className="text-muted-foreground">Create a new product for your store</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Fill in the information below to create a new product.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm />
        </CardContent>
      </Card>
    </div>
  )
}
