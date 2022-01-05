import styles from './screen1.module.scss';
import classNames from 'classnames';
import useFontFaceObserver from 'use-font-face-observer'

const Screen1 = () => {
  
  const webFontsLoaded = useFontFaceObserver([{family: `Brandon Grotesque`}]);

  return (
    <div className={styles.screen} style={{top: `0vh`}}>
      <div className={classNames(styles.content, webFontsLoaded && styles.show)}>
        <h1>
          <span className={styles.titleLine}>Dual No Loss Lottos</span><br />
          <span className={styles.titleLine}>Double Luck</span><br />
          <span className={styles.titleLine}>Win Twice</span>
        </h1>
        <h1>
          <span className={styles.titleLine2}>Simple Play</span><br />
          <span className={styles.titleLine2}>You can only Win</span><br />
          <span className={styles.titleLine2}>Never Lose</span>
        </h1>
      </div>
    </div>
  )
};

export default Screen1;