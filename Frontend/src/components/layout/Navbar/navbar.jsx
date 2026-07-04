import "./navbar.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const navLinks = [
    { label: "MANIFESTO", href: "#manifesto" },
    { label: "SYSTEM", href: "#system" },
    { label: "FLOW", href: "#flow" },
    { label: "PRICING", href: "#pricing" },
];

const Navbar = () => {
    return (
        <motion.div
            className="ed-nav"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
            <Link to="/" className="ed-nav-brand">
                DEVSYNC<sup>®</sup>
            </Link>

            <nav className="ed-nav-links">
                {navLinks.map((link, index) => (
                    <a key={link.label} href={link.href}>
                        <sup>0{index + 1}</sup>
                        <span data-text={link.label}>{link.label}</span>
                    </a>
                ))}
            </nav>

            <div className="ed-nav-actions">
                <Link to="/login" className="ed-nav-login">
                    LOG IN
                </Link>
                <Link to="/register" className="ed-nav-cta">
                    START <ArrowUpRight size={15} />
                </Link>
            </div>
        </motion.div>
    );
};

export default Navbar;
