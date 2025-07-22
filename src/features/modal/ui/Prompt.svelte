<script lang="ts">
  import type { TPrompt } from '$features/modal/api/CommonModalsData.js';
  import { PromptData } from '$features/modal/api/CommonModalsData.js';
  import Button from '$widgets/ui/Button.svelte';

  interface Props {
    showLoader: boolean;
    isExpanded: boolean;
    onExit: () => void;
  }

  let { showLoader, isExpanded, onExit }: Props = $props();

  export const getButtonMessage = (p: TPrompt) => {
    switch (p) {
      case 'CANCEL':
        return 'Отмена';
      case 'YES':
        return 'Да';
      case 'NO':
        return 'Нет';
    }
  };

  const onClick = (button: TPrompt) => {
    $PromptData.cb(button);
    onExit();
  };
</script>

<div class="py-8 flex flex-col gap-8">
  <div class="px-8 text-white text-center font-bold">{$PromptData.title}</div>
  <div class="py-4 text-center px-8">{$PromptData.message}</div>
  <div class="flex flex-col gap-4 px-8">
    {#each $PromptData.buttons as button}
      <Button onclick={() => onClick(button)}>{getButtonMessage(button)}</Button>
    {/each}
  </div>
</div>
