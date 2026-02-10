import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDsrszA46rNuifTooIy1p0VcPNlLsiSO7M";
const genAI = new GoogleGenerativeAI(apiKey);

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const prompt = "Explain how AI works to a 5 year old.";

        console.log("Testing Gemini API with model: gemini-2.0-flash");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log("Success! Response:");
        console.log(text);
    } catch (error) {
        console.error("Error connecting to Gemini API:");
        console.error(error);
    }
}

run();
