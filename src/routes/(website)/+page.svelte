<script>
  import Footer from "$lib/components/Footer.svelte";
import Header from "$lib/components/Header.svelte";
import CycleTile from "$lib/components/CycleTile.svelte";

    let topTiles = ['r1-v3', 'r4-v2', 'r11-v2']
    let leftTiles = ['r10-v2', 'r3-v3', 'c9-v3']
    let rightTiles = ['c5-v2', 'r8-v2', 'r1-v2']
    let bottomTiles = ['c1-v2', 'c2-v3', 'd12-v1']
</script>

<style>

    * {
        scroll-behavior: smooth;
    }

    h1 {
        font-size: 3rem;
        font-weight: 700;
        margin-bottom: 2rem;
    }

    h2 {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 0rem;
        color: var(--batlas-white);
    }

    .underline {
        border-bottom: 2px solid var(--batlas-white);
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: auto;
        background-color: var(--batlas-black);
        padding: 10rem 0;
    }

    section {
        max-width: 1000px;
        padding: 5rem 2rem;
        color: var(--batlas-white);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;
    }

    .narrow {
        max-width: 600px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        justify-content: center;
        gap: 0.5rem;
    }

    video {
        margin-top: 2rem;
        width: 100%;
        max-width: 600px;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
    }

    .threeColumn {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 2rem;
        margin-top: 2rem;
    }

    .testimonial {
        padding: 2rem;
        border-radius: 1rem;
        background-color: var(--batlas-white);
        color: var(--batlas-black);
        font-size: 1.2rem;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 1rem;
    }

    .testimonial p {
        margin: 0;
    }

    .testimonialAttribute {
        font-size: 1.2rem;
        font-weight: 700;
        text-align: right;
    }

    .whyUseAttribute {
        font-size: 1.2rem;
        font-weight: 700;
        text-align: left;
    }

    .whiteButton {
        background-color: var(--batlas-white);
        color: var(--batlas-black);
        padding: 1rem 2rem;
        border-radius: 1rem;
        font-size: 1.2rem;
        font-weight: 700;
        text-decoration: none;
        margin-top: 2rem;
        transition: all 0.2s ease-in-out;
    }

    .blackButton {
        background-color: var(--batlas-black);
        border: 0.2rem solid var(--batlas-white);
        color: var(--batlas-white);
        padding: 1rem 2rem;
        border-radius: 1rem;
        font-size: 1.2rem;
        font-weight: 700;
        text-decoration: none;
        margin-top: 2rem;
        transition: all 0.2s ease-in-out;

    }

    .whiteButton:hover {
        background-color: var(--batlas-black);
        color: var(--batlas-white);
    }

    .blackButton:hover {
        background-color: var(--batlas-white);
        color: var(--batlas-black);
    }

    .tinyText {
        font-size: 0.8rem;
    }

    .whyUse {
        padding: 2rem;
        border-radius: 1rem;
        background-color: var(--batlas-black);
        color: var(--batlas-white);
        border: 0.2rem solid var(--batlas-white);
        font-size: 1rem;
        text-align: left;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        gap: 1rem;
    }

    .mapMaker {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 200px;
    }

    .mapMaker .row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: -112px;
    }

    @media only screen and (max-width: 900px) {
        .threeColumn {
            grid-template-columns: 1fr;
        }
    }

</style>

<Header />

