import styles from './loading-spinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles["lds-spinner"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  );
}

export default LoadingSpinner;