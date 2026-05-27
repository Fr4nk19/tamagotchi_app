import type { Pet } from '../types';

interface PetSpriteProps {
  pet: Pet;
  animationClass?: string;
}

type PixelColor = 0 | 1 | 2;
// 0 = transparent, 1 = dark (#306230), 2 = mid (#5a7a30)

const SPRITES: Record<Pet['stage'], PixelColor[][]> = {
  egg: [
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 1, 2, 2, 1, 2, 2, 1, 0],
    [0, 1, 2, 2, 2, 1, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 1, 2, 2, 2, 1, 0],
    [0, 1, 2, 2, 2, 1, 2, 1, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
  ],
  baby: [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 2, 2, 2, 1, 0],
    [1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 1, 2, 2, 1],
    [0, 1, 2, 2, 2, 1, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
  ],
  child: [
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 2, 2, 2, 1, 1, 0],
    [1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 1],
    [0, 1, 2, 2, 1, 2, 2, 1, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
  ],
  teen: [
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0, 0],
    [0, 1, 1, 2, 2, 2, 1, 1, 0, 0],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 0],
    [1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    [1, 2, 2, 1, 2, 1, 2, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 2, 1, 0, 0],
    [0, 0, 1, 2, 2, 2, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
  ],
  adult: [
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 2, 1, 0, 1, 2, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0],
    [0, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0],
    [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 1, 2, 2, 2, 1, 2, 2, 1],
    [0, 1, 2, 2, 1, 1, 1, 2, 2, 1, 0],
    [0, 0, 1, 2, 2, 2, 2, 2, 1, 0, 0],
    [0, 0, 0, 1, 2, 2, 2, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
  ],
};

const GRAVESTONE: PixelColor[][] = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 1, 2, 2, 2, 1, 0],
  [1, 2, 2, 2, 2, 2, 1],
  [1, 2, 1, 1, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1],
  [1, 2, 1, 1, 2, 2, 1],
  [1, 2, 1, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1],
];

const ANGEL_WINGS: PixelColor[][] = [
  [0, 1, 0, 0, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1],
  [0, 0, 1, 2, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const COLOR_MAP: Record<PixelColor, string> = {
  0: 'transparent',
  1: '#306230',
  2: '#5a7a30',
};

function renderSprite(grid: PixelColor[][], pixelSize: number) {
  const cols = Math.max(...grid.map((r) => r.length));
  return (
    <div
      className="pixel-grid"
      style={{
        gridTemplateColumns: `repeat(${cols}, ${pixelSize}px)`,
        gridTemplateRows: `repeat(${grid.length}, ${pixelSize}px)`,
      }}
    >
      {grid.flat().map((color, i) => (
        <div
          key={i}
          style={{
            width: pixelSize,
            height: pixelSize,
            background: COLOR_MAP[color],
          }}
        />
      ))}
    </div>
  );
}

export default function PetSprite({ pet, animationClass }: PetSpriteProps) {
  const pixelSize = pet.stage === 'adult' ? 5 : pet.stage === 'teen' ? 5 : 6;

  if (!pet.is_alive) {
    return (
      <div className="gravestone">
        <div className="pet-death">
          {renderSprite(ANGEL_WINGS, 4)}
        </div>
        <div style={{ marginTop: 4 }}>
          {renderSprite(GRAVESTONE, 5)}
        </div>
      </div>
    );
  }

  const sprite = SPRITES[pet.stage];
  const anim = animationClass || (
    pet.is_sleeping ? 'pet-sleeping' :
    pet.health < 30 ? 'pet-sick' :
    pet.stage === 'egg' ? 'pet-hatching' :
    'pet-idle'
  );

  return (
    <div className={`pet-sprite ${anim}`}>
      {renderSprite(sprite, pixelSize)}
      {pet.is_sleeping && (
        <div className="zzz">
          <span>Z</span>
          <span>z</span>
          <span>Z</span>
        </div>
      )}
    </div>
  );
}
