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

type ReceiverParcelListProps = {
    parcels: any[];
    handleConfirmDelivery: (parcelId: string) => void;
};

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-500 dark:bg-yellow-600 text-white",
    DISPATCH: "bg-blue-500 dark:bg-blue-600 text-white",
    IN_TRANSIT: "bg-purple-500 dark:bg-purple-600 text-white",
    OUT_FOR_DELIVERY: "bg-orange-500 dark:bg-orange-600 text-white",
    DELIVERED: "bg-green-500 dark:bg-green-600 text-white",
    CANCEL: "bg-red-500 dark:bg-red-600 text-white",
};

const ReceiverParcelList = ({
    parcels,
    handleConfirmDelivery,
}: ReceiverParcelListProps) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tracking ID</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {parcels.map((parcel) => (
                    <TableRow key={parcel._id}>
                        <TableCell>{parcel.trackingId}</TableCell>
                        <TableCell>{parcel.originalAddress}</TableCell>
                        <TableCell>{parcel.destinationAddress}</TableCell>
                        <TableCell>{parcel.weight} kg</TableCell>
                        <TableCell>{parcel.price} ৳</TableCell>
                        <TableCell>
                            <span
                                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                    statusColors[parcel.parcelStatus] ||
                                    "bg-gray-200 text-gray-800"
                                }`}
                            >
                                {parcel.parcelStatus}
                            </span>
                        </TableCell>
                        <TableCell>
                            {parcel.parcelStatus === "OUT_FOR_DELIVERY" ? (
                                <Button
                                    onClick={() =>
                                        handleConfirmDelivery(parcel._id)
                                    }
                                    className="bg-green-500 hover:bg-green-700 cursor-pointer"
                                >
                                    DELIVERED
                                </Button>
                            ) : null}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ReceiverParcelList;
