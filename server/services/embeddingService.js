const model = "gemini-embedding-001";

export async function createEmbedding(topic, details) {
  if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is missing.");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        model: `models/${model}`,
        content: { parts: [{ text: `${topic}\n\n${details}` }] },
      }),
    },
  );

  if (!response.ok) throw new Error(`Gemini embedding request failed: ${response.status}`);
  const values = (await response.json()).embedding?.values;
  if (!Array.isArray(values) || !values.every(Number.isFinite)) {
    throw new Error("Gemini returned an invalid embedding.");
  }
  return values;
}
