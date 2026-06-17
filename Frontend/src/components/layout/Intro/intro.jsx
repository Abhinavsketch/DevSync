import "./intro.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Play, ShieldCheck, Users } from "lucide-react";

const Intro = () => {
  return (
    <motion.div
      className="intro"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.09,
          },
        },
      }}
    >
      <motion.div
        className="about"
        variants={{
          hidden: { opacity: 0, y: 28 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
        }}
      >
        <motion.div
          className="eyebrow"
          whileHover={{ scale: 1.03 }}
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
          }}
        >
          <ShieldCheck size={16} />
          <span>Secure team workspace for modern builders</span>
        </motion.div>
        <div className="heading">
          <motion.h2 variants={{ hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0 } }}>Build.</motion.h2>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0 } }}>Collaborate.</motion.h2>
          <motion.h2 variants={{ hidden: { opacity: 0, y: 34 }, visible: { opacity: 1, y: 0 } }}>
            <span>Ship</span> Faster.
          </motion.h2>
        </div>
        <motion.div
          className="info"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
          }}
        >
          <p>
            DevSync brings your team, tasks, files and conversations together in
            one focused workspace.
          </p>
        </motion.div>
        <motion.div
          className="cta"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
          }}
        >
          <Link to="/register" className="started cta-link">Get Started</Link>
          <button className="demo cta-link">
            <Play size={18} />
            View Demo
          </button>
        </motion.div>
      </motion.div>
      <motion.div
        className="hero-preview"
        variants={{
          hidden: { opacity: 0, scale: 0.94, y: 34 },
          visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" } },
        }}
      >
        <motion.svg
          className="hero-orbit"
          viewBox="0 0 420 420"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
        >
          <circle cx="210" cy="210" r="164" />
          <circle cx="210" cy="210" r="104" />
          <path d="M64 210 C112 88 306 88 356 210 C306 332 112 332 64 210Z" />
        </motion.svg>
        <motion.div
          className="preview-card main-card"
          whileHover={{ y: -10, rotateX: 3, rotateY: -3 }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        >
          <div className="preview-header">
            <div>
              <p>DevSync Workspace</p>
              <h3>Product Launch</h3>
            </div>
            <span>Live</span>
          </div>
          <div className="progress-bar">
            <span></span>
          </div>
          <div className="preview-grid">
            <div>
              <h4>12</h4>
              <p>Tasks</p>
            </div>
            <div>
              <h4>06</h4>
              <p>Files</p>
            </div>
            <div>
              <h4>04</h4>
              <p>Members</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="preview-card floating-card team-card"
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Users size={18} />
          <div>
            <h4>Team synced</h4>
            <p>Everyone sees the same progress.</p>
          </div>
        </motion.div>
        <motion.div
          className="preview-card floating-card chat-card"
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <MessageSquare size={18} />
          <div>
            <h4>Fast decisions</h4>
            <p>Tasks, files and chats stay together.</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Intro;
