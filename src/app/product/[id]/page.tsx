import {prisma} from "@/lib/prisma";
import {AddToCartForm} from "@/app/product/[id]/add-to-cart-form";

type Props = {
    params: {
        id: string;
    };
};

export default async function Page(props: Props) {
    const {id} = props.params;
    const item = await prisma.product.findUnique({
        where: {
            id: id,
        },
    });

    if (!item) {
        return <div>Product not found</div>;
    }

    return (
        <div
            className="flex md:flex-row flex-col items-center justify-between size-full animate-fade-in-up h-[calc(100dvh-4rem)]">
            <div className="md:w-1/2 w-full h-full flex items-center justify-center bg-[#F7F7FA] rounded-tr-lg">
                <img src={item.image} alt={item.name} className="size-2/3 object-contain mix-blend-multiply"/>
            </div>
            <AddToCartForm product={item}/>
        </div>
    );
};