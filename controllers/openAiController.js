// Imports
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

// Config
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

// test open ai
const testOpenAI = async (req, res) => {
    try {
        // Create prediction
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: 'What does the name of the 55th surah \'الرحمن\' in the Quran mean in English?',
            temperature: 0.3,
            max_tokens: 200,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

        // Send data
        const data = response.data.choices[0];
        console.log(data);

        res.status(200).json({
            success: true,
            data: JSON.stringify(data)
        });
    } catch (error) {
        // Print error
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }

        // Respond with error
        res.status(400).json({
            success: false,
            error: 'The answer could not be found'
        });
    }
}

// Exports
module.exports = { testOpenAI };