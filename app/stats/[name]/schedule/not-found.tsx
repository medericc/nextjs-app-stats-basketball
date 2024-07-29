// app/not-found.tsx
"use client"
import { useRouter } from 'next/navigation';
import { Undo2 } from 'lucide-react';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-8 text-white">
      <Undo2 
        className="cursor-pointer mb-5 text-white hover:text-gray-400 transition duration-300" 
        onClick={() => router.back()} 
      />
      <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-center text-white md:text-6xl lg:text-7xl">
        Page Not Found
      </h1>
      <p className="text-lg text-gray-400">
        The page you&apos;re looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;
