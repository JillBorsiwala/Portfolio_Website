const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const CERTIS_DIR = path.join(__dirname, '..', 'CERTIS');

// PDF sorting logic
function getCertificateSections() {
  // Scan CERTIS dir for .pdf files
  const files = fs.readdirSync(CERTIS_DIR).filter(f => f.endsWith('.pdf'));
  return {
    genai: files.filter(f => f.startsWith('genai_')),
    edunet: files.filter(f => f.startsWith('edunet_')),
    extracurricular: files.filter(f => !f.startsWith('genai_') && !f.startsWith('edunet_'))
  };
}

router.get('/', (req, res) => {
  const sections = getCertificateSections();
  res.render('certificates', {
    certs: sections
  });
});

module.exports = router;
