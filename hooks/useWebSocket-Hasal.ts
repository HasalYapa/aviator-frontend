"use client";

import { useEffect, useState } from 'react';

export interface GameEvent {
  type: 'crash' | 'new_round' | 'history' | 'settings_update';
  value?: string;
  timestamp?: string;
  prediction?: string;
  confidence?: number;
  reason?: string;
  signal_type?: 'blue' | 'purple' | 'pink';
  gap?: number;
  ml_active?: boolean;
  balance?: number;
  profit?: number;
  current_bet?: number;
  data?: GameEvent[];
}

export const useWebSocket = (url: string) => {
  const [latestCrash, setLatestCrash] = useState<GameEvent | null>(null);
  const [history, setHistory] = useState<GameEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let timeoutId: NodeJS.Timeout;

    const connect = () => {
      socket = new WebSocket(url);

      socket.onopen = () => {
        setIsConnected(true);
        console.log('Connected to Sniffer Relay');
      };

      socket.onmessage = (event) => {
        console.log('📡 [WS Message]:', event.data);
        try {
          const msg: GameEvent = JSON.parse(event.data);

          if (msg.type === 'history') {
            const historyData = msg.data || [];
            console.log('📜 [History Loaded]:', historyData.length);
            setHistory(historyData.reverse());
            if (historyData.length > 0) {
              setLatestCrash(historyData[0]);
            }
          }
          else if (msg.type === 'crash') {
            console.log('💥 [Crash Event]:', msg.value);
            setIsFlying(false);
            setLatestCrash(msg);
            setHistory((prev) => [msg, ...prev].slice(0, 20));
          }
          else if (msg.type === 'new_round') {
            console.log('🆕 [New Round Event]');
            setIsFlying(true);
            setLatestCrash(null); // Clear last crash display on new round
          }
        } catch (error) {
          console.error('❌ [WS Parse Error]:', error);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
        timeoutId = setTimeout(connect, 3000);
      };

      socket.onerror = () => {
        if (socket) socket.close();
      };
    };

    connect();

    return () => {
      if (socket) socket.close();
      clearTimeout(timeoutId);
    };
  }, [url]);

  return { latestCrash, history, isConnected, isFlying };
};
