import { Link } from "react-router";
import aboutBg from "../../src/assets/images/about-bg.jpg";
import aboutMain from "../../src/assets/images/main-about.png";

const About = () => {
  return (
    <section className="relative w-full py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Section */}
        <div>
          <p className="text-gray-500 uppercase tracking-wide text-sm font-medium mb-2">
            About Us
          </p>

          <div className="flex items-center gap-3 mb-6">
            {/* Accent bar in black */}
            <div className="w-1 h-8 bg-black rounded"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Who We Are
            </h2>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            We are a company with{" "}
            <span className="font-bold text-gray-900 dark:text-white">
              15+ years of experience
            </span>{" "}
            in delivering high-quality services. Our team has worked with{" "}
            <span className="font-bold text-black dark:text-white">
              over 500 clients
            </span>{" "}
            worldwide, ensuring exceptional growth and innovation.
          </p>

          <ul className="space-y-3 mb-6 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-black text-lg">✔</span> Trusted by top global brands
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black text-lg">✔</span> Innovative and scalable solutions
            </li>
            <li className="flex items-start gap-2">
              <span className="text-black text-lg">✔</span> Dedicated support and maintenance
            </li>
          </ul>

          <Link
            to="/about"
            className="inline-block bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            Learn More
          </Link>
        </div>

        {/* Right: Image Section */}
        <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${aboutBg})`,
            }}
          ></div>

          {/* Foreground main image centered */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={aboutMain}
              alt="About Company"
              className="w-4/5 md:w-3/4 rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
