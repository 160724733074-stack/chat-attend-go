import { QrCode, MessageSquare, Mail, BarChart3, MapPin, Zap } from "lucide-react";

const features = [
  {
    icon: QrCode,
    title: "QR Code Generation",
    description: "Professors can instantly generate unique QR codes for each course session"
  },
  {
    icon: MapPin,
    title: "Location Verification",
    description: "Automatic GPS verification ensures students are physically present"
  },
  {
    icon: MessageSquare,
    title: "Chat-Based Analytics",
    description: "Natural language queries to filter, analyze, and export attendance data"
  },
  {
    icon: BarChart3,
    title: "Real-Time Charts",
    description: "Generate bar, pie, and line charts on demand for attendance insights"
  },
  {
    icon: Mail,
    title: "Email Integration",
    description: "Send automated emails to students based on attendance thresholds"
  },
  {
    icon: Zap,
    title: "Instant Check-In",
    description: "Students scan and check in within seconds - no complex forms"
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-24">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Powerful Features</h2>
          <p className="text-xl text-muted-foreground">
            Everything you need for modern attendance management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="group p-6 rounded-xl bg-card border shadow-soft hover:shadow-medium transition-all duration-300 hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
