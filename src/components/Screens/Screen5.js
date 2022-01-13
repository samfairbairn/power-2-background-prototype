import classNames from 'classnames';
import styles from './screen.module.scss';
import ImageSequence from '../ImageSequence'

const Screen5 = () => {

  return (
    <div className={styles.screen} style={{top: `400vh`, height: '125vh', alignItems: 'flex-start', paddingTop: '40vh'}}>

      <span className={classNames([styles.big1, styles.gradient2])} style={{top: '50vh'}}>1</span>

      <div className={styles.content}>
        <h2>
          Yes! One More!
        </h2>
        <h2>
          Collectible NFTs?<br />
          Power2 <span className={styles.specialI}>i</span>NFTs?<br/>
          it could be anything!
        </h2>

        <p>
          For the weekly Lotto 2, anything is possible.
        </p>

        <p>
          It contains a valuable prize which could be anything from desirable NFTs like Degen Ape, BAYC, or CryptoPunk, or could see the release of new collections. The possibilities are limited only by your imagination as they will be decided by the community.
        </p>

        <p>
        Moreover, we will be collaborating with well-known artists to create POWER2 iNFT collections that earn governance tokens weekly and even more benefits. Click to check our valuable and intelligent iNFTs for you.
        </p>

      </div>
      
      <div className={styles.videoContainer}>
        {/* <video width="1080" height="1080" muted autoPlay loop>
          <source src={cubeVideo} type="video/mp4" />
        </video> */}
        <ImageSequence />
      </div>
      
    </div>
  )
};

export default Screen5;
