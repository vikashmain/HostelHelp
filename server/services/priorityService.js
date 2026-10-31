const model = "gemini-3.5-flash-lite";

// priorityService.js

export async function analyzePriority(topic, details) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Classify this hostel complaint's urgency. Return exactly one word: High, Medium, or Low. High is an immediate safety, health, or security issue; Medium needs prompt attention; Low is a minor inconvenience.\n\nTopic: ${topic}\nDetails: ${details}` }],
        }],
        generationConfig: { temperature: 0, maxOutputTokens: 5 },
      }),
    },
  );
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API Request Failed: ${response.status} - ${errorText}`);
  }
 
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  if (!["High", "Medium", "Low"].includes(text)) {
    throw new Error(`Gemini returned an invalid priority level: "${text}"`);
  }

  return text;
}
