// src/cli.ts
var ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => ws.send("hi");
var ulist = document.querySelector(".uli");
var input = document.querySelector("input");
var btn = document.querySelector(".btn");
var isFocused = false;
window.addEventListener("focusin", (event) => {
  if (event.target == input) {
    console.log("focus");
    isFocused = true;
  }
});
window.addEventListener("focusout", (event) => {
  if (event.target == input) {
    console.log("blur");
    isFocused = false;
  }
});
btn.onclick = () => {
  let msgcontent = input.value;
  if (msgcontent.trim()) {
    if (msgcontent.length > 1000) {
      alert("Length of a message can't be more than 1000!");
      return;
    }
    ws.send(msgcontent);
    input.value = "";
  }
};
window.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && isFocused) {
    btn.click();
  }
});
ws.onmessage = (e) => {
  console.log(e.data);
  let li = document.createElement("li");
  li.textContent = e.data;
  ulist?.appendChild(li);
};
