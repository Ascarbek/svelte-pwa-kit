<script lang="ts">
  import { isDesktop } from '$shared/mediaQuery.js';
  import { createEventDispatcher, onMount } from 'svelte';
  import type { TouchEventHandler } from 'svelte/elements';
  import { writable } from 'svelte/store';
  import Loader from '$widgets/shared/Loader.svelte';

  const dispatch = createEventDispatcher<{ exit: null }>();

  export let showLoader = false;
  let height: number = 0;
  let screenHeight = 0;
  export let expandedHeight = 0;

  $: expandedHeight = screenHeight - height - 80;

  let isExpanded = false;

  let visibleHeight = writable(0);

  const goUp = (h: number) => {
    if (!h) return;
    if (isExpanded) {
      $visibleHeight = h + expandedHeight;
    } else {
      $visibleHeight = h;
    }
  };

  onMount(() => {
    setTimeout(() => {
      goUp(height);
    });
  });

  const onStartClosing = () => {
    visibleHeight.set($isDesktop ? -height * 3 : 0);
    setTimeout(() => {
      dispatch('exit');
    }, 200);
  };

  let previousTouch: Touch | null = null;
  let yStart: number;

  const onStartMoving: TouchEventHandler<HTMLDivElement> = (e) => {
    previousTouch = e.touches[0];
    yStart = $visibleHeight;
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (previousTouch) {
      let movementX = touch.screenY - previousTouch.screenY;
      // duration 0
      visibleHeight.set(yStart - movementX);
    }
  };

  const delta = 50;

  const onEndMoving: TouchEventHandler<HTMLDivElement> = (e) => {
    if (previousTouch) {
      let movementX = yStart - $visibleHeight;
      if (Math.abs(movementX) > delta) {
        if (movementX > 0) {
          if (!isExpanded) {
            onStartClosing();
          } else {
            isExpanded = false;
            visibleHeight.set(height);
          }
        } else {
          isExpanded = true;
          visibleHeight.set(height + expandedHeight);
        }
      } else {
        if (isExpanded) {
          console.log('is expanded', height + expandedHeight);
          visibleHeight.set(height + expandedHeight);
        } else {
          visibleHeight.set(height);
        }
      }
    }
    previousTouch = null;
  };

  export let startClosing = false;

  $: startClosing && onStartClosing();
</script>

<svelte:window bind:innerHeight="{screenHeight}" />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:keydown="{() => null}" class="fixed z-10 inset-0 md:flex md:items-center md:justify-center overflow-hidden">
  <!-- Backdrop -->
  <div
    on:touchstart|stopPropagation|preventDefault="{onStartClosing}"
    on:touchend|stopPropagation
    on:click|stopPropagation="{onStartClosing}"
    class="fixed inset-0 z-30 backdrop-blur-sm"
  ></div>

  <div
    on:click|stopPropagation
    on:keydown="{() => null}"
    on:touchstart="{onStartMoving}"
    on:touchmove="{onTouchMove}"
    on:touchend="{onEndMoving}"
    on:touchcancel="{onEndMoving}"
    style="{`will-change: top; ${$isDesktop ? `top: calc(50% - ${$visibleHeight / 2}px)` : `top: calc(100% - ${$visibleHeight}px);`}`}"
    class="{`content ${previousTouch ? 'duration-0' : 'duration-200'} `}"
  >
    <!-- small bar for mobile only -->
    <div class="flex z-10 md:hidden absolute top-[0px] py-[12px] inset-x-0 items-center justify-center">
      <div class="bg-gray-70 rounded-xl h-[7px] w-[90px]"></div>
    </div>

    <button on:click="{onStartClosing}" class="hidden md:block text-main-700 absolute right-0 top-0 p-4 z-10">
      <i class="fa-solid fa-xmark"></i>
    </button>

    {#if showLoader}
      <div class="absolute" style="{`height: ${height}px; width: 100%;`}">
        <Loader />
      </div>
    {/if}

    <main bind:clientHeight="{height}" class="{showLoader ? 'blur' : ''}">
      <slot {isExpanded} />
    </main>
  </div>
</div>

<style lang="postcss">
  main {
    @apply block;
  }

  .content {
    @apply bg-gray-90 text-gray-30;
  }

  .content {
    @apply relative z-30 h-screen w-screen;
  }

  .content {
    @apply md:absolute md:h-auto md:w-[500px] md:rounded-xl;
  }

  .content {
    @apply border-gray-70 rounded-tl-2xl rounded-tr-2xl border-t;
  }
</style>
