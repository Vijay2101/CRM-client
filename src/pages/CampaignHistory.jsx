import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CampaignHistory() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userEmail = userData?.email;

  if (!userEmail) {
    console.error("User email not found.");
    return;
  }

  axios.get(`http://localhost:5000/campaigns?email=${encodeURIComponent(userEmail)}`)
    .then(res => setCampaigns(res.data))
    .catch(err => console.error(err));
}, []);


  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Campaign History</h2>
      <ul>
        {campaigns.map(c => (
          <li key={c._id} className="mb-4 border p-3 rounded shadow">
            <h3 className="font-semibold text-lg">{c.name}</h3>
            <p>Audience: {c.audienceSize}</p>
            <p>Sent: {c.sent}, Failed: {c.failed}</p>
            <p className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
