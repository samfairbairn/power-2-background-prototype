import styles from './screen1.module.scss';
import classNames from 'classnames';
import useFontFaceObserver from 'use-font-face-observer'

const Screen1 = () => {
  
  const webFontsLoaded = useFontFaceObserver([{family: `Brandon Grotesque`}]);

  return (
    <div className={styles.screen} style={{top: `0vh`}}>
      <div className={classNames(styles.content, webFontsLoaded && styles.show)}>
        <h1>
          <span className={styles.titleLine}>No-Loss Dual-Lotto</span><br />
          <span className={classNames([styles.titleLine, styles.mobileTitle])}>One Click to Play</span><br />
          <span className={classNames([styles.titleLine, styles.mobileTitle])}>Win 1 + 1 Prizes</span><br />
          <span className={classNames([styles.titleLine, styles.mobileTitle])}>Free for n times</span>
        </h1>
      </div>
    </div>
  )
};

export default Screen1;