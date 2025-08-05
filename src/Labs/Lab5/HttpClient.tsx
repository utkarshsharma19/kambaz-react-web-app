import { useState, useEffect } from "react";
import * as client from "./client";

export default function HttpClient() {
  const [welcomeOnClick, setWelcomeOnClick] = useState<string>("");
  const [welcomeOnLoad, setWelcomeOnLoad] = useState<string>("");

  /* ───── Request when the button is clicked ───── */
  const fetchWelcomeOnClick = async () => {
    try {
      const message = await client.fetchWelcomeMessage();
      setWelcomeOnClick(message);
    } catch (e) {
      setWelcomeOnClick("Request failed");
    }
  };

  /* ───── Request once on component mount ───── */
  useEffect(() => {
    const fetchWelcomeOnLoad = async () => {
      try {
        const message = await client.fetchWelcomeMessage();
        setWelcomeOnLoad(message);
      } catch (e) {
        setWelcomeOnLoad("Request failed");
      }
    };
    fetchWelcomeOnLoad();
  }, []);

  return (
    <div id="wd-http-client">
      <h3>HTTP Client</h3>
      <hr />

      <h4>Requesting on Click</h4>
      <button className="btn btn-primary me-2" onClick={fetchWelcomeOnClick}>
        Fetch Welcome
      </button>
      <br />
      Response from server: <b>{welcomeOnClick}</b>

      <h4 className="mt-4">Requesting on Load</h4>
      Response from server: <b>{welcomeOnLoad}</b>
      <hr />
    </div>
  );
}
