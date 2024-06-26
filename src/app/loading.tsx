import {Loader} from "lucide-react";

export default function Loading() {
    return (
        <div className="flex size-full items-center justify-center">
            <Loader className="size-16 animate-spin"></Loader>
        </div>
    );
};