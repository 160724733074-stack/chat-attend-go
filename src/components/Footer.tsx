import { QrCode } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <QrCode className="w-5 h-5 text-primary-foreground" />
              </div>
              <span>AttendTrack</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Modern attendance tracking with location verification
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it Works</a></li>
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Users</h3>
            <ul className="space-y-2">
              <li><Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Students</Link></li>
              <li><Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Professors</Link></li>
              <li><Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Admins</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AttendTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
