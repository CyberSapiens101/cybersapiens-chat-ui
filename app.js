const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user');
  input.value = '';

  const botReply = await getBotReply(userMessage);
  addMessage(botReply, 'bot');
});

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.classList.add('message', sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getBotReply(userInput) {
  try {
    const response = await fetch("https://cybersapiens-call-agent-backend-production.up.railway.app/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user_input: userInput })
    });

    const data = await response.json();
    return data.bot_reply || "Sorry, no response.";
  } catch (error) {
    console.error("Error fetching bot reply:", error);
    return "Something went wrong. Please try again.";
  }
}
