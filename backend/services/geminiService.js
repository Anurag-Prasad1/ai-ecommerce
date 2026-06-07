const {
  GoogleGenerativeAI,
} = require("@google/generative-ai");

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

const sleep = (ms) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms)
  );

const generateWithRetry =
  async (
    prompt,
    retries = 3
  ) => {
    let lastError;

    for (
      let attempt = 1;
      attempt <= retries;
      attempt++
    ) {
      try {
        const result =
          await model.generateContent(
            prompt
          );

        const text =
          result?.response?.text();

        if (
          !text ||
          !text.trim()
        ) {
          throw new Error(
            "Empty AI response received."
          );
        }

        return text;
      } catch (error) {
        lastError = error;

        console.error(
          `Gemini Attempt ${attempt} Failed:`,
          error.message
        );

        if (
          attempt < retries
        ) {
          await sleep(
            attempt * 1000
          );
        }
      }
    }

    throw lastError;
  };

const generateResponse =
  async (prompt) => {
    return generateWithRetry(
      prompt
    );
  };

const generateStructuredResponse =
  async (prompt) => {
    return generateWithRetry(
      prompt
    );
  };

module.exports = {
  generateResponse,
  generateStructuredResponse,
};