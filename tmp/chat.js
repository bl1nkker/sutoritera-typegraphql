var socket = io.connect('http://localhost:4000', { transports: ['websocket', 'polling', 'flashsocket'], query: { userId: '611333af3deeab2e64f13875' }  } );