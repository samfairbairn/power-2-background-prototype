import React, { useState, useEffect } from 'react';
import _styles from './screen.module.scss';
import styles from './screen1.module.scss';
import classNames from 'classnames';

const Screen1 = () => {

  const [showTitle, setShowTitle] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(true)
    }, 750)
  }, [])

  return (
    <div className={styles.screen} style={{top: `0vh`}}>
      <div className={classNames(styles.content, showTitle && styles.show)}>
        <h1 className="desktop-only">
          <span className={styles.titleLine}>POWER2 No-Loss Cube</span><br />
          <span className={styles.titleLine}>Win <span className={_styles.gradient1}>1</span> + <span className={_styles.gradient2}>1</span> Prizes</span><br />
          <span className={styles.titleLine}>Every single day</span>
        </h1>
        <h1 className='mobile-only'>
          <span style={{marginBottom: '20px', display: 'inline-block'}}>POWER2 <br />No-Loss Cube</span><br />
          Win <span className={_styles.gradient1}>1</span> + <span className={_styles.gradient2}>1</span> Prizes<br />
          Every<br />
          single<br />
          day
        </h1>
      </div>
    </div>
  )
};

export default Screen1;