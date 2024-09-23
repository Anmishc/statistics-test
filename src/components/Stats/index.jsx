import styles from './Stats.module.scss';
export function Stats ({ stats }) {
  if (!stats) return null;

  return (
    <div className={styles.stats}>
      <p>Среднее: {stats.mean}</p>
      <p>Стандартное отклонение: {stats.deviation}</p>
      <p>Мода: {stats.mode}</p>
      <p>Медиана: {stats.median}</p>
      <p>Потерянные котировки: {stats.lostPrices}</p>
      <p>Время расчёта: {stats.timeSpent} мс</p>
    </div>
  );
}
