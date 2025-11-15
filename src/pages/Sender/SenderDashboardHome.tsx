import ParcelList from "@/components/modules/Parcel/ParcelList";
import { useGetParcelQuery } from "@/redux/features/sender/sender.api";

const SenderDashboardHome = () => {
    const { data, isLoading } = useGetParcelQuery(undefined);
    console.log(data);

    if (isLoading) {
        return <p className="p-6 mx-auto text-center">Loading...🥱</p>;
    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">My Parcels</h2>
            <ParcelList parcels={data?.data || []} />
        </div>
    );
};

export default SenderDashboardHome;
