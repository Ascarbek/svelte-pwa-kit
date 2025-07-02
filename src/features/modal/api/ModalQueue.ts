import { get } from 'svelte/store';
import { MessageModal, MessageModalData, PromptData, PromptModal, ModalQueue } from '$stores/ModalQueue.js';
import type { ModalComponent, TPrompt } from '$stores/ModalQueue.js';
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
  const messageModal = get(MessageModal);
  pushModal(messageModal);
};

export const showPrompt = (title: string, message: string, buttons: TPrompt[], cb: (e: TPrompt) => void) => {
  PromptData.set({
    title,
    message,
    buttons,
    cb,
  });
  const promptModal = get(PromptModal);
  pushModal(promptModal);
};
