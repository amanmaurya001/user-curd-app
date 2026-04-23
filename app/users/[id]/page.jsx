"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from 'next/navigation'
export default function UserDetailPage({ params }) {
  const { id } = use(params);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
const router = useRouter()
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [id]);

  const handleUpdate = () => {
    
    setUser({ ...user, name: form.name, email: form.email });
    setShowModal(false);

   
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: form.name, email: form.email }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log("Updated:", data));
  };
  const handleDelete = () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    }).then(() => router.push("/users"));
  };

  if (!user)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );

  return (
    <div className="bg-black flex justify-center">
      <div className="w-[100%] px-5 text-white space-y-6">
        {/* Header Card */}
        <div
          className="rounded-2xl border border-white/10 p-6 flex items-center gap-6"
          style={{
            background: "rgba(30, 30, 46, 0.8)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-400">@{user.username}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {/* Contact Info */}
          <div
            className="rounded-2xl border border-white/10 p-6"
            style={{
              background: "rgba(30, 30, 46, 0.8)",
              backdropFilter: "blur(16px)",
            }}
          >
            <h2 className="text-gray-400 text-xs uppercase tracking-widest mb-4">
              Contact
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Email</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Phone</span>
                <span>{user.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Website</span>
                <span className="text-blue-400">{user.website}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div
            className="rounded-2xl border border-white/10 p-6"
            style={{
              background: "rgba(30, 30, 46, 0.8)",
              backdropFilter: "blur(16px)",
            }}
          >
            <h2 className="text-gray-400 text-xs uppercase tracking-widest mb-4">
              Address
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Street</span>
                <span>
                  {user.address.street}, {user.address.suite}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">City</span>
                <span>{user.address.city}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Zipcode</span>
                <span>{user.address.zipcode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Geo</span>
                <span className="text-gray-300">
                  lat: {user.address.geo.lat}, lng: {user.address.geo.lng}
                </span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div
            className="rounded-2xl border border-white/10 p-6"
            style={{
              background: "rgba(30, 30, 46, 0.8)",
              backdropFilter: "blur(16px)",
            }}
          >
            <h2 className="text-gray-400 text-xs uppercase tracking-widest mb-4">
              Company
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Name</span>
                <span>{user.company.name}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <span className="text-gray-400">Catch Phrase</span>
                <span className="text-right max-w-xs">
                  {user.company.catchPhrase}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">BS</span>
                <span className="text-right max-w-xs">{user.company.bs}</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => {
                setForm({ name: user.name, email: user.email });
                setShowModal(true);
              }}
              className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div
            className="w-[90%] max-w-md rounded-2xl border border-white/10 p-6 text-white"
            style={{
              background: "rgba(30, 30, 46, 0.95)",
              backdropFilter: "blur(16px)",
            }}
          >
            <h2 className="text-xl font-bold mb-6">Update User</h2>

            <div className="mb-4">
              <label className="text-gray-400 text-sm">Name</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="mb-6">
              <label className="text-gray-400 text-sm">Email</label>
              <input
                className="w-full mt-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white outline-none"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-blue-600 hover:bg-blue-700 py-2 rounded-xl font-semibold"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-xl font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
