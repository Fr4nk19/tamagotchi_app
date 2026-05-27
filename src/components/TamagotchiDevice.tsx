import type { ReactNode } from 'react';

interface TamagotchiDeviceProps {
  screenContent: ReactNode;
  buttons: ReactNode;
}

export default function TamagotchiDevice({ screenContent, buttons }: TamagotchiDeviceProps) {
  return (
    <div className="tamagotchi-device">
      <div className="chain-hole" />
      <div className="device-brand">TAMAGOTCHI</div>
      {screenContent}
      {buttons}
    </div>
  );
}
