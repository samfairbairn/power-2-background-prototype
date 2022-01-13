import classNames from 'classnames';
import styles from './screen.module.scss';

const Screen4 = () => {

  return (
    <div className={classNames([styles.screen, styles.alignRight])} style={{top: `300vh`, alignItems: 'flex-end', paddingBottom: '20vh'}}>

      <span className={classNames([styles.big1, styles.gradient1])} style={{bottom: '50vh'}}>1</span>

      <div className={styles.content} style={{paddingLeft: '8vw'}}>
        <h2>
          Win a bitcoin?<br />
          Or other crypto-
          currency with <br/>
          high winning odds!
        </h2>

        <p>
          In the weekly Lotto 1, the more people join<br />
          the larger the cube grows, the bigger the prize! 
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
