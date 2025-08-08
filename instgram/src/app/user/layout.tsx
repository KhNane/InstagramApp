'use client'

import './style.css';
import { useRouter } from 'next/navigation';
import instagramlogo from "@/images/Instagramlogo.png";
import home from "@/images/home.png";
import search from "@/images/search.png";
import image from "@/images/image.png";
import add from "@/images/add.png";
import heartheart from "@/images/heartheart.png";
import setting from "@/images/setting.png";
import conversation from "@/images/conversation.png";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/create");
  };
  const handleImages = () => {
    router.push("/user/images");
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 p-4 border-r">
        <img src={instagramlogo.src} alt="Instagram" className="bg-transparent mb-8" />
        <ul className="space-y-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/user')}>
            <img src={home.src} alt="home icon" className="w-5 h-5" />
            <li>Home</li>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/user/search')}>
            <img src={search.src} alt="search icon" className="w-5 h-5" />
            <li>Search</li>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={image.src} alt="images icon" className="w-5 h-5" />
            <li onClick={handleImages}>Images</li>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={conversation.src} alt="conversation icon" className="w-5 h-5" />
            <li>Messages</li>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={heartheart.src} alt="notification icon" className="w-5 h-5" />
            <li>Notification</li>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/user/create')}>
            <img src={add.src} alt="add icon" className="w-5 h-5" />
            <li onClick={handleCreate}>Create</li>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={setting.src} alt="setting icon" className="w-5 h-5" />
            <li>Settings</li>
          </div>
        </ul>
      </div>

      <div className="flex flex-1">
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>

        <div className="w-64 p-6 border-l ">
          <p>User name</p>
        </div>
      </div>
    </div>
  );
}
