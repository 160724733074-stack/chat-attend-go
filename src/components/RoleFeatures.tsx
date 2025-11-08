import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, Shield, QrCode, MessageSquare, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const roles = [
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Quick check-ins with automatic location verification",
    features: [
      "Scan QR codes for instant check-in",
      "View your attendance history",
      "Location-based verification",
      "No email verification needed"
    ],
    color: "primary",
  },
  {
    icon: Users,
    title: "For Professors",
    description: "Generate QR codes and monitor attendance in real-time",
    features: [
      "Generate course QR codes instantly",
      "Chat-based analytics interface",
      "Real-time attendance monitoring",
      "Filter and export attendance data"
    ],
    color: "accent",
  },
  {
    icon: Shield,
    title: "For Deans & Admins",
    description: "Complete oversight with advanced analytics",
    features: [
      "Institution-wide attendance view",
      "Generate custom reports and charts",
      "Email notifications to students",
      "Advanced filtering and analysis"
    ],
    color: "primary",
  },
];

const RoleFeatures = () => {
  return (
    <section id="how-it-works" className="py-24 bg-secondary/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Built for Everyone</h2>
          <p className="text-xl text-muted-foreground">
            Tailored experiences for students, professors, and administrators
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card 
                key={role.title} 
                className="shadow-medium hover:shadow-large transition-all duration-300 border-2 hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-${role.color}/10 flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 text-${role.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {role.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link to="/auth">Start Tracking Attendance</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RoleFeatures;
