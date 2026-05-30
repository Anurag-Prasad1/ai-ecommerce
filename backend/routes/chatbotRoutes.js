const express =
  require("express");

const router =
  express.Router();

const {
  chatbotReply,
} = require(
  "../controllers/chatbotController"
);

const chatbotLimiter =
  require(
    "../middleware/chatbotRateLimiter"
  );

router.post(
  "/",
  chatbotLimiter,
  chatbotReply
);

module.exports =
  router;