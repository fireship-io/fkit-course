<script>
    let isLoggedIn = false;

    function handleLogin() {
        isLoggedIn = true;
        // Add your login logic here
    }
</script>

<style>
    .header {
        height: 4rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 1rem;
        gap: 1rem;
        background-color: var(--batlas-black);
        position: fixed;
        top: 0rem;
    }

    .header h1 {
        color: var(--batlas-white);
        font-size: 2rem;
        margin: 0;
    }

    .header .button {
        text-decoration: none;
        height: 100%;
    }

    @media (max-width: 735px) {
        .header {
            justify-content: space-between;
        }
    }

</style>

<div class="header">
    <h1>Batlas</h1>
        <a class="button whiteButton" href="/login">Sign up</a>
</div>