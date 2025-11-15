import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";

export default function FAQPage() {
    const faqs = [
        {
            question: "How do I send a parcel?",
            answer: "You can send a parcel by creating an account, filling in sender and receiver information, selecting parcel type, and completing payment.",
        },
        {
            question: "How can I track my parcel?",
            answer: "Enter your Tracking ID on the Tracking page. You'll see real-time updates such as Pending, In Transit, Out for Delivery, and Delivered.",
        },
        {
            question: "What items are restricted?",
            answer: "Hazardous chemicals, weapons, perishable food without proper packaging, and illegal items are not allowed.",
        },
        {
            question: "How long does delivery take?",
            answer: "Local deliveries take 24–48 hours. International shipping may take 5–10 business days depending on customs.",
        },
        {
            question: "What happens if my parcel is lost?",
            answer: "Contact support immediately with your Tracking ID. We will investigate and offer compensation based on our policy.",
        },
        {
            question: "Can I change the delivery address after booking?",
            answer: "Yes, but only before dispatch. After dispatch, changes may not be possible.",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Frequently Asked Questions
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
                Find answers to the most commonly asked questions about our
                parcel services.
            </p>

            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, i) => (
                    <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        className="border rounded-xl px-4"
                    >
                        <AccordionTrigger className="text-lg font-medium">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 dark:text-gray-300">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
