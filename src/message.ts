function message(wss, app) {
  wss.on("connection", (ws) => {
    // 绑定websocket对象
    app.context.ws = ws;
    console.log(`[SERVER] connection`);
    // 接收到数据
    ws.on("message", function (msg) {
      console.log(`[SERVER] Received: ${msg}`);
      // 发送数据
      ws.send(`ECHO: ${msg}`, (err) => {
        if (err) console.log(`[SERVER] error: ${err}`);
      });
    });
    // ...
  });
}

export default message;
