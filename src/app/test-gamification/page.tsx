'use client'

import { useState } from "react";
import { createMockDream } from "../../actions/test-dream";
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  UserButton, 
  useUser 
} from "@clerk/nextjs";

export default function TestGamificationPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const { user } = useUser(); 

  const addLog = (msg: string) => setLogs(prev => [msg, ...prev]);

  const handleTest = async (type: string) => {
    setLoading(true);
    addLog(`⏳ Rulare test: ${type}...`);

    let result;

    try {
        switch (type) {
            case 'FIRST':
                // Vis simplu privat (Azi)
                result = await createMockDream(false, false, 0); 
                break;
            case 'PUBLIC':
                // Vis public (Azi) -> Testează FIRST_PUBLIC
                result = await createMockDream(true, false, 0);
                break;
            case 'LUCID':
                
                result = await createMockDream(false, true, 0);
                break;
            case 'STREAK_BUILDER':
                addLog("🌊 Generare streak de 7 zile... (poate dura 2-3 sec)");
                for (let i = 6; i >= 0; i--) {
                    await createMockDream(false, false, i);
                }
                result = { success: true, message: "Streak injectat cu succes!" };
                break;
            case 'STREAK_30':
                addLog("🌋 Generare streak de 30 zile... (poate dura 5-7 sec)");
                for (let i = 29; i >= 0; i--) {
                    await createMockDream(false, false, i);
                }
                result = { success: true, message: "Streak de 30 zile injectat cu succes!" };
                break;
            default:
                result = { success: false, error: "Tip de test necunoscut." };
        }

        if (result?.success) {
            addLog(`✅ Succes! ${result.message}`);
        } else {
            addLog(`❌ Eroare: ${result?.error}`);
        }
    } catch (e) {
        addLog("❌ Eroare de retea.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      
      {/* HEADER CU AUTH */}
      <header className="flex justify-between items-center mb-10 border-b border-gray-800 pb-4">
        <div>
            <h1 className="text-3xl font-bold text-purple-500">🎮 Laborator Gamification</h1>
            <p className="text-gray-400 text-sm">Simulare backend fara consum de credite AI.</p>
        </div>
        
        {/* Componenta Clerk pentru User */}
        <div className="bg-gray-900 px-4 py-2 rounded-full border border-gray-700">
            <SignedIn>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-300">
                        Logat ca: <span className="text-white font-bold">{user?.fullName || user?.firstName}</span>
                    </span>
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="text-sm font-bold text-purple-400 hover:text-purple-300">
                        Conecteaza-te
                    </button>
                </SignInButton>
            </SignedOut>
        </div>
      </header>

      {/* CONTINUT PROTEJAT */}
      <SignedOut>
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-gray-700 rounded-xl bg-gray-900/50">
            <h2 className="text-xl text-gray-400 mb-4">⛔ Acces Interzis</h2>
            <p className="text-gray-500 mb-6">Trebuie să fii autentificat pentru a testa asignarea insignelor.</p>
            <SignInButton mode="modal">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition">
                    Autentificare Rapida
                </button>
            </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Panoul de Comanda */}
            <div className="space-y-4">
                <div className="p-4 border border-gray-800 rounded-lg bg-gray-900">
                    <h3 className="font-bold mb-2">Teste de Baza</h3>
                    <div className="flex flex-col gap-2">
                        <button 
                            onClick={() => handleTest('FIRST')} disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50 text-left"
                        >
                            1. Creeaza Primul Vis (First Dream)
                        </button>
                        <button 
                            onClick={() => handleTest('PUBLIC')} disabled={loading}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded disabled:opacity-50 text-left"
                        >
                            2. Creeaza Vis Public (Public Hero)
                        </button>
                        <button 
                            onClick={() => handleTest('LUCID')} disabled={loading}
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded disabled:opacity-50 text-left"
                        >
                            3. Creeaza Vis Lucid (Lucid Master)
                        </button>
                    </div>
                </div>

                <div className="p-4 border border-orange-900/50 rounded-lg bg-orange-950/20">
                    <h3 className="font-bold mb-2 text-orange-400">Teste Avansate (Streak)</h3>
                    <p className="text-xs text-gray-400 mb-3">Aceasta actiune va crea automat 7 intrari în baza de date, una pentru fiecare zi din ultima saptamana.</p>
                    <button 
                        onClick={() => handleTest('STREAK_BUILDER')} disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded disabled:opacity-50 font-bold"
                    >
                        🔥 Genereaza Streak 7 Zile
                    </button>
                    <button 
                        onClick={() => handleTest('STREAK_30')} disabled={loading}
                        className="w-full mt-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded disabled:opacity-50 font-bold"
                    >
                        🌋 Genereaza Streak 30 Zile
                    </button>
                </div>
            </div>

            {/* Log-uri */}
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-800 h-96 overflow-y-auto font-mono text-sm relative">
                <div className="sticky top-0 bg-gray-900 pb-2 border-b border-gray-700 mb-2 flex justify-between items-center">
                    <h3 className="text-gray-500">Logs</h3>
                    <button onClick={() => setLogs([])} className="text-xs text-red-400 hover:text-red-300">Curata</button>
                </div>
                {logs.length === 0 && <span className="text-gray-600 italic">Asteptare comenzi...</span>}
                {logs.map((log, i) => (
                    <div key={i} className="mb-1 border-l-2 border-purple-500 pl-2 py-1 animate-in fade-in slide-in-from-left-2">
                        {log}
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-8 text-center">
            <a href="/test-badges-viewer" className="text-blue-400 underline hover:text-blue-300" target="_blank">
                Verifica Insignele Primite (Tab Nou) &rarr;
            </a>
        </div>
      </SignedIn>
    </div>
  );
}