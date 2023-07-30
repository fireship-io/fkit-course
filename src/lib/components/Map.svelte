<style>

    .mapContainer {
        display: grid;
        grid-template-columns: auto;
        grid-template-rows: 4fr 8fr;
        height: 100%;
        margin-top: 2em;
        max-height: calc(100lvh - 4em);
    }

    .mapToolbar {
        background-color: var(--batlas-white);
        margin-bottom: 4em;;
    }

</style>

<div class="mapContainer">
    <div class="mapToolbar dungeonBorder">
        <h3 style="display:inline;">Environment:</h3>
        <select>
            <option value="dungeon">Dungeon</option>
            <option value="dungeon">Forest</option>
            <option value="dungeon">Cave</option>
        </select>
    </div>
    <div class="map">
        <img src="/img/batlasSubtitleLogo_black.webp" alt="map" style="width: 60%;">
    </div>
</div>


