import "./intro.css";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const Intro = () => {
  return (
    <div className="intro">
      <div className="about">
        <div className="heading">=
          <h2>Build.</h2>
          <h2>Collaborate.</h2>
          <h2>
            <span>Ship</span>Faster.
          </h2>
        </div>
        <div className="info">
          <p>
            DevSync Brings You team,tasks,files and conversations together in
            one place
          </p>
        </div>
        <div className="cta">
          <Link to="/register" className="started cta-link">Get Started</Link>
          <button className="demo cta-link">
            <Play size={18} />
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
