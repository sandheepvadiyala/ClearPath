import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { flow, answers } = req.body;

  const prompt = `
You are NOT a lawyer.
Generate structured immigration guidance.

Flow: ${flow}
Answers: ${JSON.stringify(answers)}

Return JSON with:
summaryText
checklistItems (array)
officialLinks (array of {title, url})
questionsToAsk (array)
disclaimerText
`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
        }
      }
    );

    const output = JSON.parse(response.data.choices[0].message.content);
    res.status(200).json(output);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
