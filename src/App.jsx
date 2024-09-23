import { useState, useCallback } from 'react';
import { Button } from './components/Button';
import { Stats } from './components/Stats';
import { addPrice, getAllPrices, clearDb } from './utils/db';
import { calculateMean, calculateMedian, calculateMode, calculateDeviation } from './utils/statistics';
import { useWebSocket } from './hooks/useWebSocket';
import './App.scss';

function App() {
  const [stats, setStats] = useState(null);
  const [lostPrices, setLostPrices] = useState(0);
  const [hasData, setHasData] = useState(false);

  const handleMessage = useCallback(async ({ data }) => {
    try {
      const { value } = JSON.parse(data);
      await addPrice({ value });
      setHasData(true);
    } catch (error) {
      console.error("Ошибка при обработке сообщения:", error);
      setLostPrices(prev => prev + 1);
    }
  }, []);

  const { handleStartSocket, handleStopSocket, isConnected, isLoading } = useWebSocket(
    'wss://trade.termplat.com:8800/?password=1234',
    handleMessage,
    () => console.log('WebSocket ошибка')
  );

  const handleStats = useCallback(async () => {
    const start = Date.now();
    const data = await getAllPrices();
    const values = data.map(entry => entry.value);

    if (values.length === 0) return;

    const mean = calculateMean(values);
    const deviation = calculateDeviation(values, mean);
    const median = calculateMedian(values);
    const mode = calculateMode(values);

    const timeSpent = Date.now() - start;

    setStats({
      mean,
      deviation,
      median,
      mode,
      lostPrices,
      timeSpent,
    });
  }, [lostPrices]);

  const handleClearDb = useCallback(async () => {
    try {
      await clearDb();
      setHasData(false);
      setStats(null)
      console.log('IndexedDB очищена');
    } catch (error) {
      console.error('Ошибка при очистке IndexedDB:', error);
    }
  }, []);

  return (
    <div className="App">
      <h1>Котировки с биржи</h1>
        <Button onClick={handleStartSocket} label="Старт" disabled={isConnected} isLoading={isLoading} />
        <Button onClick={handleStopSocket} label="Стоп" disabled={!isConnected} />
        <Button onClick={handleStats} label="Статистика" disabled={!hasData} />
        <Button onClick={handleClearDb} label="Очистить" disabled={!hasData} />
        <Stats stats={stats} />
    </div>
  );
}

export default App;
