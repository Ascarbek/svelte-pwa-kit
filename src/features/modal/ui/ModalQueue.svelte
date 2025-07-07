<script lang="ts">
  import { popModal } from '$features/modal/api/ModalQueue.js';
  import { MessageModal, ModalQueue, PromptModal } from '$stores/ModalQueue.js';
  import Message from '$features/popup/ui/Message.svelte';
  import Popup from '$features/modal/ui/Popup.svelte';
  import Prompt from '$features/popup/ui/Prompt.svelte';

  $MessageModal = Message;
  $PromptModal = Prompt;

  let showLoader = false;

  const onExitPopup = (id: string) => {
    popModal(id);
  };

  let startClosing: { [id: string]: boolean } = {};

  const onCloseClick = (index: string) => {
    startClosing[index] = true;
  };
</script>

{#each $ModalQueue as modal}
  <Popup on:exit="{() => onExitPopup(modal.id)}" {showLoader} startClosing="{startClosing[modal.id]}" let:isExpanded>
    <svelte:component this="{modal.comp}" bind:showLoader {isExpanded} on:exit="{() => onCloseClick(modal.id)}"
    ></svelte:component>
  </Popup>
{/each}
