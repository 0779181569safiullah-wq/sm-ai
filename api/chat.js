export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  try {
    const { question } = req.body || {};

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: "مهرباني وکړئ پوښتنه ولیکئ"
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "OPENAI_API_KEY په Vercel کې نه ده تنظیم شوې"
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: [
          {
            role: "system",
            content:
              "ته SM AI یې. له کاروونکي سره په پښتو کې واضح، دوستانه او ګټور ځوابونه ورکوه."
          },
          {
            role: "user",
            content: question
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);

      return res.status(response.status).json({
        error: data.error?.message || "د AI سره د اړیکې ستونزه رامنځته شوه"
      });
    }

    return res.status(200).json({
      answer: data.output_text || "ځواب ترلاسه نه شو."
    });

  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({
      error: "د سرور په برخه کې ستونزه رامنځته شوه"
    });
  }
}
