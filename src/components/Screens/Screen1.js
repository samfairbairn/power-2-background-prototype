import styles from './screen.module.scss';
import screenStyles from './screen1.module.scss';

const Screen1 = () => {
  return (
    <div className={screenStyles.screen} style={{top: `0vh`}}>
      <div className={screenStyles.left}>
        <h1>
          Dual No Loss Lotos<br />
          Double Luck<br />
          Win Twice
        </h1>
        <h1>
          Simple Play<br />
          You can only Win<br />
          Never Lose
        </h1>
      </div>
      <div className={styles.right}>
      </div>
    </div>
  )
};

export default Screen1;
