import type { MenuAction } from '../types';

interface PixelIconProps {
  icon: MenuAction;
  size?: number;
}

const ICON_CLASS_MAP: Record<MenuAction, string> = {
  feed: 'icon-food',
  play: 'icon-play',
  clean: 'icon-clean',
  heal: 'icon-heal',
  sleep: 'icon-sleep',
  stats: 'icon-stats',
  discipline: 'icon-discipline',
};

export default function PixelIcon({ icon, size = 1 }: PixelIconProps) {
  return (
    <div
      className={`pixel-icon ${ICON_CLASS_MAP[icon]}`}
      style={{ transform: `scale(${size})`, transformOrigin: 'top left' }}
    />
  );
}
