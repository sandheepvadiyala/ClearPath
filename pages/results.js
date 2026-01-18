import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Results() {
  const router = useRouter();
  const { language, goal, answers } = router.query;
  const [output, setOutput] = useState(null);

  useEffect(() => {
    if (!answers) return;
    const parsedAnswers = JSON.parse(answers);

    const fetchOutput = async () => {
      // Mock LLM + TTS response for hackathon demo
      const result = {
        summaryText: `Checklist for ${goal}`,
        checklistItems: ["Form I-765", "Passport Copy", "Photo ID"],
        officialLinks: [{ title:"USCIS OPT Info", url:"https://www.uscis.gov/opt" }],
        questionsToAsk: ["Ask DSO about filing timeline"],
        audioUrl: "https://example.com/audio.mp3"
      };

      setOutput(result);

      await axios.post("/api/saveOutput", { sessionId: Date.now(), ...result });
    };

    fetchOutput();
  }, [answers]);

  if (!output) return <p>Loading...</p>;

  return (
    <div style={{ textAlign:'center', marginTop:'30px' }}>
      <h2>Results for {goal}</h2>
      <p>{output.summaryText}</p>
      <h3>Checklist</h3>
      <ul>{output.checklistItems.map((item,i)=><li key={i}>{item}</li>)}</ul>
      <h3>Official Links</h3>
      <ul>{output.officialLinks.map((link,i)=><li key={i}><a href={link.url} target="_blank">{link.title}</a></li>)}</ul>
      <h3>Questions to Ask</h3>
      <ul>{output.questionsToAsk.map((q,i)=><li key={i}>{q}</li>)}</ul>
      <audio controls src={output.audioUrl}></audio>
    </div>
  );
}
