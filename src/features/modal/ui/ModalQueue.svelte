<script lang="ts">
  import { ModalQueue } from '$features/modal/api/ModalQueue';
  import { popModal } from '$features/modal/api/CommonModals.js';
  import Popup from '$features/modal/ui/Popup.svelte';

  let showLoader = $state(false);

  const onExitPopup = (id: string) => {
    popModal(id);
  };

  let startClosing = $state<{ [id: string]: boolean }>({});
  let isExpanded = $state(false);

  const onCloseClick = (index: string) => {
    startClosing[index] = true;
  };
</script>

{#each $ModalQueue as modal}
  <Popup onExit={() => onExitPopup(modal.id)} {showLoader} startClosing={startClosing[modal.id]} bind:isExpanded>
    {@const Comp = modal.comp}
    <Comp bind:showLoader {isExpanded} onExit={() => onCloseClick(modal.id)}></Comp>
  </Popup>
{/each}
