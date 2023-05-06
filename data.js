var topologyData = {
  nodes: [
    // ISPs
    { id: 0, x: 400, y: -100, name: "ISP1", device_type: "cloud"},
    { id: 1, x: 600, y: -100, name: "ISP2", device_type: "cloud"},

    // Routers
    { id: 2, x: 400, y: 0, name: "router1", device_type: "router"},
    { id: 3, x: 600, y: 0, name: "router2", device_type: "router"},

    // Switches
    { id: 4, x: 400, y: 100, name: "switch1", device_type: "switch" },
    { id: 5, x: 600, y: 100, name: "switch2", device_type: "switch" },

    // Servers
    { id: 6, x: 200, y: 200, name: "ap1", device_type: "accesspoint" },
    { id: 7, x: 400, y: 200, name: "ap2", device_type: "accesspoint" },
    { id: 8, x: 600, y: 200, name: "ap3", device_type: "accesspoint" },
    { id: 9, x: 800, y: 200, name: "ap4", device_type: "accesspoint" },

    // Edge
    { id: 10, x: 150, y: 300, device_type: "server", color: "grey" },
    { id: 11, x: 200, y: 300, device_type: "server", color: "grey" },
    { id: 12, x: 250, y: 300, device_type: "server", color: "grey" },
    { id: 13, x: 150, y: 350, device_type: "server", color: "grey" },
    { id: 14, x: 200, y: 350, device_type: "server", color: "grey" },
    { id: 15, x: 250, y: 350, device_type: "server", color: "grey" },
    { id: 16, x: 150, y: 400, device_type: "server", color: "grey" },
    { id: 17, x: 200, y: 400, device_type: "server", color: "grey" },
    { id: 18, x: 250, y: 400, device_type: "server", color: "grey" },
    { id: 19, x: 350, y: 300, device_type: "server", color: "grey" },
    { id: 20, x: 400, y: 300, device_type: "server", color: "grey" },
    { id: 21, x: 450, y: 300, device_type: "server", color: "grey" },
    { id: 22, x: 350, y: 350, device_type: "server", color: "grey" },
    { id: 23, x: 400, y: 350, device_type: "server", color: "grey" },
    { id: 24, x: 450, y: 350, device_type: "server", color: "grey" },
    { id: 25, x: 350, y: 400, device_type: "server", color: "grey" },
    { id: 26, x: 400, y: 400, device_type: "server", color: "grey" },
    { id: 27, x: 450, y: 400, device_type: "server", color: "grey" },
    { id: 28, x: 550, y: 300, device_type: "server", color: "grey" },
    { id: 29, x: 600, y: 300, device_type: "server", color: "grey" },
    { id: 30, x: 650, y: 300, device_type: "server", color: "grey" },
    { id: 31, x: 550, y: 350, device_type: "server", color: "grey" },
    { id: 32, x: 600, y: 350, device_type: "server", color: "grey" },
    { id: 33, x: 650, y: 350, device_type: "server", color: "grey" },
    { id: 34, x: 550, y: 400, device_type: "server", color: "grey" },
    { id: 35, x: 600, y: 400, device_type: "server", color: "grey" },
    { id: 36, x: 650, y: 400, device_type: "server", color: "grey" },
    { id: 37, x: 750, y: 300, device_type: "server", color: "grey" },
    { id: 38, x: 800, y: 300, device_type: "server", color: "grey" },
    { id: 39, x: 850, y: 300, device_type: "server", color: "grey" },
    { id: 40, x: 750, y: 350, device_type: "server", color: "grey" },
    { id: 41, x: 800, y: 350, device_type: "server", color: "grey" },
    { id: 42, x: 850, y: 350, device_type: "server", color: "grey" },
    { id: 43, x: 750, y: 400, device_type: "server", color: "grey" },
    { id: 44, x: 800, y: 400, device_type: "server", color: "grey" },
    { id: 45, x: 850, y: 400, device_type: "server", color: "grey" },
  ],
  links: [
    // WAN to routers
    { source: 0, target: 2, color: "green" },
    { source: 1, target: 3 },

    // Routers to switches
    { source: 2, target: 4, color: "green" },
    { source: 2, target: 5 },
    { source: 3, target: 4 },
    { source: 3, target: 5 },

    // Switches to Switches
    { source: 4, target: 5 },
    { source: 4, target: 5 },

    // Servers to APs
    { source: 6, target: 4, color: "green" },
    { source: 6, target: 5, color: "green" },
    { source: 7, target: 4, color: "green" },
    { source: 7, target: 5, color: "green" },
    { source: 8, target: 4, color: "green" },
    { source: 8, target: 5, color: "green" },
    { source: 9, target: 4, color: "green" },
    { source: 9, target: 5, color: "green" },

    // APs to Devices
    { source: 6, target: 10 },
    { source: 6, target: 11 },
    { source: 6, target: 12 },
    { source: 6, target: 13 },
    { source: 6, target: 14 },
    { source: 6, target: 15 },
    { source: 6, target: 16 },
    { source: 6, target: 17 },
    { source: 6, target: 18 },
    { source: 7, target: 19 },
    { source: 7, target: 20 },
    { source: 7, target: 21 },
    { source: 7, target: 22 },
    { source: 7, target: 23 },
    { source: 7, target: 24 },
    { source: 7, target: 25 },
    { source: 7, target: 26 },
    { source: 7, target: 27 },
    { source: 8, target: 28 },
    { source: 8, target: 29 },
    { source: 8, target: 30 },
    { source: 8, target: 31 },
    { source: 8, target: 32 },
    { source: 8, target: 33 },
    { source: 8, target: 34 },
    { source: 8, target: 35 },
    { source: 8, target: 36 },
    { source: 9, target: 37 },
    { source: 9, target: 38 },
    { source: 9, target: 39 },
    { source: 9, target: 40 },
    { source: 9, target: 41 },
    { source: 9, target: 42 },
    { source: 9, target: 43 },
    { source: 9, target: 44 },
    { source: 9, target: 45 },

  ]
};
