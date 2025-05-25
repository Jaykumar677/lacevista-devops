const express = require("express");
const router = express.Router();
require("dotenv").config();



// Api that interacts with the Gemini API
router.post("/chatbot", async (req, res) => {
    const { message, file } = req.body;
    const requestBody = {
        contents: [
            {
                parts: [
                    { text: message + "Response should be only 5 lines" },
                    ...(file?.data ? [{ inline_data: file }] : [])
                ]
            }
        ],
        generationConfig: {
            maxOutputTokens: 100,
        }
    };

    try {
        const response = await fetch(`${process.env.API_URL}?key=${process.env.API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error?.message || "Gemini API error");

        const apiText = data.candidates[0].content.parts[0].text.trim();
        res.json({ text: apiText });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
