<script lang="ts">
  import { MessageModalData } from '$features/modal/api/CommonModalsData';
  import Button from '$widgets/ui/Button.svelte';

  interface Props {
    showLoader: boolean;
    isExpanded: boolean;
    onExit: () => void;
  }

  let { showLoader, isExpanded, onExit }: Props = $props();
</script>

<div class="py-8 flex flex-col gap-8">
  <div class="px-8 pb-8 text-white text-center font-bold">
    {$MessageModalData.title}
  </div>
  <div class="py-8 text-center px-8">{$MessageModalData.message}</div>
  <div class="flex items-center justify-center gap-4 mb-8 md:mb-0">
    <Button onclick={() => onExit()}>Ok</Button>
  </div>
</div>
