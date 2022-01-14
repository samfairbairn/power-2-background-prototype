import styles from './screen.module.scss';
import {ReactComponent as CycleImage} from '../../assets/cycle.svg'

const Screen6 = ({lightMode}) => {

  return (
    <div className={styles.screen} style={{top: `525vh`, height: '150vh', flexDirection: "column"}}>

      <div className={styles.center} style={{height: '75vh'}}>
        <h2>
          Why HODL POWER2 token & <span className={styles.specialI}>i</span>NFT?
        </h2>
        <h2>
          They'll grow to the moon, thanks to <br className="desktop-only"/>
          POWER2 Virtuous Snowball Cycles.
        </h2>

        <p>
          The Virtuous Snowball Cycles forms a positive back loop of higher demands,<br className="desktop-only"/>
          which causes higher POWER2 token and iNFT prices.<br className="desktop-only"/>
          So remember, always have diamond hands, and you will not be disappointed.
        </p>

      </div>

      <div className={styles.virtuousCycle}>
        <CycleImage className={styles.cycleImage} />
      </div>
      
    </div>
  )
};

export default Screen6;
