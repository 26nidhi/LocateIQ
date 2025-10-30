// client/src/pages/Reports.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useParams, Link } from "react-router-dom";
import { getSocket } from "../socket";

export default function Reports() {
  const { token } = useContext(AuthContext);
  const { communityId } = useParams();
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/reports/${communityId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReports(res.data.reports);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (communityId && token) fetchReports();
  }, [communityId, token]);

  // Listen for new matches
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleNewMatch = (data) => {
      if (
        data.reportA.communityId === communityId ||
        data.reportB.communityId === communityId
      ) {
        alert(
          `New match! ${data.reportA.title} ↔ ${
            data.reportB.title
          } (score: ${data.score.toFixed(2)})`
        );
        fetchReports();
      }
    };

    socket.on("newMatch", handleNewMatch);
    return () => socket.off("newMatch", handleNewMatch);
  }, [communityId]);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-4">Community Reports</h2>

      <ul className="space-y-4">
        {reports.map((r) => (
          <li
            key={r._id}
            className="p-4 rounded shadow bg-white dark:bg-gray-800"
          >
            <h3 className="font-bold text-lg">
              {r.title} ({r.type})
            </h3>
            <p>{r.description}</p>
            <p className="text-sm text-gray-500">
              {r.category} - {r.location}
            </p>

            {r.images && r.images.length > 0 && (
              <div className="flex space-x-2 mt-2 overflow-x-auto">
                {r.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={`http://localhost:3000/${img}`}
                    alt="report"
                    className="h-20 rounded"
                  />
                ))}
              </div>
            )}

            {/* Link to chat if report has a match */}
            {r.matchId && (
              <Link
                to={`/matches/${r.matchId}`}
                className="mt-2 inline-block text-blue-500 hover:underline"
              >
                Chat about this match
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
