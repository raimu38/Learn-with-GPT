function sendMessage() {
  const user_id = document.getElementById("user_id").value;
  const content = document.getElementById("content").value;
  const user_name = document.getElementById("user_name").value;

  fetch("../backend/index.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: user_name,
      user_id: user_id,
      content: content,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Message sent!");
      document.getElementById("content").value = "";

      getMessage();
    })
    .catch((error) => {
      console.error("Error", error);
    });
}

function getMessage() {
  fetch("../backend/index.php", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((messages) => {
      if (!messages || !Array.isArray(messages)) {
        console.error("Invalid messages data:", messages);
        return;
      }
      const messsageList = document.getElementById("messages");
      messsageList.innerHTML = "";
      messages.forEach((message) => {
        const li = document.createElement("li");
        li.textContent = `${message.user_name}${message.user_id}:${
          message.content
        } (at ${new Date(message.timestamp * 1000).toLocaleDateString()})`;
        messsageList.appendChild(li);
      });
    })
    .catch((error) => {
      console.error("Errror : ", error);
    });
}

document.addEventListener("DOMContentLoaded", getMessage);
