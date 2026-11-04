import { useCallback, useEffect, useRef, useState } from "react";
import "./panicpage.css";
import useLang from "./uselanguage";

const STORAGE_KEY = "safesadak_contact";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function loadContact() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

// Gets the phone location and returns a map link (or "" if not allowed)
function getLocationLink() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) return resolve("");
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve(`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`),
      () => resolve(""),
      { enableHighAccuracy: true, timeout: 6000 }
    );
  });
}

export default function PanicPage() {
  const { t } = useLang();
  const [contact, setContact] = useState(loadContact());
  const [name, setName] = useState(contact ? contact.name : "");
  const [number, setNumber] = useState(contact ? contact.number : "");
  const [status, setStatus] = useState("");
  const [smsHref, setSmsHref] = useState("");
  const [listening, setListening] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const recognition = useRef(null);
  const wantListening = useRef(false);

  // Save the emergency contact on this phone only
  function saveContact(e) {
    e.preventDefault();
    const saved = { name: name.trim(), number: number.trim() };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    } catch {
      setStatus(t("panic.saveFail"));
      return;
    }
    setContact(saved);
    setStatus(t("panic.contactSaved"));
  }

  // Prepare the HELP message with location and open the messages app
  const triggerPanic = useCallback(async () => {
    if (!contact || !contact.number) {
      setStatus(t("panic.needContact"));
      return;
    }
    setStatus(t("panic.findingLoc"));
    const link = await getLocationLink();
    const text = link ? t("panic.msgLoc") + link : t("panic.msgNoLoc");
    const href = `sms:${contact.number}?body=${encodeURIComponent(text)}`;
    setSmsHref(href);
    setStatus(t("panic.msgReady"));
    window.location.href = href;
  }, [contact, t]);

  // Countdown before the voice alert is sent
  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      const timer = setTimeout(() => {
        setCountdown(null);
        triggerPanic();
      }, 0);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, triggerPanic]);

  function startListening() {
    if (!SpeechRecognition) {
      setStatus(t("panic.noVoice"));
      return;
    }
    const triggers = t("panic.triggers");
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = t("panic.speechLang");

    rec.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const heard = e.results[i][0].transcript.toLowerCase();
        if (triggers.some((word) => heard.includes(word))) {
          setCountdown((c) => (c === null ? 5 : c));
          return;
        }
      }
    };

    rec.onerror = (e) => {
      if (e.error === "not-allowed") {
        wantListening.current = false;
        setListening(false);
        setStatus(t("panic.micBlocked"));
      }
    };

    // The browser stops listening by itself sometimes, so start again
    rec.onend = () => {
      if (wantListening.current) {
        try {
          rec.start();
        } catch {
          /* already started */
        }
      } else {
        setListening(false);
      }
    };

    wantListening.current = true;
    recognition.current = rec;
    rec.start();
    setListening(true);
    setStatus(t("panic.listening"));
  }

  function stopListening() {
    wantListening.current = false;
    if (recognition.current) recognition.current.stop();
    setListening(false);
    setStatus(t("panic.voiceStopped"));
  }

  // Stop the microphone when leaving the page
  useEffect(() => {
    return () => {
      wantListening.current = false;
      if (recognition.current) recognition.current.stop();
    };
  }, []);

  return (
    <section id="panic" className="section">
      <h2>{t("panic.title")}</h2>

      <p className="pp-warning">{t("panic.warning")}</p>

      <div className="pp-actions">
        <button className="pp-panic" onClick={triggerPanic}>
          {t("panic.sendBtn")}
        </button>
        <a href="tel:100" className="pp-call">
          {t("panic.callBtn")}
        </a>
      </div>

      {smsHref && (
        <p>
          <a href={smsHref} className="btn btn-main">
            {t("panic.openAgain")}
          </a>
        </p>
      )}

      <div className="pp-voice">
        <h3>{t("panic.voiceTitle")}</h3>
        <p>{t("panic.voiceText")}</p>
        {listening ? (
          <button className="btn btn-light pp-dark" onClick={stopListening}>
            {t("panic.stopListen")}
          </button>
        ) : (
          <button className="btn btn-main pp-plain" onClick={startListening}>
            {t("panic.startListen")}
          </button>
        )}
      </div>

      <form className="pp-form" onSubmit={saveContact}>
        <h3>{t("panic.contactTitle")}</h3>
        <label>
          {t("panic.name")}
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          {t("panic.phone")}
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-main pp-plain">
          {t("panic.save")}
        </button>
        <small>{t("panic.saveNote")}</small>
      </form>

      <p className="pp-status" aria-live="polite">
        {status}
      </p>

      {countdown !== null && (
        <div className="pp-overlay" role="alertdialog" aria-live="assertive">
          <div className="pp-overlay-box">
            <p>{t("panic.sendingIn")}</p>
            <div className="pp-count">{countdown}</div>
            <button className="pp-cancel" onClick={() => setCountdown(null)}>
              {t("panic.cancel")}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}