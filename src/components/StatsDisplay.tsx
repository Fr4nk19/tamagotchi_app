import type { Pet } from '../types';

interface StatsDisplayProps {
  pet: Pet;
}

interface StatBarProps {
  label: string;
  value: number;
  iconClass: string;
}

function StatBar({ label, value, iconClass }: StatBarProps) {
  const isLow = value < 25;

  return (
    <div className="stat-row">
      <div className="stat-icon">
        <div
          className={`pixel-icon ${iconClass}`}
          style={{ transform: 'scale(0.8)', transformOrigin: 'top left' }}
        />
      </div>
      <span className="stat-label">{label}</span>
      <div className="stat-bar-bg">
        <div
          className={`stat-bar-fill ${isLow ? 'low' : ''}`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

export default function StatsDisplay({ pet }: StatsDisplayProps) {
  return (
    <div className="stats-container">
      <StatBar label="HGR" value={pet.hunger} iconClass="stat-icon-food" />
      <StatBar label="HPY" value={pet.happiness} iconClass="stat-icon-happy" />
      <StatBar label="NRG" value={pet.energy} iconClass="stat-icon-energy" />
      <StatBar label="CLN" value={pet.cleanliness} iconClass="stat-icon-clean" />
      <StatBar label="HP" value={pet.health} iconClass="stat-icon-health" />
      <div className="stat-row">
        <span className="stat-label" style={{ width: 'auto', marginLeft: 16 }}>
          WT: {pet.weight}kg
        </span>
        <span className="stat-label" style={{ width: 'auto', marginLeft: 8 }}>
          AGE: {pet.age_minutes}m
        </span>
      </div>
    </div>
  );
}
