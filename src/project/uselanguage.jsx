import { useContext } from "react";
import LanguageContext from "./languagecontext";

export default function useLang() {
  return useContext(LanguageContext);
}
