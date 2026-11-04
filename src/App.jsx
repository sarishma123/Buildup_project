import "./App.css";
import { LanguageProvider, useLang } from "./LanguageContext";
import SafetyMap from "./SafetyMap";
import PanicPage from "./PanicPage";
import RightsTips from "./RightsTips";
import HelpDirectory from "./HelpDirectory";

function Page() {
  const { t, lang, changeLang } = useLang();

  return (
    <div>
      <div className="notice">{t("notice")}</div>

      <header className="header">
        <div className="logo">SafeSadak</div>
        <nav className="nav">
          <a href="#how">{t("nav.how")}</a>
          <a href="#features">{t("nav.features")}</a>
          <a href="#panic">{t("nav.panic")}</a>
          <a href="#rights">{t("nav.rights")}</a>
          <a href="#help">{t("nav.help")}</a>
          <a href="#report" className="nav-btn">{t("nav.report")}</a>
          <button
            className="lang-btn"
            onClick={() => changeLang(lang === "en" ? "ne" : "en")}
            aria-label={t("langLabel")}
          >
            {t("langButton")}
          </button>
        </nav>
      </header>

      <section className="hero">
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.text")}</p>
        <div className="hero-buttons">
          <a href="#report" className="btn btn-main">{t("hero.btnReport")}</a>
          <a href="#map" className="btn btn-light">{t("hero.btnMap")}</a>
        </div>
      </section>

      <section id="how" className="section">
        <h2>{t("how.title")}</h2>
        <div className="steps">
          {t("how.steps").map((s, i) => (
            <div className="step" key={i}>
              <span className="step-no">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="section section-soft">
        <h2>{t("features.title")}</h2>
        <ul className="features">
          {t("features.items").map((f, i) => (
            <li key={i}>
              <strong>{f.bold}</strong> {f.text}
            </li>
          ))}
        </ul>
      </section>

      <SafetyMap />
      <PanicPage />
      <RightsTips />

      <section id="help" className="section help">
        <h2>{t("help.title")}</h2>
        <p>{t("help.text")}</p>
        <a href="#directory" className="btn btn-main">{t("help.button")}</a>
      </section>

      <HelpDirectory />

      <footer className="footer">
        <p>{t("footer")}</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Page />
    </LanguageProvider>
  );
}