<script lang="ts">;
    import "../app.css";

</script>

<style>
    .betaAnnoucement {
        text-align: center;
        font-size: 0.8rem;
        color: var(--batlas-white);
        margin-bottom: 0;
        width: 100%;
        z-index: 999;
        position: fixed;
        top: 0;
    }

    .betaAnnoucement p {
        background-color: var(--batlas-black);
        display: inline;
    }
</style>
<p class="betaAnnoucement">This is a beta version of the app. Payment is in test mode and there will be bugs. Please use at your own discretion.</p>

<slot />
