type message = {
	createdAt: number,
	content: string,
}


const server = Bun.serve({ 
	port: 8080,
	fetch(req, server) {
		
		const succes = server.upgrade(req, {
			data: { ip: req.headers, }
		});
		if (succes) return undefined;


			const url = new URL(req.url);
			const pathname = url.pathname === "/" ? "/index.html" : url.pathname;

		if (!Bun.file("./public" + pathname)) {
		return;
		}

	return (new Response(Bun.file("./public" + pathname))); 
},
	websocket: {
		data: {} as {ip: any },
		open(ws) {
			console.log("Client connected", ws.remoteAddress);
		},
		async message(ws, msg) {
			console.log("Received:", msg);
			ws.subscribe('gc')
			server.publish('gc', msg);
			
		}
	},
})
console.log("WS on ws://localhost:8080");