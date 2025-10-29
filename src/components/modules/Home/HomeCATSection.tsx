import { Link, useNavigate } from "react-router";

const HomeCTASection = () => {
  const navigate = useNavigate();

  const handleSendParcel = () => {
    const token = localStorage.getItem("accessToken");
    if (token) navigate("/send-parcel");
    else navigate("/login");
  };

  return (
    <section
      className="relative flex flex-col items-center justify-center text-center py-24 px-6
                 bg-gradient-to-br from-background via-background/80 to-muted
                 dark:from-background-dark dark:via-background-dark/80 dark:to-muted-dark
                 overflow-hidden transition-colors duration-700"
    >
      {/* Background Decorative Circles */}
      <div className="absolute top-0 left-0 w-60 h-60
                      bg-primary/20 dark:bg-primary-dark/30
                      rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="absolute bottom-0 right-0 w-72 h-72
                      bg-secondary/20 dark:bg-secondary-dark/30
                      rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Text Content */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold
                       text-foreground dark:text-foreground-dark
                       mb-6 leading-tight">
          Fast, Safe & Reliable Parcel Delivery 🚚
        </h1>

        <p className="text-lg md:text-xl
                      text-muted-foreground dark:text-muted-foreground-dark
                      mb-10">
          Track your parcels instantly or send new deliveries with confidence — all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* Public CTA */}
          <Link
            to="/trackParcel"
            className="bg-primary text-primary-foreground
                       hover:bg-primary/90 dark:hover:bg-primary-dark/90
                       font-semibold px-8 py-3 rounded-full shadow-lg
                       hover:scale-105 transform transition-all duration-300"
          >
            Track Parcel
          </Link>

          {/* Private CTA */}
          <button
            onClick={handleSendParcel}
            className="bg-background text-foreground border-2 border-primary
                       dark:bg-background-dark dark:text-foreground-dark dark:border-primary-dark
                       font-semibold px-8 py-3 rounded-full shadow-md
                       hover:bg-accent hover:text-accent-foreground
                       dark:hover:bg-accent-dark/30 dark:hover:text-accent-foreground-dark
                       hover:scale-105 transform transition-all duration-300"
          >
            Send a Parcel
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeCTASection;
