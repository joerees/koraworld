<script lang="ts" setup>
import interact from 'interactjs';
const position = { x: 0, y: 0 }

interact('.card').draggable({
    listeners: {
        move(event) {
            position.x += event.dx;
            position.y += event.dy;
            event.target.style.transform =
                `translate(${position.x}px, ${position.y}px)`
        },
    }
})
</script>

<template>
    <div class="card">
        <slot></slot>
    </div>

    <svg style="display:none;">
    
        <filter id="displacementFilter">
            <feTurbulence type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="1"
              result="turbulence" />

              <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredTurbulence" />
            <feDisplacementMap in="SourceGraphic"
                in2="turbulence"
                            scale="70" xChannelSelector="R" yChannelSelector="G" />
        </filter>

    </svg>
</template>

<style scoped>
.card {
    width: 100%;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    overflow: hidden;

    border-radius: inherit;
    transition: opacity 0.26s ease-out;
    border-radius: 28px;
    filter: drop-shadow(-8px -10px 46px #0000005f);

    backdrop-filter: brightness(1.1)
        blur(2px)
        url(#displacementFilter);

       /*  backdrop-filter: blur(8px) brightness(1.1);*/
  background: rgba(255, 255, 255, 0.05);
  mask-image: url(#liquidGlass);
  -webkit-mask-image: url(#liquidGlass);
  position: relative;
  z-index: 99;

}

.card::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: 28px;
    -webkit-box-shadow: inset 2px 2px 0px -2px rgba(255, 255, 255, 0.7),
                        inset 0 0 3px 1px rgba(255, 255, 255, 0.7);
    box-shadow: inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7),
                inset 0 0 8px 1px rgba(255, 255, 255, 0.7);
}
.card::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: 28px;
    -webkit-box-shadow: inset 2px 2px 0px -2px rgba(172, 176, 146, 0.7),
                        inset 0 0 3px 1px rgba(255, 237, 184, 0.7);
    box-shadow: inset 6px 6px 0px -6px rgba(255, 239, 211, 0.7),
                inset 0 0 8px 1px rgba(255, 255, 255, 0.7);
}
</style>
