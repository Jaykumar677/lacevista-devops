// Function to Open or close the chatbot
function toggleChat() {
  const chatBody = document.getElementById("chat-main-container");
  const closeIcon = document.getElementById("close-chatbot")

  chatBody.style.display = chatBody.style.display === "none" ? "block" : "none";
  const arrow = chatBody.style.display === "none" ? "arrow_drop_up" : "arrow_drop_down"
  closeIcon.innerHTML = `<i class="material-icons">${arrow}</i>`
}

// User's input data sent to Gemini API
const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const chatBody = document.querySelector(".chat-body");
  const messageInput = document.getElementById("message-input-id");
  const fileInput = document.getElementById("file-input");
  const fileUploadWrapper = document.querySelector(".file-upload-wrapper");
  const sendButton = document.getElementById("send-message");
  const fileCancelButton = document.getElementById("file-cancel");

  // Call the Gemini API and format the response
  const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector(".message-text");

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userData.message,
          file: userData.file
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      // Formatting incoming data
      let formatted = data.text
        .replace(/^(\d+)\.\s(.+)$/gm, '<h5>$1. $2</h5>')
        .replace(/\*\s(.+)/g, '<li>$1</li>')
        .replace(/([^\n])\n([^\n])/g, '$1<br><br>$2')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

      formatted = formatted.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');

      messageElement.innerHTML = formatted;

    } catch (error) {
      console.error(error);
      messageElement.innerHTML = error.message;
      messageElement.style.color = "#ff0000";
    } finally {
      userData.file = {};
      incomingMessageDiv.classList.remove("thinking");
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
    }
  };


  // Create a message element with dynamic classes and return it
  const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
  }

  //Handle outgoing user messages
  const handleOutgoingMessage = (userMessage) => {
    userData.message = messageInput.value.trim();

    fileUploadWrapper.classList.remove("file-uploaded");

    // Displayig user's input and image in the chat
    const messageContent = `<div class="message-text"></div> 
                            ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />` : ""}`;

    const outgoingMessageDiv = createMessageElement(messageContent, "user-message");

    outgoingMessageDiv.querySelector(".message-text").textContent = userData.message
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

    //Setting some time to simulate thinking response from the chatBot
    setTimeout(() => {
      const messageContent = `<img class="bot-avatar" src="/images/chatbot.png" width="50" height="50" />
                <div class="message-text">
                    <div class="thinking-indicator">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>`;

      const incomingMessageDiv = createMessageElement(messageContent, "bot-message", "thinking");
      chatBody.appendChild(incomingMessageDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });

      generateBotResponse(incomingMessageDiv);
    }, 600)
  }

  // Taking image as input
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      fileUploadWrapper.querySelector("img").src = e.target.result;
      fileUploadWrapper.classList.add("file-uploaded");

      const base64String = e.target.result.split(",")[1];

      //Store image file data in userData
      userData.file = {
        data: base64String,
        mime_type: file.type
      }
      fileInput.value = "";
    }

    reader.readAsDataURL(file);
  })

  // Remove uploaded file when clicked on cross icon
  fileCancelButton.addEventListener("click", (e) => {
    userData.file = {};
    fileUploadWrapper.classList.remove("file-uploaded");
  })

  // Function to send user's input
  sendButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const userMessage = messageInput.value.trim();

    if (userMessage) {
      handleOutgoingMessage(e)
      messageInput.value = ""; // Clear input field
    } else {
      console.log("Input is empty");
    }
  });

  // Function for user to upload the image
  document.getElementById("file-upload").addEventListener("click", () => fileInput.click());
});

