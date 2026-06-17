import Intro from "../../components/layout/Intro/intro"
import Navbar from "../../components/layout/Navbar/navbar"
import { ArrowRight, Bell, CheckCircle2, FileText, FolderKanban, GitBranch, Layers3, LockKeyhole, MessageSquareText, Rocket, Sparkles, UsersRound, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import "./landing.css"

const sectionMotion = {
    initial: { opacity: 0, y: 56 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.72, ease: "easeOut" },
}

const cardMotion = {
    whileHover: { y: -10, scale: 1.015 },
    transition: { type: "spring", stiffness: 180, damping: 18 },
}

const Landing = ()=>{
    return (
        <div className="landing">
            <motion.div
                className="landing-ambient ambient-one"
                animate={{ x: [0, 32, 0], y: [0, -28, 0], scale: [1, 1.08, 1] }}
                transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="landing-ambient ambient-two"
                animate={{ x: [0, -34, 0], y: [0, 30, 0], scale: [1, 1.12, 1] }}
                transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            />
            <svg className="landing-lines" viewBox="0 0 1200 720" aria-hidden="true">
                <path d="M-80 320 C180 160 320 520 560 310 C800 100 940 230 1290 90" />
                <path d="M-40 520 C210 420 360 690 620 470 C820 300 1000 460 1270 260" />
            </svg>
            <nav>
                <Navbar/>
            </nav>
            <main>
                <Intro/>

                <motion.section {...sectionMotion} className="logo-strip reveal-section" aria-label="DevSync capabilities">
                    <span>Async-first teams</span>
                    <span>Project clarity</span>
                    <span>Secure files</span>
                    <span>Team chat</span>
                    <span>Fast shipping</span>
                </motion.section>

                <motion.section {...sectionMotion} className="landing-section features-section" id="features">
                    <div className="section-heading reveal-section">
                        <span className="section-kicker">Features</span>
                        <h2>Everything your team needs to stay in sync.</h2>
                        <p>DevSync keeps organizations, tasks, files and conversations in one focused workspace.</p>
                    </div>
                    <div className="feature-grid">
                        <motion.article {...cardMotion} className="feature-card reveal-card">
                            <div className="feature-icon"><FolderKanban size={22}/></div>
                            <h3>Workspace control</h3>
                            <p>Create organizations, manage members and keep every project under one clean dashboard.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="feature-card reveal-card">
                            <div className="feature-icon"><UsersRound size={22}/></div>
                            <h3>Role-aware teams</h3>
                            <p>Owners and members get different controls, so collaboration stays smooth and secure.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="feature-card reveal-card">
                            <div className="feature-icon"><MessageSquareText size={22}/></div>
                            <h3>Context-rich chat</h3>
                            <p>Keep decisions close to the work instead of losing updates across random channels.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="feature-card reveal-card">
                            <div className="feature-icon"><FileText size={22}/></div>
                            <h3>File clarity</h3>
                            <p>Attach the right documents to the right workspace so the team always knows what matters.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="feature-card reveal-card">
                            <div className="feature-icon"><Bell size={22}/></div>
                            <h3>Activity signals</h3>
                            <p>Highlight important movement across teams, tasks and comments without overwhelming users.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="feature-card reveal-card">
                            <div className="feature-icon"><LockKeyhole size={22}/></div>
                            <h3>Secure sessions</h3>
                            <p>Short-lived access tokens and refresh-cookie auth keep the app closer to real-world patterns.</p>
                        </motion.article>
                    </div>
                </motion.section>

                <motion.section {...sectionMotion} className="landing-section workflow-section" id="workflow">
                    <div className="section-heading reveal-section">
                        <span className="section-kicker">Workflow</span>
                        <h2>From idea to shipped work in one flow.</h2>
                        <p>A simple path that makes the product story easy to understand when someone opens your project.</p>
                    </div>
                    <div className="workflow-rail">
                        <motion.article {...cardMotion} className="workflow-step reveal-card">
                            <span>01</span>
                            <h3>Create workspace</h3>
                            <p>Start with an organization and invite the right people into the same working space.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="workflow-step reveal-card">
                            <span>02</span>
                            <h3>Build teams</h3>
                            <p>Split work by team so every member knows where their responsibilities live.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="workflow-step reveal-card">
                            <span>03</span>
                            <h3>Track projects</h3>
                            <p>Move from broad goals to concrete tasks, files, comments and visible progress.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="workflow-step reveal-card">
                            <span>04</span>
                            <h3>Ship faster</h3>
                            <p>Use shared context to reduce confusion and keep delivery momentum alive.</p>
                        </motion.article>
                    </div>
                </motion.section>

                <motion.section {...sectionMotion} className="landing-section product-section" id="product">
                    <div className="product-copy reveal-section">
                        <span className="section-kicker">Product</span>
                        <h2>A dashboard that feels alive, not empty.</h2>
                        <p>Landing pages feel stronger when users can imagine the app before logging in. This preview is visual only, but it sells the product idea clearly.</p>
                        <div className="product-points">
                            <p><CheckCircle2 size={18}/> Organization-first navigation</p>
                            <p><CheckCircle2 size={18}/> Task and file aware workspace</p>
                            <p><CheckCircle2 size={18}/> Built for future real-time updates</p>
                        </div>
                    </div>
                    <motion.div
                        className="product-showcase reveal-card"
                        whileHover={{ rotateX: 2, rotateY: -3, y: -8 }}
                        transition={{ type: "spring", stiffness: 160, damping: 18 }}
                    >
                        <div className="showcase-sidebar">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="showcase-main">
                            <div className="showcase-top">
                                <div>
                                    <p>Current Sprint</p>
                                    <h3>Frontend polish</h3>
                                </div>
                                <span>82%</span>
                            </div>
                            <div className="showcase-bars">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="showcase-cards">
                                <div>
                                    <Layers3 size={19}/>
                                    <h4>Design System</h4>
                                    <p>Components aligned</p>
                                </div>
                                <div>
                                    <GitBranch size={19}/>
                                    <h4>Pull Requests</h4>
                                    <p>2 waiting review</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.section>

                <motion.section {...sectionMotion} className="landing-section pricing-section" id="pricing">
                    <div className="section-heading reveal-section">
                        <span className="section-kicker">Pricing</span>
                        <h2>Simple plans for a product demo.</h2>
                        <p>Static pricing cards make the landing page feel complete even before payment logic exists.</p>
                    </div>
                    <div className="pricing-grid">
                        <motion.article {...cardMotion} className="pricing-card reveal-card">
                            <h3>Starter</h3>
                            <p>For personal projects and small experiments.</p>
                            <h4>Free</h4>
                            <span>1 workspace</span>
                            <span>Basic task tracking</span>
                            <span>Community support</span>
                        </motion.article>
                        <motion.article {...cardMotion} className="pricing-card featured-price reveal-card">
                            <div className="popular-badge">Most useful</div>
                            <h3>Team</h3>
                            <p>For teams that need shared project clarity.</p>
                            <h4>$12<span>/mo</span></h4>
                            <span>Unlimited workspaces</span>
                            <span>Members and roles</span>
                            <span>Files, comments and insights</span>
                        </motion.article>
                        <motion.article {...cardMotion} className="pricing-card reveal-card">
                            <h3>Scale</h3>
                            <p>For organizations that need stronger controls.</p>
                            <h4>Custom</h4>
                            <span>Advanced permissions</span>
                            <span>Audit-ready activity</span>
                            <span>Priority support</span>
                        </motion.article>
                    </div>
                </motion.section>

                <motion.section {...sectionMotion} className="landing-section resources-section" id="resources">
                    <div className="section-heading reveal-section">
                        <span className="section-kicker">Resources</span>
                        <h2>Built like a product, explained like a portfolio.</h2>
                    </div>
                    <div className="resource-grid">
                        <motion.article {...cardMotion} className="resource-card reveal-card">
                            <Rocket size={22}/>
                            <h3>Launch story</h3>
                            <p>Show how DevSync solves team execution and not just CRUD screens.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="resource-card reveal-card">
                            <Zap size={22}/>
                            <h3>Technical depth</h3>
                            <p>Auth refresh flow, authorization middleware and dashboard APIs prove backend thinking.</p>
                        </motion.article>
                        <motion.article {...cardMotion} className="resource-card reveal-card">
                            <Sparkles size={22}/>
                            <h3>Design polish</h3>
                            <p>Strong UI makes the same features feel more mature and resume-worthy.</p>
                        </motion.article>
                    </div>
                </motion.section>

                <motion.section {...sectionMotion} className="final-cta reveal-section">
                    <div>
                        <span className="section-kicker">Start now</span>
                        <h2>Bring your team into one focused workspace.</h2>
                        <p>DevSync is being shaped into a production-style MERN collaboration platform.</p>
                    </div>
                    <Link to="/register" className="final-cta-link">
                        Create workspace <ArrowRight size={18}/>
                    </Link>
                </motion.section>
            </main>
        </div>
    )
}

export default Landing
