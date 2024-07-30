'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Undo2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IStats } from '../../types/index';
import dataMapping from '../../dataMapping';

const FoodPage = ({ params }: { params: { name: string } }) => {
  const router = useRouter();
  const playerName = params.name;
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [playerData, setPlayerData] = useState<IStats[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDetailsVisible, setIsDetailsVisible] = useState<boolean>(false);
  const [Beautiful, setBeautiful] = useState<boolean>(false);
  const [Visible, setVisible] = useState<boolean>(false);
  const [Visible2, setVisible2] = useState<boolean>(false);
  const [Visible3, setVisible3] = useState<boolean>(false);

  useEffect(() => {
    if (playerName === 'carla' || playerName === 'lucile') {
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
            filterDataByYear(playerModule.data);
          } else {
            console.error(`No data property found for player ${playerName}`);
            setPlayerData([]); // Assurez-vous de gérer l'état d'erreur de manière appropriée
          }
        } catch (error) {
          console.error(`Failed to load data for player ${playerName}`, error);
          setPlayerData([]); // Assurez-vous de gérer l'état d'erreur de manière appropriée
        }
      } else {
        console.error(`No data found for player ${playerName}`);
        setPlayerData([]); // Assurez-vous de gérer le cas où les données du joueur n'existent pas
      }

      setLoading(false);
    };

    const filterDataByYear = (data: IStats[]) => {
      let has2023 = false;
      let has2024 = false;
      let has2025 = false;

      data.forEach((game) => {
        if (game.an === '2023') has2023 = true;
        if (game.an === '2024') has2024 = true;
        if (game.an === '2025') has2025 = true;
      });

      setVisible(has2023);
      setVisible2(has2024);
      setVisible3(has2025);

      if (has2025) {
        setSelectedSeason('2024/2025');
      } else if (has2024) {
        setSelectedSeason('2023/2024');
      } else if (has2023) {
        setSelectedSeason('2022/2023');
      }
    };

    loadData();
  }, [playerName]);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-900 text-white'>
        <l-grid size='60' speed='1.5' color='rgb(29, 128, 221)'></l-grid>
      </div>
    );
  }

  if (playerData.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen bg-gray-900 text-white'>
        <h1>Pas de données trouvées pour le joueur {playerName}</h1>
        <button
          onClick={() => router.back()}
          className='mt-4 bg-blue-700 text-white py-2 px-4 rounded-lg'
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
    if (playerData.length < 77 && playerName === 'carla') {
      const wait = 1000 - averages.pts;
      const match = 77 - playerData.length;
      return { wait, match };
    }
    console.log('erreur record');
    return { wait: 0, match: 0 }; // Valeurs par défaut en cas d'erreur
  };

  // Appeler record pour obtenir wait et match
  const { wait, match } = record();

  // Filtrer les matchs par saison sélectionnée
  const filteredData = selectedSeason
    ? playerData.filter((game) => {
        if (selectedSeason === '2023/2024' && game.an === '2024') {
          return true;
        } else if (selectedSeason === '2024/2025' && game.an === '2025') {
          return true;
        } else if (selectedSeason === '2022/2023' && game.an === '2023') {
          return true;
        }
        return false;
      })
    : playerData;

  const capitalizeFirstLetter = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const capitalizedPlayerName = capitalizeFirstLetter(playerName);

  return (
    <div className='p-8 text-white'>
      <Undo2 className='cursor-pointer mb-5 text-white' onClick={() => router.back()} />
      <div className='flex flex-col m-2'>
        <div className='flex flex-col  items-center '>
          <div className='w-full  lg:w-1/4 mb-8 md:mb-0  lg:ml-12 flex justify-center'>
          <div className='bg-gray-900 text-white py-4 px-20 rounded-lg shadow-inner flex flex-col items-center sm:w-full lg:w-3/4 lg:mb-8'>

              <h2 className='text-3xl font-bold mb-6 text-center md:text-center'>
                {capitalizedPlayerName} Stats
              </h2>
              <Image
                src={`/${playerName.toLowerCase()}.jpg`}
                alt={playerName}
                width={130}
                height={130}
                className='rounded-full object-cover mb-4'
              />
              <Link
                href={`/stats/${playerName}/schedule`}
                className={`${
                  Beautiful ? 'bg-red-700' : 'bg-blue-700'
                } p-3 rounded-2xl text-gray-100 hover:underline mt-2`}
              >
                Voir le programme
              </Link>
            </div>
          </div>
          <div className='w-full md:w-2/3 lg:w-3/4 p-4 bg-gray-900 rounded-xl flex flex-col items-center'>
            <div className='flex flex-wrap gap-4 justify-center w-full'>
              <div
                className={`relative flex items-center justify-center w-24 h-24 ${
                  Beautiful ? 'bg-red-700' : 'bg-blue-700'
                } text-white text-center rounded-full shadow-lg`}
                onClick={handleClick}
              >
                {isDetailsVisible && playerName === 'carla' ? (
                  <>
                    <span className='text-xl font-bold mb-5'>{wait}</span>
                    <div className='absolute bottom-6 text-sm'>Reste : {match}</div>
                  </>
                ) : (
                  <>
                    <span className='text-xl font-bold mb-5'>{averages.pts}</span>
                    <div className='absolute bottom-6 text-sm'>Points</div>
                  </>
                )}
              </div>
              <div
                className={`relative flex items-center justify-center w-24 h-24 ${
                  Beautiful ? 'bg-red-700' : 'bg-blue-700'
                } text-white text-center rounded-full shadow-lg`}
              >
                <span className='text-xl font-bold mb-5'>{averages.ast}</span>
                <div className='absolute bottom-6 text-sm'>Passes</div>
              </div>
              <div
                className={`relative flex items-center justify-center w-24 h-24 ${
                  Beautiful ? 'bg-red-700' : 'bg-blue-700'
                } text-white text-center rounded-full shadow-lg`}
              >
                <span className='text-xl font-bold mb-5'>{averages.reb}</span>
                <div className='absolute bottom-6 text-sm'>Rebonds</div>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-8  items-center  p-4 bg-gray-900 rounded-xl overflow-x-auto'>
          <div className='flex gap-5 mb-3'>
            {Visible && (
              <>
                {playerName === 'carla' || playerName === 'lucile' ? (
                  <button
                    onClick={() => setSelectedSeason('2022/2023')}
                    className={`p-2 rounded-lg ${
                      selectedSeason === '2022/2023' ? 'bg-red-700' : 'bg-gray-700'
                    }`}
                  >
                    2022/2023
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedSeason('2022/2023')}
                    className={`p-2 rounded-lg ${
                      selectedSeason === '2022/2023' ? 'bg-blue-700' : 'bg-gray-700'
                    }`}
                  >
                    2022/2023
                  </button>
                )}
              </>
            )}
            {Visible2 && (
              <>
                {playerName === 'carla' || playerName === 'lucile' ? (
                  <button
                    onClick={() => setSelectedSeason('2023/2024')}
                    className={`p-2 rounded-lg ${
                      selectedSeason === '2023/2024' ? 'bg-red-700' : 'bg-gray-700'
                    }`}
                  >
                    2023/2024
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedSeason('2023/2024')}
                    className={`p-2 rounded-lg ${
                      selectedSeason === '2023/2024' ? 'bg-blue-700' : 'bg-gray-700'
                    }`}
                  >
                    2023/2024
                  </button>
                )}
              </>
            )}
            {Visible3 && (
              <button
                onClick={() => setSelectedSeason('2024/2025')}
                className={`p-2 rounded-lg ${
                  selectedSeason === '2024/2025' ? 'bg-blue-700' : 'bg-gray-700'
                }`}
              >
                2024/2025
              </button>
            )}
          </div>
          <div className='w-full overflow-x-auto'>
            <table className='w-full h-full bg-gray-900 text-white rounded-lg shadow-inner'>
              <thead>
                <tr>
                  <th className='p-2 border-b border-gray-700'>Date</th>
                  <th className='p-2 border-b border-gray-700'>Eff</th>
                  <th className='p-2 border-b border-gray-700'>Pts</th>
                  <th className='p-2 border-b border-gray-700'>Ast</th>
                  <th className='p-2 border-b border-gray-700'>Rbd</th>
                  <th className='p-2 border-b border-gray-700'>FG</th>
                  <th className='p-2 border-b border-gray-700'>3P</th>
                  <th className='p-2 border-b border-gray-700'>FT</th>
                  <th className='p-2 border-b border-gray-700'>Stl</th>
                  <th className='p-2 border-b border-gray-700'>Blk</th>
                  <th className='p-2 border-b border-gray-700'>TO</th>
                  <th className='p-2 border-b border-gray-700'>Min</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((game) => (
                  <tr key={game.id}>
                    <td className='p-2 border-b border-gray-700'>{game.date}</td>
                    <td className='p-2 border-b border-gray-700'>{game.eff}</td>
                    <td className='p-2 border-b border-gray-700'>{game.pts}</td>
                    <td className='p-2 border-b border-gray-700'>{game.ast}</td>
                    <td className='p-2 border-b border-gray-700'>{game.tot}</td>
                    <td className='p-2 border-b border-gray-700'>
                      {game.fgm}/{game.fga}
                    </td>
                    <td className='p-2 border-b border-gray-700'>
                      {game.fg3m}/{game.fg3a}
                    </td>
                    <td className='p-2 border-b border-gray-700'>
                      {game.ftm}/{game.fta}
                    </td>
                    <td className='p-2 border-b border-gray-700'>{game.stl}</td>
                    <td className='p-2 border-b border-gray-700'>{game.blk}</td>
                    <td className='p-2 border-b border-gray-700'>{game.to}</td>
                    <td className='p-2 border-b border-gray-700'>{game.min}</td>
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
