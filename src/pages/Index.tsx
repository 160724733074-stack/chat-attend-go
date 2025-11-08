import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RoleFeatures from "@/components/RoleFeatures";
import KeyFeatures from "@/components/KeyFeatures";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <RoleFeatures />
      <div id="features">
        <KeyFeatures />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
