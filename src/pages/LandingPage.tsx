import { useEffect, useState } from "react";
import {
  ArrowRight,
  CaretRight,
  CheckCircle,
  Eye,
  HandCoins,
  InstagramLogo,
  List,
  Megaphone,
  Scissors,
  TiktokLogo,
  UploadSimple,
  UsersThree,
  X,
  YoutubeLogo,
} from "@phosphor-icons/react";
import { ClipGaramLogo } from "../components/brand/ClipGaramLogo";
import { ThemeToggle } from "../components/auth/ThemeToggle";
import { Reveal } from "../components/motion/Reveal";
import {
  AudienceArt,
  EarningsFlow,
  HeroClippingFlow,
  HumanCTAArt,
} from "../components/landing/LandingIllustrations";
import type { ClipGaramThemeName } from "../theme/clipgaram-theme";
import "../styles/landing.css";

const campaigns = [
  {
    title: "Local Flavors of Nepal",
    category: "Food & Beverage",
    rate: "NPR 12",
    budget: "NPR 30,000",
    spent: 60,
  },
  {
    title: "Move Better Everyday",
    category: "Health & Lifestyle",
    rate: "NPR 15",
    budget: "NPR 50,000",
    spent: 40,
  },
  {
    title: "Smarter Together",
    category: "Education",
    rate: "NPR 10",
    budget: "NPR 25,000",
    spent: 20,
  },
];

