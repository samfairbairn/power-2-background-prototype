import classNames from 'classnames';
import styles from './screen.module.scss';

const Screen4 = () => {

  return (
    <div className={classNames([styles.screen, styles.alignRight])} style={{top: `300vh`, height: '100vh'}}>
      <div className={styles.backgroundGradient}></div>

      <span className={classNames([styles.big1, styles.gradient1])}>1</span>

      <div className={classNames([styles.content, styles.prizes1])}>
        {/* <span className={classNames([styles.big1, styles.gradient1])}>1</span> */}

        <h2>
          $ XXXXXX Prizes with<br />
          high winning odds!
        </h2>

        <p>
          The more people join, the larger the cube grows, the bigger the $ prize! 
        </p>

        <p>
          Game your odds, the more you deposit the higher your chances to win. The winning odds formula is immutably written into the smart contract for anyone to review.
        </p>

        <p>
          Have fun with frequent small prizes while waiting for the big prize!
        </p>

      </div>
    </div>
  )
};

export default Screen4;
