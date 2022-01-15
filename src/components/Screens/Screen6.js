import styles from './screen.module.scss';
import classNames from 'classnames';
import CycleImage3 from '../../assets/CYCLE_Dark-08.svg'
import CycleImageLight3 from '../../assets/CYCLES_light-08.svg'

const Screen6 = ({lightMode}) => {

  return (
    <div className={styles.screen} style={{top: `800vh`, height: '150vh', flexDirection: "column"}}>

      <div className={classNames([styles.content, styles.wide])} style={{ height: '75vh' }}>
        
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
        { lightMode ? 
          <img src={CycleImageLight3} alt="virtuous cycles" />
        :
          <img src={CycleImage3} alt="virtuous cycles" />
        }     
      </div>
      
    </div>
  )
};

export default Screen6;
