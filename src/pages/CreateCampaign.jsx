import React, { useState } from "react";
import axios from "axios";

export default function CreateCampaign() {
  const [rules, setRules] = useState([{ field: "", operator: "", value: "" }]);
  const [logic, setLogic] = useState("AND");
  const [name, setName] = useState("");
  const [audienceSize, setAudienceSize] = useState(null);

  const userStr = localStorage.getItem("user");
  const userEmail = userStr ? JSON.parse(userStr).email : null;
  console.log(userEmail);
  const handleAddRule = () => {
    setRules([...rules, { field: "", operator: "", value: "" }]);
  };

  const handleRuleChange = (i, key, val) => {
    const newRules = [...rules];
    newRules[i][key] = val;
    setRules(newRules);
  };

  const previewAudience = async () => {
    if (!userEmail) {
      alert("User email not found. Please login.");
      return;
    }
    const res = await axios.post("https://crm-backend-five-beryl.vercel.app/campaigns/preview", { rules, logic, addedBy: userEmail });
    setAudienceSize(res.data.audienceSize);
  };

  const saveCampaign = async () => {
    if (!userEmail) {
      alert("User email not found. Please login.");
      return;
    }
    await axios.post("https://crm-backend-five-beryl.vercel.app/campaigns", { name, rules, logic, addedBy: userEmail });
    alert("Campaign saved");
    window.location.href = "/campaigns";
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Create Campaign</h2>
      <input
        className="border p-2 mb-2 w-full"
        placeholder="Campaign name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {rules.map((rule, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="border p-1 w-1/3"
            placeholder="Field (e.g., spend)"
            value={rule.field}
            onChange={e => handleRuleChange(i, "field", e.target.value)}
          />
          <select
            className="border p-1 w-1/3"
            value={rule.operator}
            onChange={e => handleRuleChange(i, "operator", e.target.value)}
          >
            <option>==</option>
            <option>!=</option>
            <option>&gt;</option>
            <option>&lt;</option>
            <option>&gt;=</option>
            <option>&lt;=</option>
          </select>
          <input
            className="border p-1 w-1/3"
            placeholder="Value"
            value={rule.value}
            onChange={e => handleRuleChange(i, "value", e.target.value)}
          />
        </div>
      ))}

      <button className="bg-gray-200 px-2 py-1 mb-2" onClick={handleAddRule}>+ Add Rule</button>

      <div className="mb-2">
        Logic:
        <select value={logic} onChange={e => setLogic(e.target.value)} className="ml-2 border p-1">
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      <button className="bg-blue-500 text-white px-4 py-2 mr-2" onClick={previewAudience}>
        Preview Audience
      </button>

      {audienceSize !== null && (
        <p className="mt-2">Audience Size: <strong>{audienceSize}</strong></p>
      )}

      <button className="bg-green-600 text-white px-4 py-2 mt-2" onClick={saveCampaign}>
        Save Campaign
      </button>
    </div>
  );
}
