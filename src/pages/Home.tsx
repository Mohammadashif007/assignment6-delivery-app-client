import AboutSection from "@/components/modules/Home/AboutSection";
import HeroSection from "@/components/modules/Home/Hero";
import HomeCATSection from "@/components/modules/Home/HomeCATSection";
import ServiceSection from "@/components/modules/Home/ServiceSection";

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <AboutSection></AboutSection>
            <ServiceSection></ServiceSection>
            <HomeCATSection></HomeCATSection>
        </div>
    );
};

export default Home;
