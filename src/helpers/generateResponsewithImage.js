const { GoogleGenerativeAI } = require("@google/generative-ai");
const fetch = require("node-fetch");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function urlToGenerativePart(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch image from URL: ${url}`);
    }
    
    const mimeType = response.headers.get('content-type');
    const data = await response.buffer();
    
    return {
        inlineData: {
            data: data.toString("base64"),
            mimeType
        },
    };
}

export async function generateResponsewithImage() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    const prompt = "Explain these images";
    const imageParts = [
        await urlToGenerativePart("https://lumiere-a.akamaihd.net/v1/images/pp_ironman3_herobanner_mobile_21001_2d49f431.jpeg"),
        await urlToGenerativePart("https://deadline.com/wp-content/uploads/2023/05/robert-downey-jr-iron-man-marvel.jpg"),
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();
    return text
}

