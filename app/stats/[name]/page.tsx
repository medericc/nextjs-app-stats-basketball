'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Undo2 } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";
import { IStats } from "../../types/index";
import dataMapping from "../../dataMapping";

const FoodPage = ({ params }: { params: { name: string }}) => {
  const router = useRouter();
  const playerName = params.name;
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<IStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [Beautiful, setBeautiful] = useState<boolean>(false);



  useEffect(() => {
    if (playerName === "carla" || playerName === "lucile") {
      setBeautiful(true);
    } else {
      setBeautiful(false);
    }
    const loadData = async () => {
      const fetchData = dataMapping[playerName];

      if (fetchData) {
        try {
          const playerModule = await fetchData();
          if (playerModule && playerModule.data) {
            setPlayerData(playerModule.data);
          } else {
            console.error(`No data property found for player ${playerName}`);
            setPlayerData([]); // Assurez-vous de gérer l'état d'erreur de manière appropriée
          }
        } catch (error) {
          console.error(`Failed to load data for player ${playerName}`, error);
          setPlayerData([]); // Assurez-vous de gérer l'état d'erreur de manière appropriée
        }
      } else {
        console.log(dataMapping)
        console.error(`No data found for player ${playerName}`);
        setPlayerData([]); // Assurez-vous de gérer le cas où les données du joueur n'existent pas
      }

      setLoading(false);
    };

    loadData();
  }, [playerName]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-900 text-white'>
        <l-grid size="60" speed="1.5" color="rgb(29, 128, 221)"></l-grid>
      </div>
    );
  }

  if (playerData.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-900 text-white'>
        <h1>Pas de données trouvées pour le joueur {playerName}</h1>
        <button 
          onClick={() => router.back()} 
          className="mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          Retour
        </button>
      </div>
    );
  }

  // Calculer les statistiques moyennes
  const averages = playerData.reduce(
    (acc, game) => {
      acc.pts += game.pts;
      acc.ast += game.ast;
      acc.reb += game.tot;
      return acc;
    },
    { pts: 0, ast: 0, reb: 0 }
  );



    // Fonction pour gérer le clic
    const handleClick = () => {
      setIsDetailsVisible(!isDetailsVisible); // Affiche la div commentée
    };
 // Fonction pour calculer wait et match
 const record = () => {
  if (playerData.length < 77 && playerName === "carla") {
    const wait = 1000 - averages.pts;
    const match = 77 - playerData.length;
    return { wait, match };
  }
  console.log("erreur record");
  return { wait: 0, match: 0 }; // Valeurs par défaut en cas d'erreur
};

// Appeler record pour obtenir wait et match
const { wait, match } = record();
  // averages.pts = averages.pts / playerData.length;
  // averages.ast = averages.ast / playerData.length;
  // averages.reb = averages.reb / playerData.length;

  // Filtrer les matchs par saison sélectionnée
  const filteredData = selectedSeason ? playerData.filter((game) => {
    if (selectedSeason === '2023/2024') {
      return game.an === '2024';
    } else if (selectedSeason === '2024/2025') {
      return game.an === '2025';
    }
    return true;
  }) : playerData;
  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
  

  const capitalizedPlayerName = capitalizeFirstLetter(playerName);
  
  return (
    <div className="p-8 text-white">
    <Undo2 className="cursor-pointer mb-5 text-white" onClick={() => router.back()} />
    <div className="flex flex-col m-2">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0 md:ml-8 lg:ml-12 flex justify-center">
          <div className="bg-gray-900 text-white py-4 px-20 rounded-lg shadow-inner flex flex-col items-center md:items-start">
            <h2 className="text-3xl font-bold mb-6 text-center md:text-left">{capitalizedPlayerName} Stats</h2>
            <Image 
              src={`/${playerName.toLowerCase()}.jpg`}  
              alt={playerName}         
              width={130}            
              height={130}             
              className="rounded-full object-cover mb-4"
            />
            <Link 
              href={`/stats/${playerName}/schedule`} 
              className={`${Beautiful ? 'bg-red-700' : 'bg-blue-700'} p-3 rounded-2xl text-gray-100 hover:underline mt-2`}>
              Voir le programme
            </Link> 
          </div>
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 p-4 bg-gray-900 rounded-xl flex flex-col items-center">
          <div className="flex flex-wrap gap-4 justify-center w-full">
            <div 
              className={`relative flex items-center justify-center w-24 h-24 ${Beautiful ? 'bg-red-700' : 'bg-blue-700'} text-white text-center rounded-full shadow-lg`}
              onClick={handleClick}>
              {isDetailsVisible &&  playerName === "carla" ? (
                 <>
                 <span className="text-xl font-bold mb-5">{wait}</span>
                 <div className="absolute bottom-6 text-sm">Reste : {match}</div>
               </>
              ) : (
               
                <>
                <span className="text-xl font-bold mb-5">{averages.pts}</span>
                <div className="absolute bottom-6 text-sm">Points</div>
              </>
              )}
            </div>
            <div 
              className={`relative flex items-center justify-center w-24 h-24 ${Beautiful ? 'bg-red-700' : 'bg-blue-700'} text-white text-center rounded-full shadow-lg`}>
              <span className="text-xl font-bold mb-5">{averages.ast}</span>
              <div className="absolute bottom-6 text-sm">Passes</div>
            </div>
            <div 
              className={`relative flex items-center justify-center w-24 h-24 ${Beautiful ? 'bg-red-700' : 'bg-blue-700'} text-white text-center rounded-full shadow-lg`}>
              <span className="text-xl font-bold mb-5">{averages.reb}</span>
              <div className="absolute bottom-6 text-sm">Rebonds</div>
            </div>
          </div>
        </div>
      </div>
  
      <div className="flex flex-col mt-8 md:flex-row items-center md:items-start p-4 bg-gray-900 rounded-xl overflow-x-auto">
        <div className="flex gap-5 mb-3">
          <button 
            onClick={() => setSelectedSeason('2023/2024')} 
            className={`p-2 rounded-lg ${selectedSeason === '2023/2024' ? (Beautiful ? 'bg-red-700 text-white' : 'bg-blue-700 text-white') : 'bg-gray-700 text-white'}`}>
            2023/2024
          </button>
          <button 
            onClick={() => setSelectedSeason('2024/2025')} 
            className={`p-2 rounded-lg ${selectedSeason === '2024/2025' ? (Beautiful ? 'bg-red-700 text-white' : 'bg-blue-700 text-white'): 'bg-gray-700 text-white'}`}>
            2024/2025
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full h-full bg-gray-900 text-white rounded-lg shadow-inner">
            <thead>
              <tr>
                <th>Date</th>
                <th>Eff</th>
                <th>Pts</th>
                <th>Ast</th>
                <th>Rbd</th>
                <th>FG</th>
                <th>3P</th>
                <th>FT</th>
                <th>Stl</th>
                <th>Blk</th>
                <th>TO</th>
                <th>Min</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((game, index) => (
                <tr key={index}>
                  <td>{game.date}</td>
                  <td>{game.eff}</td>
                  <td>{game.pts}</td>
                  <td>{game.ast}</td>
                  <td>{game.tot}</td>
                  <td>{game.fgm}/{game.fga}</td>
                  <td>{game.fg3m}/{game.fg3a}</td>
                  <td>{game.ftm}/{game.fta}</td>
                  <td>{game.stl}</td>
                  <td>{game.blk}</td>
                  <td>{game.to}</td>
                  <td>{game.min}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  
  
  );
};

export default FoodPage;
