import { baseApi } from "@/redux/baseApi";

const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        userInfo: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
            }),
        }),
        getAllUser: builder.query({
            query: () => ({
                url: "/user",
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
        toggleBlockUser: builder.mutation({
            query: ({
                userId,
                isBlocked,
            }: {
                userId: string;
                isBlocked: boolean;
            }) => ({
                url: `/user/block/${userId}`,
                method: "PATCH",
                data: { isBlocked },
            }),
            invalidatesTags: ["Users"],
        }),
        toggleUnBlockUser: builder.mutation({
            query: ({
                userId,
                isBlocked,
            }: {
                userId: string;
                isBlocked: boolean;
            }) => ({
                url: `/user/unblock/${userId}`,
                method: "PATCH",
                data: { isBlocked },
            }),
            invalidatesTags: ["Users"],
        }),
    }),
});

export const {
    useUserInfoQuery,
    useGetAllUserQuery,
    useToggleBlockUserMutation,
    useToggleUnBlockUserMutation
} = userApi;
