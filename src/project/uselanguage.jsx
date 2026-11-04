import { useContext } from "react";
import LanguageContext from "./language-context";

export default function useLang() {
  return useContext(LanguageContext);
}
