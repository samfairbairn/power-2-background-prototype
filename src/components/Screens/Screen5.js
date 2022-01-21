import { useEffect, useState, useRef } from 'react';
import ReactGA from 'react-ga';
import classNames from 'classnames';
import styles from './screen.module.scss';
import ImageSequence from '../ImageSequence';

const Screen5 = ({scrollPos}) => {

  const [pageVisible, setPageVisible] = useState(false)
  const tracked = useRef(false);

  useEffect(() => {
    let _scrollPos = scrollPos / window.innerHeight;

    if (!tracked.current && _scrollPos > 3.8) {
      tracked.current = true
      ReactGA.event({
        category: "scroll",
        action: "screen5: one more!"
      });
    }
  }, [scrollPos])

  useEffect(() => {
    let _scrollPos = scrollPos / window.innerHeight;

    if (!pageVisible && _scrollPos >= 3 && _scrollPos <= 4.5) {
      setPageVisible(true)
    } else if (pageVisible && (_scrollPos < 3 || _scrollPos > 4.5)) {
      setPageVisible(false)
    }

  }, [scrollPos, pageVisible]);

  return (
    <div className={styles.screen} style={{top: `400vh`, height: '100vh'}}>

      <span className={classNames([styles.big1, styles.gradient2])}>1</span>

      <div className={styles.content} style={{ alignItems: 'flex-start', marginTop: '20vh'}}>
        {/* <span className={classNames([styles.big1, styles.gradient2, styles.right])}>1</span> */}
        <h2>
          Yes! One More!
        </h2>
        <h2>
          Collectible NFTs?<br />
          Power2 <span className={styles.specialI}>i</span>NFTs?<br/>
          it could be anything!
        </h2>

        <p>
          It could be a desirable NFT like Degen Ape, BAYC, or CryptoPunk. The possibilities are limited only by your imagination as they will be decided by the community.
        </p>

        <p>
        We will also collaborate with well-known artists to create POWER2 iNFT collections that earn governance tokens weekly and even more benefits, for example: <span style={{fontWeight: 'bold'}}>2% of the POWER2 net profit.</span>
        </p>

      </div>
      
      <div className={styles.videoContainer}>
        {/* <video width="1080" height="1080" muted autoPlay loop>
          <source src={cubeVideo} type="video/mp4" />
        </video> */}
        <ImageSequence play={pageVisible} />
      </div>
      
    </div>
  )
};

export default Screen5;
