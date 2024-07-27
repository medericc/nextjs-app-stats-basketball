'use client';
import { useRouter } from 'next/navigation';
import { data } from '../../../data/louann'; // Ajustez le chemin selon l'emplacement réel
import { Undo2 } from 'lucide-react';

const SchedulePage = ({ params }: { params: { name: string } }) => {
  const router = useRouter();
  const playerName = params.name;

  // Filtrer les données par nom de joueur
  const playerData = data.filter((game) => game.name.toLowerCase() === playerName.toLowerCase());

  if (playerData.length === 0) {
    return (
      <div className="p-8 text-white">
        <Undo2 className="cursor-pointer mb-5 text-white" onClick={() => router.back()} />
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          Player not found
        </h1>
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <Undo2 className="cursor-pointer mb-5 text-white" onClick={() => router.back()} />
      <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
        {playerName} Schedule
      </h1>
      <div className="bg-gray-900 text-white p-4 rounded-lg shadow-inner">
        <table className="w-full bg-gray-900 text-white rounded-lg shadow-inner">
          <thead>
            <tr>
              <th>Date</th>
              <th>Opponent</th>
            </tr>
          </thead>
          <tbody>
            {playerData.map((game, index) => (
              <tr key={index}>
                <td>{game.date}</td>
                <td>{game.opponent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePage;
