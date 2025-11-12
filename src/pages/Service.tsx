import { useState } from "react";
import { Link } from "react-router";
import { motion, cubicBezier } from "framer-motion";
import {
    FaTruck,
    FaBoxOpen,
    FaShippingFast,
    FaWarehouse,
    FaMapMarkedAlt,
    FaClipboardList,
} from "react-icons/fa";

const servicesData = [
    {
        icon: <FaTruck />,
        name: "Express Delivery",
        description:
            "Fast and reliable delivery within 24 hours for urgent packages.",
        link: "/services/express-delivery",
    },
    {
        icon: <FaBoxOpen />,
        name: "Parcel Packaging",
        description:
            "Secure packaging solutions for fragile and valuable items.",
        link: "/services/parcel-packaging",
    },
    {
        icon: <FaShippingFast />,
        name: "Same Day Delivery",
        description:
            "Get your parcels delivered on the same day to local destinations.",
        link: "/services/same-day-delivery",
    },
    {
        icon: <FaWarehouse />,
        name: "Warehousing",
        description: "Safe storage for your goods with inventory management.",
        link: "/services/warehousing",
    },
    {
        icon: <FaMapMarkedAlt />,
        name: "Route Optimization",
        description: "Efficient delivery routes to save time and cost.",
        link: "/services/route-optimization",
    },
    {
        icon: <FaClipboardList />,
        name: "Order Tracking",
        description:
            "Real-time tracking of your shipment from dispatch to delivery.",
        link: "/services/order-tracking",
    },
];

const ServicesPage = () => {
    const [services, setServices] = useState<typeof servicesData>([]);
    const [startLoading, setStartLoading] = useState(false);

    // Framer Motion variants
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: cubicBezier(0.25, 0.1, 0.25, 1),
            },
        },
    };

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                {/* Section header */}
                <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-2">
                    Our Services
                </p>
                <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-1 h-8 bg-black rounded"></div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        What We Offer
                    </h2>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
                    Explore our professional delivery services designed to make
                    shipping fast, safe, and reliable for your business or
                    personal needs.
                </p>

                {/* Services grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    onViewportEnter={() => {
                        setStartLoading(true);
                        // Simulate data fetching
                        setTimeout(() => {
                            setServices(servicesData);
                        }, 1000); // 1 second loading
                    }}
                >
                    {(startLoading
                        ? services.length > 0
                            ? services
                            : Array(6).fill({})
                        : Array(6).fill({})
                    ).map((service, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center justify-center text-center p-8 rounded-xl 
                         bg-gray-100 dark:bg-gray-800 
                         border border-transparent
                         hover:bg-transparent hover:border-black dark:hover:border-white 
                         shadow-md hover:shadow-xl
                         transition-all duration-500 ease-in-out"
                            variants={cardVariants}
                        >
                            {services[index] ? (
                                // Real content
                                <>
                                    <div className="text-5xl text-black dark:text-white mb-4 transition-transform duration-500 group-hover:scale-110">
                                        {services[index].icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        {services[index].name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        {services[index].description}
                                    </p>
                                    <Link
                                        to={services[index].link}
                                        className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
                                    >
                                        Learn More
                                    </Link>
                                </>
                            ) : (
                                // Skeleton
                                <>
                                    <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full mb-4 animate-pulse"></div>
                                    <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                                    <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
                                    <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesPage;
