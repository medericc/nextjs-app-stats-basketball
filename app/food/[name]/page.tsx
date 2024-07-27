'use client';
import { useState, useEffect } from "react";
import { IStats } from "../../types/index";
import { data } from "../../data";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from "next/navigation";
import { Undo2 } from 'lucide-react';
import Image from 'next/image';
import Link from "next/link";

const FoodPage = ({ params }: { params: { name: string }}) => {
  const router = useRouter();
  const playerName = params.name;
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  // Filter data by player name
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

  // Calculate average statistics
  const averages = playerData.reduce(
    (acc, game) => {
      acc.pts += game.pts;
      acc.ast += game.ast;
      acc.reb += game.tot;
      return acc;
    },
    { pts: 0, ast: 0, reb: 0 }
  );

  averages.pts = averages.pts / playerData.length;
  averages.ast = averages.ast / playerData.length;
  averages.reb = averages.reb / playerData.length;

  // Filter matches by selected season
  const filteredData = selectedSeason ? playerData.filter((game) => {
    if (selectedSeason === '2023/2024') {
      return game.date.match(/\/(0[1-6])\/24$/);
    } else if (selectedSeason === '2024/2025') {
      return game.date.match(/\/07\/24$/) || game.date.endsWith('/25');
    }
    return true;
  }) : playerData;

  return (
    <div className="p-8 text-white">
      <Undo2 className="cursor-pointer mb-5 text-white" onClick={() => router.back()} />

      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="flex justify-center flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/3 lg:w-1/4 mb-8 md:mb-0 md:ml-8 lg:ml-12 flex items-center">
            <div className="bg-gray-900 text-white py-4 px-20 rounded-lg shadow-inner flex flex-col items-center md:items-start">
              <h2 className="text-3xl font-bold mb-6 text-center md:text-left">{playerName} Stats</h2>
              <Image 
                src="/lou.jpg"  
                alt={playerName}         
                width={130}            
                height={130}             
                className="rounded-full object-cover mb-4"
              />
              <Link 
                href={`/food/${playerName}/schedule`} 
                className="bg-blue-700 p-3 rounded-2xl text-gray-100 hover:underline mt-2"
              >
                View Schedule
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:items-start p-4 bg-gray-900 rounded-xl">
          <div className="flex justify-center flex-col md:flex-row items-center md:items-start">
            <div className="w-full md:w-2/3 lg:w-3/4 mb-2 md:mb-0 flex flex-col items-center">
              <div className="flex gap-4 mb-2">
                <div className="relative flex items-center justify-center w-24 h-24 bg-blue-700 text-white text-center rounded-full shadow-lg col-span-2 mt-4">
                  <span className="text-xl font-bold mb-5">{averages.pts.toFixed(1)}</span>
                  <div className="absolute bottom-6 text-sm">Points</div>
                </div>
                <div className="relative flex items-center justify-center w-24 h-24 bg-blue-700 text-white text-center rounded-full shadow-lg col-span-2 mt-4">
                  <span className="text-xl font-bold mb-5">{averages.ast.toFixed(1)}</span>
                  <div className="absolute bottom-6 text-sm">Assists</div>
                </div>
                <div className="relative flex items-center justify-center w-24 h-24 bg-blue-700 text-white text-center rounded-full shadow-lg col-span-2 mt-4">
                  <span className="text-xl font-bold mb-5">{averages.reb.toFixed(1)}</span>
                  <div className="absolute bottom-6 text-sm">Rebounds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8 md:flex-row items-center md:items-start p-4 bg-gray-900 rounded-xl overflow-x-auto">
        <div className="flex gap-5 mb-3">
          <button onClick={() => setSelectedSeason('2023/2024')} className={`p-2 rounded-lg ${selectedSeason === '2023/2024' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-white'}`}>2023/2024</button>
          <button onClick={() => setSelectedSeason('2024/2025')} className={`p-2 rounded-lg ${selectedSeason === '2024/2025' ? 'bg-blue-700 text-white' : 'bg-gray-700 text-white'}`}>2024/2025</button>
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
      </div></div>
    </div>
  );
};

export default FoodPage;
