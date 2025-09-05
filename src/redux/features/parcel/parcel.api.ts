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
        dispatchParcel: builder.query({
            query: (parcelId) => ({
                url: `/parcels/dispatch/${parcelId}`,
                method: "POST",
            }),
            providesTags: ["Parcels"],
        }),
    }),
});

export const { useGetAllParcelQuery } = parcelApi;
