"use client"

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Categories} from "@prisma/client";
import {useRouter, useSearchParams} from "next/navigation";

const CATEGORIES = Object.entries(Categories);

export function Filter() {
    const router = useRouter();
    const params = useSearchParams();
    const category = CATEGORIES.find(([key]) => key === params.get("category"));
    console.log(category);

    return (
        <Select onValueChange={
            value => {
                router.push(`?category=${value}`);
            }
        } value={
            category ? category[0] : undefined
        }>
            <SelectTrigger className="md:w-[200px] w-[calc(100vw-2rem)]">
                <SelectValue placeholder={"Category"}/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={"All"}>ALL</SelectItem>
                {CATEGORIES.map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                        {key}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};