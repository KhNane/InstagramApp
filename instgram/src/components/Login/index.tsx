'use client';
import './style.css';
import { useState, useEffect } from "react";
import instagram from '../../images/instagram.png';
import instagramlogo from '../../images/Instagramlogo.png';
import { useRouter } from 'next/navigation';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [baseUrl, setBaseUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/config.json")
      .then(res => res.json())
      .then(data => setBaseUrl(data.API_BASE_URL))
      .catch(err => console.error("Failed to load config:", err));
  }, []);

  const handleLoginClick = () => {
    if (!baseUrl) return;

    const login = {
      email,
      password,
    };
    const loginData = { email, password };
    fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || 'Login failed');
        }

        if (data.token) {
          localStorage.setItem('token', data.token);
          router.push("/user");
        }
      })
      .catch((err) => {
        console.error('Login failed:', err.message);
      });
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <img src={instagram.src} alt="Instagram" className="bg-transparent" />
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <img src={instagramlogo.src} alt="Instagram" className="bg-transparent" />
          <input
            className="block w-full border rounded-sm mb-4 p-2"
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="block w-full border rounded-sm mb-4 p-2"
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLoginClick}
            className="w-full py-2 bg-blue-500 text-white rounded"
            disabled={!baseUrl} // Prevent action before config is loaded
          >
            Log in
          </button>
          <div className="text-center mt-4">
            <span>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer hover:underline"
                onClick={() => router.push('/signup')}
              >
                Sign up
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
