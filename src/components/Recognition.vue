<template>
  <section id="recognition" aria-labelledby="recognition-heading">
    <div class="k rv">05 / Match point</div>
    <h2 class="rv" id="recognition-heading">Wins along the way.</h2>
    <div id="tr">
      <div
        v-for="(item, i) in recognitionData"
        :key="item[0]"
        class="tr rv"
      >
        <div class="k">0{{ i + 1 }}</div>
        <div>
          <b>{{ item[0] }}</b>
          <span>{{ item[1] }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const recognitionData = [
  ['Winners, SIH 2026 Internal College Round', 'Selected for National Final Submissions'],
  ['1st place, DTU Cryptoforge Invictus 2026', 'Championship'],
  ['3rd place, IIT Roorkee MarketSphere', 'Out of 800+ teams'],
  ['Top 20 finalist, IIT Roorkee Ideastorm & PRODUCATHON', 'Out of 800+ teams']
]
</script>
