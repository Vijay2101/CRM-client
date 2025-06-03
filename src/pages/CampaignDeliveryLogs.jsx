import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CampaignDeliveryLogs() {
  const [campaigns, setCampaigns] = useState([]);
  const [logsByCampaign, setLogsByCampaign] = useState({});
  const [expandedCampaign, setExpandedCampaign] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return;

    axios
      .get(`http://localhost:5000/campaigns?email=${userEmail}`)
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  }, [userEmail]);

  const toggleLogs = async (campaignId) => {
    if (expandedCampaign === campaignId) {
      setExpandedCampaign(null); // collapse
      return;
    }

    if (!logsByCampaign[campaignId]) {
      try {
        const res = await axios.get(`http://localhost:5000/campaigns/${campaignId}/logs`);
        setLogsByCampaign((prev) => ({ ...prev, [campaignId]: res.data }));
      } catch (err) {
        console.error("Log fetch failed:", err);
      }
    }

    setExpandedCampaign(campaignId);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Campaign History</h2>
      <ul>
        {campaigns.map((c) => (
          <li key={c._id} className="mb-4 border p-3 rounded shadow">
            <div onClick={() => toggleLogs(c._id)} className="cursor-pointer">
              <h3 className="font-semibold text-lg">{c.name}</h3>
              <p>Audience: {c.audienceSize}</p>
              <p>Sent: {c.sent}, Failed: {c.failed}</p>
              <p className="text-sm text-gray-500">{new Date(c.createdAt).toLocaleString()}</p>
              <p className="text-blue-600 mt-2">{expandedCampaign === c._id ? "Hide Logs ▲" : "View Logs ▼"}</p>
            </div>

            {expandedCampaign === c._id && logsByCampaign[c._id] && (
              <div className="mt-4 border-t pt-2">
                <h4 className="font-semibold mb-2">Delivery Logs:</h4>
                <ul className="text-sm">
                  {logsByCampaign[c._id].map((log) => (
                    <li key={log._id} className="mb-2">
                      <p>
                        Customer ID: <span className="font-mono">{log.customerId}</span>
                      </p>
                      <p>Message: {log.message}</p>
                      <p>Status: <span className={log.status === "SENT" ? "text-green-600" : "text-red-600"}>{log.status}</span></p>
                      <p className="text-gray-500">{new Date(log.createdAt).toLocaleString()}</p>
                      <hr className="my-2" />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
