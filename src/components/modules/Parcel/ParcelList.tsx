import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCancelParcelMutation } from "@/redux/features/sender/sender.api";

type Parcel = {
    _id: string;
    trackingId: string;
    price: number;
    parcelStatus: string;
    originalAddress: string;
    destinationAddress: string;
    statusLog: {
        status: string;
        note: string;
        timestamp: string;
    }[];
};

// Stronger, more vibrant colors for badges and dots
const statusColors: Record<string, { badge: string; dot: string }> = {
    PENDING: {
        badge: "bg-yellow-500 text-yellow-900 dark:bg-yellow-700 dark:text-yellow-100",
        dot: "bg-yellow-500 dark:bg-yellow-600",
    },
    IN_TRANSIT: {
        badge: "bg-sky-300 text-sky-900 dark:bg-sky-700 dark:text-sky-100",
        dot: "bg-sky-500 dark:bg-sky-600",
    },
    DELIVERED: {
        badge: "bg-green-400 text-green-900 dark:bg-green-700 dark:text-green-100",
        dot: "bg-green-600 dark:bg-green-500",
    },
    CANCEL: {
        badge: "bg-red-400 text-red-900 dark:bg-red-700 dark:text-red-100",
        dot: "bg-red-600 dark:bg-red-500",
    },
};

const ParcelList = ({ parcels }: { parcels: Parcel[] }) => {
    const [cancelParcel] = useCancelParcelMutation();

    if (!parcels?.length) {
        return <p className="text-muted-foreground">No parcels found....</p>;
    }

    const handleCancel = async (id: string) => {
        try {
            await cancelParcel(id).unwrap();
        } catch (err) {
            console.error("Failed to cancel parcel:", err);
        }
    };

    // !console
    console.log("Parcel....",parcels);

    return (
        <div className="space-y-6">
            {parcels.map((parcel) => (
                <Card key={parcel._id} className="shadow-md">
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>{parcel.trackingId}</span>
                            <Badge
                                variant="outline"
                                className={
                                    statusColors[parcel.parcelStatus]?.badge ||
                                    "bg-gray-300 dark:bg-gray-700 dark:text-gray-100"
                                }
                            >
                                {parcel.parcelStatus}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            <strong>From:</strong> {parcel.originalAddress}
                        </p>
                        <p>
                            <strong>To:</strong> {parcel.destinationAddress}
                        </p>
                        <p>
                            <strong>Price:</strong> {parcel.price} BDT
                        </p>

                        {parcel.parcelStatus === "PENDING" && (
                            <Button
                                onClick={() => handleCancel(parcel._id)}
                                className="mt-4 bg-red-700 hover:bg-red-800 text-white dark:bg-red-900 dark:hover:bg-red-950"
                            >
                                Cancel Parcel
                            </Button>
                        )}

                        <div className="mt-4">
                            <h4 className="font-medium mb-2">Status Log</h4>
                            <ul className="border-l pl-5 space-y-2">
                                {parcel.statusLog?.map((log, i) => (
                                    <li key={i} className="relative">
                                        <div
                                            className={`absolute -left-4 top-1 w-3 h-3 rounded-full ${
                                                statusColors[log.status]?.dot ||
                                                "bg-gray-400 dark:bg-gray-500"
                                            }`}
                                        ></div>
                                        <p className="text-sm">
                                            <span className="font-semibold">
                                                {log.status}
                                            </span>{" "}
                                            – {log.note}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(
                                                log.timestamp
                                            ).toLocaleString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default ParcelList;
