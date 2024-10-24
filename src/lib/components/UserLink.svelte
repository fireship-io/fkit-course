<script>
  /** @type {{icon?: string, url?: string, title?: string}} */
  let { icon = 'default', url = 'foo', title = 'some cool title' } = $props();
</script>



<a href={url} class="stack w-full max-w-md text-center bg-base-300 flex justify-center items-center p-4 rounded-lg not-prose no-underline">
  <img src={`/${icon}.png`} alt={icon} width="32" height="32" class="w-8" />
  <span class="text-lg text-white font-bold">{title}</span>
</a>