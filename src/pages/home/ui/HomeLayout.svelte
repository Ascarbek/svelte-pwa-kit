<script lang="ts">
  import BellSimple from '$icons/BellSimple.svelte';
  import HouseSimple from '$icons/HouseSimple.svelte';

  let { children } = $props();
</script>

<div class="bg-gray-90 h-full w-full relative">
  <div class="bg-brand-70 h-[60px] w-full">
    <div class="flex items-center justify-between h-full px-4">
      <div class="w-[30px] flex items-center justify-start">
        <i class="block w-[24px] h-[24px]">
          <HouseSimple />
        </i>
      </div>
      <span> Welcome! 🎉 </span>
      <div class="w-[30px] flex items-center justify-end">
        <i class="block w-[24px] h-[24px]">
          <BellSimple />
        </i>
      </div>
    </div>
  </div>
  <main>
    {@render children()}
  </main>
</div>

<style lang="postcss">
  main {
    height: calc(100% - 60px);
    @apply overflow-auto;
  }
</style>
