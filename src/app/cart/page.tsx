"use client"

import {Button} from "@/components/ui/button"
import {useCart} from "@/lib/cart";

export default function Page() {
    const {items, remove, addQuantity, removeQuantity} = useCart();

    return (
        <section className="w-full py-12">
            <div className="container grid gap-8 px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    <div className="grid gap-1">
                        <h1 className="text-2xl font-bold tracking-tight">Your Cart</h1>
                        <p className="text-muted-foreground">Review and manage the items in your cart.</p>
                    </div>
                </div>
                <div className="gap-8 flex flex-col">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between w-full gap-4 items-center">
                            <div className="flex gap-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    width={120}
                                    height={120}
                                    className="rounded-lg object-cover"
                                />
                                <div className="flex flex-col gap-2 w-full md:w-fit">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm leading-none text-muted-foreground">{item.description}</p>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span>Size: {item.sizes[0]}</span>
                                        <span>Color: {item.color[0]}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-end w-full md:w-fit">
                                <div className="flex items-center gap-2 justify-end">
                                    <Button size="sm" variant="outline" onClick={
                                        () => {
                                            removeQuantity(item);
                                        }
                                    }>
                                        -
                                    </Button>
                                    <span>{item.quantity}</span>
                                    <Button size="sm" variant="outline" onClick={
                                        () => {
                                            addQuantity(item);
                                        }
                                    }>
                                        +
                                    </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold">${item.price * item.quantity}</span>
                                    <Button size="sm" variant="outline" onClick={
                                        () => {
                                            remove(item);
                                        }
                                    }>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="grid gap-2">
                            <p>Your cart is empty.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}