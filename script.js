// Create a BroadcastChannel named "github-chat"
const channel = new BroadcastChannel("github-chat");

const messagesDiv = document.getElementById("messages");
const sendBtn = document.getElementById("sendBtn");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");

// Listen for messages from other tabs
channel.onmessage = (e) => {
  const msg = e.data;
  addMessage(msg.user, msg.text);
};

// Add a message to the chat
function addMessage(user, text) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<b>${user}:</b> ${text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Send message when button is clicked
sendBtn.addEventListener("click", () => {
  const user = usernameInput.value.trim();
  const text = messageInput.value.trim();
  if (!user || !text) return;

  const msg = { user, text };
  channel.postMessage(msg); // broadcast to other tabs
  addMessage(user, text);   // add locally
  messageInput.value = "";
});
