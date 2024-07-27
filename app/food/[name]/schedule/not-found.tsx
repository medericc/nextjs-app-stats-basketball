"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';

const FoodPage = ({ params }: { params: { name: string }}) => {
  const router = useRouter();
  const playerName = params.name;

  const handleGoHome = () => {
    router.push(`/food/${playerName}`);
  };

  return (
    <div>
      {/* Votre contenu pour la page de nourriture */}
      <h1>{playerName}</h1>
      <button onClick={handleGoHome}>Go to Home</button>
    </div>
  );
};

export default FoodPage;
