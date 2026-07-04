import Intro from "../../components/layout/Intro/intro";
import Navbar from "../../components/layout/Navbar/navbar";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, Asterisk } from "lucide-react";
import "./landing.css";

const rise = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
};

const tickerWords = ["ORGANIZE", "SYNC", "BUILD", "SHIP", "REPEAT"];

const systemRows = [
    {
        num: "01",
        title: "ORGANIZATIONS",
        tag: "MISSION CONTROL",
        copy: "Forge a world for your crew — every team, project and file under one roof.",
    },
    {
        num: "02",
        title: "CREW & ROLES",
        tag: "ACCESS BY DESIGN",
        copy: "Owners command, members build. Secure invites snap people into place.",
    },
    {
        num: "03",
        title: "LIVE SIGNALS",
        tag: "ZERO NOISE",
        copy: "Invites, mentions, task moves — the right ping to the right human, instantly.",
    },
    {
        num: "04",
        title: "KANBAN FLOW",
        tag: "WORK, MOVING",
        copy: "Drag reality across the board. Status changes ripple to everyone live.",
    },
    {
        num: "05",
        title: "AUDIT PULSE",
        tag: "TOTAL RECALL",
        copy: "Every move leaves a heartbeat. Yesterday is never a mystery again.",
    },
];

const flowSteps = [
    { num: "①", title: "FORGE", copy: "One click births an organization — a home for the whole operation." },
    { num: "②", title: "SUMMON", copy: "Tokenized invites fly out. The crew accepts, roles lock in." },
    { num: "③", title: "ORCHESTRATE", copy: "Goals split into projects and tasks. The board becomes the truth." },
    { num: "④", title: "SHIP", copy: "The ring fills, chat erupts, and the next sprint is already loading." },
];

const bigStats = [
    { value: "1", label: "WORKSPACE FOR EVERYTHING" },
    { value: "0", label: "CONTEXT LOST BETWEEN TABS" },
    { value: "∞", label: "MOMENTUM ON TAP" },
];

const priceRows = [
    { name: "SOLO", price: "FREE", copy: "For midnight side-quests.", perks: "1 org · core boards" },
    { name: "SQUAD", price: "$12", copy: "For crews who ship together.", perks: "Unlimited orgs · roles · realtime", hot: true },
    { name: "GALAXY", price: "CUSTOM", copy: "For orgs with gravity.", perks: "Advanced control · audit-ready" },
];

