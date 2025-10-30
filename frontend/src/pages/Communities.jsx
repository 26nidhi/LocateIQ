// client/src/pages/Communities.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function Communities() {
  const { token } = useContext(AuthContext);
  const [communities, setCommunities] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const fetchCommunities = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/communities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommunities(res.data.communities);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchCommunities();
  }, [token]);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/communities",
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setDescription("");
      fetchCommunities();
    } catch (err) {
      console.error(err);
    }
  };

  const handleJoin = async (communityId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/communities/${communityId}/join`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchCommunities();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-4">Communities</h2>

      <form onSubmit={handleCreate} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Community Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded border dark:border-gray-600 w-full"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 rounded border dark:border-gray-600 w-full"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Create Community
        </button>
      </form>

      <ul className="space-y-4">
        {communities.map((c) => (
          <li
            key={c._id}
            className="p-4 rounded shadow bg-white dark:bg-gray-800 flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold text-lg">{c.name}</h3>
              <p className="text-sm">{c.description}</p>
            </div>
            <button
              onClick={() => handleJoin(c._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
            >
              Join
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
