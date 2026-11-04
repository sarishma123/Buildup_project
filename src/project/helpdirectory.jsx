import { useState } from "react";
import "./HelpDirectory.css";
import { useLang } from "./LanguageContext";

// Phone numbers stay here. The names and descriptions are in translations.js
// in the same order. Always check a number yourself before adding it.
const NUMBERS = ["100", "1145", "1098", "9851286770"];

export default function HelpDirectory() {
  const { t } = useLang();
  const [search, setSearch] = useState("");

  const all = t("directory.helplines").map((h, i) => ({ ...h, number: NUMBERS[i] }));
  const shown = all.filter((h) =>
    (h.name + " " + h.help).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="directory" className="section section-soft">
      <h2>{t("directory.title")}</h2>
      <p className="hd-intro">{t("directory.intro")}</p>

      <input
        className="hd-search"
        type="search"
        placeholder={t("directory.placeholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label={t("directory.ariaSearch")}
      />

      <ul className="hd-list">
        {shown.map((h) => (
          <li key={h.number} className="hd-item">
            <div>
              <h3>{h.name}</h3>
              <p>{h.help}</p>
              <small>{h.hours}</small>
            </div>
            <a href={"tel:" + h.number} className="btn btn-main">
              {t("directory.call")} {h.number}
            </a>
          </li>
        ))}
      </ul>

      {shown.length === 0 && <p>{t("directory.none")}</p>}
    </section>
  );
}