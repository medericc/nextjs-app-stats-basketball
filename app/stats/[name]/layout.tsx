import React from 'react'; 
import type { Metadata } from "next";


export function generateMetadata({ params }: { params: { name: string }}): Metadata {
    const title = `Discover ${params.name} - Stats`;
    const description = `Discover all stats of ${params.name} in this career. Explore now!`;
    return {
      title,
      description,
    };
}
  
export default function FoodLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}
  