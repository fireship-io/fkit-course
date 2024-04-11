<script>
    export let color;
</script>

<style>  
    .black {
        border-color: var(--batlas-black)
    }  

    .white {
        border-color: var(--batlas-white)
    }   

</style>
<div class="divider" class:white={color==="white"} class:black={color==="black"}></div>