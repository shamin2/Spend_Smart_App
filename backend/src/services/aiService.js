import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateSpendingInsights = async (financialSummary) => {
  const prompt = `
You are a personal spending analysis assistant.

Analyze the user's financial summary and generate exactly 3 short,
useful spending insights.

Rules:
- Only use the financial data provided.
- Do not invent amounts, transactions, or spending patterns.
- Keep each insight short and easy to understand.
- Focus on income, expenses, balance, savings, and spending categories.
- Do not provide investment, tax, credit, or legal advice.
- Return only valid JSON.

Return the following structure:

{
  "insights": [
    {
      "title": "Short insight title",
      "message": "Short explanation"
    }
  ]
}

Financial summary:

${JSON.stringify(financialSummary, null, 2)}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
    },
  });

  return JSON.parse(response.text);
};