import { useState } from "react";
import { useRouter } from "next/router";

export default function Select() {
  const router = useRouter();
  const [language, setLanguage] = useState("English");
  const [goal, setGoal] = useState("Work Authorization Basics");

  const handleNext = () => {
    router.push(`/questions?language=${language}&goal=${goal}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Select Language & Goal</h2>
      <div>
        <label>Language:</label><br/>
        <select onChange={e => setLanguage(e.target.value)} value={language}>
          <option>English</option>
          <option>Spanish</option>
          <option>Mandarin</option>
        </select>
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>Goal:</label><br/>
        <select onChange={e => setGoal(e.target.value)} value={goal}>
          <option>Work Authorization Basics</option>
          <option>Citizenship Eligibility Check</option>
          <option>DACA Renewal</option>
          <option>Family Petition Basics</option>
        </select>
      </div>
      <br/>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
