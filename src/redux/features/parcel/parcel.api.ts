import { baseApi } from "@/redux/baseApi";

const parcelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllParcels: builder.query({
            query: () => ({
                url: "/parcels/admin",
                method: "GET",
            }),
        }),
    }),
});

export const {useGetAllParcelsQuery} = parcelApi;
