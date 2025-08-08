'use client'

import { useEffect, useState } from "react";
import Images from "@/components/images";

export default function ImagesComponent() {
  const [images, setImages] = useState([]);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    // Load the base URL from config.json
    fetch("/config.json")
      .then((res) => res.json())
      .then((data) => setBaseUrl(data.API_BASE_URL))
      .catch((err) => console.error("Error loading config:", err));
  }, []);

  useEffect(() => {
    if (!baseUrl) return;

    const token = localStorage.getItem("token");
    fetch(`${baseUrl}/posts?limit=10&page=1`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [baseUrl]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {images.map((image, index) => (
        <Images key={index} image={image} />
      ))}
    </div>
  );
}