<div class="container">
    <section>
        <h1>An easy to use, any-system <span class="underline">isometric adventure creator</span></h1>
        <div class="narrow">
        <p>Batlas is intuitive, point-and-click, independently owned, hand-drawn isometric adventures. No AI, no money-hungry corporations, an adventure tool that respects a Game Master's time and offers a streamlined way to dungeon delve.</p>
        <a href="/login" class="whiteButton">Get started</a>
            <div>
                <video autoplay loop muted>
                <source src="/video/batlasHero.mp4" type="video/mp4">
                <track default kind="captions" srclang="en">
                </video>
            </div>
        </div>
    </section>
    <section class="narrow" id="about">
        <h2>Don't kill 💀 your campaign</h2>
        <p>Game Master burnout is one of the most common causes of campaign death and the quickest way to burn out is to over prepare for game night again and again.</p>
        <p>Batlas is a great tool to map out intricate dungeon crawls in minutes that can last hours in game.</p>
    </section>
    <section class="narrow">
        <h2>A new way to play</h2>
        <p>Few players have had the fun of delving through an isometric dungeon because Game Masters don't have the time to draw them.</p>
        <p>With real-time fog-of-war in the play mode, you can make your players wonder what's around every corner.</p>
    </section>
    <section class="narrow">
        <h2>Simple tools for satisfying games</h2>
        <p>Batlas is a map based adventure planner that stores your notes right in the map so that everything you need is in one place.</p>
        <p>Create your dungeon, write out a few description, define the points of interest, and hit play!</p>
        <div class="mapMaker">
            <div class="row">
              <CycleTile options={topTiles}/>
            </div>
            <div class="row">
              <CycleTile options={leftTiles}/>
              <CycleTile options={rightTiles}/>
            </div>
            <div class="row">
              <CycleTile options={bottomTiles}/>
            </div>
          </div>
    </section>
    <section class="narrow">
        <h2>Share your adventure with your players</h2>
        <p>Once you create your adventure you can share it with your players through the URL.</p>
        <p>The Game Master will see their notes and the players will only see what parts of the map have been uncovered.</p>
    </section>
    <section>
        <h2>Game Masters ❤️ Batlas</h2>
        <p>Here's what a few happy Game Masters have to say about Batlas.</p>
        <div class="threeColumn">
            <div class="testimonial">
                <p>"My players have a habit of checking out every ruin they can and Batlas stops me from pulling my hair out."</p>
                <p class="testimonialAttribute">Pat F</p>
            </div>
            <div class="testimonial">
                <p>"I was new to running the game and having a map to point and keep notes on was amazing!"</p>
                <p class="testimonialAttribute">Kitt N</p>
            </div>
            <div class="testimonial">
                <p>"Sometimes you want to take a break from the huge scope of grand-adventure and just send your party into a dungeon."</p>
                <p class="testimonialAttribute">Tanner J</p>
            </div>
        </div>
    </section>
    <section id="pricing">
        <h2>Free Forever</h2>
        <p>Sign up for a free account and start creating your own adventures today!</p>
        <p>There's no limit to how long you can use the free tier.</p>
        <a href="/login" class="whiteButton">Sign up for a free account</a>
        <a href="/login" class="blackButton">or $6<span class="tinyText">AUD</span>/month for the premium tier</a> 
    </section>
    <section>
        <h2>Why use Batlas?</h2>
        <p>Most games need much less prep than Game Masters force themselves to do. Batlas cuts down prep time and brings back the spirit of classic TTRPGs</p>
        <div class="threeColumn">
            <div class="whyUse">
                <p class="whyUseAttribute">A new way to play!</p>
                <p>Isometric maps offer a new way of approaching fantasy adventures, one that normally takes hours of prep.</p>
            </div>
            <div class="whyUse">
                <p class="whyUseAttribute">Create & Play on the same platform</p>
                <p>Offer up your adventures to your players with a simple link and run through the dungeons on any device.</p>
            </div>
            <div class="whyUse">
                <p class="whyUseAttribute">Community driven & ever-growing</p>
                <p>Batlas is developed by one person (hello!), and I want to build the tools my users want.</p>
            </div>
        </div>
    </section>
    <section>
        <h2>What's in the premium tier?</h2>
        <p>If you're looking to support independant hobbyists and tinkerers while getting some extra tools, this is right for you.</p>
        <div class="threeColumn">
            <div class="whyUse">
                <p class="whyUseAttribute">Unlimited adventures</p>
                <p>Store as many adventures as you have ideas. Create sprawling multi-map dungeons that go as deep as you like.</p>
            </div>
            <div class="whyUse">
                <p class="whyUseAttribute">No limit on dungeon size</p>
                <p>Create a labyrinth of hallways and rooms with no idea to drive your players to the brink of their skills.</p>
            </div>
            <div class="whyUse">
                <p class="whyUseAttribute">Vote on upcoming features</p>
                <p>Premium members get their say on what gets added to Batlas next.</p>
            </div>
        </div>
        <div class="threeColumn">
            <div class="whyUse">
                <p class="whyUseAttribute">Premade dungeons (coming soon)</p>
                <p>Pre-made dungeons to slot into any campaign when you're in a pinch. From 5-room one-shots, to sprawling crawls, a library of adventure is at your fingertips.</p>
            </div>
            <div class="whyUse">
                <p class="whyUseAttribute">A free rules-light system</p>
                <p>New to TTRPGs? Just looking for a new system centered on archetypes and improv? With the premium tier you get access to the Batlas rules.</p>
            </div>
            <div class="whyUse">
                <p class="whyUseAttribute">Support the community</p>
                <p>I've been playing TTRPGs for over a decade and with your help I can give back to the community. But software dev takes a lot of time and energy; every bit helps.</p>
            </div>
        </div>
    </section>
    <section>
        <h1>Ready to dive into the dungeon?</h1>
        <p>Free forever.</p>
        <a href="/login" class="whiteButton">Get started</a>
    </section>
</div>
<Footer />

