<script>
export let options;

let index = 0;

let currentTile = `/img/tiles/dungeon/${options[index]}.webp`;

function nextTile() {
    if (index < 2) {
        index++;
    } else {
        index = 0;
    }
    currentTile = `/img/tiles/dungeon/${options[index]}.webp`;
}

</script>

<style>
    .hoverCircle {
        width: 3em;
        height: 3em;
        border-radius: 50%;
        background-color:  var(--batlas-white);
        padding: 0.5em;
        position: absolute;
        bottom: calc(100% - 1.5em);
        left: calc(50% - 1.5em);
        pointer-events: auto;
        z-index: 5;
        opacity: 0.3;
        color: var(--batlas-white);
    }

    .hoverCircle:hover {
        cursor: pointer;
        background-color: var(--batlas-white);
        color: var(--batlas-black);
        opacity: 1;
    }

    .hoverCircle:hover svg {
        animation: rotate 1s infinite linear;
    }

    @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
}


    .mapMakerTile {
        width: 12em;
        max-width: 40em;
        object-fit: contain;
        object-position: bottom center;
        pointer-events: none;
        position: relative;
        bottom: 0em;
        left: 0em;
    }

    .centeredTile {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        bottom: 0em;
        height: 10em;
    }

    @media screen and (max-width: 900px) {

    .hoverCircle {
        width: 6em;
        height: 6em;
    }
    
    .mapMakerTile {
        width: 24em;
        max-width: 40em;
    }
    .hoverCircle {
        opacity: 0.7;
        bottom: calc(100% - 3em);
        left: calc(50% - 3em);
    }
}
</style>
<div class="centeredTile">
    <div class="hoverCircle">
        <svg on:click={nextTile}  viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.757,40.076c-16.532,-11.399 -36.566,-18.076 -58.147,-18.076c-56.632,0 -102.61,45.978 -102.61,102.61l-22,-0c-0,-68.774 55.836,-124.61 124.61,-124.61c28.705,0 55.157,9.727 76.235,26.062l23.897,-18.515l15.825,85.389l-78.73,-36.651l20.92,-16.209Zm-126.17,188.931l-20.213,20.213l-26.448,-82.717l82.717,26.448l-20.086,20.086c15.264,9.011 33.059,14.183 52.053,14.183c56.632,-0 102.61,-45.978 102.61,-102.61l22,-0c-0,68.774 -55.836,124.61 -124.61,124.61c-25.091,-0 -48.46,-7.432 -68.023,-20.213Z"/></svg>
    </div>
    <img class="mapMakerTile" src={currentTile} alt="current tile"/>
</div>