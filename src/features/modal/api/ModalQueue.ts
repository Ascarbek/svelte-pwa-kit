import { writable } from 'svelte/store';
import type { Component } from 'svelte';

export type ModalComponent = Component<{ showLoader: boolean; isExpanded: boolean; onExit: () => void }> | null;

export const ModalQueue = writable<{ id: string; comp: ModalComponent }[]>([]);
