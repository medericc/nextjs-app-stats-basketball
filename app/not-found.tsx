"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page non trouvée</p>
      <Button 
        variant="outline" 
        className="bg-white text-black dark:bg-gray-800 dark:text-white border-gray-700"
        onClick={handleGoHome}
      >
        Retour à l&lsquo;accueil
      </Button>
    </div>
  );
}

export default NotFound;
