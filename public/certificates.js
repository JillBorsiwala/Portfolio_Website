// Certificate Management System
let allCertificates = [];
let currentFilter = 'Cloud';

// Fetch certificates data
async function loadCertificates() {
  try {
    const response = await fetch('/data/certificates.json');
    allCertificates = await response.json();
    allCertificates = allCertificates.certificates;
    
    // Initialize stats and display
    updateStats();
    displayCertificates(currentFilter);
    setupEventListeners();
  } catch (error) {
    console.error('Error loading certificates:', error);
  }
}

// Update statistics
function updateStats() {
  const total = allCertificates.length;
  const cloud = allCertificates.filter(c => c.category === 'Cloud').length;
  const edunet = allCertificates.filter(c => c.category === 'Edunet').length;
  const genai = allCertificates.filter(c => c.category === 'GenAI').length;
  const others = allCertificates.filter(c => c.category === 'Others').length;
  
  document.getElementById('totalCerts').textContent = total;
  document.getElementById('cloudCount').textContent = cloud;
  document.getElementById('edunetCount').textContent = edunet;
  document.getElementById('genaiCount').textContent = genai;
  document.getElementById('otherCount').textContent = others;
}

// Format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Display certificates
function displayCertificates(filter) {
  const container = document.getElementById('certificatesContainer');
  const emptyState = document.getElementById('emptyState');
  
  let filtered;
  if (filter === 'Cloud') {
    // Show all certificates when "All" is clicked
    filtered = allCertificates;
  } else {
    filtered = allCertificates.filter(cert => cert.category === filter);
  }
  
  if (filtered.length === 0) {
    container.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  container.style.display = 'grid';
  emptyState.style.display = 'none';
  container.innerHTML = filtered.map(cert => `
    <div class="cert-card surface-card" onclick="openModal(${cert.id})">
      ${cert.badgeImage ? `
        <div style="text-align: center; margin-bottom: 1rem;">
          <img src="${cert.badgeImage}" alt="${cert.title}" style="max-width: 100%; max-height: 150px; object-fit: contain;" />
        </div>
      ` : ''}
      <h3 class="text-lg font-semibold mb-2">${cert.title}</h3>
      <p class="text-sm text-muted mb-2">${cert.issuer}</p>
      <p class="text-xs text-muted mb-3">Issued: ${formatDate(cert.issueDate)}</p>
      <div>
        ${cert.skills.slice(0, 2).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
      <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border);">
        <p class="text-xs text-accent cursor-pointer hover:underline">View Certificate ↗</p>
      </div>
    </div>
  `).join('');
}

// Open certificate modal
function openModal(certId) {
  const cert = allCertificates.find(c => c.id === certId);
  if (!cert) return;
  
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <div style="text-align: center;">
      ${cert.badgeImage ? `
        <div class="cert-badge-preview">
          <img src="${cert.badgeImage}" alt="${cert.title}" />
        </div>
      ` : ''}
    </div>
    <h2 class="text-2xl font-semibold mb-2">${cert.title}</h2>
    <p class="text-muted mb-4">${cert.issuer}</p>
    
    <div style="background: var(--background); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
      <p class="text-sm mb-3"><strong>Issued:</strong> ${formatDate(cert.issueDate)}</p>
      <p class="text-sm mb-3"><strong>Credential ID:</strong> ${cert.credentialId}</p>
      <p class="text-sm"><strong>Category:</strong> <span style="background: rgba(59, 130, 246, 0.2); padding: 0.25rem 0.75rem; border-radius: 4px;">${cert.category}</span></p>
    </div>
    
    <div class="mb-4">
      <h3 class="font-semibold mb-2">Skills</h3>
      <div>
        ${cert.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
    
    <div style="display: flex; gap: 1rem;">
      <a href="${cert.pdfUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="flex: 1; text-align: center; text-decoration: none;">
        View PDF ↗
      </a>
      <a href="${cert.pdfUrl}" download class="btn btn-ghost" style="flex: 1; text-align: center; text-decoration: none;">
        Download
      </a>
    </div>
  `;
  
  document.getElementById('certificateModal').classList.add('show');
}

// Close modal
function closeModal() {
  document.getElementById('certificateModal').classList.remove('show');
}

// Setup event listeners
function setupEventListeners() {
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.dataset.filter || 'Cloud';
      displayCertificates(currentFilter);
    });
  });
  
  // Modal close button
  document.getElementById('modalClose').addEventListener('click', closeModal);
  
  // Close modal on background click
  document.getElementById('certificateModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
  
  // Close modal on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

// Update year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  loadCertificates();
});