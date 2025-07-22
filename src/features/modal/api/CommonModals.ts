import { MessageModalData, PromptData, type TPrompt } from '$features/modal/api/CommonModalsData.js';
import type { ModalComponent } from '$features/modal/api/ModalQueue.js';
import { ModalQueue } from '$features/modal/api/ModalQueue.js';
import Message from '$features/modal/ui/Message.svelte';
import Prompt from '$features/modal/ui/Prompt.svelte';
import { get } from 'svelte/store';
import { v4 as uuid } from 'uuid';

export const pushModal = (modal: ModalComponent) => {
  const queue = get(ModalQueue);

  ModalQueue.set([...queue, { id: uuid(), comp: modal }]);
};

export const popModal = (id: string) => {
  const queue = get(ModalQueue);

  ModalQueue.set(queue.filter((q) => q.id !== id));
};

export const showMessage = (title: string, message: string) => {
  MessageModalData.set({
    title,
    message,
  });

  pushModal(Message);
};

export const showPrompt = (title: string, message: string, buttons: TPrompt[], cb: (e: TPrompt) => void) => {
  PromptData.set({
    title,
    message,
    buttons,
    cb,
  });

  pushModal(Prompt);
};
