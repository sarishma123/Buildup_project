import "./App.css";

export default function App() {
  return (
    <div>
      <div className="notice">
        Not an emergency service. If you are in danger, call the police (100).
      </div>

      <header className="header">
        <div className="logo">SafeSadak</div>
        <nav className="nav">
          <a href="#how">How it works</a>
          <a href="#features">Features</a>
          <a href="#help">Get help</a>
          <a href="#report" className="nav-btn">Report</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Know which streets feel safe, before you walk them.</h1>
        <p>
          Women share their experiences anonymously. Together they build a map
          of safe and unsafe places in Kathmandu.
        </p>
        <div className="hero-buttons">
          <a href="#report" className="btn btn-main">Report an incident</a>
          <a href="#map" className="btn btn-light">View safety map</a>
        </div>
      </section>

      <section id="how" className="section">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-no">1</span>
            <h3>Share</h3>
            <p>Pick the place on the map and tell us what happened. No name or login needed.</p>
          </div>
          <div className="step">
            <span className="step-no">2</span>
            <h3>Check</h3>
            <p>Our team reviews each report so the map stays honest.</p>
          </div>
          <div className="step">
            <span className="step-no">3</span>
            <h3>Know</h3>
            <p>Approved reports appear on the map for everyone to see.</p>
          </div>
        </div>
      </section>

      <section id="features" className="section section-soft">
        <h2>What you can do here</h2>
        <ul className="features">
          <li><strong>Report anonymously.</strong> Your identity is never asked or stored.</li>
          <li><strong>See the safety map.</strong> Find areas with many reports.</li>
          <li><strong>Filter by time.</strong> Check a place at day or at night.</li>
          <li><strong>Find help.</strong> Helplines, police, legal aid and counselors by district.</li>
          <li><strong>Learn your rights.</strong> Short guides in Nepali and English.</li>
        </ul>
      </section>

      <section id="help" className="section help">
        <h2>Need help right now?</h2>
        <p>
          Call the police on <strong>100</strong>. For other helplines and legal
          support, visit the help directory.
        </p>
        <a href="#directory" className="btn btn-main">Open help directory</a>
      </section>

      <footer className="footer">
        <p>SafeSadak is a community project. Reports are reviewed but cannot be guaranteed.</p>
      </footer>
    </div>
  );
}