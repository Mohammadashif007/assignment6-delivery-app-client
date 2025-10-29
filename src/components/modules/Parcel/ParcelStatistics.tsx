import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGetAllParcelQuery } from "@/redux/features/parcel/parcel.api";
import { BarChart, Bar, CartesianGrid, XAxis, PieChart, Pie, Cell, Tooltip } from "recharts";
import { format } from "date-fns";

const COLORS = ["#2563eb", "#60a5fa", "#22c55e", "#f59e0b", "#ef4444"];

const chartConfig = {
  parcels: { label: "Parcels", color: "#2563eb" },
} satisfies ChartConfig;

export function ParcelStatistics() {
  const { data, isLoading } = useGetAllParcelQuery(undefined);

  if (isLoading) {
    return <p className="text-center py-10">Loading parcel statistics...</p>;
  }

  // Safety check
  const parcelsData = Array.isArray(data?.data) ? data.data : [];
  if (!parcelsData.length) {
    return (
      <p className="text-center py-10 text-gray-500">
        No parcel data available for statistics.
      </p>
    );
  }

  // --- Monthly Shipments Bar Chart ---
  const monthlyCounts: Record<string, number> = {};
  parcelsData.forEach((parcel: any) => {
    if (!parcel.createdAt) return;
    const date = new Date(parcel.createdAt);
    if (isNaN(date.getTime())) return;
    const month = format(date, "MMM yyyy"); // Sep 2025
    monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
  });

  const barData = Object.entries(monthlyCounts).map(([month, total]) => ({ month, total }));

  // --- Delivery Status Pie Chart ---
  const statusCounts: Record<string, number> = {};
  parcelsData.forEach((parcel: any) => {
    const status = parcel.parcelStatus || "UNKNOWN";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
  });

  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  // --- Custom Tooltips ---
  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow border border-gray-200 dark:border-gray-700">
          <p className="text-gray-800 dark:text-gray-100 font-semibold">{`Month: ${payload[0].payload.month}`}</p>
          <p className="text-gray-600 dark:text-gray-300">{`Parcels: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload?.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow border border-gray-200 dark:border-gray-700">
          <p className="text-gray-800 dark:text-gray-100 font-semibold">{`Status: ${payload[0].name}`}</p>
          <p className="text-gray-600 dark:text-gray-300">{`Count: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Bar Chart - Monthly Shipments */}
      <ChartContainer
        config={chartConfig}
        className="h-[400px] w-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow"
      >
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          📦 Monthly Parcel Shipments
        </h2>
        <BarChart
          width={600}
          height={320}
          data={barData}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickMargin={10} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomBarTooltip />} />
          <Bar dataKey="total" fill="var(--color-parcels)" radius={[6, 6, 0, 0]} barSize={40} />
        </BarChart>
      </ChartContainer>

      {/* Pie Chart - Delivery Status */}
      <ChartContainer
        config={chartConfig}
        className="h-[400px] w-full bg-white dark:bg-gray-900 rounded-2xl p-6 shadow flex flex-col items-center justify-center"
      >
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-800 dark:text-gray-100">
          🚀 Parcel Delivery Status Distribution
        </h2>
        <PieChart width={350} height={350}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
          <ChartLegend content={<ChartLegendContent />} />
        </PieChart>
      </ChartContainer>
    </div>
  );
}
