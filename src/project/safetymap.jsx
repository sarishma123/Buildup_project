import { useEffect, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./SafetyMap.css";
import { supabase } from "./supabaseClient";

const KATHMANDU = [27.7172, 85.324];
const TYPES = ["Harassment", "Stalking", "Poor lighting", "Unsafe place", "Other"];

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
  const [reports, setReports] = useState([]);
  const [picked, setPicked] = useState(null);
  const [type, setType] = useState(TYPES[0]);
  const [timeOfDay, setTimeOfDay] = useState("Night");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Load approved reports when the page opens
  useEffect(() => {
    async function loadReports() {
      const { data, error } = await supabase.from("reports").select("*");
      if (!error) setReports(data);
    }
    loadReports();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!picked) {
      setMessage("Please click on the map to choose the place first.");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("reports").insert({
      type,
      time_of_day: timeOfDay,
      note: note.trim(),
      latitude: Number(picked[0].toFixed(4)),
      longitude: Number(picked[1].toFixed(4)),
    });
    setSending(false);

    if (error) {
      setMessage("Sorry, your report could not be sent. Please try again.");
    } else {
      setMessage("Thank you. Your report will appear on the map after it is checked.");
      setPicked(null);
      setNote("");
    }
  }

  return (
    <section id="report" className="section">
      <h2>Report an incident</h2>
      <p className="sm-intro">
        Step 1: click the place on the map. Step 2: fill the form and send. No
        name or login needed.
      </p>

      <div className="sm-layout">
        <div id="map" className="sm-map">
          <MapContainer center={KATHMANDU} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ClickPicker onPick={setPicked} />

            {reports.map((r) => (
              <CircleMarker
                key={r.id}
                center={[r.latitude, r.longitude]}
                radius={10}
                pathOptions={{ color: "#b3261e", fillColor: "#b3261e", fillOpacity: 0.5 }}
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

          <button type="submit" className="btn btn-main" disabled={sending}>
            {sending ? "Sending..." : "Send report"}
          </button>

          {message && <p className="sm-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}