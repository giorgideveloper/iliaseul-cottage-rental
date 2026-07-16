import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import { defaultCMSData } from "../defaultData";
import type { CMSData, Language } from "../types";

export default function AdminPage() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [cmsData, setCmsData] = useState<CMSData>(defaultCMSData);
  const [currentLang] = useState<Language>("ge");

  // Verify JWT token on mount
  useEffect(() => {
    const token = localStorage.getItem("iliaseul_admin_token");
    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }
    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then(() => {
        setVerified(true);
        // Load CMS data
        return fetch("/api/cms").then((r) => r.json());
      })
      .then((data: CMSData) => setCmsData(data))
      .catch(() => {
        localStorage.removeItem("iliaseul_admin_token");
        localStorage.removeItem("iliaseul_admin_username");
        navigate("/admin", { replace: true });
      });
  }, [navigate]);

  const handleUpdateCMSData = async (newData: CMSData) => {
    setCmsData(newData);
    const token = localStorage.getItem("iliaseul_admin_token");
    try {
      await fetch("/api/cms", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newData),
      });
    } catch (err) {
      console.error("Failed to save CMS data", err);
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  if (!verified) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center">
        <div className="text-stone-400 text-sm animate-pulse">იტვირთება...</div>
      </div>
    );
  }

  return (
    <AdminDashboard
      currentLang={currentLang}
      cmsData={cmsData}
      onUpdateCMSData={handleUpdateCMSData}
      onClose={handleClose}
      preAuthenticated={true}
    />
  );
}
