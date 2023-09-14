const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.post('/api/chats', async (req, res) => {
    const user_input = req.body.message;

    if (user_input.trim() === '') {
        return res.json({ response: 'Please enter a valid query.' });
    }

    // Spawn a Python process to run your chatbot.py script
    const pythonProcess = spawn('python', ['chatbot.py', user_input]);

    pythonProcess.stdout.on('data', (data) => {
        const predicted_answer = data.toString().trim();
        res.json({ response: predicted_answer });
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python process: ${data}`);
        res.status(500).json({ response: 'Internal Server Error' });
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python process exited with code ${code}`);
        }
    });
});

module.exports = router;
