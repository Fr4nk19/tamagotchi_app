import client from './client';
import type { Pet, PetAction } from '../types';

export async function getPet(): Promise<Pet | null> {
  try {
    const response = await client.get<Pet>('/pet');
    return response.data;
  } catch (error: unknown) {
    const err = error as { response?: { status?: number } };
    if (err.response?.status === 404) return null;
    throw error;
  }
}

export async function createPet(name: string): Promise<Pet> {
  const response = await client.post<Pet>('/pet', { name });
  return response.data;
}

export async function feedPet(): Promise<PetAction> {
  const response = await client.post<PetAction>('/pet/feed');
  return response.data;
}

export async function playWithPet(): Promise<PetAction> {
  const response = await client.post<PetAction>('/pet/play');
  return response.data;
}

export async function cleanPet(): Promise<PetAction> {
  const response = await client.post<PetAction>('/pet/clean');
  return response.data;
}

export async function healPet(): Promise<PetAction> {
  const response = await client.post<PetAction>('/pet/heal');
  return response.data;
}

export async function putPetToSleep(): Promise<PetAction> {
  const response = await client.post<PetAction>('/pet/sleep');
  return response.data;
}

export async function wakePet(): Promise<PetAction> {
  const response = await client.post<PetAction>('/pet/wake');
  return response.data;
}

export async function disciplinePet(): Promise<PetAction> {
  const response = await client.post<PetAction>('/pet/discipline');
  return response.data;
}

export async function deletePet(): Promise<void> {
  await client.delete('/pet');
}
