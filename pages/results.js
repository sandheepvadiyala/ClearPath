import { useEffect, useState } from "react";

export default function Results({ sessionId, summaryText, checklistItems, officialLinks, questionsToAsk, language }) {
  const [audioUrl, setAudioUrl] = useState("");
  const [saved, setSaved] = useState(false);

  // Map language to ElevenLabs voice
  const voiceMap = {
    English: "alloy",
    Spanish: "bella",
    Mandarin: "mirai",
  };

  // Generate TTS audio using ElevenLabs
  useEffect(() => {
    const generateVoice = async () => {
      try {
        if (!summaryText) return;

        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceMap[language] || "alloy"}`, {
          method: "POST",
          headers: {
            "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: summaryText }),
        });

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } catch (err) {
        console.error("Error generating voice:", err);
      }
    };

    generateVoice();
  }, [summaryText, language]);

  // Save output to MongoDB via API
  const handleSave = async () => {
    try {
      const res = await fetch("/api/saveOutput", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          checklistItems,
          officialLinks,
          questionsToAsk,
          summaryText,
          audioUrl,
        }),
      });

      if (res.ok) setSaved(true);
    } catch (err) {
      console.error("Error saving output:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>ClearPath: Your Step-by-Step Guidance</h1>

      <section style={{ margin: "1rem 0" }}>
        <h2>Summary</h2>
        <p>{summaryText}</p>
        {audioUrl && (
          <div>
            <h3>Listen to your summary:</h3>
            <audio controls src={audioUrl}></audio>
          </div>
        )}
      </section>

      <section style={{ margin: "1rem 0" }}>
        <h2>Checklist of Documents</h2>
        <ul>
          {checklistItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section style={{ margin: "1rem 0" }}>
        <h2>Official Links</h2>
        <ul>
          {officialLinks.map((link, index) => (
            <li key={index}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section style={{ margin: "1rem 0" }}>
        <h2>Questions to Ask a Lawyer/Nonprofit</h2>
        <ul>
          {questionsToAsk.map((q, index) => (
            <li key={index}>{q}</li>
          ))}
        </ul>
      </section>

      <button
        onClick={handleSave}
        disabled={saved}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: saved ? "green" : "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: saved ? "default" : "pointer",
          marginTop: "1rem",
        }}
      >
        {saved ? "Saved!" : "Save Your Checklist"}
      </button>
    </div>
  );
}
