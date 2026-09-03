export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body || {};

  if (!question) {
    return res.status(400).json({ error: "پوښتنه ولیکئ" });
  }

  return res.status(200).json({
    answer: "ستاسې پوښتنه ترلاسه شوه. د AI اصلي سیستم به ژر ځواب وړاندې کړي."
  });
}
