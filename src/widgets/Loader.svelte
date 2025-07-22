<script lang="ts">
  import Gear from '$widgets/icons/Gear.svelte';

  interface Props {
    message1?: string;
    message2?: string;
  }

  let { message1 = 'please wait...', message2 = '' }: Props = $props();
</script>

<div class="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center">
  <div class="flex flex-col items-center justify-center gap-2">
    <span class="h-10 w-10 animate-spin"><Gear /></span>
    <span class="animate-pulse text-xl text-center leading-8">{message1} <br />{message2}</span>
  </div>
</div>
