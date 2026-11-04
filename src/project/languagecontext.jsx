import { useState } from "react";
import translations from "./traslation";
import LanguageContext from "./language-context";

function loadLang() {
  try {
    return localStorage.getItem("safesadak_lang") === "ne" ? "ne" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(loadLang());

  function changeLang(next) {
    setLang(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem("safesadak_lang", next);
    } catch {
      /* ignore */
    }
  }

  // t("hero.title") finds the text for the chosen language
  function t(path) {
    const find = (l) =>
      path.split(".").reduce((obj, key) => (obj ? obj[key] : undefined), translations[l]);
    const value = find(lang);
    return value !== undefined ? value : find("en");
  }

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
