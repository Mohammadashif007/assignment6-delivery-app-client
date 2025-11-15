/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface ParcelListProps {
    parcelLists: any;
    handleToggleBlock: (id: string, isBlocked: boolean) => void;
    handleParcelDispatch: (id: string) => void;
    handleInTransitParcel: (id: string) => void;
    handleOutForDeliveryParcel: (id: string) => void;
}

const ParcelList = ({
    parcelLists = [],
    handleToggleBlock,
    handleParcelDispatch,
    handleInTransitParcel,
    handleOutForDeliveryParcel,
}: ParcelListProps) => {
    console.log(parcelLists);
    const parcels = parcelLists.parcelData;
    if (!parcels?.length) {
        return (
            <p className="text-muted-foreground text-center py-4">
                No parcels found.
            </p>
        );
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>Sender Name</TableHead>
                    <TableHead>Receiver Name</TableHead>
                    <TableHead>Price (BDT)</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Current Status</TableHead>
                    <TableHead>Active Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {parcels.map((parcel: any) => {
                    const status =
                        parcel.parcelStatus?.toUpperCase?.() || "UNKNOWN";

                    return (
                        <TableRow key={parcel._id || parcel.trackingId}>
                            <TableCell>{parcel.trackingId || "N/A"}</TableCell>
                            <TableCell>
                                {parcel?.senderId?.name || "Unknown Sender"}
                            </TableCell>
                            <TableCell>
                                {parcel?.receiverId?.name || "Unknown Receiver"}
                            </TableCell>
                            <TableCell>{parcel?.price ?? "N/A"}</TableCell>
                            <TableCell>
                                {parcel?.originalAddress || "N/A"}
                            </TableCell>
                            <TableCell>
                                {parcel?.destinationAddress || "N/A"}
                            </TableCell>
                            <TableCell>{parcel?.weight || "N/A"}</TableCell>

                            {/* Status badge */}
                            <TableCell>
                                <span
                                    className={`border py-1 px-3 rounded-full text-sm font-medium ${
                                        status === "PENDING"
                                            ? "bg-amber-300 dark:bg-amber-600 text-black"
                                            : status === "DISPATCH"
                                            ? "bg-blue-400 dark:bg-blue-700 text-white"
                                            : status === "IN_TRANSIT"
                                            ? "bg-purple-400 dark:bg-purple-700 text-white"
                                            : status === "OUT_FOR_DELIVERY"
                                            ? "bg-orange-400 dark:bg-orange-700 text-white"
                                            : status === "DELIVERED"
                                            ? "bg-green-500 dark:bg-green-700 text-white"
                                            : status === "CANCEL"
                                            ? "bg-red-400 dark:bg-red-700 text-white"
                                            : "bg-gray-300 dark:bg-gray-700 text-white"
                                    }`}
                                >
                                    {status}
                                </span>
                            </TableCell>

                            {/* Active / Blocked */}
                            <TableCell>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        parcel.isBlocked
                                            ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                            : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                    }`}
                                >
                                    {parcel.isBlocked ? "Blocked" : "Active"}
                                </span>
                            </TableCell>

                            {/* Action Buttons */}
                            <TableCell className="space-x-2">
                                <Button
                                    onClick={() =>
                                        handleToggleBlock(
                                            parcel._id,
                                            parcel.isBlocked
                                        )
                                    }
                                    className={`${
                                        parcel.isBlocked
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-red-500 hover:bg-red-600"
                                    } cursor-pointer`}
                                >
                                    {parcel.isBlocked ? "Unblock" : "Block"}
                                </Button>

                                {status === "PENDING" ? (
                                    <Button
                                        onClick={() =>
                                            handleParcelDispatch(parcel._id)
                                        }
                                        className="cursor-pointer"
                                    >
                                        Dispatch
                                    </Button>
                                ) : status === "DISPATCH" ? (
                                    <Button
                                        onClick={() =>
                                            handleInTransitParcel(parcel._id)
                                        }
                                        className="cursor-pointer"
                                    >
                                        In-Transit
                                    </Button>
                                ) : status === "IN_TRANSIT" ? (
                                    <Button
                                        onClick={() =>
                                            handleOutForDeliveryParcel(
                                                parcel._id
                                            )
                                        }
                                        className="cursor-pointer"
                                    >
                                        Out For Delivery
                                    </Button>
                                ) : status === "OUT_FOR_DELIVERY" ? (
                                    <Button disabled>
                                        Delivery Man On The Way
                                    </Button>
                                ) : status === "DELIVERED" ? (
                                    <Button disabled>Delivered</Button>
                                ) : status === "CANCEL" ? (
                                    <Button disabled>Cancelled</Button>
                                ) : null}
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};

export default ParcelList;
