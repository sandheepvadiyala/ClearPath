import connectToDB from "../../lib/mongodb";
import Output from "../../models/Output";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectToDB();
      const newOutput = new Output(req.body);
      await newOutput.save();
      res.status(200).json({ message: "Saved!" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else res.status(400).json({ error: "Only POST allowed" });
}
