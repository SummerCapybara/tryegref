const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => ws.send("hi");

const ulist = document.querySelector(".uli") as HTMLUListElement;
const input = document.querySelector("input") as HTMLInputElement;
const btn = document.querySelector(".btn") as HTMLButtonElement;
const dbox = document.querySelector(".dbox") as HTMLDivElement;

let isFocused = false;

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

// When mouse is pressed down on the element
dbox.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - dbox.offsetLeft;
  offsetY = e.clientY - dbox.offsetTop;
  dbox.style.cursor = 'grabbing';
});

// When mouse moves anywhere on the page
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    dbox.style.left = (e.clientX - offsetX) + 'px';
    dbox.style.top = (e.clientY - offsetY) + 'px';
	ws.send(`${e.clientX - offsetX}px, ${e.clientY - offsetY}px`);
  }
});

// When mouse is released
document.addEventListener('mouseup', () => {
  isDragging = false;
  dbox.style.cursor = 'grab';
});



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

window.addEventListener("mousemove", (Event: MouseEvent) => {
	
})


ws.onmessage = (e) => {
	let PositionData = String(e.data).split(",");
	let [posX, posY] = PositionData;
  	console.log(posX, "|", posY);
	dbox.style.left = String(posX);
	dbox.style.top = String(posY);
	// console.log(e.data);
	// let li = document.createElement("li");
	// li.textContent = e.data;
	// ulist?.appendChild(li);
};