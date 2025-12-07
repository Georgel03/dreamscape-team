'use client';

import { useState } from 'react';
// Importam ambele actiuni acum
import { testUploadAction, testVideoUploadAction } from '../../actions/actions'; 

export default function TestStoragePage() {
  // State pentru Imagine
  const [imgStatus, setImgStatus] = useState<string>('Asteptare img...');
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  // State pentru Video
  const [vidStatus, setVidStatus] = useState<string>('Asteptare video...');
  const [vidUrl, setVidUrl] = useState<string | null>(null);

  // Test Imagine
  async function runImgTest() {
    setImgStatus('Se incarca img...');
    try {
      const result = await testUploadAction();
      if (result.success) {
        setImgStatus('SUCCES IMG!');
        setImgUrl(result.url as string);
      } else {
        setImgStatus(`EROARE: ${result.error}`);
      }
    } catch (e) {
      setImgStatus('Eroare critica.');
    }
  }

  // Test Video
  async function runVidTest() {
    setVidStatus('Se descarca si se urca video...');
    try {
      const result = await testVideoUploadAction();
      if (result.success) {
        setVidStatus('SUCCES VIDEO!');
        setVidUrl(result.url as string);
      } else {
        setVidStatus(`EROARE: ${result.error}`);
      }
    } catch (e) {
      setVidStatus('Eroare critica video.');
    }
  }

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white flex flex-col gap-10 items-center">
      <h1 className="text-3xl font-bold text-blue-400">Panou Control Storage</h1>
      
      {/* ZONA IMAGINE */}
      <section className="flex flex-col items-center gap-4 w-full max-w-md border border-gray-700 p-6 rounded-xl bg-gray-800/50">
        <h2 className="text-xl font-semibold text-purple-300">Testare Imagine (Base64)</h2>
        <button 
          onClick={runImgTest}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition w-full"
        >
          Testeaza Upload Imagine
        </button>
        <p className="font-mono text-sm text-gray-400">{imgStatus}</p>
        {imgUrl && (
          <img src={imgUrl} alt="Test" className="w-32 h-32 object-cover border-2 border-purple-500 rounded" />
        )}
      </section>

      {/* ZONA VIDEO */}
      <section className="flex flex-col items-center gap-4 w-full max-w-md border border-gray-700 p-6 rounded-xl bg-gray-800/50">
        <h2 className="text-xl font-semibold text-green-300">Testare Video (URL Fetch)</h2>
        <button 
          onClick={runVidTest}
          className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition w-full"
        >
          Testeaza Upload Video
        </button>
        <p className="font-mono text-sm text-gray-400">{vidStatus}</p>
        {vidUrl && (
          <div className="w-full">
            <video controls src={vidUrl} className="w-full border-2 border-green-500 rounded" />
            <p className="text-xs text-gray-500 mt-2 break-all">{vidUrl}</p>
          </div>
        )}
      </section>
    </div>
  );
}