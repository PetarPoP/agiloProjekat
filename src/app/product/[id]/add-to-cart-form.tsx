"use client";

import {Colors, Product, Sizes} from "@prisma/client";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {Minus, Plus} from "lucide-react";
import {useCart} from "@/lib/cart";
import {Input} from "@/components/ui/input";
import {FormEvent, useState} from "react";
import {toast} from "sonner";

type AddToCartFormProps = {
    product: Product;
};

export function AddToCartForm(props: AddToCartFormProps) {
    const item = props.product;
    const {add} = useCart();
    const [size, setSize] = useState<Sizes>("M");
    const [color, setColor] = useState<Colors>("BLACK");

    const [quantity, setQuantity] = useState(1);

    return (
        <div
            className="md:w-1/2 w-full h-full p-8 md:px-24 transition-all flex flex-col justify-center items-start gap-4">
            <h1 className="text-2xl font-semibold">{item.name}</h1>
            <p>${item.price}</p>
            <p className="opacity-80">{item.description}</p>
            <Select onValueChange={
                value => {
                    setSize(value as Sizes);
                }
            }>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Size"/>
                </SelectTrigger>
                <SelectContent>
                    {item.sizes.map(size => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select onValueChange={
                value => {
                    setColor(value as Colors);
                }

            }>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Color"/>
                </SelectTrigger>
                <SelectContent>
                    {item.color.map(color => (
                        <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <div className="relative w-full h-fit">
                <Input className="text-center" name="quantity"
                       value={quantity} onChange={event => {
                    const value = parseInt(event.target.value);
                    if (value >= 1) {
                        setQuantity(value);
                    }
                }}/>
                <Minus
                    className="absolute left-2 top-2 opacity-80 data-[disabled=false]:cursor-pointer
                        data-[disabled=true]:opacity-30 transition-all"
                    data-disabled={quantity === 1}
                    onClick={() => {
                        if (quantity > 1) {
                            setQuantity(quantity - 1);
                        }
                    }}/>
                <Plus className="absolute right-2 top-2 opacity-80 cursor-pointer" onClick={() => {
                    setQuantity(quantity + 1);
                }}/>
            </div>
            <Button className="w-full flex gap-2" onClick={() => {
                const product = {
                    ...item,
                    quantity,
                    sizes: [
                        size
                    ],
                    color: [
                        color
                    ]
                };
                add(product);
                toast.success("Added to cart");
            }}>Add to Cart <Plus className="size-4"/></Button>
        </div>
    );
};