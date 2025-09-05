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

const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_TRANSIT: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
};

const ParcelList = ({ parcels }: { parcels: Parcel[] }) => {
    const [cancelParcel] = useCancelParcelMutation();

    if (!parcels?.length) {
        return <p className="text-muted-foreground">No parcels found.</p>;
    }

    const handleCancel = async (id: string) => {
        try {
            await cancelParcel(id).unwrap();
        } catch (err) {
            console.error("Failed to cancel parcel:", err);
        }
    };

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
                                    statusColors[parcel.parcelStatus] ||
                                    "bg-gray-200"
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

                        {/* Cancel Button only if status = PENDING */}
                        {parcel.parcelStatus === "PENDING" && (
                            <Button
                                onClick={() => handleCancel(parcel._id)}
                                className="mt-4 bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                            >
                                Cancel Parcel
                            </Button>
                        )}

                        {/* Status Log Timeline */}
                        <div className="mt-4">
                            <h4 className="font-medium mb-2">Status Log</h4>
                            <ul className="border-l pl-5 space-y-2">
                                {parcel.statusLog.map((log, i) => (
                                    <li key={i} className="relative">
                                        <div className="absolute -left-4 top-1 w-3 h-3 rounded-full bg-gray-400"></div>
                                        <p className="text-sm ">
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
