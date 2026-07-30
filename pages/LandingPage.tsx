import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BrandMark from "../components/BrandMark";

export default function LandingPage() {
  return (
    <main className="landing">
      <header className="landing-header">
        <BrandMark />
        <nav aria-label="Primary">
          <a href="#platform">PLATFORM</a>
          <a href="#workflow">WORKFLOW</a>
          <a href="#outcomes">OUTCOMES</a>
        </nav>
        <span className="edition">PORTAL 01</span>
      </header>

      <section className="hero">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />

        <div className="hero-kicker">RETAIL OPERATIONS — BUILT FOR SCALE</div>

        <h1>
          <span>PROGRAMS THAT</span>
          <span className="accent">DEFINE</span>
          <span>EVERY SPACE.</span>
        </h1>

        <div className="hero-footer">
          <p>
            RetailVision connects store profiles, physical assets, approvals,
            installation programs, and operational intelligence in one
            enterprise workspace.
          </p>

          <Link to="/login" className="enter-link">
            ENTER PORTAL <ArrowRight size={18} />
          </Link>

          <div className="hero-stats" id="outcomes">
            <div><strong>1,420</strong><span>STORES</span></div>
            <div><strong>48</strong><span>PROGRAMS</span></div>
            <div><strong>97%</strong><span>COMPLIANCE</span></div>
          </div>
        </div>
      </section>

      <section className="landing-strip" id="platform">
        <span>STORE PROFILES</span>
        <span>ASSET GOVERNANCE</span>
        <span>APPROVAL WORKFLOWS</span>
        <span>AI INSIGHTS</span>
      </section>

      <section className="landing-cards" id="workflow">
        <article>
          <span>01</span>
          <h2>See the entire retail program.</h2>
          <p>Bring every store, asset, approval, milestone, and exception into one operating view.</p>
        </article>
        <article>
          <span>02</span>
          <h2>Move decisions forward.</h2>
          <p>Give business, design, production, and installation teams one traceable workflow.</p>
        </article>
        <article>
          <span>03</span>
          <h2>Act before programs slip.</h2>
          <p>Use operational signals and AI-assisted summaries to focus teams on the highest-risk work.</p>
        </article>
      </section>
    </main>
  );
}
