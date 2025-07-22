<script lang="ts">
  import { page } from '$app/state';
  import ArrowsDownUp from '$icons/ArrowsDownUp.svelte';
  import ChartPieSlice from '$icons/ChartPieSlice.svelte';
  import Chats from '$icons/Chats.svelte';
  import Gear from '$icons/Gear.svelte';
  import HouseSimple from '$icons/HouseSimple.svelte';
  import User from '$icons/User.svelte';
</script>

<div class="bg-gray-80 h-[90px] border-t border-gray-70 block md:hidden fixed bottom-0 w-screen">
  <div class="grid grid-cols-6 h-[50px] text-gray-40">
    <a href="/" class="item" class:active={page.route.id === '/'}>
      <span>
        <i class="block w-[24px] h-[24px]">
          <HouseSimple />
        </i>
      </span>
    </a>

    <a href="/transactions" class="item" class:active={page.route.id === '/transactions'}>
      <span>
        <i class="block w-[24px] h-[24px]">
          <ArrowsDownUp />
        </i>
      </span>
    </a>

    <a href="/charts" class="item" class:active={page.route.id === '/charts'}>
      <span>
        <i class="block w-[24px] h-[24px]">
          <ChartPieSlice />
        </i>
      </span>
    </a>

    <a href="/messages" class="item" class:active={page.route.id === '/messages'}>
      <span>
        <i class="block w-[24px] h-[24px]">
          <Chats />
        </i>
      </span>
    </a>

    <a href="/profile" class="item" class:active={page.route.id === '/profile'}>
      <span>
        <i class="block w-[24px] h-[24px]">
          <User />
        </i>
      </span>
    </a>

    <a href="/settings" class="item" class:active={page.route.id === '/settings'}>
      <span>
        <i class="block w-[24px] h-[24px]">
          <Gear />
        </i>
      </span>
    </a>
  </div>
</div>

<style lang="postcss">
  a.item {
    @apply flex h-full items-center justify-center;
  }

  a.item.active {
    @apply text-brand-70;
  }

  a.item span {
    @apply flex items-center justify-center;
  }
</style>
