// src/components/admin/UserList.tsx
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
};

const UserList = ({
    users,
    onToggleBlock,
}: {
    users: User[];
    onToggleBlock: (id: string, isBlocked: boolean) => void;
}) => {
    if (!users?.length) {
        return <p className="text-muted-foreground">No users found.</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="capitalize">
                            {user.role}
                        </TableCell>
                        <TableCell>
                            <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                    user.isBlocked
                                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                }`}
                            >
                                {user.isBlocked ? "Blocked" : "Active"}
                            </span>
                        </TableCell>
                        <TableCell className="text-right">
                            <Button
                                className="cursor-pointer"
                                variant={
                                    user.isBlocked ? "default" : "destructive"
                                }
                                size="sm"
                                onClick={() =>
                                    onToggleBlock(user._id, user.isBlocked)
                                }
                            >
                                {user.isBlocked ? "Unblock" : "Block"}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserList;
