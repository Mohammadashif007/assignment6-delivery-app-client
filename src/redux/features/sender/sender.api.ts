import { baseApi } from "@/redux/baseApi";

const senderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createParcel: builder.mutation({
            query: (parcelInfo) => ({
                url: "/parcels",
                method: "POST",
                data: parcelInfo,
            }),
        }),
    }),
});

export const { useCreateParcelMutation } = senderApi;
