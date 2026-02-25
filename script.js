const vibeBtn = document.getElementById('vibeBtn');
const scrollProgress = document.getElementById('scrollProgress');
const sectionProgress = document.getElementById('sectionProgress');
const stageTitle = document.getElementById('stageTitle');
const stageDesc = document.getElementById('stageDesc');
const stageCount = document.getElementById('stageCount');
const scenes = [...document.querySelectorAll('.scene')];

function setActiveScene(index) {
  scenes.forEach((scene, i) => {
    scene.classList.toggle('active', i === index);
  });

  const current = scenes[index];
  if (!current) return;

  stageTitle.textContent = current.dataset.title || 'Scene';
  stageDesc.textContent = current.dataset.desc || '';
  stageCount.textContent = `${index + 1} / ${scenes.length}`;
  sectionProgress.style.width = `${((index + 1) / scenes.length) * 100}%`;
}

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible.length) {
      const index = scenes.indexOf(visible[0].target);
      if (index >= 0) setActiveScene(index);
    }
  },
  {
    root: null,
    threshold: [0.35, 0.55, 0.75],
    rootMargin: '-10% 0px -35% 0px',
  }
);

scenes.forEach((scene) => observer.observe(scene));
setActiveScene(0);

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
});

vibeBtn?.addEventListener('click', () => {
  document.body.classList.toggle('vibe');
  const active = document.body.classList.contains('vibe');
  vibeBtn.textContent = active ? '✅ Vibe mode ON' : '⚡ Включить vibe-режим';
});
