<template>
  <section class="closing-quote section" aria-label="Closing quote">
    <div class="container">
      <div class="quote-wrap">
        <div class="quote-mark font-editorial" aria-hidden="true">"</div>
        <blockquote class="quote-text font-editorial">
          Losing is not my enemy. Fear of losing is my enemy.
        </blockquote>
        <cite class="quote-attribution">— Rafael Nadal</cite>
      </div>
    </div>
  </section>
</template>

<style scoped>
.closing-quote {
  text-align: center;
  padding: 120px 0;
  border-top: 1px solid var(--border);
}

.quote-wrap {
  position: relative;
  max-width: 860px;
  margin: 0 auto;
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  padding: 64px 48px;
  box-shadow: var(--shadow);
}

.quote-mark {
  font-size: 140px;
  line-height: 0.6;
  color: var(--accent);
  opacity: 0.2;
  position: absolute;
  top: 24px;
  left: 24px;
  user-select: none;
}

.quote-text {
  font-family: 'Fraunces', serif;
  font-size: clamp(28px, 4.5vw, 52px);
  font-weight: 600;
  font-style: italic;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 28px;
  position: relative;
}

.quote-attribution {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  font-style: normal;
}

@media (max-width: 768px) {
  .closing-quote {
    padding: 80px 0;
  }
  .quote-mark {
    font-size: 80px;
    left: -20px;
    top: -10px;
  }
  .quote-text {
    font-size: clamp(22px, 5vw, 36px);
  }
}

@media (max-width: 480px) {
  .closing-quote {
    padding: 60px 0;
  }
  .quote-mark {
    display: none;
  }
}
</style>
