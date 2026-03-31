"use client";
import { initializeMessaging, messaging } from "@/lib/firebaseClient";
import notificationImage from "@/assets/images/notification.png";
import { isSupported, onMessage } from "firebase/messaging";
import { Bell } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function NotificationToast() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let unsubscribe;

    async function setupMessaging() {
      const supported = await isSupported();
      if (!supported) {
        console.warn("This browser does not support FCM");
        return;
      }

      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );

      await initializeMessaging();

      if (!messaging) return;

      unsubscribe = onMessage(messaging, (payload) => {
        const newNotif = {
          id: Date.now(),
          title: payload.notification?.title || "Notification",
          body: payload.notification?.body || "",
          icon: notificationImage,
        };

        setNotifications((prev) => [...prev, newNotif]);

        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== newNotif.id));
        }, 5000);
      });
    }

    setupMessaging();
    return () => unsubscribe?.();
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col gap-4">
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="group relative flex w-[340px] items-start gap-4 overflow-hidden rounded-2xl border border-white/20 bg-white/70 p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Gradient Accent */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500" />

          {/* Icon */}
          {notif.icon && (
            <Image
              width={2000}
              height={2000}
              src={notif.icon}
              alt=""
              className="aspect-square h-11 w-11 rounded-xl object-cover ring-2 ring-white"
            />
          )}

          {/* Content */}
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              {notif.body}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() =>
              setNotifications((prev) => prev.filter((n) => n.id !== notif.id))
            }
            className="text-lg text-gray-400 transition hover:text-gray-700"
          >
            ✕
          </button>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gray-200">
            <div className="animate-progress h-full w-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </div>
      ))}
    </div>
  );
}
