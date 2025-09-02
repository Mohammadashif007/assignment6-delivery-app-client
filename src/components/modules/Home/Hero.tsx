import heroImage from "../../../assets/images/hero.jpg";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Text content */}
      <div className="relative z-10 max-w-4xl px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Welcome to Our Website
        </h1>
        <p className="text-lg md:text-2xl text-white mb-6">
          We provide amazing services to help your business grow.
        </p>
        <button className="bg-white text-black font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition cursor-pointer">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
