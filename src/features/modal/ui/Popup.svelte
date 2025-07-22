<script lang="ts">
  import { isDesktop } from '$shared/mediaQuery';
  import type { Snippet } from 'svelte';
  import type { TouchEventHandler } from 'svelte/elements';
  import Loader from '$widgets/Loader.svelte';

  interface Props {
    startClosing: boolean;
    onExit: () => void;
    showLoader: boolean;
    expandedHeight?: number;
    isExpanded: boolean;
    children: Snippet<[boolean]>;
  }

  let {
    startClosing = $bindable(),
    onExit,
    showLoader = $bindable(),
    expandedHeight = $bindable(0),
    isExpanded = $bindable(),
    children,
  }: Props = $props();

  let height = $state(0);
  let screenHeight = $state(0);
  let visibleHeight = $state(0);
  let previousTouch = $state<Touch | null>(null);
  let yStart = $state(0);
  const delta = 50;

  $effect(() => {
    expandedHeight = screenHeight - height - 80;
  });

  $effect(() => {
    if (startClosing) {
      onStartClosing();
    }
  });

  const goUp = (h: number) => {
    if (!h) return;
    if (isExpanded) {
      visibleHeight = h + expandedHeight;
    } else {
      visibleHeight = h;
    }
  };

  $effect(() => {
    goUp(height);
  });

  const onStartClosing = () => {
    visibleHeight = $isDesktop ? -height * 3 : 0;
    setTimeout(() => {
      onExit();
    }, 200);
  };

  const onStartMoving: TouchEventHandler<HTMLDivElement> = (e) => {
    previousTouch = e.touches[0];
    yStart = visibleHeight;
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    const touch = e.touches[0];
    if (previousTouch) {
      let movementX = touch.screenY - previousTouch.screenY;
      visibleHeight = yStart - movementX;
    }
  };

  const onEndMoving: TouchEventHandler<HTMLDivElement> = (e) => {
    if (previousTouch) {
      let movementX = yStart - visibleHeight;
      if (Math.abs(movementX) > delta) {
        if (movementX > 0) {
          if (!isExpanded) {
            onStartClosing();
          } else {
            isExpanded = false;
            visibleHeight = height;
          }
        } else {
          isExpanded = true;
          visibleHeight = height + expandedHeight;
        }
      } else {
        if (isExpanded) {
          visibleHeight = height + expandedHeight;
        } else {
          visibleHeight = height;
        }
      }
    }
    previousTouch = null;
  };
</script>

<svelte:window bind:innerHeight={screenHeight} />

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onkeydown={() => null} class="fixed z-10 inset-0 md:flex md:items-center md:justify-center overflow-hidden">
  <!-- Backdrop -->
  <div
    ontouchstart={(e) => {
      onStartClosing();
    }}
    class="fixed inset-0 z-30 backdrop-blur-sm"
  ></div>

  <div
    onclick={(e) => e.stopPropagation()}
    onkeydown={() => null}
    ontouchstart={onStartMoving}
    ontouchmove={onTouchMove}
    ontouchend={onEndMoving}
    ontouchcancel={onEndMoving}
    style={`will-change: top; ${$isDesktop ? `top: calc(50% - ${visibleHeight / 2}px)` : `top: calc(100% - ${visibleHeight}px);`}`}
    class={`content ${previousTouch ? 'duration-0' : 'duration-200'} `}
  >
    <!-- small bar for mobile only -->
    <div class="flex z-10 md:hidden absolute top-[0px] py-[12px] inset-x-0 items-center justify-center">
      <div class="bg-gray-70 rounded-xl h-[7px] w-[90px]"></div>
    </div>

    <button ontouchstart={() => onStartClosing()} class="hidden md:block text-main-700 absolute right-0 top-0 p-4 z-10">
      <i class="fa-solid fa-xmark"></i>
    </button>

    {#if showLoader}
      <div class="absolute" style={`height: ${height}px; width: 100%;`}>
        <Loader />
      </div>
    {/if}

    <main bind:clientHeight={height} class={showLoader ? 'blur' : ''}>
      {@render children(isExpanded)}
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
    @apply rounded-tl-2xl rounded-tr-2xl border-t border-gray-70;
  }
</style>
