import {
    useConfirmParcelDeliveryMutation,
    useGetIncomingParcelsQuery,
} from "@/redux/features/receiver/receiver.api";
import ReceiverParcelList from "./ReceiverParcelList";
import { toast } from "sonner";

const ReceiverParcelPage = () => {
    const { data, isLoading } = useGetIncomingParcelsQuery(undefined);
    const [confirmParcelDelivery] = useConfirmParcelDeliveryMutation();

    if (isLoading) return <p>Loading your parcels...</p>;
    const parcels = data?.data || [];

    const handleConfirmDelivery = async (parcelId: string) => {
        try {
            const result = await confirmParcelDelivery(parcelId);
            if (result?.data?.success) {
                toast.success(result.data.message);
            }
        } catch (error) {
            console.error("Failed to confirm delivery", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📦 My Incoming Parcels</h1>
            <ReceiverParcelList
                parcels={parcels}
                handleConfirmDelivery={handleConfirmDelivery}
            />
        </div>
    );
};

export default ReceiverParcelPage;
