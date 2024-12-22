class WebSocketService {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private subscribers = new Map();
  private isConnecting = false;
  private messageQueue: any[] = [];

  constructor() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname || 'localhost';
    const port = import.meta.env.DEV ? '5173' : window.location.port;
    this.url = `${protocol}//${host}:${port}`;

    this.connect();

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && !this.isConnected()) {
        this.connect();
      }
    });
  }

  // ... 残りのWebSocketService実装は既存のコードを移植
}

export const websocketService = new WebSocketService();
export default websocketService;