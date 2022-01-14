import styles from './screen.module.scss';
import classNames from 'classnames';

const Screen7 = () => {

  return (
    <div className={styles.screen} style={{top: `600vh`, height: '100vh', flexDirection: "column", justifyContent: 'center'}}>

      <div className={classNames([styles.content, styles.wide])}>
        <div className={styles.left}>
          <h2>
            OH!
            <br />
            YOU CAN ONLY WIN, <br className="small-only" />NEVER LOSE!
            <br />
            THANKS TO THE <br className="mobile-only" />MAGIC OF DEFI.
          </h2>
        </div>
        <div className={styles.right}>
        <p>
          When a deposit is made into POWER2 that deposit is automatically routed to other decentralized finance protocols to begin earning interest, it’s this interest that creates the prize fund, but your deposit is never taken from you and you can withdraw at any time with no fee. You play for no losses!
        </p>
        </div>
      </div>
    </div>
  )
};

export default Screen7;
