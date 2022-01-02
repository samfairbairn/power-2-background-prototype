import styles from './screen1.module.scss';

const Screen1 = () => {
  return (
    <div className={styles.screen} style={{top: `0vh`}}>
      <div className={styles.content}>
        <h1>
          Dual No Loss Lottos<br />
          Double Luck<br />
          Win Twice
        </h1>
        <h1>
          Simple Play<br />
          You can only Win<br />
          Never Lose
        </h1>
      </div>
    </div>
  )
};

export default Screen1;