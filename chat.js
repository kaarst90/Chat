class AnonymizedChat {
  constructor() {
    this.messages = [];
    this.userMap = new Map();
    this.nextUserId = 1;
    this.isGuest = !this.isRegisteredUser(); // Check if the user is a guest
    this.userId = this.isGuest ? `Gast${Math.floor(Math.random() * 10000)}` : 'Anbieter';
  }

  isRegisteredUser() {
    // Implement your logic to check if the user is registered
    return false; // Example: always return false for the guest
  }

  anonymizeUser(user) {
    if (!this.userMap.has(user)) {
      this.userMap.set(user, this.isGuest ? this.userId : `User${this.nextUserId++}`);
    }
    return this.userMap.get(user);
  }

  addMessage(user, message) {
    const anonymizedUser = this.anonymizeUser(user);
    this.messages.push({ user: anonymizedUser, message });
    this.renderMessages();
  }

  renderMessages() {
    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = '';
    this.messages.forEach(msg => {
      chatBox.innerHTML += `<p><strong>${msg.user}:</strong> ${msg.message}</p>`;
    });
  }
}

const chat = new AnonymizedChat();

function sendMessage() {
  const userInput = document.getElementById('user-input');
  const message = userInput.value;
  if (message.trim()) {
    chat.addMessage(chat.isGuest ? chat.userId : 'Anbieter', message);
    userInput.value = '';
  }
}

// Clear chat for guest upon window close
window.onbeforeunload = function() {
  if (chat.isGuest) {
    chat.messages = [];
  }
};
