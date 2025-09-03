import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Validation schema
const parcelSchema = z.object({
  weight: z.string().min(1, "Weight is required"),
  price: z.string().min(1, "Price is required"),
  receiverId: z.string().min(1, "Receiver ID is required"),
  originalAddress: z.string().min(1, "Original address is required"),
  destinationAddress: z.string().min(1, "Destination address is required"),
});

type ParcelFormValues = z.infer<typeof parcelSchema>;

const AddParcel = () => {
  const form = useForm<ParcelFormValues>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      weight: "",
      price: "",
      receiverId: "",
      originalAddress: "",
      destinationAddress: "",
    },
  });

  const onSubmit = (data: ParcelFormValues) => {
    console.log("Parcel Submitted:", data);
    // 👉 Call your API mutation here
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-card rounded-2xl shadow-md my-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Parcel</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Weight */}
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 2kg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1200" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Receiver ID */}
          <FormField
            control={form.control}
            name="receiverId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Receiver ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Receiver ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Original Address */}
          <FormField
            control={form.control}
            name="originalAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="House #12, Road #3, Dhanmondi, Dhaka"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Destination Address */}
          <FormField
            control={form.control}
            name="destinationAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destination Address</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="House #45, Road #10, Uttara, Dhaka"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button type="submit" className="w-full cursor-pointer">
            Submit Parcel
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddParcel;
