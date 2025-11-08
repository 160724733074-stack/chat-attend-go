import { Button } from "@/components/ui/button";
import { QrCode, MapPin, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-attendance.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Students collaborating in modern classroom" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-2xl space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Smart Attendance
              <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Location Verified
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              QR code-based attendance tracking with real-time location verification. 
              Effortless for students, powerful for educators.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="gradient" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">Learn More</a>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground shadow-soft">
              <QrCode className="w-4 h-4" />
              <span className="text-sm font-medium">QR Check-In</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground shadow-soft">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Location Verified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground shadow-soft">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-medium">Real-time Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
