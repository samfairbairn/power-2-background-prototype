import styles from './screen.module.scss';
import classNames from 'classnames';

const Screen7 = () => {

  return (
    <div className={styles.screen} style={{top: `675vh`, height: '100vh', flexDirection: "column", justifyContent: 'center'}}>

      <div className={classNames([styles.center, styles.row])}>
        <div className={styles.left}>
          <h2>
            OH!
          </h2>
          <h2>
            YOU CAN ONLY WIN, <br />NEVER LOSE!
          </h2>
          <h2>
            THANKS TO THE <br />MAGIC OF DEFI.
          </h2>
        </div>
        <div className={styles.right}>
        <p>
          When a deposit is made into POWER2 that deposit is automatically routed to other decentralized finance protocols to begin earning interest, it’s this interest that creates the prize fund, but your deposit is never taken from you and you can withdraw at any time with no fee. You play for no losses!
        </p>
        <p>
          Your deposit enrols you into the weekly dual lottos, the more you deposit the higher chances you have of winning, and you will be automatically enrolled into the next round for free as long as your deposit remains in the vault.
        </p>
        </div>
      </div>
    </div>
  )
};

export default Screen7;
