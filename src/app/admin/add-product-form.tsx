"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UploadButton} from "@/components/uploadthing";
import {Checkbox} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {Categories, Colors, Sizes} from "@prisma/client";
import {saveProduct} from "@/app/admin/action";
import {useState} from "react";

const CATEGORIES = Object.values(Categories);
const SIZES = Object.values(Sizes);
const COLORS = Object.values(Colors);

export function AddProductForm() {
    const [image, setImage] = useState<string | null>(null);

    return (
        <form className="grid gap-4" action={saveProduct}>
            <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" name="name" placeholder="Enter product name"/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Enter product description"/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="price">Price</Label>
                <Input id="price" name="price" type="number" placeholder="Enter price"/>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category">
                    <SelectTrigger>
                        <SelectValue placeholder="Select category"/>
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="image">Image URL or file</Label>
                <Input id="image" name="image" placeholder="Enter image URL"/>
                {
                    image && (
                        <div className="flex justify-center items-center w-full">
                            <img src={image} alt="Product image" className="w-1/3"/>
                        </div>
                    )
                }
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                        const input = document.getElementById("image") as HTMLInputElement;
                        input.value = res[0].url;
                        setImage(res[0].url);
                    }}
                />
            </div>
            <div className="grid gap-2">
                <Label>Sizes</Label>
                <div className="flex flex-wrap gap-2">
                    {SIZES.map(size => (
                        <div key={size} className="flex gap-2">
                            <Checkbox key={size} id={size}
                                      name={size}>{size}</Checkbox>
                            <Label htmlFor={size}>{size}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid gap-2">
                <Label>Colors</Label>
                <div className="flex flex-wrap gap-2">
                    {COLORS.map(color => (
                        <div key={color} className="flex gap-2">
                            <Checkbox key={color} id={color}
                                      name={color}>{color}</Checkbox>
                            <Label htmlFor={color}>{color}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <Button className="ml-auto" type="submit">Save Product</Button>
        </form>
    );
};