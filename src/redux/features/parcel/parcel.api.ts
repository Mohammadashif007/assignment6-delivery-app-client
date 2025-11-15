import { baseApi } from "@/redux/baseApi";

const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // ! get all parcels by admin
        getAllParcel: builder.query({
            query: () => ({
                url: "/parcels/admin",
                method: "GET",
            }),
            providesTags: ["Parcels"],
        }),

        // ! dispatch parcel by admin
        dispatchParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/dispatch/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),

        // ! update status in-transit
        inTransitParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/in-transit/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),

        // ! update status out-for-delivery
        outForDeliveryParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/out-for-delivery/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),

        // ! update status confirm delivery
        confirmDeliveryParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/confirm-delivery/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),

        // ! block parcel by admin
        blockParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/block/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),

        // ! unblock parcel by admin
        unBlockParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/unblock/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),

        // ! track parcel
        trackParcel: builder.query({
            query: (trackingId) => ({
                url: `/parcels/track/${trackingId}`,
                method: "GET",
            }),
            providesTags: (result, error, trackingId) => [
                { type: "Parcels", id: trackingId },
            ],
        }),
    }),
});

export const {
    useGetAllParcelQuery,
    useDispatchParcelMutation,
    useInTransitParcelMutation,
    useOutForDeliveryParcelMutation,
    // useConfirmDeliveryParcelMutation,
    useBlockParcelMutation,
    useUnBlockParcelMutation,
    useTrackParcelQuery,
} = parcelApi;
