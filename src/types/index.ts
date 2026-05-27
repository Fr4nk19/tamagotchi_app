export interface Pet {
  id: string;
  name: string;
  stage: 'egg' | 'baby' | 'child' | 'teen' | 'adult';
  hunger: number;
  happiness: number;
  energy: number;
  cleanliness: number;
  health: number;
  weight: number;
  age_minutes: number;
  is_alive: boolean;
  is_sleeping: boolean;
  born_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface PetAction {
  id: number;
  action: string;
  stat_changes: Record<string, number>;
  created_at: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

export type MenuAction = 'feed' | 'play' | 'clean' | 'heal' | 'sleep' | 'stats' | 'discipline';