const Landing = () => {
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

    return (
        <div className="ed-page">
            <motion.div className="ed-progress" style={{ scaleX: progress }} />

            <div className="ed-frame">
                <header className="ed-header">
                    <Navbar />
                </header>

                <main>
                    <Intro />

                    {/* ══ black ticker ══ */}
                    <section className="ed-ticker" aria-hidden="true">
                        {[0, 1].map((dup) => (
                            <div className="ed-ticker-track" key={dup}>
                                {tickerWords.map((word) => (
                                    <span key={`${dup}-${word}`}>
                                        {word} <Asterisk size={20} strokeWidth={2.6} />
                                    </span>
                                ))}
                            </div>
                        ))}
                    </section>

                    {/* ══ 01 · manifesto ══ */}
                    <section className="ed-block" id="manifesto">
                        <motion.div className="ed-block-head" {...rise}>
                            <span>(01)</span>
                            <span>THE POINT</span>
                        </motion.div>
                        <motion.h2 className="ed-manifesto" {...rise}>
                            Your team's work is scattered across nine tabs.
                            DevSync pulls it into <em>one heartbeat</em> — orgs, tasks,
                            chat and signals, moving <span className="ed-hl">together</span>.
                        </motion.h2>
                    </section>

                    {/* ══ 02 · system index ══ */}
                    <section className="ed-block" id="system">
                        <motion.div className="ed-block-head" {...rise}>
                            <span>(02)</span>
                            <span>THE SYSTEM</span>
                        </motion.div>

                        <div className="ed-index">
                            {systemRows.map((row, i) => (
                                <motion.article
                                    className="ed-row"
                                    key={row.num}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.35 }}
                                    transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="ed-row-num">{row.num}</span>
                                    <h3>{row.title}</h3>
                                    <div className="ed-row-side">
                                        <span className="ed-row-tag">{row.tag}</span>
                                        <p>{row.copy}</p>
                                    </div>
                                    <span className="ed-row-arrow">
                                        <ArrowUpRight size={30} strokeWidth={2.2} />
                                    </span>
                                </motion.article>
                            ))}
                        </div>
                    </section>

                    {/* ══ 03 · flow band (black) ══ */}
                    <section className="ed-flow" id="flow">
                        <motion.div className="ed-block-head inv" {...rise}>
                            <span>(03)</span>
                            <span>THE FLOW</span>
                        </motion.div>

                        <motion.h2 className="ed-flow-title" {...rise}>
                            IDEA ⟶ SHIPPED,<br />
                            <em>without the drift.</em>
                        </motion.h2>

                        <div className="ed-flow-rail">
                            {flowSteps.map((step, i) => (
                                <motion.article
                                    className="ed-flow-card"
                                    key={step.title}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.75, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className="ed-flow-num">{step.num}</span>
                                    <h3>{step.title}</h3>
                                    <p>{step.copy}</p>
                                    <i className="ed-flow-line" />
                                </motion.article>
                            ))}
                        </div>
                    </section>

                    {/* ══ 04 · numbers ══ */}
                    <section className="ed-block">
                        <motion.div className="ed-block-head" {...rise}>
                            <span>(04)</span>
                            <span>THE MATH</span>
                        </motion.div>
                        <div className="ed-numbers">
                            {bigStats.map((stat, i) => (
                                <motion.div
                                    className="ed-number"
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ══ 05 · pricing rows ══ */}
                    <section className="ed-block" id="pricing">
                        <motion.div className="ed-block-head" {...rise}>
                            <span>(05)</span>
                            <span>THE DEAL</span>
                        </motion.div>

                        <div className="ed-prices">
                            {priceRows.map((row, i) => (
                                <motion.div
                                    key={row.name}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.35 }}
                                    transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link to="/register" className={`ed-price-row ${row.hot ? "hot" : ""}`}>
                                        {row.hot && <span className="ed-hot-flag">MOST LOVED</span>}
                                        <h3>{row.name}</h3>
                                        <p className="ed-price-copy">{row.copy}</p>
                                        <span className="ed-price-perks">{row.perks}</span>
                                        <strong>{row.price}</strong>
                                        <span className="ed-row-arrow">
                                            <ArrowUpRight size={26} strokeWidth={2.2} />
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* ══ launch CTA (black) ══ */}
                    <motion.section className="ed-launch" {...rise}>
                        <div className="ed-launch-badge" aria-hidden="true">
                            <svg viewBox="0 0 120 120">
                                <defs>
                                    <path id="edCircle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                                </defs>
                                <text>
                                    <textPath href="#edCircle">
                                        START FREE — NO CARD — START FREE — NO CARD —
                                    </textPath>
                                </text>
                            </svg>
                            <Asterisk size={26} />
                        </div>
                        <h2>
                            LET'S <em>sync.</em>
                        </h2>
                        <p>Your crew is one workspace away from moving as one.</p>
                        <Link to="/register" className="ed-launch-btn">
                            ENTER DEVSYNC <ArrowRight size={18} />
                        </Link>
                    </motion.section>
                </main>

                {/* ══ footer ══ */}
                <footer className="ed-footer">
                    <div className="ed-footer-cols">
                        <div className="ed-footer-brand">
                            <h4>DEVSYNC<sup>®</sup></h4>
                            <p>Every team. One pulse. Zero chaos.</p>
                        </div>
                        <div className="ed-footer-col">
                            <span>INDEX</span>
                            <a href="#manifesto">Manifesto</a>
                            <a href="#system">System</a>
                            <a href="#pricing">Pricing</a>
                        </div>
                        <div className="ed-footer-col">
                            <span>ENTER</span>
                            <Link to="/login">Log in</Link>
                            <Link to="/register">Start free</Link>
                        </div>
                        <div className="ed-footer-col">
                            <span>STACK</span>
                            <em>MERN · SOCKET.IO</em>
                            <em>JWT · FRAMER</em>
                        </div>
                    </div>
                    <p className="ed-footer-note">© 2026 — BUILT AT 2AM WITH UNREASONABLE CARE</p>
                    <div className="ed-footer-mark" aria-hidden="true">DEVSYNC</div>
                </footer>
            </div>
        </div>
    );
};

export default Landing;
