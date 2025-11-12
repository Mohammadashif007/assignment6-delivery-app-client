/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcel.api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Cell,
} from "recharts";

export function ParcelStatistics() {
    // Fetch real parcel data
    const { data, isLoading, isError } = useGetAllParcelQuery(undefined);

    // Loading skeleton
    if (isLoading) {
        return (
            <div className="space-y-6 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl"
                    />
                ))}
            </div>
        );
    }

    // Error state
    if (isError || !data) {
        return (
            <p className="text-center py-10 text-red-500">
                Failed to load parcel data.
            </p>
        );
    }

    const parcels = Array.isArray(data.data) ? data.data : [];

    // Compute real stats
    const stats = [
        { title: "Total Parcels", value: parcels.length, color: "#3B82F6" },
        {
            title: "Delivered Parcels",
            value: parcels.filter((p: any) => p.parcelStatus === "DELIVERED").length,
            color: "#22C55E",
        },
        {
            title: "Pending Parcels",
            value: parcels.filter((p: any) => p.parcelStatus === "PENDING").length,
            color: "#EAB308",
        },
        {
            title: "Cancelled",
            value: parcels.filter((p: any) => p.parcelStatus === "CANCEL").length,
            color: "#EF4444",
        },
    ];

    return (
        <div className="p-6 space-y-10">
            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                📊 Dashboard Overview
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 flex flex-col items-center justify-center"
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mb-3"
                            style={{ backgroundColor: stat.color }}
                        >
                            {stat.title[0]}
                        </div>
                        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {stat.title}
                        </h2>
                        <p className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center">
                    📦 Parcel Summary
                </h2>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={stats}
                            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#ccc"
                            />
                            <XAxis dataKey="title" tick={{ fill: "#888" }} />
                            <YAxis tick={{ fill: "#888" }} />
                            <Tooltip
                                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    borderRadius: "10px",
                                    border: "1px solid #ddd",
                                }}
                            />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                                {stats.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
