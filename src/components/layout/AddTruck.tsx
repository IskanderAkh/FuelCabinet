import type { SubmitEvent } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

type AddTruckProps = {
    onClose: () => void;
};

export default function AddTruck({ onClose }: AddTruckProps) {
    const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Dialog open onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="flex max-h-[calc(100dvh-2rem)] w-full max-w-3xl flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
                <DialogHeader className="shrink-0 border-b px-6 py-5">
                    <DialogTitle className="text-2xl font-semibold">Add truck</DialogTitle>
                    <DialogDescription className="mt-1">
                    Enter the truck details below.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                    <section className="grid min-h-0 flex-1 gap-4 overflow-y-auto p-6 sm:grid-cols-2">
                        <h2 className="text-lg font-medium sm:col-span-2">Truck information</h2>

                        <label className="flex flex-col gap-1 text-sm">
                        Truck name
                        <input name="name" required className="rounded-md border px-3 py-2" />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                        Registration number
                        <input name="registrationNumber" required className="rounded-md border px-3 py-2" />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                        Make
                        <input name="make" className="rounded-md border px-3 py-2" />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                        Model
                        <input name="model" className="rounded-md border px-3 py-2" />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                        Year
                        <input name="year" type="number" min="1900" max="2100" className="rounded-md border px-3 py-2" />
                        </label>
                        <label className="flex flex-col gap-1 text-sm">
                        Capacity (tons)
                        <input name="capacity" type="number" min="0" step="0.1" className="rounded-md border px-3 py-2" />
                        </label>
                    </section>

                    <div className="flex shrink-0 justify-end gap-3 border-t px-6 py-4">
                        <button type="button" onClick={onClose} className="rounded-md border px-4 py-2 font-medium hover:bg-gray-50">
                            Cancel
                        </button>
                        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                            Add truck
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
