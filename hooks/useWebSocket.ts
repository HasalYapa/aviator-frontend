"use client";

import { useEffect, useState, useCallback } from 'react';

export interface DataPoint {
  value?: string;
  multiplier?: number;
  timestamp: string;
  ml_active?: boolean;
  signal_type?: string;
  prediction?: string;
  confidence?: number;
  reason?: string;
  [key: string]: any;
}

export const useWebSocket = (url: string) => {
  const [data, setData] = useState<DataPoint | null>(null);
  const [history, setHistory] = useState<DataPoint[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    let socket: WebSocket;

    const connect = () => {
      socket = new WebSocket(url);

      socket.onopen = () => {
        setIsConnected(true);
        console.log('Connected to WebSocket');
      };

      socket.onmessage = (event) => {
        try {
          const parsedData: DataPoint = JSON.parse(event.data);
          setData(parsedData);
          setHistory((prev) => [parsedData, ...prev].slice(0, 50));
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        console.log('Disconnected from WebSocket. Retrying in 3 seconds...');
        setTimeout(connect, 3000);
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        socket.close();
      };
    };

    connect();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [url]);

  return { data, history, isConnected };
};
