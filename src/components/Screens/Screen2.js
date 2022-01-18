import classNames from 'classnames';
import styles from './screen.module.scss';

const Screen2 = () => {

  return (
    <div className={classNames([styles.screen, styles.alignRight])} style={{top: `100vh`, height: '100vh'}}>

      <div className={styles.content}>
        <h2>
          Welcome to POWER2
        </h2>

        <p>
          With POWER2 CUBE, "I am feeling lucky" is twofold. <br className="desktop-only"/>
          EVERYDAY you have TWO chances to win:
        </p>
        <p>1: Crypto currencies</p>
        <p>Plus 1: NFTs including popular NFTs, <br />and famous artist collaboration POWER2 iNFTs with additional utilities.</p>
        <p>
          The POWER2 CUBE will be always for you as long as your deposit remains. <br className="desktop-only"/>
          May the POWER be with you to win 1 + 1 prizes everyday!
        </p>

      </div>
    </div>
  )
};

export default Screen2;
