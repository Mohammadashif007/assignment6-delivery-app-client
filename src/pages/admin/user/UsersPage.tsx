import {
  useGetAllUserQuery,
  useToggleBlockUserMutation,
  useToggleUnBlockUserMutation,
} from "@/redux/features/user/user.api";
import UserList from "./UserList";


const UsersPage = () => {
  const { data, isLoading } = useGetAllUserQuery(undefined);

  const [blockUser] = useToggleBlockUserMutation();
  const [unblockUser] = useToggleUnBlockUserMutation();

  const handleToggleBlock = async (userId: string, isBlocked: boolean) => {
    try {
      if (isBlocked) {
        // currently blocked, so unblock
        await unblockUser({ userId, isBlocked: false }).unwrap();
      } else {
        // currently active, so block
        await blockUser({ userId, isBlocked: true }).unwrap();
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
    }
  };

  if (isLoading) {
    return <p className="text-muted-foreground">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">All Users</h2>
      <UserList
        users={data?.data || []}
        onToggleBlock={handleToggleBlock}
      />
    </div>
  );
};

export default UsersPage;
