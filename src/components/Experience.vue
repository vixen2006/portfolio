<template>
  <section id="experience" aria-labelledby="experience-heading">
    <div class="k rv">03 / The match</div>
    <h2 class="rv" id="experience-heading">Where I’ve worked.</h2>
    
    <!-- DRDO -->
    <div class="xp rv">
      <div class="d">JUN 2026 – JUL 2026</div>
      <div>
        <h3>DRDO</h3>
        <p class="role">Student Researcher / Software Developer, Delhi</p>
        <p class="desc">
          Architected and engineered a full-stack LLM evaluation platform for systematic assessment of frontier models across reasoning, reliability, robustness, and safety. Built an asynchronous FastAPI + SQLAlchemy backend with automated LLM-as-a-judge pipelines, configurable scoring, and a high-performance Vue 3 diagnostic frontend.
        </p>
        <p class="desc" style="margin-top: 0.5rem;">
          Conducted quantitative time-series research on organizational resource demand using Lomb–Scargle periodograms, autocorrelation analysis, and statistical modeling. Co-authored two research manuscripts submitted for publication.
        </p>
        <div class="xp-tags">
          <span>Vue 3</span>
          <span>FastAPI</span>
          <span>SQLAlchemy</span>
          <span>LLM Evaluation</span>
          <span>Time-Series</span>
          <span>Statistical Modeling</span>
        </div>
        <div class="xp-sublinks">
          <a
            href="https://drive.google.com/file/d/1z2JnUOZIsa_W7SPbIV2T27sVzT4L7qrZ/view"
            target="_blank"
            rel="noopener noreferrer"
          >Paper 1</a>
          <a
            href="https://drive.google.com/file/d/11_XTmjDaoejK80t4pZAutCUjO4wMG17a/view"
            target="_blank"
            rel="noopener noreferrer"
          >Paper 2</a>
          <a
            href="https://github.com/vixen2006/ARSI-"
            target="_blank"
            rel="noopener noreferrer"
          >ARSI Repo</a>
        </div>
      </div>
    </div>

    <!-- Acolyte Living -->
    <div class="xp rv" style="border-bottom: 1px solid var(--line);">
      <div class="d">APR 2026 – JUN 2026</div>
      <div>
        <h3>Acolyte Living</h3>
        <p class="role">Frontend / Software Engineering Intern</p>
        <p class="desc">
          Architected and engineered the interactive 3D Student Housing Explorer (Next.js 16 App Router, React 19, MapLibre GL JS), enabling global-to-local exploration from an interactive 2D world view down to 3D extruded building models across university markets with concurrent data pipelines.
        </p>
        <div class="xp-tags">
          <span>Next.js</span>
          <span>React 19</span>
          <span>TypeScript</span>
          <span>MapLibre GL JS</span>
          <span>Tailwind CSS</span>
        </div>
        <div class="xp-sublinks">
          <a
            href="https://acolyte-living-interactive-map.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >Live 3D Explorer</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>
