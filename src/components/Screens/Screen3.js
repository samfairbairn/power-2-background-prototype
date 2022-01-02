import styles from './screen.module.scss';

const Screen3 = () => {
  return (
    <div className={styles.screen} style={{top: `200vh`}}>
      <div className={styles.left}>
        <h2>
          Thanks to the <br />
          magic of defi! <br />
          It is no loss! <br />
          You can only win,<br />
          Never lose!
        </h2>

        <p>
          It all starts from a block on the chain.
        </p>

        <p>
          When a deposit is made into POWER2 that deposit is automatically routed to other decentralized fincance protocols to begin earning interest, and the deposits can be withdrawn at any time with no fee! The deposits help create the prize fund but is never taken from you. You play for no losses!
        </p>
      </div>
      <div className={styles.right}>
      </div>
    </div>
  )
};

export default Screen3;
