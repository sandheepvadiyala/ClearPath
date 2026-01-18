import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { text, voice } = req.body;

  try {
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
      { text },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    res.setHeader("Content-Type", "audio/mpeg");
    res.send(response.data);
  } catch (e) {
    res.status(500).json({ error: "TTS failed" });
  }
}
