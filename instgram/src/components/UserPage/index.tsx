'use client'
import { useEffect, useState } from "react";
import './style.css'

export default function UserPage() {
  const [userData, setUserData] = useState<{ username?: string } | null>(null);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load base URL from config.json
    fetch("/config.json")
      .then((res) => res.json())
      .then((data) => setBaseUrl(data.API_BASE_URL))
      .catch((err) => console.error("Failed to load config:", err));
  }, []);

  useEffect(() => {
    if (!baseUrl) return;

    const token = localStorage.getItem("token");
    fetch(`${baseUrl}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => {
        console.error("Fetch error:", err.message);
      });
  }, [baseUrl]);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        {userData?.username && (
          <h1 className="text-lg font-medium">Welcome, {userData.username}</h1>
        )}
      </div>
    </div>
  );
}
