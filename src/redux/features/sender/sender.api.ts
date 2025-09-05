/* eslint-disable @typescript-eslint/no-explicit-any */
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
        getParcel: builder.query({
            query: () => ({
                url: "/parcels/me",
                method: "GET",
            }),
        }),
        cancelParcel: builder.mutation({
            query: (parcelId: string) => ({
                url: `/parcels/cancel/${parcelId}`,
                method: "PATCH",
            }),

            async onQueryStarted(parcelId, { dispatch, queryFulfilled }) {
                const patch = dispatch(
                    senderApi.util.updateQueryData(
                        "getParcel",
                        undefined,
                        (draft: any) => {
                            const target = draft?.data?.find(
                                (p: any) => p._id === parcelId
                            );
                            if (target) {
                                target.parcelStatus = "CANCELLED";
                                target.statusLog?.push?.({
                                    status: "CANCELLED",
                                    note: "cancelled by sender",
                                    timestamp: new Date().toISOString(),
                                });
                            }
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patch.undo();
                }
            },
        }),
    }),
});

export const {
    useCreateParcelMutation,
    useGetParcelQuery,
    useCancelParcelMutation,
} = senderApi;
