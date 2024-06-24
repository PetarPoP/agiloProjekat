import Link from "next/link";
import {prisma} from "@/lib/prisma";
import {Categories} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Filter} from "@/components/filter";

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
};

const CATEGORIES = Object.entries(Categories);

export default async function Home(props: { searchParams: { category: string } }) {
    const category = CATEGORIES.find(([key]) => key === props.searchParams.category);
    const products = await prisma.product.findMany({
        where: {
            category: category ? category[1] : undefined,
        },
    });

    return (
        <div className="flex flex-col size-full pt-2 justify-center items-center">
            <Filter />
            <div
                className="p-4 size-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <Link key={product.id} href={`/product/${product.id}`}
                          className="p-4 bg-[#F7F7FA] rounded-md transform transition-all duration-200
                       hover:cursor-pointer aspect-square flex flex-col group relative animate-fade-in-up">
                        <div className="size-full flex items-center justify-center">
                            <img src={product.image} alt={product.name}
                                 className="object-contain m-3 mix-blend-multiply size-2/3 group-hover:scale-110 transition-all
                             duration-300 ease-out"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm truncate w-2/3">{product.name}</h3>
                            <span className="text-sm">${product.price}</span>
                        </div>
                        <div className="absolute left-0 top-0 size-full bg-gradient-to-t from-black to-35% to-transparent opacity-0
                        group-hover:opacity-10 transition-all rounded-md">
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}