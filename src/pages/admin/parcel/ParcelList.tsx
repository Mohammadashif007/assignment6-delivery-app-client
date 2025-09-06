import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const ParcelList = ({
    parcels,
    handleToggleBlock,
    handleParcelDispatch,
    handleInTransitParcel,
    handleOutForDeliveryParcel,
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>TrackingId</TableHead>
                    <TableHead>Sender Name</TableHead>
                    <TableHead>Receiver Name</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Current Status</TableHead>
                    <TableHead>Active Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {parcels.map((parcel) => (
                    <TableRow key={parcel._id}>
                        <TableCell>{parcel.trackingId}</TableCell>
                        <TableCell>{parcel.senderId.name}</TableCell>
                        <TableCell>{parcel.receiverId.name}</TableCell>
                        <TableCell>{parcel.price}</TableCell>
                        <TableCell>{parcel.originalAddress}</TableCell>
                        <TableCell>{parcel.destinationAddress}</TableCell>
                        <TableCell>{parcel.weight}</TableCell>
                        <TableCell>
                            <span
                                className={`border-1 py-1 px-3 rounded-full text-sm font-medium ${
                                    parcel.parcelStatus === "PENDING"
                                        ? "bg-amber-300 dark:bg-amber-600 text-black"
                                        : parcel.parcelStatus === "DISPATCH"
                                        ? "bg-blue-400 dark:bg-blue-700 text-white"
                                        : parcel.parcelStatus === "IN_TRANSIT"
                                        ? "bg-purple-400 dark:bg-purple-700 text-white"
                                        : parcel.parcelStatus ===
                                          "OUT_FOR_DELIVERY"
                                        ? "bg-orange-400 dark:bg-orange-700 text-white"
                                        : parcel.parcelStatus === "DELIVERED"
                                        ? "bg-green-500 dark:bg-green-700 text-white"
                                        : "bg-red-400 dark:bg-red-700 text-white"
                                }`}
                            >
                                {parcel.parcelStatus === "PENDING"
                                    ? "PENDING"
                                    : parcel.parcelStatus === "DISPATCH"
                                    ? "DISPATCH"
                                    : parcel.parcelStatus === "IN_TRANSIT"
                                    ? "IN_TRANSIT"
                                    : parcel.parcelStatus === "OUT_FOR_DELIVERY"
                                    ? "OUT_FOR_DELIVERY"
                                    : parcel.parcelStatus === "DELIVERED"
                                    ? "DELIVERED"
                                    : "CANCELLED"}
                            </span>
                        </TableCell>
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

                            {parcel.parcelStatus === "PENDING" ? (
                                <Button
                                    onClick={() =>
                                        handleParcelDispatch(parcel._id)
                                    }
                                    className="cursor-pointer"
                                >
                                    Dispatch
                                </Button>
                            ) : parcel.parcelStatus === "DISPATCH" ? (
                                <Button
                                    onClick={() =>
                                        handleInTransitParcel(parcel._id)
                                    }
                                    className="cursor-pointer"
                                >
                                    In-Transit
                                </Button>
                            ) : parcel.parcelStatus === "IN_TRANSIT" ? (
                                <Button
                                    onClick={() =>
                                        handleOutForDeliveryParcel(parcel._id)
                                    }
                                >
                                    OUT FOR DELIVERY
                                </Button>
                            ) : parcel.parcelStatus === "OUT_FOR_DELIVERY" ? (
                                <Button disabled>
                                    Delivery man on the way
                                </Button>
                            ) : parcel.parcelStatus === "DELIVERED" ? (
                                <Button disabled>DELIVERED</Button>
                            ) : parcel.parcelStatus === "CANCEL" ? (
                                <Button disabled>Cancelled</Button>
                            ) : null}

                            {/* <Button
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
                            </Button> */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ParcelList;
