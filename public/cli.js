// src/cli.ts
var ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => ws.send("hi");
var ulist = document.querySelector(".uli");
var input = document.querySelector("input");
var btn = document.querySelector(".btn");
var dbox = document.querySelector(".dbox");
var isFocused = false;
var offsetX = 0;
var offsetY = 0;
var isDragging = false;
dbox.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - dbox.offsetLeft;
  offsetY = e.clientY - dbox.offsetTop;
  dbox.style.cursor = "grabbing";
});
document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    dbox.style.left = e.clientX - offsetX + "px";
    dbox.style.top = e.clientY - offsetY + "px";
    ws.send(`${e.clientX - offsetX}px, ${e.clientY - offsetY}px`);
  }
});
document.addEventListener("mouseup", () => {
  isDragging = false;
  dbox.style.cursor = "grab";
});
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
window.addEventListener("mousemove", (Event) => {});
ws.onmessage = (e) => {
  let PositionData = String(e.data).split(",");
  let [posX, posY] = PositionData;
  console.log(posX, "|", posY);
  dbox.style.left = String(posX);
  dbox.style.top = String(posY);
};
