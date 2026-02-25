const playBtn = document.getElementById('playBtn');
const quotes = document.querySelectorAll('.quote');

let idx = 0;
setInterval(() => {
  quotes.forEach((q, i) => q.classList.toggle('active', i === idx));
  idx = (idx + 1) % quotes.length;
}, 1800);

playBtn?.addEventListener('click', () => {
  playBtn.textContent = '🔥 Вайб активирован';
  playBtn.disabled = true;
  document.body.animate(
    [
      { filter: 'saturate(1)' },
      { filter: 'saturate(1.35)' },
      { filter: 'saturate(1)' },
    ],
    { duration: 800, iterations: 1 }
  );
});
