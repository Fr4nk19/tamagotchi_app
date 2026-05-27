import type { ReactNode } from 'react';

interface TamagotchiScreenProps {
  children: ReactNode;
  sleeping?: boolean;
}

export default function TamagotchiScreen({ children, sleeping = false }: TamagotchiScreenProps) {
  return (
    <div className={`tamagotchi-screen scanlines ${sleeping ? 'sleeping' : ''}`}>
      {children}
    </div>
  );
}
