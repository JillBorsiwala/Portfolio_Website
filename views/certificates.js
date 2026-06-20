<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Certificates & Credentials | Jill Borsiwala</title>
  <meta name="description" content="Professional certifications in Cloud Computing, AI/GenAI, SAP Development, and more." />
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/styles.css" />
  <style>
    .cert-card {
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }

    .cert-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.3);
    }

    .cert-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--accent), var(--accent-strong));
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }

    .cert-card:hover::before {
      transform: scaleX(1);
    }

    .filter-btn {
      padding: 0.625rem 1.5rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: transparent;
      color: var(--text);
      cursor: pointer;
      font-weight: 500;
      transition: all 0.3s ease;
      font-size: 0.95rem;
    }

    .filter-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
    }

    .filter-btn.active {
      background: var(--accent);
      color: var(--button-text);
      border-color: var(--accent);
      box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);
    }

    .skill-tag {
      display: inline-block;
      background: rgba(59, 130, 246, 0.1);
      color: var(--accent);
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      margin-top: 0.5rem;
      margin-right: 0.5rem;
    }

    .cert-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      animation: fadeIn 0.3s ease;
    }

    .modal.show {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-content {
      background: var(--surface);
      border-radius: 16px;
      padding: 2rem;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 25px 50px rgba(15, 23, 42, 0.4);
    }

    .modal-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text);
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    .modal-close:hover {
      opacity: 1;
    }

    .cert-badge-preview {
      width: 120px;
      height: 120px;
      margin: 0 auto 1.5rem;
      background: var(--background);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .cert-badge-preview img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }

    .empty-state {
      text-align: center;
      padding: 3rem 1rem;
      color: var(--muted);
    }

    .stats-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
    }

    .stat-value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--accent);
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: var(--muted);
      font-weight: 500;
    }
  </style>
</head>
<body class="theme-night">
  <div class="page-wrapper min-h-screen flex flex-col">
    <!-- Header -->
    <header class="site-header flex items-center justify-between px-6 lg:px-12 py-4">
      <a class="brand text-lg font-semibold tracking-wide" href="/">
        <span>Jill Borsiwala</span>
      </a>
      <div class="flex items-center gap-4">
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium" aria-label="Primary">
          <a class="nav-link" href="/#about">About</a>
          <a class="nav-link" href="/#projects">Projects</a>
          <a class="nav-link" href="/certificates" aria-current="page">Certificates</a>
          <a class="nav-link" href="/#contact">Contact</a>
        </nav>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to light mode" aria-pressed="false">
          <svg class="icon icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 3v2" />
            <path d="M12 19v2" />
            <path d="M5 5l1.5 1.5" />
            <path d="M17.5 17.5L19 19" />
            <path d="M3 12h2" />
            <path d="M19 12h2" />
            <path d="M5 19l1.5-1.5" />
            <path d="M17.5 6.5L19 5" />
          </svg>
          <svg class="icon icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 15.5A9 9 0 0 1 8.5 3a7.5 7.5 0 1 0 12.5 12.5Z" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 px-6 lg:px-12 py-12">
      <!-- Page Title -->
      <section class="mb-12">
        <h1 class="text-4xl lg:text-5xl font-semibold leading-tight mb-4">Certifications & Credentials</h1>
        <p class="text-lg text-muted max-w-2xl">
          Professional certifications demonstrating expertise in Cloud Computing, AI/GenAI, Enterprise Development, and modern software engineering practices.
        </p>
      </section>

      <!-- Statistics -->
      <div class="stats-container mb-8">
        <div class="stat-card">
          <div class="stat-value" id="totalCerts">0</div>
          <div class="stat-label">Total Certifications</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="cloudCount">0</div>
          <div class="stat-label">Cloud</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="edunetCount">0</div>
          <div class="stat-label">Edunet</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="genaiCount">0</div>
          <div class="stat-label">GenAI</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="otherCount">0</div>
          <div class="stat-label">Others</div>
        </div>
      </div>

      <!-- Filter Section -->
      <section class="mb-8">
        <h2 class="text-lg font-semibold mb-4">Filter by Category</h2>
        <div class="flex flex-wrap gap-3">
          <button class="filter-btn active" data-filter="All">All Certificates</button>
          <button class="filter-btn" data-filter="Cloud">Cloud</button>
          <button class="filter-btn" data-filter="Edunet">Edunet</button>
          <button class="filter-btn" data-filter="GenAI">GenAI</button>
          <button class="filter-btn" data-filter="Others">Others</button>
        </div>
      </section>

      <!-- Certificates Grid -->
      <section id="certificatesContainer" class="cert-grid">
        <!-- Certificates will be loaded here via JavaScript -->
      </section>

      <!-- Empty State -->
      <div id="emptyState" class="empty-state" style="display: none;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="2" y="2" width="20" height="20" rx="2" />
          <path d="M7 7v8" />
          <path d="M12 7v8" />
          <path d="M17 7v8" />
        </svg>
        <p class="text-muted">No certificates found in this category.</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="site-footer px-6 lg:px-12 py-8">
      <p class="text-sm text-muted">
        © <span id="year"></span> Jill Borsiwala. All rights reserved.
      </p>
    </footer>
  </div>

  <!-- Certificate Modal -->
  <div id="certificateModal" class="modal">
    <div class="modal-content">
      <button class="modal-close" id="modalClose">&times;</button>
      <div id="modalBody">
        <!-- Certificate details will be loaded here -->
      </div>
    </div>
  </div>

  <script src="/certificates.js"></script>
  <script src="/script.js"></script>
</body>
</html>