import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import { useState } from "react";
import { useForm } from "react-hook-form";

const TrackParcelPage = () => {
    const [loading, setLoading] = useState(false);
    const [submittedId, setSubmittedId] = useState("");
    interface TrackingFormValues {
        trackingId: string;
    }

    const form = useForm<TrackingFormValues>({
        defaultValues: {
            trackingId: "",
        },
    });

    const {
        data: parcel,
        isLoading: isFetching,
        error,
    } = useTrackParcelQuery(submittedId, {
        skip: submittedId === "",
    });

    const onSubmit = async (data: TrackingFormValues) => {
        setLoading(true);
        console.log(data);
        setSubmittedId(data.trackingId);
        setLoading(false);
    };

    console.log(parcel);

    const updatedTime = parcel?.data?.statusLog.at(-1)?.timestamp;
    const localTime = new Date(updatedTime);
    const formattedTime = localTime.toDateString();

    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                    Track Your Parcel 🚚
                </h1>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col  justify-center sm:flex-row gap-3"
                    >
                        <FormField
                            control={form.control}
                            name="trackingId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter tracking ID"
                                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="sr-only">
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <Button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg 
                       transition-all duration-300 disabled:opacity-50"
                        >
                            {loading ? "Tracking..." : "Track"}
                        </Button> */}
                        <Button
                            type="submit"
                            disabled={isFetching}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg 
                       transition-all duration-300 disabled:opacity-50"
                        >
                            {isFetching ? "Tracking..." : "Track"}
                        </Button>
                    </form>
                </Form>
                {error && (
                    <p className="text-red-500 mt-4 text-center">
                        Parcel not found
                    </p>
                )}

                {parcel && (
                    <div className="mt-6 p-4 border-t border-gray-200 dark:border-gray-600 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Status: {parcel.data.parcelStatus}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Last Updated: {formattedTime}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Updated By:{" "}
                            {parcel?.data?.statusLog.at(-1)?.updatedBy}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Note: {parcel?.data?.statusLog.at(-1)?.note}
                        </p>
                        {parcel.location && (
                            <p className="text-gray-600 dark:text-gray-400">
                                Current Location: {parcel.location}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrackParcelPage;
