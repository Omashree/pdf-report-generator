const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const cors = require('cors');
const { assessmentData } = require('./data.js');
const reportConfig = require('./config.js');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
const SECRET_KEY = process.env.SECRET_KEY || 'your_jwt_secret_key';

app.use(bodyParser.json());

const users = [];

const get = (obj, path, defaultValue = undefined) => {
  const travel = (regexp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
  return result === undefined || result === obj ? defaultValue : result;
};

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// User registration
app.post('/api/auth/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'User already exists.' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User registered successfully.' });
});

// User login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Report generation endpoint
app.post('/api/generate-report', authenticateToken, async (req, res) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({ message: 'session_id is required.' });
  }

  const assessment = assessmentData.find(d => d.session_id === session_id);
  if (!assessment) {
    return res.status(404).json({ message: 'Assessment data not found.' });
  }

  const { assessment_id } = assessment;
  const config = reportConfig[assessment_id];

  if (!config) {
    return res.status(400).json({ message: `No report configuration found for assessment ID: ${assessment_id}` });
  }

  try {
    const templatePath = path.join(__dirname, 'templates', config.template);
    let htmlContent = fs.readFileSync(templatePath, 'utf-8');

    const sectionsHtml = config.sections.map(section => {
      const fieldsHtml = section.fields.map(field => {
        const value = get(assessment, field.path, 'N/A');
        let displayValue = value;
        let classification = '';
        if (field.classify && value !== 'N/A') {
          const range = field.ranges.find(r => parseFloat(value) >= r.value);
          classification = range ? `<span class="classification">${range.label}</span>` : '';
        }
        return `
          <div class="field">
            <strong>${field.label}:</strong>
            <span>${displayValue} ${field.unit || ''}</span>
            ${classification}
          </div>
        `;
      }).join('');

      return `
        <div class="section">
          <h3>${section.title}</h3>
          ${fieldsHtml}
        </div>
      `;
    }).join('');

    htmlContent = htmlContent.replace('', sectionsHtml);
    htmlContent = htmlContent.replace('{{sessionId}}', assessment.session_id);
    htmlContent = htmlContent.replace('{{assessmentId}}', assessment.assessment_id);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);

    const pdfPath = path.join(__dirname, 'reports', `report-${session_id}.pdf`);
    await page.pdf({ path: pdfPath, format: 'A4' });

    await browser.close();

    res.json({ message: 'Report generated successfully.', filePath: pdfPath });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ message: 'Failed to generate report.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));