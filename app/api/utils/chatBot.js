// pages/api/chat.js
import { OpenAI } from "openai"; // Import the OpenAI library
import { Configuration, OpenAIApi } from "openai";

// Initialize OpenAI API client
const openai = new OpenAIApi(
    new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Accessing the API key from env
    })
);

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { message } = req.body; // Get the message from the body of the request

        try {
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo", // You can change to gpt-4 if you have access
                messages: [{ role: "user", content: message }],
            });

            res.status(200).json({
                message: response.data.choices[0].message.content,
            });
        } catch (error) {
            console.error("Error communicating with OpenAI:", error);
            res.status(500).json({ error: "Something went wrong" });
        }
    } else {
        res.status(405).json({ error: "Method Not Allowed" });
    }
}
