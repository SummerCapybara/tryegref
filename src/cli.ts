const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => ws.send("hi");

const ulist = document.querySelector(".uli") as HTMLUListElement;
const input = document.querySelector("input") as HTMLInputElement;
const btn = document.querySelector(".btn") as HTMLButtonElement;

btn.onclick = () => {
    let msgcontent = input.value;
    if (msgcontent.trim()) {
        if (msgcontent.length > 1000) {alert("Length of a message can't be more than 10!"); return}; 
        ws.send(msgcontent);
        input.value = "";
    }
}
ws.onmessage = (e) => {
    console.log(e.data);
    let li = document.createElement("li");
    li.textContent = e.data;
    ulist?.appendChild(li);
};