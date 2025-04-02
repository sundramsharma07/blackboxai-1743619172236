const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/demo', (req, res) => {
    res.sendFile(path.join(__dirname, 'demo.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

// API Endpoints
app.post('/api/correct', (req, res) => {
    const { text } = req.body;
    
    if (!text || text.length < 10) {
        return res.status(400).json({ error: 'Text must be at least 10 characters long' });
    }

    // Mock AI processing
    const corrections = mockAICorrection(text);
    res.json({ original: text, corrected: corrections });
});

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Mock email sending
    console.log('New contact form submission:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    res.json({ success: true, message: 'Thank you for your message!' });
});

// Helper function for mock corrections
function mockAICorrection(text) {
    // Simple mock corrections
    let corrected = text
        .replace(/\bi\b/g, 'I')
        .replace(/\.\s*([a-z])/g, (match, p1) => `. ${p1.toUpperCase()}`)
        .replace(/\bdon't\b/g, "do not")
        .replace(/\bcan't\b/g, "cannot")
        .replace(/\byou're\b/g, "you are")
        .replace(/\bit's\b/g, "it is");

    return corrected;
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});