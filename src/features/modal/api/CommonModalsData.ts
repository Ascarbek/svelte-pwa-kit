import { writable } from 'svelte/store';

export const MessageModalData = writable<{ title: string; message: string }>({ title: '', message: '' });
export const PromptData = writable<{ title: string; message: string; buttons: TPrompt[]; cb: (e: TPrompt) => void }>({
  title: '',
  message: '',
  buttons: ['YES', 'NO'],
  cb: () => {},
});
export type TPrompt = 'YES' | 'NO' | 'CANCEL';
