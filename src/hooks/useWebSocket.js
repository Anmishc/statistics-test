import { useState, useCallback } from 'react';

export const useWebSocket = (url, onMessageHandler, onErrorHandler) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleStartSocket = useCallback(() => {
    if (socket) {
      console.log('WebSocket уже открыт');
      return;
    }
    setLoading(true);
    const ws = new WebSocket(url);
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket соединен');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      if (onMessageHandler) {
        onMessageHandler(event);
        setLoading(false);
      }
    };

    ws.onerror = () => {
      console.log('WebSocket ошибка');
      if (onErrorHandler) {
        onErrorHandler();
      }
    };

    ws.onclose = () => {
      console.log('WebSocket закрыт');
      setIsConnected(false);
      setLoading(false);
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [socket, url, onMessageHandler, onErrorHandler]);

  const handleStopSocket = useCallback(() => {
    if (socket) {
      socket.close();
    }
  }, [socket]);

  return { handleStartSocket, handleStopSocket, isConnected, isLoading };
};
