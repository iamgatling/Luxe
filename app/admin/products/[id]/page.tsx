import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProductForm } from "@/components/admin/product-form"
import { createAdminClient } from "@/lib/supabase/server"

interface EditProductPageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  const supabase = await createAdminClient()
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error) return null
  return data
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

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
