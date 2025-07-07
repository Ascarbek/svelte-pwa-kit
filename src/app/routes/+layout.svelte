<script lang="ts">
  import MainLayout from '../ui/MainLayout.svelte';

  let { children } = $props();
</script>

<MainLayout>
  {@render children()}
</MainLayout>
