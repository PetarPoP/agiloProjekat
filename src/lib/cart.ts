import {create} from "zustand";
import {persist} from "zustand/middleware";
import {Product} from "@prisma/client";

type CartItem = Product & { quantity: number };

type CartStore = {
    items: CartItem[];
    add: (item: CartItem) => void;
    remove: (item: CartItem) => void;
    clear: () => void;
    addQuantity: (item: CartItem) => void;
    removeQuantity: (item: CartItem) => void;
};

export const useCart = create(persist<CartStore>(
    (set, get) => ({
        items: [],
        add: item => {
            const existingItem = get().items.find(i => i.id === item.id
                && i.sizes[0] === item.sizes[0]
                && i.color[0] === item.color[0]);
            if (existingItem) {
                set(state => ({
                    items: state.items.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i),
                }));
            } else {
                set(state => ({items: [...state.items, {...item, quantity: 1}]}));
            }
        },
        remove: item => set(state => {
                const index = state.items.findIndex(i => i.id === item.id
                    && i.sizes[0] === item.sizes[0]
                    && i.color[0] === item.color[0]);
                if (index !== -1) {
                    state.items.splice(index, 1);
                }
                return {items: state.items};
            }
        ),
        clear: () => set({items: []}),
        addQuantity: item => set(state => ({
            items: state.items.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i),
        })),
        removeQuantity: item => {
            if (item.quantity === 1) {
                set(state => ({items: state.items.filter(i => i.id !== item.id)}));
            } else {
                set(state => ({
                    items: state.items.map(i => i.id === item.id ? {...i, quantity: i.quantity - 1} : i),
                }));
            }
        }
    }),
    {
        name: "cart",
    },
));