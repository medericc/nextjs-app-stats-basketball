'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Undo2 } from 'lucide-react';

const SchedulePage = ({ params }: { params: { name: string } }) => {
  const router = useRouter();
  const playerName = params.name;

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const capitalizedPlayerName = capitalizeFirstLetter(playerName);

  // Utilisation d'un état pour simuler le chargement des données
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    // Simule la vérification des données
    const fetchData = async () => {
      // Remplacez cette logique par la vérification réelle des données
      const playerData = []; // Simule l'absence de données
      setDataAvailable(playerData.length > 0);

      if (playerData.length === 0) {
        router.push('/not-found'); // Redirection vers la page d'erreur
      }
    };

    fetchData();
  }, [playerName, router]);

  if (!dataAvailable) {
    return null; // Ne rien rendre pendant la redirection
  }

  // Le reste de votre code pour afficher les données va ici...

  return (
    <div className="p-8 text-white">
      <Undo2 className="cursor-pointer mb-5 text-white" onClick={() => router.back()} />
      <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
        {capitalizedPlayerName} Schedule
      </h1>
      {/* Ajoutez ici votre code pour afficher les matchs */}
    </div>
  );
};

export default SchedulePage;
