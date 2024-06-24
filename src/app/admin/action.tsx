"use server"

import {Categories, Colors, Sizes} from "@prisma/client";
import {prisma} from "@/lib/prisma";
import {redirect} from "next/navigation";

const CATEGORIES = Object.values(Categories);
const SIZES = Object.values(Sizes);
const COLORS = Object.values(Colors);

export const saveProduct = async (formData: FormData) => {
    const sizes: Sizes[] = [];
    for (const size of SIZES) {
        if (formData.get(size) === "on") {
            sizes.push(size);
        }
    }

    const colors = COLORS.filter(color => formData.get(color) === "on");

    const item = await prisma.product.create({
        data: {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            price: parseFloat(formData.get("price") as string),
            category: formData.get("category") as Categories,
            image: formData.get("image") as string,
            sizes: sizes,
            color: colors,
        },
    });
    redirect(`/product/${item.id}`);
}