import styles from './screen.module.scss';

const Screen3 = () => {

  return (
    <div className={styles.screen} style={{top: `200vh`}}>
      <div className={styles.center}>
        <span className={styles.xlTitle}>
          ( <span style={{fontWeight: 'bold'}}><span className={styles.gradient1}>1</span> + <span className={styles.gradient2}>1</span></span> )<sup className={styles.super}>n</sup>
        </span>
        <h1>
          1 + 1 Magic boxes<br/>
          With big prize
        </h1>
        <h3>
          Free for you to open, <br className="mobile-only" />week after week.<br/>
          The more you play, <br className="mobile-only" />the higher power of 2.
        </h3>
      </div>
    </div>
  )
};

export default Screen3;
