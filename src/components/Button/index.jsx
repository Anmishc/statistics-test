import styles from './Button.module.scss';

export function Button({ label, onClick, isLoading, ...props }) {
  return (
    <button onClick={onClick} className={styles.btn} {...props}>
      {label}
      {isLoading && <div className={styles.spinner} />}
    </button>
  );
}
