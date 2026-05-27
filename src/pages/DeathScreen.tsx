import PetSprite from '../components/PetSprite';
import type { Pet } from '../types';

interface DeathScreenProps {
  pet: Pet;
  onNewPet: () => void;
}

export default function DeathScreen({ pet, onNewPet }: DeathScreenProps) {
  return (
    <div className="death-screen">
      <PetSprite pet={pet} />
      <div className="death-text">
        REST IN PEACE
      </div>
      <div className="death-text">
        {pet.name}
      </div>
      <div className="death-text" style={{ fontSize: 5 }}>
        LIVED {pet.age_minutes} MINUTES
      </div>
      <button className="new-pet-btn" onClick={onNewPet}>
        NEW PET
      </button>
    </div>
  );
}
