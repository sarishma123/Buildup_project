import "./RightsTips.css";
import { useLang } from "./LanguageContext";

export default function RightsTips() {
  const { t } = useLang();

  return (
    <section id="rights" className="section">
      <h2>{t("rights.title")}</h2>
      <p className="rt-intro">{t("rights.intro")}</p>

      <div className="rt-list">
        {t("rights.topics").map((topic) => (
          <details key={topic.title} className="rt-item">
            <summary>{topic.title}</summary>
            <ul>
              {topic.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>

      <p className="rt-note">{t("rights.note")}</p>
    </section>
  );
}