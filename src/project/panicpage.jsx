import { useCallback, useEffect, useRef, useState } from "react";
import "./panicpage.css";

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
      setStatus("Could not save the contact on this browser.");
      return;
    }
    setContact(saved);
    setStatus("Emergency contact saved.");
  }

  // Prepare the HELP message with location and open the messages app
  const triggerPanic = useCallback(async () => {
    if (!contact || !contact.number) {
      setStatus("Please save an emergency contact first. You can still call 100.");
      return;
    }
    setStatus("Finding your location...");
    const link = await getLocationLink();
    const text = link
      ? `HELP! I need help. My location: ${link}`
      : "HELP! I need help. I could not get my location.";
    const href = `sms:${contact.number}?body=${encodeURIComponent(text)}`;
    setSmsHref(href);
    setStatus("Message is ready. Press send in your messages app.");
    window.location.href = href;
  }, [contact]);

  // Countdown before the voice alert is sent
  useEffect(() => {
    if (countdown === null) return;
    const timer = setTimeout(() => {
      if (countdown === 0) {
        setCountdown(null);
        void triggerPanic();
      } else {
        setCountdown(countdown - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, triggerPanic]);

  function startListening() {
    if (!SpeechRecognition) {
      setStatus("Voice is not supported in this browser. Please use Chrome.");
      return;
    }
    const rec = new SpeechRecognition();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const heard = e.results[i][0].transcript.toLowerCase();
        if (heard.includes("help")) {
          setCountdown((c) => (c === null ? 5 : c));
          return;
        }
      }
    };

    rec.onerror = (e) => {
      if (e.error === "not-allowed") {
        wantListening.current = false;
        setListening(false);
        setStatus("Microphone is blocked. Please allow it in your browser.");
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
    setStatus('Listening. Say "help" to start the alert.');
  }

  function stopListening() {
    wantListening.current = false;
    if (recognition.current) recognition.current.stop();
    setListening(false);
    setStatus("Voice listening stopped.");
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
      <h2>Panic helper</h2>

      <p className="pp-warning">
        This is a helper, not a replacement for the police. It works only while
        this page is open and the screen is on. You must still press send on
        the message. In danger, call 100.
      </p>

      <div className="pp-actions">
        <button className="pp-panic" onClick={triggerPanic}>
          Send HELP to my contact
        </button>
        <a href="tel:100" className="pp-call">
          Call police (100)
        </a>
      </div>

      {smsHref && (
        <p>
          <a href={smsHref} className="btn btn-main">
            Open the message again
          </a>
        </p>
      )}

      <div className="pp-voice">
        <h3>Voice trigger</h3>
        <p>
          Say "help" and a 5 second countdown starts. You can cancel it, so a
          false alarm does not send anything.
        </p>
        {listening ? (
          <button className="btn btn-light pp-dark" onClick={stopListening}>
            Stop listening
          </button>
        ) : (
          <button className="btn btn-main pp-plain" onClick={startListening}>
            Start listening
          </button>
        )}
      </div>

      <form className="pp-form" onSubmit={saveContact}>
        <h3>Emergency contact</h3>
        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Phone number
          <input
            type="tel"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-main pp-plain">
          Save contact
        </button>
        <small>Saved only on this phone. We never send it to a server.</small>
      </form>

      <p className="pp-status" aria-live="polite">
        {status}
      </p>

      {countdown !== null && (
        <div className="pp-overlay" role="alertdialog" aria-live="assertive">
          <div className="pp-overlay-box">
            <p>Sending alert in</p>
            <div className="pp-count">{countdown}</div>
            <button className="pp-cancel" onClick={() => setCountdown(null)}>
              Cancel, I am safe
            </button>
          </div>
        </div>
      )}
    </section>
  );
}