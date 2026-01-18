import { useState } from "react";
import { useRouter } from "next/router";

export default function Questions() {
  const router = useRouter();
  const { language, goal } = router.query;
  const [answers, setAnswers] = useState({});

  const questions = [
    { key: "ageRange", text: "Select your age range", options: ["<18","18-30","31-50","50+"] },
    { key: "country", text: "Country of origin", options: ["US","Other"] },
    { key: "inUS", text: "Are you currently in the US?", options: ["Yes","No"] },
    { key: "passport", text: "Do you have a passport?", options: ["Yes","No"] },
    { key: "priorReceipt", text: "Any prior USCIS receipt numbers?", options: ["Yes","No"] },
    { key: "urgency", text: "Timeline urgency?", options: ["Low","Medium","High"] }
  ];

  const handleChange = (key,value) => setAnswers({...answers,[key]:value});
  const handleSubmit = () => router.push({ pathname:"/results", query:{ language, goal, answers: JSON.stringify(answers) } });

  return (
    <div style={{ textAlign:'center', marginTop:'30px' }}>
      <h2>{goal} - Questions</h2>
      {questions.map(q => (
        <div key={q.key} style={{ margin:'10px 0' }}>
          <p>{q.text}</p>
          <select onChange={e=>handleChange(q.key,e.target.value)}>
            <option value="">Select...</option>
            {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      ))}
      <br/>
      <button onClick={handleSubmit}>See Results</button>
    </div>
  );
}
