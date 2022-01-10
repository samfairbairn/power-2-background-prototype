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
          <span className={styles.titleLine}>One Click to Play</span><br />
          <span className={styles.titleLine}>Win 1 + 1 Prizes</span><br />
          <span className={styles.titleLine}>Free for n times</span>
        </h1>
      </div>
    </div>
  )
};

export default Screen1;