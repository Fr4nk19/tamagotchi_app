import PixelIcon from './PixelIcon';
import type { MenuAction } from '../types';

interface ActionMenuProps {
  selectedIndex: number;
  visible: boolean;
}

const MENU_ITEMS: { action: MenuAction; label: string }[] = [
  { action: 'feed', label: 'FEED' },
  { action: 'play', label: 'PLAY' },
  { action: 'clean', label: 'CLEAN' },
  { action: 'heal', label: 'HEAL' },
  { action: 'sleep', label: 'SLEEP' },
  { action: 'stats', label: 'STATS' },
  { action: 'discipline', label: 'DISC' },
];

export { MENU_ITEMS };

export default function ActionMenu({ selectedIndex, visible }: ActionMenuProps) {
  if (!visible) return null;

  return (
    <div className="action-menu">
      {MENU_ITEMS.map((item, index) => (
        <div
          key={item.action}
          className={`menu-item ${index === selectedIndex ? 'active' : ''}`}
          title={item.label}
        >
          <div className="menu-item-icon">
            <PixelIcon icon={item.action} size={index === selectedIndex ? 1.2 : 0.8} />
          </div>
        </div>
      ))}
    </div>
  );
}
