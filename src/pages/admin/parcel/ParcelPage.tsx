import {
    useBlockParcelMutation,
    useUnBlockParcelMutation,
    useGetAllParcelQuery,
    useDispatchParcelMutation,
    useInTransitParcelMutation,
    useOutForDeliveryParcelMutation,
} from "@/redux/features/parcel/parcel.api";
import ParcelList from "./ParcelList";
import { toast } from "sonner";

const ParcelPage = () => {
    const { data, isLoading } = useGetAllParcelQuery(undefined);
    const [blockParcel] = useBlockParcelMutation();
    const [unBlockParcel] = useUnBlockParcelMutation();
    const [dispatchParcel] = useDispatchParcelMutation();
    const [inTransitParcel] = useInTransitParcelMutation();
    const [outForDeliveryParcel] = useOutForDeliveryParcelMutation();

    if (isLoading)
        return <p className="text-muted-foreground">Loading parcels...</p>;

    const parcelData = data?.data || [];


    // ! handle toggle block/unblock parcel
    const handleToggleBlock = async (parcelId: string, isBlocked: boolean) => {
        try {
            if (isBlocked) {
                await unBlockParcel(parcelId).unwrap();
            } else {
                await blockParcel(parcelId).unwrap();
            }
        } catch (err) {
            console.error("Failed to toggle block:", err);
        }
    };

    // ! handle dispatch parcel
    const handleParcelDispatch = async (parcelId: string) => {
        try {
            const result = await dispatchParcel(parcelId);
            if (result?.data?.success) {
                toast.success(result?.data?.message);
            }
        } catch (error) {
            console.error("Failed to dispatch parcel", error);
        }
    };

    // ! handle in-transit parcel
    const handleInTransitParcel = async (parcelId: string) => {
        try {
            const result = await inTransitParcel(parcelId);
            if (result?.data?.success) {
                toast.success(result?.data?.message);
            }
        } catch (error) {
            console.error(
                "Failed to update parcel status to IN_TRANSIT",
                error
            );
        }
    };

    // ! out for delivery parcel
    const handleOutForDeliveryParcel = async (parcelId: string) => {
        try {
            const result = await outForDeliveryParcel(parcelId);
            if (result?.data?.success) {
                toast.success(result?.data?.message);
            }
        } catch (error) {
            console.error(
                "Failed to update parcel status to OUT_FOR_DELIVERY",
                error
            );
        }
    };

    return (
        <div className="p-6">
            <ParcelList
                parcelLists={parcelData}
                handleToggleBlock={handleToggleBlock}
                handleParcelDispatch={handleParcelDispatch}
                handleInTransitParcel={handleInTransitParcel}
                handleOutForDeliveryParcel={handleOutForDeliveryParcel}
            />
        </div>
    );
};

export default ParcelPage;
