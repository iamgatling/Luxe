import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "@/components/admin/product-form"
import { getProductById } from "@/lib/db"

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

async function loadProduct(id: string) {
  try {
    return await getProductById(id)
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const product = await loadProduct(id)

  if (!product) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Edit Product</h1>
        <p className="text-muted-foreground">Update product information</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Update the product information below.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm product={product} />
        </CardContent>
      </Card>
    </div>
  )
}
