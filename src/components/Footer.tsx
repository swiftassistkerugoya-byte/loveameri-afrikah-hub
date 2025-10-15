import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-accent" />
              <div>
                <h3 className="font-bold text-lg">LoveAmeriAfrikah</h3>
                <p className="text-xs opacity-80">ENTERPRISES LTD</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Empowering Global Trade, Consultancy & Healthcare Solutions
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/services" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Our Services</Link></li>
              <li><Link to="/products" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Products</Link></li>
              <li><Link to="/branches" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">Branches</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Business Consultancy</li>
              <li>Marketing & Management</li>
              <li>Equipment Supply</li>
              <li>Healthcare Solutions</li>
              <li>Bottled Water Distribution</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-accent shrink-0" />
                <div>
                  <a href="mailto:info@loveameriafrikah.com" className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                    info@loveameriafrikah.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-accent shrink-0" />
                <span className="opacity-80">
                  28 North Cleveland Ave, Hagerstown, MD, USA
                </span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-accent shrink-0" />
                <span className="opacity-80">
                  Precious Plaza, Suite #30, Nairobi, Kenya
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} LoveAmeriAfrikah Enterprises Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
