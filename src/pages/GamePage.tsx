import { useState, useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TamagotchiDevice from '../components/TamagotchiDevice';
import TamagotchiScreen from '../components/TamagotchiScreen';
import PetSprite from '../components/PetSprite';
import StatsDisplay from '../components/StatsDisplay';
import ActionMenu, { MENU_ITEMS } from '../components/ActionMenu';
import DeviceButtons from '../components/DeviceButtons';
import DeathScreen from './DeathScreen';
import { usePet } from '../hooks/usePet';
import { useAuth } from '../hooks/useAuth';

type UserViewMode = 'pet' | 'stats' | 'menu';
type EffectiveViewMode = UserViewMode | 'create' | 'death' | 'loading';

export default function GamePage() {
  const { pet, isLoading, error, actionLoading, createPet, feed, play, clean, heal, sleep, wake, discipline, deletePet } = usePet();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [userView, setUserView] = useState<UserViewMode>('pet');
  const [menuIndex, setMenuIndex] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const [animClass, setAnimClass] = useState<string | undefined>(undefined);
  const [petName, setPetName] = useState('');

  // Derive effective view mode from pet state + user choice
  const viewMode: EffectiveViewMode = useMemo(() => {
    if (isLoading) return 'loading';
    if (!pet) return 'create';
    if (!pet.is_alive) return 'death';
    return userView;
  }, [isLoading, pet, userView]);

  // Show notification briefly
  const showNotification = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2000);
  }, []);

  // Play action animation
  const playAnimation = useCallback((anim: string, duration: number = 1500) => {
    setAnimClass(anim);
    setTimeout(() => setAnimClass(undefined), duration);
  }, []);

  // Execute a menu action
  const executeAction = useCallback(async () => {
    if (actionLoading || !pet) return;

    const action = MENU_ITEMS[menuIndex].action;
    setUserView('pet');

    try {
      switch (action) {
        case 'feed':
          playAnimation('pet-eating');
          await feed();
          showNotification('YUM YUM!');
          break;
        case 'play':
          playAnimation('pet-playing');
          await play();
          showNotification('FUN!');
          break;
        case 'clean':
          playAnimation('pet-eating');
          await clean();
          showNotification('SPARKLE!');
          break;
        case 'heal':
          await heal();
          showNotification('MEDICINE!');
          break;
        case 'sleep':
          if (pet.is_sleeping) {
            await wake();
            showNotification('GOOD MORNING!');
          } else {
            await sleep();
            showNotification('GOOD NIGHT!');
          }
          break;
        case 'stats':
          setUserView('stats');
          return;
        case 'discipline':
          await discipline();
          showNotification('BEHAVE!');
          break;
      }
    } catch {
      showNotification('FAILED!');
    }
  }, [actionLoading, pet, menuIndex, feed, play, clean, heal, sleep, wake, discipline, playAnimation, showNotification]);

  // Handle A button (select / cycle menu)
  const handleA = useCallback(() => {
    if (viewMode === 'create') return;
    if (viewMode === 'death') return;
    if (viewMode === 'stats') {
      setUserView('pet');
      return;
    }

    if (viewMode === 'menu') {
      // Cycle to next menu item
      setMenuIndex((prev) => (prev + 1) % MENU_ITEMS.length);
    } else {
      // Open menu
      setUserView('menu');
      setMenuIndex(0);
    }
  }, [viewMode]);

  // Handle B button (execute)
  const handleB = useCallback(() => {
    if (viewMode === 'create') {
      if (petName.trim()) {
        createPet(petName.trim());
      }
      return;
    }
    if (viewMode === 'menu') {
      executeAction();
    }
  }, [viewMode, petName, createPet, executeAction]);

  // Handle C button (cancel / back)
  const handleC = useCallback(() => {
    if (viewMode === 'menu' || viewMode === 'stats') {
      setUserView('pet');
    }
  }, [viewMode]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'a':
        case 'A':
        case 'ArrowLeft':
          handleA();
          break;
        case 'b':
        case 'B':
        case 'Enter':
          handleB();
          break;
        case 'c':
        case 'C':
        case 'Escape':
          handleC();
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleA, handleB, handleC]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleNewPet = async () => {
    await deletePet();
    setPetName('');
    setUserView('pet');
  };

  // Render screen content
  const renderScreenContent = () => {
    if (isLoading) {
      return (
        <TamagotchiScreen>
          <div className="loading-screen">LOADING...</div>
        </TamagotchiScreen>
      );
    }

    if (viewMode === 'create') {
      return (
        <TamagotchiScreen>
          <div className="create-pet-screen">
            <div className="prompt-text">NAME YOUR PET</div>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              maxLength={12}
              placeholder="..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && petName.trim()) {
                  createPet(petName.trim());
                }
              }}
            />
            <div className="prompt-text" style={{ marginTop: 8, fontSize: 5 }}>
              PRESS B TO START
            </div>
          </div>
        </TamagotchiScreen>
      );
    }

    if (!pet) {
      return (
        <TamagotchiScreen>
          <div className="loading-screen">NO PET FOUND</div>
        </TamagotchiScreen>
      );
    }

    if (viewMode === 'death') {
      return (
        <TamagotchiScreen>
          <DeathScreen pet={pet} onNewPet={handleNewPet} />
        </TamagotchiScreen>
      );
    }

    if (viewMode === 'stats') {
      return (
        <TamagotchiScreen sleeping={pet.is_sleeping}>
          <div style={{ width: '100%', padding: '24px 0 0' }}>
            <div style={{ textAlign: 'center', fontSize: 6, color: '#306230', marginBottom: 8 }}>
              {pet.name} - {pet.stage.toUpperCase()}
            </div>
            <StatsDisplay pet={pet} />
          </div>
        </TamagotchiScreen>
      );
    }

    return (
      <TamagotchiScreen sleeping={pet.is_sleeping}>
        <ActionMenu selectedIndex={menuIndex} visible={viewMode === 'menu'} />
        <div className="pet-area">
          <div className="pet-name">{pet.name}</div>
          <PetSprite pet={pet} animationClass={animClass} />
          <div className="pet-age">
            {pet.stage.toUpperCase()} - {pet.age_minutes}min
          </div>
        </div>
        {notification && (
          <div className="notification">{notification}</div>
        )}
        {error && !notification && (
          <div className="notification" style={{ color: '#306230' }}>{error}</div>
        )}
      </TamagotchiScreen>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <TamagotchiDevice
        screenContent={renderScreenContent()}
        buttons={
          <DeviceButtons
            onPressA={handleA}
            onPressB={handleB}
            onPressC={handleC}
          />
        }
      />
      <button className="logout-btn" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}
