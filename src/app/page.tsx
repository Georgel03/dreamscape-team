import Image from "next/image";
import prisma from "../lib/prisma";

export default async function Home() {
  const badges = await prisma.badge.findMany();
 return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center -mt-16">
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Superblog
      </h1>
      <ol className="list-decimal list-inside font-[family-name:var(--font-geist-sans)]">
        {badges.map((badge) => (
          <li key={badge.id} className="mb-2">
            {badge.code} - {badge.name}: {badge.desc}
          </li>
        ))}
      </ol>
    </div>
  );
}
