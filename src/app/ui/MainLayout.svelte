<script lang="ts">
  import '../styles/font.css';
  import '../styles/tailwind.css';
  import '../styles/common.css';
  import ModalQueue from '$features/modal/ui/ModalQueue.svelte';
  import { getPWADisplayMode } from '$shared/getPWADisplayMode.js';

  import QuickLaunch from '$features/quick-launch/ui/QuickLaunch.svelte';
  import dayjs from 'dayjs';
  import utc from 'dayjs/plugin/utc.js';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  import weekday from 'dayjs/plugin/weekday';
  import weekOfYear from 'dayjs/plugin/weekOfYear';
  import ru from 'dayjs/locale/ru';
  import { onMount } from 'svelte';

  dayjs.locale(ru);
  dayjs.extend(utc);
  dayjs.extend(customParseFormat);
  dayjs.extend(weekday);
  dayjs.extend(weekOfYear);

  onMount(() => {
    console.log(getPWADisplayMode());

  });
</script>


  <slot />


<QuickLaunch />

<ModalQueue />



