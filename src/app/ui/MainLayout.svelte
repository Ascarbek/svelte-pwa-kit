<script lang="ts">
  import '../styles/font.css';
  import '../styles/tailwind.css';
  import '../styles/common.css';
  import ModalQueue from '$features/modal/ui/ModalQueue.svelte';
  import { displayMode } from '$shared/displayMode.js';

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

  $inspect($displayMode);

  let { children } = $props();
</script>

{@render children()}

<QuickLaunch />

<ModalQueue />
