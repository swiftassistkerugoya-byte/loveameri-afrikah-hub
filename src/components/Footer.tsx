import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin } from "lucide-react";
import { useCompanySettings } from "@/hooks/useCompanySettings";

const Footer = () => {
  const { data: settings } = useCompanySettings();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6 text-accent" />
              <div>
                <h3 className="font-bold text-lg">{settings?.company_name || "LoveAmeriAfrikah"}</h3>
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
                  <a href={`mailto:${settings?.company_email}`} className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                    {settings?.company_email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-accent shrink-0" />
                <div>
                  <a href={`tel:${settings?.company_phone}`} className="opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                    {settings?.company_phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-accent shrink-0" />
                <span className="opacity-80">
                  {settings?.company_address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 text-center text-sm opacity-80 space-y-2">
          <p>&copy; {new Date().getFullYear()} {settings?.company_name}. All rights reserved.</p>
          <p className="flex items-center justify-center gap-2 flex-wrap">
            Developed with ❤️ by{" "}
            <a 
              href="mailto:info@labankhisa.co.ke" 
              className="font-semibold text-accent hover:underline inline-flex items-center gap-1"
            >
              Laban Panda Khisa
              <Mail className="h-3 w-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
