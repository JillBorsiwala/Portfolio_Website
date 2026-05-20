document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.cert-row').forEach((row) => {
    const certs = JSON.parse(row.dataset.certs);
    if (!certs || certs.length === 0) return;

    // 1. Inject initial PDF cards
    certs.forEach(filename => {
      row.appendChild(createPdfCard(filename));
    });

    // 2. Check layout width to see if marquee is needed
    setTimeout(() => {
      const rowVisibleWidth = row.offsetWidth;
      // Calculate real width of all initial cards
      const totalCardsWidth = Array.from(row.children).reduce((width, el) => width + el.getBoundingClientRect().width + 18, 0) - 18; // 18px gap

      if (totalCardsWidth > rowVisibleWidth) {
        // Duplicate the cards once to create a seamless infinite scroll loop
        certs.forEach(filename => {
          row.appendChild(createPdfCard(filename));
        });

        const direction = row.closest('.cert-section').dataset.direction || 'ltr';
        row.classList.add('marquee-active');
        row.style.setProperty('--marquee-direction', direction === 'rtl' ? 'reverse' : 'normal');
        // The distance traveled must be exactly the width of the initial set
        row.style.setProperty('--marquee-distance', `${totalCardsWidth + 18}px`);
      }
    }, 150);
  });
});

// Helper function to build cleaner cards
function createPdfCard(filename) {
  const fileUrl = `/CERTIS/${filename}`;
  const card = document.createElement('div');
  card.className = "pdf-card";
  card.innerHTML = `
    <object data="${fileUrl}" type="application/pdf" class="pdf-frame">
      <a href="${fileUrl}" target="_blank">${filename}</a>
    </object>
    <div class="filename">${filename}</div>
  `;
  return card;
}
