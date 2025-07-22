<script lang="ts">
  import { ModalQueue } from '$features/modal/api/ModalQueue.js';
  import { showMessage, showPrompt } from '$features/modal/api/CommonModals.js';
  import Button from '$widgets/ui/Button.svelte';

  const onClick = () => {
    showMessage('message', 'hello');
  };

  const onClick2 = () => {
    showPrompt('prompt', 'are you sure?', ['YES', 'NO'], (e) => {
      console.log(e);
    });
  };
</script>

<div>
  <div>Homepage 111</div>
  <div>
    <Button onclick={onClick}>Hello</Button>
  </div>
  <div>
    <Button onclick={onClick2}>Prompt</Button>
  </div>
</div>
