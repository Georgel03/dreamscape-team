'use client'

import { useState } from 'react';
import { getBadgesForUser } from '../../actions/badge-actions'; 

export default function TestBadgesViewer() {
  const [userId, setUserId] = useState('');
  const [badges, setBadges] = useState<any[]>([]);
  const [status, setStatus] = useState('');

  const handleSearch = async () => {
    setStatus('Se cauta...');
    setBadges([]);

    const result = await getBadgesForUser(userId);

    if (result.success) {
      if (result.data && result.data.length > 0) {
        setBadges(result.data);
        setStatus(`Gasite ${result.data.length} insigne.`);
      } else {
        setStatus('Utilizatorul exista, dar nu are insigne.');
      }
    } else {
      setStatus(`Eroare: ${result.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">🕵️‍♂️ Inspector Insigne</h1>
      <div className="flex gap-4 w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Introdu User ID (ex: user_2t...)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-purple-500 outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition"
        >
          Cauta
        </button>
      </div>

      <p className="text-gray-400 mb-6 font-mono">{status}</p>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
        {badges.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col items-center p-4 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-500/50 transition duration-300"
          >
            <div className="w-20 h-20 mb-3 relative">
              <img 
                src = {item.image}
                alt={item.name}
                className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.4)]"
              />
            </div>
            
            <h3 className="text-white font-bold text-sm text-center">{item.name}</h3>
            <span className="text-[10px] text-gray-500 mt-1 font-mono uppercase bg-gray-800 px-2 py-0.5 rounded">
              {item.code}
            </span>
            <p className="text-gray-600 text-xs mt-2">
              {new Date(item.earnedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}