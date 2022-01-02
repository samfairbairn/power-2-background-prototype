import styles from './screen.module.scss';

const Screen4 = () => {
  return (
    <div className={styles.screen} style={{top: `300vh`}}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <h2>
          High winning odds!<br/>
          Because you have<br />
          double luck!
        </h2>

        <p>
          Because everyone wants to feel lucky<br/>
          POWER2 gives you double luck<br/>
          Have fun,<br/>
          With frequent small prizes,<br/>
          while waiting for the big prize.
        </p>

      </div>
    </div>
  )
};

export default Screen4;
