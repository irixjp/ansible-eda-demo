(function (nx) {
  /**
   * define application
   */
  var Shell = nx.define(nx.ui.Application, {
    methods: {
      start: function () {

        // initialize a topology
        var topo = new nx.graphic.Topology({
          // set the topology view's with and height
          width: window.innerWidth,
          height: window.innerHeight,
          // node config
          nodeConfig: {
            label: 'model.name',
            iconType: 'model.device_type',
            color: 'model.color',
          },
          // link config
          linkConfig: {
            linkType: 'parallel'
          },
          // show node's icon, could change to false to show dot
          showIcon: true,
          //autoLayout: true,
          //dataProcessor: "force",
          showNavigation: false,
        });

        topo.data(topologyData);  //set data to topology
        topo.attach(this);        //attach topology to document


        function handleMessage(message) {
          var node = topologyData.nodes.find(function(node) {
            return node.id === message.id;
          });

          if (node) {
            switch (message.message) {
            case "error":
              topo.getNode(message.id).color("red");
              break;
            case "active":
              topo.getNode(message.id).color("#1884d4");
              break;
            default:
              topo.getNode(message.id).color("grey");
              break;
            }
          }
        }

        var sock = new WebSocket('ws://127.0.0.1:8081');
        sock.addEventListener('open',function(e){
          console.log('Socket 接続成功');
        });

        sock.addEventListener('message',function(e){
          console.log(e.data);

          var receivedData = JSON.parse(e.data);
          handleMessage(receivedData);

          //topo.data(topologyData);

        });

        // WebSocketの接続状態を監視する
        sock.addEventListener('open', function (event) {
          // 接続成功時の処理
          displayStatus('connected', 'green');
        });

        sock.addEventListener('close', function (event) {
          // 接続切断時の処理
          displayStatus('disconnected', 'red');
        });

        // 接続状態を定期的にチェックする
        setInterval(function() {
          if (sock.readyState === sock.OPEN) {
            displayStatus('connected', 'green');
          } else {
            displayStatus('disconnected', 'red');
          }
        }, 1000);

        // メッセージを画面に表示する関数
        function displayStatus(message, color) {
          const statusElement = document.getElementById('status');
          statusElement.textContent = message;
          statusElement.style.color = color;
        }
      }
    }
  });

  var shell = new Shell();
  shell.start();

})(nx);
