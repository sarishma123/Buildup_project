import "./RightsTips.css";

// Each topic has a title and a list of short points.
// To add or change text, edit this list only.
const TOPICS = [
  {
    title: "If someone is following you",
    points: [
      "Walk to a place with people and light: a shop, a petrol pump, a tea stall, or a police post.",
      "Do not go home directly. Do not go to an empty road.",
      "Call or message a trusted person and tell them where you are.",
      "If you feel in danger, call 100.",
      "Note what you can remember: time, place, clothes, vehicle number. It can help later.",
    ],
  },
  {
    title: "If you are harassed in public",
    points: [
      "It is not your fault. The person harassing you is the one doing wrong.",
      "If it is safe, move to a crowded place or near other women.",
      "Ask a driver, conductor, or shopkeeper for help. Speak loudly so others notice.",
      "Write down the place, time, and what happened as soon as you can.",
      "You can report it to the police or call 1145.",
    ],
  },
  {
    title: "Online harassment or blackmail",
    points: [
      "Do not delete the messages. Take screenshots with the date and time and the username.",
      "Do not send money or more photos, even if they threaten you.",
      "Block and report the account on the app.",
      "You can report to the Nepal Police Cyber Bureau or call 1145 for help.",
      "Tell someone you trust. You do not have to handle it alone.",
    ],
  },
  {
    title: "Your legal rights in Nepal",
    points: [
      "Sexual harassment is a crime under Section 224 of the Muluki Criminal Code 2074. The punishment is up to 3 years in jail and a fine of up to Rs 30,000.",
      "Forced sex by a husband is also a crime in Nepal.",
      "The Labour Act 2017 also prohibits sexual harassment at work.",
      "The 1145 helpline of the National Women Commission can connect you to free legal help, counselling, and police.",
      "Reporting a crime has time limits, so do not wait too long. Call 1145 to ask what applies to your case.",
    ],
  },
  {
    title: "How to report",
    points: [
      "Go to your nearest police station or call 100.",
      "Call 1145 for counselling, legal help, and a safe place to stay. It is free and open 24 hours.",
      "For medical care after violence, go to a hospital with a One-Stop Crisis Management Centre.",
      "Keep everything that can be evidence: clothes, messages, photos, and call records.",
      "You can take a trusted friend or family member with you.",
    ],
  },
];

export default function RightsTips() {
  return (
    <section id="rights" className="section">
      <h2>Rights and safety tips</h2>
      <p className="rt-intro">
        Tap a topic to read it. This is general information, not legal advice.
        Laws can change, so for your own case call 1145.
      </p>

      <div className="rt-list">
        {TOPICS.map((topic) => (
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

      <p className="rt-note">
        Nothing here is your fault. Asking for help is a right, not a weakness.
      </p>
    </section>
  );
}