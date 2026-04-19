const input = document.getElementById("chatbot-input");
const sendBtn = document.getElementById("chatbot-send");
const messages = document.getElementById("chatbot-messages");

/* SEND MESSAGE FUNCTION */

async function sendMessage(){

const text = input.value.trim();

if(text === "") return;

/* USER MESSAGE */

const userDiv = document.createElement("div");
userDiv.className = "user-message";
userDiv.innerText = text;

messages.appendChild(userDiv);

messages.scrollTop = messages.scrollHeight;

input.value = "";


/* SHOW TYPING INDICATOR */

const typingDiv = document.createElement("div");
typingDiv.className = "typing-indicator";
typingDiv.innerHTML = `
<div class="typing-dot"></div>
<div class="typing-dot"></div>
<div class="typing-dot"></div>
`;

messages.appendChild(typingDiv);
messages.scrollTop = messages.scrollHeight;


try{

const response = await fetch("http://localhost:5000/chat",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

});

const data = await response.json();

/* REMOVE TYPING INDICATOR */

typingDiv.remove();

/* BOT MESSAGE */

const botDiv = document.createElement("div");
botDiv.className = "bot-message";
botDiv.innerText = data.reply;

messages.appendChild(botDiv);

messages.scrollTop = messages.scrollHeight;

}catch(error){

typingDiv.remove();

const botDiv = document.createElement("div");
botDiv.className = "bot-message";
botDiv.innerText = "Server not responding.";

messages.appendChild(botDiv);

}

}

/* BUTTON CLICK */

sendBtn.addEventListener("click", sendMessage);

/* ENTER KEY */

input.addEventListener("keydown", function(e){

if(e.key === "Enter"){
e.preventDefault();
sendMessage();
}

});

/* TOGGLE CHATBOT */

function toggleChatbot(){

const chatbot = document.getElementById("chatbot-window");

if(chatbot.style.display === "flex"){
chatbot.style.display = "none";
}else{
chatbot.style.display = "flex";
}

}