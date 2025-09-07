/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDeliveryHistoryQuery } from "@/redux/features/receiver/receiver.api";
import { CheckCircle, Clock, Truck, XCircle } from "lucide-react";
import type { JSX } from "react";

const statusIcons: Record<string, JSX.Element> = {
    DELIVERED: <CheckCircle className="text-green-600" size={20} />,
    PENDING: <Clock className="text-yellow-600" size={20} />,
    IN_TRANSIT: <Truck className="text-blue-600" size={20} />,
    CANCEL: <XCircle className="text-red-600" size={20} />,
};

const statusColors: Record<string, string> = {
    DELIVERED: "bg-green-100 text-green-800",
    PENDING: "bg-yellow-100 text-yellow-800",
    IN_TRANSIT: "bg-blue-100 text-blue-800",
    CANCEL: "bg-red-100 text-red-800",
};

const DeliveryHistoryList = () => {
    const { data, isLoading } = useGetDeliveryHistoryQuery(undefined);

    if (isLoading) {
        return <p className="text-center py-6">Loading history...</p>;
    }

    const parcels = data?.data || [];

    return (
        <div className="space-y-6">
            {parcels.map((parcel: any) => (
                <Card
                    key={parcel._id}
                    className="shadow-md border border-gray-200 dark:border-gray-700"
                >
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            {statusIcons[parcel.parcelStatus] || (
                                <Clock size={20} />
                            )}
                            {parcel.trackingId}
                        </CardTitle>
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                                statusColors[parcel.parcelStatus] ||
                                "bg-gray-200 text-gray-800"
                            }`}
                        >
                            {parcel.parcelStatus}
                        </span>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                            <p>
                                <span className="font-semibold">From:</span>{" "}
                                {parcel.originalAddress}
                            </p>
                            <p>
                                <span className="font-semibold">To:</span>{" "}
                                {parcel.destinationAddress}
                            </p>
                            <p>
                                <span className="font-semibold">Weight:</span>{" "}
                                {parcel.weight} kg
                            </p>
                            <p>
                                <span className="font-semibold">Price:</span>{" "}
                                {parcel.price} ৳
                            </p>
                            <p>
                                <span className="font-semibold">
                                    Received At:
                                </span>{" "}
                                {new Date(parcel.updatedAt).toLocaleString()}
                            </p>
                        </div>

                        {/* Status timeline (if available) */}
                        {parcel.statusLog && parcel.statusLog.length > 0 && (
                            <div className="mt-4">
                                <h4 className="text-sm font-bold mb-2">
                                    📍 Delivery Timeline
                                </h4>
                                <div className="border-l-2 border-gray-300 dark:border-gray-600 ml-2 space-y-2">
                                    {parcel.statusLog.map(
                                        (log: any, i: number) => (
                                            <div
                                                key={i}
                                                className="ml-4 relative"
                                            >
                                                <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-blue-500"></div>
                                                <p className="text-xs text-gray-700 dark:text-gray-300">
                                                    <span className="font-semibold">
                                                        {log.status}
                                                    </span>{" "}
                                                    –{" "}
                                                    {new Date(
                                                        log.timestamp
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default DeliveryHistoryList;
