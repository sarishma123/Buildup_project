import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./SafetyMap.css";

const KATHMANDU = [27.7172, 85.324];
const TYPES = ["Harassment", "Stalking", "Poor lighting", "Unsafe place", "Other"];

// Fake sample reports, only to show how the map will look
const SAMPLE_REPORTS = [
  { id: 1, type: "Poor lighting", time_of_day: "Night", note: "Street is very dark after 7 pm.", latitude: 27.7061, longitude: 85.3146 },
  { id: 2, type: "Harassment", time_of_day: "Day", note: "Teasing near the bus stop.", latitude: 27.6933, longitude: 85.2814 },
  { id: 3, type: "Unsafe place", time_of_day: "Night", note: "Empty road, no shops open.", latitude: 27.6784, longitude: 85.3492 },
  { id: 4, type: "Stalking", time_of_day: "Night", note: "Followed while walking home.", latitude: 27.6946, longitude: 85.3213 },
];

// Lets the user click on the map to choose a place
function ClickPicker({ onPick }) {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function SafetyMap() {
  const [reports, setReports] = useState(SAMPLE_REPORTS);
  const [picked, setPicked] = useState(null);
  const [type, setType] = useState(TYPES[0]);
  const [timeOfDay, setTimeOfDay] = useState("Night");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!picked) {
      setMessage("Please click on the map to choose the place first.");
      return;
    }
    const newReport = {
      id: Date.now(),
      type,
      time_of_day: timeOfDay,
      note: note.trim(),
      latitude: picked[0],
      longitude: picked[1],
      isNew: true,
    };
    setReports([...reports, newReport]);
    setMessage("Thank you. Your report is added to the map.");
    setPicked(null);
    setNote("");
  }

  return (
    <section id="report" className="section">
      <h2>Report an incident</h2>
      <p className="sm-intro">
        Step 1: click the place on the map. Step 2: fill the form and send. No
        name or login needed.
      </p>
      <p className="sm-demo">
        Demo version: the red circles are sample data, and new reports are
        removed when you refresh the page.
      </p>

      <div className="sm-layout">
        <div id="map" className="sm-map">
          <MapContainer center={KATHMANDU} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickPicker onPick={setPicked} />

            {reports.map((r) => (
              <CircleMarker
                key={r.id}
                center={[r.latitude, r.longitude]}
                radius={10}
                pathOptions={
                  r.isNew
                    ? { color: "#c77700", fillColor: "#c77700", fillOpacity: 0.5 }
                    : { color: "#b3261e", fillColor: "#b3261e", fillOpacity: 0.5 }
                }
              >
                <Popup>
                  <strong>{r.type}</strong> ({r.time_of_day})
                  <br />
                  {r.note}
                </Popup>
              </CircleMarker>
            ))}

            {picked && (
              <CircleMarker
                center={picked}
                radius={9}
                pathOptions={{ color: "#1f8a8a", fillColor: "#1f8a8a", fillOpacity: 0.9 }}
              />
            )}
          </MapContainer>
        </div>

        <form className="sm-form" onSubmit={handleSubmit}>
          <label>
            What happened?
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <label>
            Time of day
            <select value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)}>
              <option>Day</option>
              <option>Night</option>
            </select>
          </label>

          <label>
            Short note (optional)
            <textarea
              rows="4"
              maxLength="300"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Do not write names or phone numbers."
            />
          </label>

          <p className="sm-place">
            {picked ? "Place chosen on the map." : "No place chosen yet."}
          </p>

          <button type="submit" className="btn btn-main">
            Send report
          </button>

          {message && <p className="sm-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}