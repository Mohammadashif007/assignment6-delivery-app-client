import { baseApi } from "@/redux/baseApi";

const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllParcel: builder.query({
            query: () => ({
                url: "/parcels/admin",
                method: "GET",
            }),
            providesTags: ["Parcels"],
        }),
        dispatchParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/dispatch/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),
        inTransitParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/in-transit/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),
        outForDeliveryParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/out-for-delivery/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),
        confirmDeliveryParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/confirm-delivery/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),
        blockParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/block/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
        }),
        unBlockParcel: builder.mutation({
            query: (parcelId) => ({
                url: `/parcels/unblock/${parcelId}`,
                method: "PATCH",
            }),
            invalidatesTags: ["Parcels"],
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
} = parcelApi;
