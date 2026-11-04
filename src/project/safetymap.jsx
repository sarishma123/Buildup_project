import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./safetymap.css";
import useLang from "./uselanguage";

const KATHMANDU = [27.7172, 85.324];
const TYPE_IDS = ["harassment", "stalking", "poorLighting", "unsafe", "other"];
const TIME_IDS = ["day", "night"];

// Fake sample reports, only to show how the map will look
const SAMPLE_REPORTS = [
  { id: 1, type: "poorLighting", time: "night", latitude: 27.7061, longitude: 85.3146 },
  { id: 2, type: "harassment", time: "day", latitude: 27.6933, longitude: 85.2814 },
  { id: 3, type: "unsafe", time: "night", latitude: 27.6784, longitude: 85.3492 },
  { id: 4, type: "stalking", time: "night", latitude: 27.6946, longitude: 85.3213 },
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
  const { t } = useLang();
  const [reports, setReports] = useState(SAMPLE_REPORTS);
  const [picked, setPicked] = useState(null);
  const [type, setType] = useState(TYPE_IDS[0]);
  const [time, setTime] = useState("night");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!picked) {
      setMessage(t("map.pickFirst"));
      return;
    }
    const newReport = {
      id: Date.now(),
      type,
      time,
      note: note.trim(),
      latitude: picked[0],
      longitude: picked[1],
      isNew: true,
    };
    setReports([...reports, newReport]);
    setMessage(t("map.thanks"));
    setPicked(null);
    setNote("");
  }

  return (
    <section id="report" className="section">
      <h2>{t("map.title")}</h2>
      <p className="sm-intro">{t("map.intro")}</p>
      <p className="sm-demo">{t("map.demo")}</p>

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
                  <strong>{t("map.types." + r.type)}</strong> ({t("map.times." + r.time)})
                  <br />
                  {r.isNew ? r.note : t("map.sampleNotes")[r.id - 1]}
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
            {t("map.whatHappened")}
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {TYPE_IDS.map((id) => (
                <option key={id} value={id}>
                  {t("map.types." + id)}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t("map.timeOfDay")}
            <select value={time} onChange={(e) => setTime(e.target.value)}>
              {TIME_IDS.map((id) => (
                <option key={id} value={id}>
                  {t("map.times." + id)}
                </option>
              ))}
            </select>
          </label>

          <label>
            {t("map.note")}
            <textarea
              rows="4"
              maxLength="300"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t("map.notePlaceholder")}
            />
          </label>

          <p className="sm-place">{picked ? t("map.placeChosen") : t("map.noPlace")}</p>

          <button type="submit" className="btn btn-main">
            {t("map.send")}
          </button>

          {message && <p className="sm-message">{message}</p>}
        </form>
      </div>
    </section>
  );
}