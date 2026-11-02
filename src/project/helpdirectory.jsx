import { useState } from "react";
import "./helpdirectory.css";

// To add a new helpline, copy one block and change the text.
// Always check a number yourself before adding it.
const HELPLINES = [
  {
    name: "Nepal Police",
    number: "100",
    help: "Emergency. Use this when you are in danger right now.",
    hours: "24 hours, free",
  },
  {
    name: "National Women Commission",
    number: "1145",
    help: "Violence or harassment against women. Counselling, legal help and police linking.",
    hours: "24 hours, free",
  },
  {
    name: "Child Helpline",
    number: "1098",
    help: "Help for children facing abuse or danger.",
    hours: "24 hours, free",
  },
  {
    name: "Nepal Police Cyber Bureau",
    number: "9851286770",
    help: "Online harassment, blackmail, fake accounts, leaked photos.",
    hours: "Check before launch",
  },
];

export default function HelpDirectory() {
  const [search, setSearch] = useState("");

  const shown = HELPLINES.filter((h) =>
    (h.name + " " + h.help).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="directory" className="section section-soft">
      <h2>Help directory</h2>
      <p className="hd-intro">
        Tap a number to call it from your phone. In danger right now, call 100 first.
      </p>

      <input
        className="hd-search"
        type="search"
        placeholder="Search, for example: online, child, police"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search helplines"
      />

      <ul className="hd-list">
        {shown.map((h) => (
          <li key={h.name} className="hd-item">
            <div>
              <h3>{h.name}</h3>
              <p>{h.help}</p>
              <small>{h.hours}</small>
            </div>
            <a href={"tel:" + h.number} className="btn btn-main">
              Call {h.number}
            </a>
          </li>
        ))}
      </ul>

      {shown.length === 0 && <p>No helpline found. Try another word.</p>}
    </section>
  );
}