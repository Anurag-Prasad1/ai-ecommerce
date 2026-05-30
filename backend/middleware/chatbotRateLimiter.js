const rateLimit =
  require("express-rate-limit");

const chatbotLimiter =
  rateLimit({
    windowMs: 60 * 1000,

    max: 20,

    message:
      "Too many chatbot requests. Please wait a minute and try again.",
  });

module.exports =
  chatbotLimiter;