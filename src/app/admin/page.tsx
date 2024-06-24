import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {AddProductForm} from "@/app/admin/add-product-form";

export default function Page() {
    return (
        <Card className="w-full max-w-lg mx-auto border-none bg-[#F7F7FA]">
            <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Fill out the form to add a new product.</CardDescription>
            </CardHeader>
            <CardContent>
                <AddProductForm/>
            </CardContent>
        </Card>
    )
}