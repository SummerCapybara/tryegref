const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => ws.send("hi");

const ulist = document.querySelector(".uli") as HTMLUListElement;
const input = document.querySelector("input") as HTMLInputElement;
const btn = document.querySelector(".btn") as HTMLButtonElement;

let isFocused = false;

window.addEventListener("focusin", (event: FocusEvent) => {
    if (event.target == input) {
        console.log("focus")
        isFocused = true;
    }
})
window.addEventListener("focusout", (event: FocusEvent) => {
    if (event.target == input) {
        console.log("blur")
        isFocused = false;
    }

})


btn.onclick = () => {
    let msgcontent = input.value;
    if (msgcontent.trim()) {
        if (msgcontent.length > 1000) {alert("Length of a message can't be more than 1000!"); return}; 
        ws.send(msgcontent);
        input.value = "";
    }
}
window.addEventListener("keydown", (event: KeyboardEvent) => {
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