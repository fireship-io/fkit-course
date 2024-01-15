<script>
    export let color;
    export let size;
    export let icon;
</script>

<style>

    .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.1em;
        transition: 0.2s;
        min-width: 30px;
    }

    .icon:hover {
        transform: translate(0em, -0.1em);
    }


    .whiteIcon svg {
        fill: var(--batlas-white);
        color: var(--batlas-white);
    }

    .blackIcon svg {
        fill: var(--batlas-black);
    }
    .smallIcon svg {
        width: 1em;
        height: 1em;
    }
    .mediumIcon svg {
        width: 1.2em;
        height: 1.2em;
    }
    .largeIcon svg {
        width: 1.8em;
        height: 1.8em;
    }
    .fullIcon svg {
        width: 100%;
        height: auto;
        max-height: 5em;
    }
</style>

<div 
class:whiteIcon={color === "white"} class:blackIcon={color === "black"} 
class:smallIcon={size === "small"} class:mediumIcon={size === "medium"} class:largeIcon={size === "large"} class:fullIcon={size === "full"}
class="icon"
>
    {#if icon === "remove"}
        <svg class="icon" viewBox="0 0 116 116" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/">
            <g transform="matrix(1,0,0,1,-4892.47,-1919.28)">
                <g transform="matrix(2.02857,0,0,1,-4561.99,-268.79)">
                    <g transform="matrix(0.348574,-0.707107,0.348574,0.707107,2298.28,4264.24)">
                        <path d="M4842.38,1988.04L4842.38,1935.44C4842.38,1934.65 4843.02,1934.01 4843.81,1934.01L4869.56,1934.01C4870.35,1934.01 4870.99,1934.65 4870.99,1935.44L4870.99,1988.04L4923.59,1988.04C4924.38,1988.04 4925.02,1988.68 4925.02,1989.47L4925.02,2015.22C4925.02,2016 4924.38,2016.64 4923.59,2016.64L4870.99,2016.64L4870.99,2069.24C4870.99,2070.03 4870.35,2070.67 4869.56,2070.67L4843.81,2070.67C4843.02,2070.67 4842.38,2070.03 4842.38,2069.24L4842.38,2016.64L4789.78,2016.64C4789,2016.64 4788.36,2016 4788.36,2015.22L4788.36,1989.47C4788.36,1988.68 4789,1988.04 4789.78,1988.04L4842.38,1988.04Z"/>
                    </g>
                </g>
            </g>
        </svg>
    {:else if icon === "rules"}
        <svg class="icon" viewBox="0 0 188 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M187.625,9.381l0,240.732c0,5.178 -4.203,9.381 -9.381,9.381l-168.863,0c-5.177,0 -9.381,-4.203 -9.381,-9.381l-0,-240.732c-0,-5.177 4.204,-9.381 9.381,-9.381l168.863,-0c5.178,-0 9.381,4.204 9.381,9.381Zm-19.759,126.492c0,-0.396 -0.321,-0.717 -0.718,-0.717l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.717l0,12.92c0,0.397 0.322,0.718 0.718,0.718l146.671,0c0.397,0 0.718,-0.321 0.718,-0.718l0,-12.92Zm-42.77,81.078c0,-0.396 -0.321,-0.718 -0.718,-0.718l-103.901,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l103.901,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm42.77,-108.103c0,-0.397 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.321 -0.718,0.718l0,12.92c0,0.396 0.322,0.717 0.718,0.717l146.671,0c0.397,0 0.718,-0.321 0.718,-0.717l0,-12.92Zm0,54.051c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,-135.358c0,-0.926 -0.752,-1.678 -1.678,-1.678l-144.75,-0c-0.927,-0 -1.679,0.752 -1.679,1.678l0,30.214c0,0.927 0.752,1.679 1.679,1.679l144.75,-0c0.926,-0 1.678,-0.752 1.678,-1.679l0,-30.214Zm0,54.281c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,-0c-0.396,-0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Zm0,108.103c0,-0.396 -0.321,-0.718 -0.718,-0.718l-146.671,0c-0.396,0 -0.718,0.322 -0.718,0.718l0,12.92c0,0.396 0.322,0.718 0.718,0.718l146.671,-0c0.397,-0 0.718,-0.322 0.718,-0.718l0,-12.92Z"/></svg>
    {:else if icon === "generate"}
        <svg on:click={() => promptGen(["questLocation", "problem"])} class="icon" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.757,40.076c-16.532,-11.399 -36.566,-18.076 -58.147,-18.076c-56.632,0 -102.61,45.978 -102.61,102.61l-22,-0c-0,-68.774 55.836,-124.61 124.61,-124.61c28.705,0 55.157,9.727 76.235,26.062l23.897,-18.515l15.825,85.389l-78.73,-36.651l20.92,-16.209Zm-126.17,188.931l-20.213,20.213l-26.448,-82.717l82.717,26.448l-20.086,20.086c15.264,9.011 33.059,14.183 52.053,14.183c56.632,-0 102.61,-45.978 102.61,-102.61l22,-0c-0,68.774 -55.836,124.61 -124.61,124.61c-25.091,-0 -48.46,-7.432 -68.023,-20.213Z"/></svg>
    {:else if icon === "save"}
        <svg width="100%" height="100%" viewBox="0 0 260 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M182.311,0l11.811,0l65.372,65.373l0,168.172c0,14.322 -11.627,25.949 -25.949,25.949l-207.596,0c-14.321,0 -25.949,-11.627 -25.949,-25.949l-0,-207.596c-0,-14.321 11.628,-25.949 25.949,-25.949l24.952,0l-0,50.812c-0,11.77 9.555,21.325 21.324,21.325l88.762,0c11.769,0 21.324,-9.555 21.324,-21.325l0,-50.812Zm-21.709,8.163c3.113,0.515 5.491,3.223 5.491,6.482l-0,34.495c-0,3.627 -2.944,6.571 -6.571,6.571l-13.141,-0c-3.626,-0 -6.57,-2.944 -6.57,-6.571l-0,-34.495c-0,-3.259 2.377,-5.967 5.491,-6.482l15.3,-0Zm47.992,142.909c-0,-11.77 -9.556,-21.325 -21.325,-21.325l-115.044,0c-11.769,0 -21.324,9.555 -21.324,21.325l-0,42.649c-0,11.77 9.555,21.325 21.324,21.325l115.044,0c11.769,0 21.325,-9.555 21.325,-21.325l-0,-42.649Z"/></svg>
    {:else if icon === "add"}
        <svg class="icon" viewBox="0 0 260 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M259.494,12.975l0,233.544c0,7.161 -5.814,12.975 -12.975,12.975l-233.544,0c-7.161,0 -12.975,-5.814 -12.975,-12.975l-0,-233.544c-0,-7.161 5.814,-12.975 12.975,-12.975l233.544,-0c7.161,-0 12.975,5.814 12.975,12.975Zm-239.494,7.025l-0,219.494l219.494,0l0.001,-219.494l-219.495,-0Zm95.444,95.444l0,-52.597c0,-0.79 0.641,-1.431 1.431,-1.431l25.745,0c0.789,0 1.43,0.641 1.43,1.431l-0,52.597l52.598,0c0.789,0 1.43,0.641 1.43,1.431l-0,25.745c-0,0.789 -0.641,1.43 -1.43,1.43l-52.598,-0l-0,52.598c-0,0.789 -0.641,1.43 -1.43,1.43l-25.745,-0c-0.79,-0 -1.431,-0.641 -1.431,-1.43l0,-52.598l-52.597,-0c-0.79,-0 -1.431,-0.641 -1.431,-1.43l0,-25.745c0,-0.79 0.641,-1.431 1.431,-1.431l52.597,0Z"/></svg>
    {:else if icon === "upChevron"}
    <svg viewBox="0 0 452 344" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <g transform="matrix(1,0,0,1,-6137.78,-2306.92)">
            <g transform="matrix(3.36311,0,0,1,-10264.4,-268.79)">
                <g transform="matrix(0.297343,2.25514e-17,-6.72205e-18,1,3572.11,645.433)">
                    <path d="M4430.8,2232.28L4614.8,1972.28L4798.8,2232.28"/>
                </g>
            </g>
        </g>
    </svg>
    {:else if icon === "downChevron"}
        <svg viewBox="0 0 452 344" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
            <g transform="matrix(1,0,0,1,-4181.63,-2034.76)">
                <g transform="matrix(2.02857,0,0,1,-4561.99,-268.79)">
                    <g transform="matrix(-0.492958,-1.22465e-16,6.03699e-17,-1,6696.54,4577.83)">
                        <path d="M4430.8,2232.28L4614.8,1972.28L4798.8,2232.28"/>
                    </g>
                </g>
            </g>
        </svg>
    {:else if icon === "leftChevron"}
        <svg viewBox="0 0 344 452" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
            <g transform="matrix(1,0,0,1,-6191.78,-1730)">
                <g transform="matrix(3.36311,0,0,1,-10264.4,-268.79)">
                    <g transform="matrix(1.8207e-17,-1,0.297343,6.12323e-17,4319.19,6839.59)">
                        <path d="M4430.8,2232.28L4614.8,1972.28L4798.8,2232.28"/>
                    </g>
                </g>
            </g>
        </svg>
    {:else if icon === "rightChevron"}
    <svg width="100%" height="100%" viewBox="0 0 345 452" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
        <g transform="matrix(1,0,0,1,-6191.23,-1730.39)">
            <g transform="matrix(3.36311,0,0,1,-10264.4,-268.79)">
                <g transform="matrix(0.000892095,0.999995,-0.297342,0.00300022,5565.27,-2396.3)">
                    <path d="M4430.8,2232.28L4614.8,1972.28L4798.8,2232.28"/>
                </g>
            </g>
        </g>
    </svg>
    {:else if icon === "sword"}
        <svg class="icon" viewBox="0 0 133 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M52.376,79.218l0,-19.043c-10.535,-5.152 -17.798,-15.977 -17.798,-28.486c-0,-17.49 14.199,-31.689 31.689,-31.689c17.489,-0 31.688,14.199 31.688,31.689c0,12.509 -7.263,23.334 -17.798,28.486l-0,19.043l52.376,-0l0,21.798l-34.578,-0l0,105.32l-31.688,53.158l-31.689,-53.158l-0,-105.32l-34.578,-0l0,-21.798l52.376,-0Zm2.112,19.889c0.059,0.629 0.09,1.265 0.09,1.909l-0,99.811c-0,0 11.689,19.608 11.689,19.608l11.688,-19.608l0,-99.811c0,-0.644 0.031,-1.28 0.09,-1.909c-4.556,-0.478 -8.656,-2.485 -11.778,-5.5c-3.123,3.015 -7.223,5.022 -11.779,5.5Zm11.779,-53.323c1.48,-1.429 3.195,-2.643 5.104,-3.576c3.893,-1.904 6.584,-5.898 6.584,-10.519c0,-6.451 -5.237,-11.689 -11.688,-11.689c-6.452,0 -11.689,5.238 -11.689,11.689c-0,4.621 2.691,8.615 6.584,10.519c1.909,0.933 3.624,2.147 5.105,3.576Z"/></svg>
    {:else if icon === "gear"}
        <svg class="icon" viewBox="0 0 260 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M150.044,1.597c-13.447,-2.129 -27.146,-2.129 -40.594,0l-2.262,30.825c-10.725,2.486 -20.966,6.728 -30.309,12.554l-23.395,-20.197c-11.015,8.003 -20.702,17.69 -28.705,28.705l20.197,23.395c-5.826,9.343 -10.068,19.584 -12.554,30.309l-30.825,2.262c-2.129,13.448 -2.129,27.147 0,40.594l30.825,2.262c2.486,10.726 6.728,20.967 12.554,30.309l-20.197,23.396c8.003,11.014 17.69,20.701 28.705,28.704l23.395,-20.197c9.343,5.826 19.584,10.068 30.309,12.554l2.262,30.825c13.448,2.13 27.147,2.13 40.594,-0l2.262,-30.825c10.726,-2.486 20.967,-6.728 30.309,-12.554l23.396,20.197c11.014,-8.003 20.701,-17.69 28.704,-28.704l-20.197,-23.396c5.826,-9.342 10.068,-19.583 12.554,-30.309l30.825,-2.262c2.13,-13.447 2.13,-27.146 -0,-40.594l-30.825,-2.262c-2.486,-10.725 -6.728,-20.966 -12.554,-30.309l20.197,-23.395c-8.003,-11.015 -17.69,-20.702 -28.704,-28.705l-23.396,20.197c-9.342,-5.826 -19.583,-10.068 -30.309,-12.554l-2.262,-30.825Zm-20.297,76.251c28.644,0 51.899,23.255 51.899,51.899c-0,28.644 -23.255,51.899 -51.899,51.899c-28.644,-0 -51.899,-23.255 -51.899,-51.899c0,-28.644 23.255,-51.899 51.899,-51.899Z"/></svg>
    {:else if icon === "logOut"}
        <svg class="icon" viewBox="0 0 219 260" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M176.703,161.714l0,53.604c0,24.382 -19.794,44.176 -44.176,44.176l-88.351,0c-24.381,0 -44.176,-19.794 -44.176,-44.176l0,-171.142c0,-24.382 19.795,-44.176 44.176,-44.176l88.351,0c24.382,0 44.176,19.794 44.176,44.176l0,53.604l41.642,0l0,63.934l-41.642,-0Zm-20,-63.934l0,-53.604c0,-13.343 -10.833,-24.176 -24.176,-24.176l-88.351,0c-13.343,0 -24.176,10.833 -24.176,24.176l0,171.142c0,13.343 10.833,24.176 24.176,24.176l88.351,0c13.343,0 24.176,-10.833 24.176,-24.176l0,-53.604l-23.728,-0l0,59.366l-91.333,-91.333l91.333,-91.333l0,59.366l23.728,0Z"/></svg>
    {:else if icon === "edit"}
        <svg viewBox="0 0 302 302" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <g transform="matrix(1,0,0,1,-4264.96,-1680.79)">
                <g transform="matrix(2.02857,0,0,1,-4561.99,-268.79)">
                    <g transform="matrix(0.392091,-0.795385,0.227537,0.461574,2227.27,4846.5)">
                        <path d="M4668.75,1919.28L4433.17,1919.28L4347.85,1866.91C4344.36,1864.76 4342.18,1860.64 4342.18,1856.15C4342.18,1851.67 4344.36,1847.55 4347.85,1845.4L4433.17,1793.03L4668.75,1793.03C4682.94,1793.03 4694.46,1805.99 4694.46,1821.95L4694.46,1890.36C4694.46,1906.33 4682.94,1919.28 4668.75,1919.28ZM4635.86,1897.28L4668.75,1897.28C4672.15,1897.28 4674.9,1894.18 4674.9,1890.36L4674.9,1821.95C4674.9,1818.13 4672.15,1815.03 4668.75,1815.03L4635.86,1815.03L4635.86,1897.28ZM4371.16,1856.15L4413.61,1882.21L4413.61,1830.1L4371.16,1856.15Z"/>
                    </g>
                </g>
            </g>
        </svg>
    {:else if icon === "d20"}
    <svg viewBox="0 0 226 241" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <g transform="matrix(1,0,0,1,-5840.82,-2158.54)">
            <g transform="matrix(3.36311,0,0,1,-10264.4,-268.79)">
                <g transform="matrix(0.297343,0,0,1,3052.06,268.79)">
                    <path d="M5934.74,2160.1L5879.65,2227.94L5854.09,2213.42L5934.74,2160.1ZM5846.82,2226.31L5872.1,2241.01L5840.82,2324.36L5846.82,2226.31ZM5947.14,2369.87L5947.14,2399.41L5849.14,2352.21L5947.14,2369.87ZM5973.55,2160.76L6054.2,2213.42L6028.64,2227.94L5973.55,2160.76ZM6061.47,2226.31L6066.8,2326.36L6036.19,2241.01L6061.47,2226.31ZM5961.15,2369.87L6060.48,2351.54L5961.15,2399.41L5961.15,2369.87ZM5896.49,2229.97L5953.96,2158.55L6011.48,2229.97L5896.49,2229.97ZM5847.86,2340.22L5881.69,2254.09L5941.14,2355.85L5847.86,2340.22ZM6060.05,2340.22L5966.78,2355.85L6026.22,2254.09L6060.05,2340.22ZM6017.23,2243.26L5954.02,2349.83L5890.74,2243.26L6017.23,2243.26Z"/>
                </g>
            </g>
        </g>
    </svg>
    {:else}
        <p>Icon</p>
    {/if}
</div>