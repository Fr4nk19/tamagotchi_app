import { useState, useEffect, useCallback, useRef } from 'react';
import type { Pet } from '../types';
import * as petApi from '../api/pet';

const POLL_INTERVAL = 30000; // 30 seconds

interface UsePetReturn {
  pet: Pet | null;
  isLoading: boolean;
  error: string | null;
  actionLoading: boolean;
  refresh: () => Promise<void>;
  createPet: (name: string) => Promise<void>;
  feed: () => Promise<void>;
  play: () => Promise<void>;
  clean: () => Promise<void>;
  heal: () => Promise<void>;
  sleep: () => Promise<void>;
  wake: () => Promise<void>;
  discipline: () => Promise<void>;
  deletePet: () => Promise<void>;
}

export function usePet(): UsePetReturn {
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async () => {
    try {
      const data = await petApi.getPet();
      setPet(data);
      setError(null);
    } catch (err: unknown) {
      const error = err as { message?: string };
      setError(error.message || 'Failed to fetch pet');
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    const fetchInitial = async () => {
      try {
        const data = await petApi.getPet();
        if (!cancelled) {
          setPet(data);
          setError(null);
        }
      } catch (err: unknown) {
        if (!cancelled) {
          const error = err as { message?: string };
          setError(error.message || 'Failed to fetch pet');
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    fetchInitial();
    intervalRef.current = setInterval(refresh, POLL_INTERVAL);
    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [refresh]);

  const performAction = useCallback(
    async (action: () => Promise<unknown>) => {
      setActionLoading(true);
      try {
        await action();
        await refresh();
        setError(null);
      } catch (err: unknown) {
        const error = err as { response?: { data?: { message?: string } }; message?: string };
        setError(error.response?.data?.message || error.message || 'Action failed');
      } finally {
        setActionLoading(false);
      }
    },
    [refresh]
  );

  const createPet = useCallback(
    async (name: string) => {
      await performAction(() => petApi.createPet(name));
    },
    [performAction]
  );

  const feed = useCallback(() => performAction(petApi.feedPet), [performAction]);
  const play = useCallback(() => performAction(petApi.playWithPet), [performAction]);
  const clean = useCallback(() => performAction(petApi.cleanPet), [performAction]);
  const heal = useCallback(() => performAction(petApi.healPet), [performAction]);

  const sleep = useCallback(() => performAction(petApi.putPetToSleep), [performAction]);
  const wake = useCallback(() => performAction(petApi.wakePet), [performAction]);
  const discipline = useCallback(() => performAction(petApi.disciplinePet), [performAction]);

  const deletePet = useCallback(async () => {
    await performAction(petApi.deletePet);
    setPet(null);
  }, [performAction]);

  return {
    pet,
    isLoading,
    error,
    actionLoading,
    refresh,
    createPet,
    feed,
    play,
    clean,
    heal,
    sleep,
    wake,
    discipline,
    deletePet,
  };
}
