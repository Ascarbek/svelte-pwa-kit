<script lang="ts">
  import '../styles/font.css';
  import '../styles/tailwind.css';
  import '../styles/common.css';
  import ModalQueue from '$features/modal/ui/ModalQueue.svelte';
  import QuickLaunch from '$features/quick-launch/ui/QuickLaunch.svelte';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc.js';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import weekday from 'dayjs/plugin/weekday';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import ru from 'dayjs/locale/ru';

  dayjs.locale(ru);
  dayjs.extend(utc);
  dayjs.extend(customParseFormat);
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);

  let { children } = $props();
</script>

<main>
  {@render children()}
</main>

<QuickLaunch />

<ModalQueue />

<style lang="postcss">
  main {
    height: calc(100vh - 90px);
    @apply relative overflow-auto;
  }
</style>
