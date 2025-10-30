// client/src/pages/MatchDetails.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import ChatPanel from "../components/ChatPanel";

export default function MatchDetails() {
  const { matchId } = useParams();
  const { token } = useContext(AuthContext);
  const [match, setMatch] = useState(null);

  const fetchMatch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/matches/${matchId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMatch(res.data.match);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchMatch();
  }, [token, matchId]);

  if (!match) return <div>Loading match...</div>;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <h2 className="text-2xl font-bold mb-4">Chat about Match</h2>
      <p className="mb-4">
        <strong>{match.reportA.title}</strong> ↔{" "}
        <strong>{match.reportB.title}</strong>
      </p>

      <ChatPanel matchId={matchId} />
    </div>
  );
}
