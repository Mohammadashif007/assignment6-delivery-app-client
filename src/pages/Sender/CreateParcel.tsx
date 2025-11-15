import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";
import { useCreateParcelMutation } from "@/redux/features/sender/sender.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";


type ParcelFormValues = {
    weight: string;
    receiverId: string;
    originalAddress: string;
    destinationAddress: string;
};

const CreateParcel = () => {
    const navigate = useNavigate();
    const form = useForm<ParcelFormValues>({
        defaultValues: {
            weight: "",
            receiverId: "",
            originalAddress: "",
            destinationAddress: "",
        },
    });

    const [createParcel, { isLoading }] = useCreateParcelMutation();

    const onSubmit = async (values: ParcelFormValues) => {
        try {
            const parcel = await createParcel(values).unwrap();
            if (parcel.success) {
                toast.success("Parcel created successfully");
                form.reset();
                navigate("/sender/shipments");
            }
        } catch (error) {
            console.error("Error creating parcel:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-card rounded-lg shadow-sm my-8">
            <h2 className="text-2xl font-semibold mb-6 text-foreground">
                Create New Parcel
            </h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Parcel Weight</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g., 2kg" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="receiverId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Receiver ID</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Receiver ID"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="originalAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Original Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter pickup address"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="destinationAddress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Enter delivery address"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="bg-black text-white hover:bg-gray-800"
                    >
                        {isLoading ? "Creating..." : "Create Parcel"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateParcel;
