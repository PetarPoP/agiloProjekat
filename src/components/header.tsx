"use client"

import {Menu, ShoppingCart} from "lucide-react";
import {Logo} from "@/components/logo";
import Link from "next/link";
import {useCart} from "@/lib/cart";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

export function Header() {
    const {items} = useCart();
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    const [open, setOpen] = useState(false);

    const path = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [path]);

    return (
        <div
            className="flex items-center justify-between p-4 py-8 h-10 w-screen sticky top-0 z-10 bg-white/80 backdrop-blur">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger><Menu/></SheetTrigger>
                <SheetContent side="left">
                    <div className="flex flex-col gap-4 p-4">
                        <Link href="/" className={
                            path === "/" ? "font-bold" : ""
                        }>Products</Link>
                        <Link href="/cart" className={
                            path === "/cart" ? "font-bold" : ""
                        }>Cart</Link>
                        <Link href="/admin" className={
                            path === "/admin" ? "font-bold" : ""
                        }>Admin</Link>
                    </div>
                </SheetContent>
            </Sheet>
            <Link href="/"><Logo/></Link>
            <Link href="/cart" className="relative"><ShoppingCart/>
                {count > 0 && (
                    <div
                        className="absolute -top-2 -right-2 h-4 w-4 bg-black p-0.5 text-white text-xs
                        rounded-full flex items-center justify-center">
                        {count}
                    </div>
                )}
            </Link>
        </div>
    );
};