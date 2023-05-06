const WebSocket = require('ws');

// WebSocketサーバーを作成
const wss = new WebSocket.Server({ port: 8081 });

// 接続してきたクライアントを保存するためのSetオブジェクト
const clients = new Set();

// 接続されたクライアントからのメッセージを受け取る
wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // クライアントをセットに追加
  clients.add(ws);

  // クライアントからメッセージを受け取ったときの処理
  ws.on('message', (message) => {
    console.log(`Received message from client: ${message}`);

    // 受け取ったメッセージがJSON形式でなければ何もしない
    let jsonMessage;
    try {
      jsonMessage = JSON.parse(message);
    } catch (error) {
      console.log('Received message is not a valid JSON');
      return;
    }

    // セット内の全てのクライアントにメッセージを送信する
    clients.forEach((client) => {
      // 接続が切断されていない場合にのみメッセージを送信する
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(jsonMessage));
      }
    });
  });

  // クライアントが切断されたときの処理
  ws.on('close', () => {
    console.log('Client disconnected');

    // セットからクライアントを削除
    clients.delete(ws);
  });
});
