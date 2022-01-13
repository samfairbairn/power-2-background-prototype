import classNames from 'classnames';
import styles from './screen.module.scss';

const Screen2 = () => {

  return (
    <div className={classNames([styles.screen, styles.alignRight])} style={{top: `100vh`}}>

      <div className={styles.content}>
        <h2>
          What's POWER2?
        </h2>
        <h2>
          A free to play dual-lotto<br />
          with 1 + 1 prizes,<br />
          for double luck!
        </h2>

        <p>
          Because TWO is better than ONE, with each weekly draw, <br className="desktop-only"/>two no-loss FREE lottos will be generated to enable double luck <br className="desktop-only"/>experience. 
          You have TWO chances to win:
        </p>
        <p>1: Crypto currency including bitcoin!</p>
        <p>Plus 1: Valuable NFTs including popular NFTs, and famous artist <br className="desktop-only"/>collaboration POWER2 iNFT which have additional utilities.</p>

      </div>
    </div>
  )
};

export default Screen2;