const initialTheme = (): ClipGaramThemeName => {
  const stored = localStorage.getItem("clipgaram-theme");
  if (stored === "light" || stored === "dark") return stored;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const signupHref = (role: "Clipper" | "Creator") => `/signup?role=${role}`;

function Action({
  creator = false,
  children,
  outline = false,
}: {
  creator?: boolean;
  children: React.ReactNode;
  outline?: boolean;
}) {
  return (
    <a
      className={`landing-button ${outline ? "is-outline" : ""}`}
      href={signupHref(creator ? "Creator" : "Clipper")}
    >
      {children}
    </a>
  );
}

function AudienceFeature({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="audience-feature">
      <span className="feature-icon">{icon}</span>
      <span>
        <strong>{title}</strong>
        <small>{children}</small>
      </span>
    </li>
  );
}

function AudienceColumn({ creator = false }: { creator?: boolean }) {
  return (
    <article
      className={`audience-column ${creator ? "creator-column" : "clipper-column"}`}
      id={creator ? "for-creators" : undefined}
    >
      <div className="audience-copy">
        <h2>For {creator ? "creators" : "clippers"}</h2>
        <h3>
          {creator
            ? "Get more reach for your content."
            : "Turn your creativity into income."}
        </h3>
        <p>
          {creator
            ? "Launch clipping campaigns, collaborate with a community of clippers and watch your content reach new audiences."
            : "Discover campaigns, create short videos, publish on your socials and earn from verified views. It’s that simple."}
        </p>
        <ul>
          {creator ? (
            <>
              <AudienceFeature icon={<UploadSimple />} title="Fund">
                Set your budget and upload your source video.
              </AudienceFeature>
              <AudienceFeature icon={<CheckCircle />} title="Review">
                Get quality clips from real creators and approve what works.
              </AudienceFeature>
              <AudienceFeature icon={<UsersThree />} title="Grow">
                Reach more people. Build your brand. See real results.
              </AudienceFeature>
            </>
          ) : (
            <>
              <AudienceFeature icon={<Megaphone />} title="Discover">
                Browse live campaigns from brands and creators.
              </AudienceFeature>
              <AudienceFeature icon={<Scissors />} title="Create">
                Turn long-form content into short, engaging videos.
              </AudienceFeature>
              <AudienceFeature icon={<HandCoins />} title="Earn">
                Get paid for verified views.
              </AudienceFeature>
            </>
          )}
        </ul>
        <Action creator={creator} outline={creator}>
          {creator ? (
            "I want more reach"
          ) : (
            <>
              I want to clip <ArrowRight />
            </>
          )}
        </Action>
      </div>
      <Reveal className="audience-visual">
        <AudienceArt creator={creator} />
      </Reveal>
    </article>
  );
}

export function LandingPage() {
  const [theme, setTheme] = useState<ClipGaramThemeName>(initialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("clipgaram-theme", theme);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#101815" : "#f4f0e8");
    document.title = "ClipGaram — Moments that travel";
  }, [theme]);

  return (
    <div className="landing-page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="landing-header">
        <a href="/" aria-label="ClipGaram home" className="landing-logo">
          <ClipGaramLogo />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <List />}
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Main navigation">
          <a href="#campaigns" onClick={() => setMenuOpen(false)}>
            Discover campaigns
          </a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How it works
          </a>
          <a href="#for-creators" onClick={() => setMenuOpen(false)}>
            For creators
          </a>
          <a href="/login">Sign in</a>
          <a className="nav-join" href="/signup">
            Join ClipGaram
          </a>
        </nav>
        <ThemeToggle theme={theme} onChange={setTheme} />
      </header>

      <main id="main-content">
        <section className="hero-section landing-container">
          <div className="hero-copy">
            <h1>
              Creators bring the story.
              <br />
              Clippers make it travel.
            </h1>
            <p>
              ClipGaram is Nepal’s creator marketplace where great content
              <br className="desktop-break" /> finds more people and everyone
              earns.
            </p>
            <div className="hero-actions">
              <div>
                <Action>
                  I want to clip <ArrowRight />
                </Action>
                <small>Find campaigns and start earning</small>
              </div>
              <div>
                <Action creator outline>
                  I want more reach
                </Action>
                <small>Launch a clipping campaign</small>
              </div>
            </div>
          </div>
          <Reveal className="hero-visual">
            <HeroClippingFlow />
          </Reveal>
        </section>

        <section className="audience-section landing-container">
          <div className="section-kicker">
            <span />
            TWO SIDES, ONE MOMENT
            <span />
          </div>
          <div className="audience-grid">
            <AudienceColumn />
            <AudienceColumn creator />
          </div>
        </section>

        <section className="campaigns-section landing-container" id="campaigns">
          <div className="section-heading-row">
            <div>
              <h2>Live campaigns</h2>
              <p>Real content. Real opportunities.</p>
            </div>
            <a href="/signup?role=Clipper">
              View all campaigns <ArrowRight />
            </a>
          </div>
          <div className="campaign-list">
            {campaigns.map((campaign, index) => (
              <a
                href={signupHref("Clipper")}
                className="campaign-row"
                key={campaign.title}
              >
                <span
                  className={`campaign-thumb thumb-${index + 1}`}
                  aria-hidden="true"
                >
                  <i />
                  <b />
                </span>
                <span className="campaign-name">
                  <strong>{campaign.title}</strong>
                  <small>{campaign.category}</small>
                </span>
                <span className="campaign-rate">
                  <strong>{campaign.rate}</strong>
                  <small>per 1K verified views</small>
                </span>
                <span className="campaign-budget">
                  <strong>{campaign.budget}</strong>
                  <span
                    className="progress"
                    role="progressbar"
                    aria-label={`${campaign.spent}% of campaign budget spent`}
                    aria-valuenow={campaign.spent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <i
                      style={
                        {
                          "--progress": `${campaign.spent}%`,
                        } as React.CSSProperties
                      }
                    />
                  </span>
                </span>
                <span className="campaign-spent">{campaign.spent}% spent</span>
                <CaretRight className="campaign-chevron" />
              </a>
            ))}
          </div>
        </section>

        <section className="earnings-section" id="how-it-works">
          <div className="landing-container earnings-layout">
            <div className="earnings-copy">
              <h2>How earning works</h2>
              <p>Transparent. Fair. Built for creators and clippers.</p>
              <span />
              <p>You always know what was counted—and why.</p>
            </div>
            <Reveal className="earnings-visual">
              <EarningsFlow />
              <ol className="mobile-process" aria-label="How earning works">
                <li>
                  <span>1</span>
                  <strong>Clip submitted</strong>
                </li>
                <li>
                  <span>
                    <Eye />
                  </span>
                  <strong>12,480 verified views</strong>
                </li>
                <li>
                  <span>
                    <CheckCircle />
                  </span>
                  <strong>Quality reviewed</strong>
                </li>
                <li>
                  <span>
                    <HandCoins />
                  </span>
                  <strong>NPR 1,250 paid</strong>
                </li>
              </ol>
            </Reveal>
          </div>
        </section>

        <section className="human-cta landing-container">
          <div className="human-cta-copy">
            <p className="eyebrow">THE NEXT MOMENT STARTS HERE</p>
            <h2>Great moments deserve to travel.</h2>
            <p>
              Creators make the moment. Clippers help it find the people who
              need to see it.
            </p>
            <div>
              <Action>
                Start clipping <ArrowRight />
              </Action>
              <a href={signupHref("Creator")}>Create a campaign</a>
            </div>
          </div>
          <Reveal className="human-visual">
            <HumanCTAArt />
          </Reveal>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-container footer-grid">
          <div>
            <a href="/" aria-label="ClipGaram home">
              <ClipGaramLogo />
            </a>
            <small>© 2026 ClipGaram. Built for Nepal’s creators.</small>
          </div>
          <nav aria-label="Footer navigation">
            <a href="#main-content">About</a>
            <a href="#how-it-works">How it works</a>
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="mailto:hello@clipgaram.com">Contact</a>
          </nav>
          <div className="footer-social">
            <span>
              <a href="#youtube" aria-label="YouTube">
                <YoutubeLogo />
              </a>
              <a href="#instagram" aria-label="Instagram">
                <InstagramLogo />
              </a>
              <a href="#tiktok" aria-label="TikTok">
                <TiktokLogo />
              </a>
            </span>
            <small>Made for moments worth sharing.</small>
          </div>
        </div>
      </footer>
    </div>
  );
}
