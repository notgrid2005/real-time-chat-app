const socket = io();
const joinScreen = document.getElementById("join-screen");
const chatScreen = document.getElementById("chat-screen");
const usernameInput = document.getElementById("username-input");
const joinBtn = document.getElementById("join-btn");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const messagesDiv = document.getElementById("messages");
const onlineCount = document.getElementById("online-count");
const typingIndicator = document.getElementById("typing-indicator");

let typingTimeout;

joinBtn.addEventListener("click", () => {
  const name = usernameInput.value.trim();
  if (!name) return;
  socket.emit("join", name);
  joinScreen.classList.add("hidden");
  chatScreen.classList.remove("hidden");
  messageInput.focus();
});

usernameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") joinBtn.click();
});

sendBtn.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
  else {
    socket.emit("typing");
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => socket.emit("stop-typing"), 1000);
  }
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (!msg) return;
  socket.emit("chat-message", { message: msg });
  messageInput.value = "";
  socket.emit("stop-typing");
}

function addMessage(html) {
  messagesDiv.innerHTML += html;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

socket.on("chat-message", (data) => {
  const time = new Date(data.timestamp).toLocaleTimeString();
  addMessage(`<div class="msg"><div class="name">${data.username}</div><div class="text">${data.message}</div><div class="time">${time}</div></div>`);
});

socket.on("user-joined", (data) => {
  addMessage(`<div class="msg system">${data.username} joined the chat</div>`);
  onlineCount.textContent = `${data.users.length} online`;
});

socket.on("user-left", (data) => {
  addMessage(`<div class="msg system">${data.username} left the chat</div>`);
  onlineCount.textContent = `${data.users.length} online`;
});

socket.on("typing", (username) => {
  typingIndicator.textContent = `${username} is typing...`;
});

socket.on("stop-typing", () => {
  typingIndicator.textContent = "";
});
