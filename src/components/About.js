import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../utils/UserContext";

const About = () => {
  const { defaultUser } = useContext(UserContext);
  console.log(defaultUser);
  const [deviceName, setDeviceName] = useState("");
  const [av, setAv] = useState("nokia-altiplano-av");
  const [type, setType] = useState("LS-MF-LMNT-B");
  const [version, setVersion] = useState("24.6");
  const [timezone, setTimezone] = useState("America/Creston");
  const [connectionType, setConnectionType] = useState("direct");
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [duid, setDuid] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let connectionDetails;
    if (connectionType === "direct") {
      connectionDetails = {
        ip,
        "ne-port": port,
        username,
        password,
      };
    } else {
      connectionDetails = {
        duid,
      };
    }

    const payload = {
      "device-name": deviceName,
      av,
      type,
      version,
      timezone,
      "device-connection": connectionType,
      "device-connection-details": connectionDetails,
    };

    const apiPayload = {
      workflow_id: "Device_creation",
      input: {
        payload,
      },
    };

    try {
      const response = await axios.post(
        "https://{{server}}:8546/wfm/api/v1/execution/",
        apiPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Device Name:</label>
        <label>{defaultUser}</label>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>AV:</label>
        <input
          type="text"
          value={av}
          onChange={(e) => setAv(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Version:</label>
        <input
          type="text"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Timezone:</label>
        <input
          type="text"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Connection Type:</label>
        <select
          value={connectionType}
          onChange={(e) => setConnectionType(e.target.value)}
          required
        >
          <option value="direct">Direct</option>
          <option value="callhome">Callhome</option>
        </select>
      </div>
      {connectionType === "direct" ? (
        <>
          <div>
            <label>IP:</label>
            <input
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Port:</label>
            <input
              type="text"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </>
      ) : (
        <div>
          <label>DUID:</label>
          <input
            type="text"
            value={duid}
            onChange={(e) => setDuid(e.target.value)}
            required
          />
        </div>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default About;
