// controllers/chatbotController.js
exports.handleChat = (req, res) => {
  const userMessage = req.body.message || '';

  let reply = "I'm just a demo bot! How can I help you today?";
  const message = userMessage.toLowerCase();

  if (message.includes("return")) {
    reply = "You can return items within 7 days of delivery!";
  } else if (message.includes("shipping")) {
    reply = "We offer free shipping on all orders!";
  } else if (message.includes("shoes") || message.includes("price")) {
    reply = "Check out our shop page! We have shoes under $150.";
  } else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    reply = "Hello there! 👟 Need help finding the perfect shoes?";
  }


  res.render('chatBot', {
    title: 'ChatBot',
    stylesheet: 'chatBot',
    script: 'chatBot',
    reply 
  })
  // res.json({ reply });
};
