import { Link } from "react-router";
import {
  FaTruck,
  FaBoxOpen,
  FaShippingFast,
  FaWarehouse,
  FaMapMarkedAlt,
  FaClipboardList,
} from "react-icons/fa";

const services = [
  {
    icon: <FaTruck />,
    name: "Express Delivery",
    description: "Fast and reliable delivery within 24 hours for urgent packages.",
    link: "/services/express-delivery",
  },
  {
    icon: <FaBoxOpen />,
    name: "Parcel Packaging",
    description: "Secure packaging solutions for fragile and valuable items.",
    link: "/services/parcel-packaging",
  },
  {
    icon: <FaShippingFast />,
    name: "Same Day Delivery",
    description: "Get your parcels delivered on the same day to local destinations.",
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
    description: "Real-time tracking of your shipment from dispatch to delivery.",
    link: "/services/order-tracking",
  },
];

const ServicesPage = () => {
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
          Explore our professional delivery services designed to make shipping
          fast, safe, and reliable for your business or personal needs.
        </p>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center p-8 rounded-xl 
                         bg-gray-100 dark:bg-gray-800 
                         border border-transparent
                         hover:bg-transparent hover:border-black dark:hover:border-white 
                         shadow-md hover:shadow-xl
                         transition-all duration-500 ease-in-out"
            >
              {/* Icon */}
              <div className="text-5xl text-black dark:text-white mb-4 transition-transform duration-500 group-hover:scale-110">
                {service.icon}
              </div>

              {/* Service name */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {service.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {service.description}
              </p>

              {/* Button */}
              <Link
                to={service.link}
                className="bg-black hover:bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
              >
                Learn More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
