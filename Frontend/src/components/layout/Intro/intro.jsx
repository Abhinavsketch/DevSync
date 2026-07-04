import "./intro.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Asterisk } from "lucide-react";

const lineReveal = {
  hidden: { y: "115%" },
  visible: (i) => ({
    y: "0%",
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 + i * 0.14 },
  }),
};

const Intro = () => {
  return (
    <section className="ed-hero">
      {/* top meta rail */}
      <motion.div
        className="ed-hero-meta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.8 }}
      >
        <span>EST. 2026 — INDIA</span>
        <span className="ed-meta-mid">A WORKSPACE ENGINE FOR TEAMS THAT SHIP</span>
        <span>[ SCROLL ]</span>
      </motion.div>

      {/* giant editorial headline */}
      <h1 className="ed-title" aria-label="Every team. One pulse. Zero chaos.">
        <span className="ed-mask">
          <motion.span
            className="ed-line"
            custom={0}
            variants={lineReveal}
            initial="hidden"
            animate="visible"
          >
            EVERY TEAM<b className="ed-dot">.</b>
          </motion.span>
        </span>

        <span className="ed-mask">
          <motion.span
            className="ed-line ed-line-mid"
            custom={1}
            variants={lineReveal}
            initial="hidden"
            animate="visible"
          >
            ONE
            <motion.i
              className="ed-star"
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            >
              <Asterisk size={"100%"} strokeWidth={2.4} />
            </motion.i>
            PULSE<b className="ed-dot">.</b>
          </motion.span>
        </span>

        <span className="ed-mask">
          <motion.span
            className="ed-line"
            custom={2}
            variants={lineReveal}
            initial="hidden"
            animate="visible"
          >
            ZERO <em>chaos.</em>
          </motion.span>
        </span>
      </h1>

      {/* bottom rail: manifesto + CTA */}
      <div className="ed-hero-foot">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          DevSync collapses your organizations, teams, tasks and
          conversations into a single living system — the work, the
          people and the pulse, all in one place.
        </motion.p>

        <motion.div
          className="ed-hero-cta"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/register" className="ed-btn-solid">
            START FREE <ArrowUpRight size={19} />
          </Link>
          <Link to="/login" className="ed-btn-line">
            I HAVE ACCESS
          </Link>
        </motion.div>
      </div>

      {/* live status bar */}
      <motion.div
        className="ed-statusbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span><i className="ed-blip" /> SYSTEM LIVE</span>
        <span>ORGS ⟶ TEAMS ⟶ PROJECTS ⟶ TASKS</span>
        <span>REALTIME CORE: ARMED</span>
        <span>AUTH: SHIELDED</span>
      </motion.div>
    </section>
  );
};

export default Intro;
