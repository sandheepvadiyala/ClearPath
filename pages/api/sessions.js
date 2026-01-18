import connectToDB from "../../lib/mongodb";
import Session from "../../models/Session";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method === "POST") {
    const session = new Session(req.body);
    await session.save();
    res.status(200).json(session);
  } else {
    res.status(405).end();
  }
}
