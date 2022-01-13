import styles from './screen.module.scss';
// import {ReactComponent as RoadmapImage} from '../../assets/roadmap.svg'
// import RoadmapImage from '../../assets/roadmap.svg'
import Logo from '../../assets/logo-simple.svg'

const Screen8 = () => {

  return (
    <div className={styles.screen} style={{top: `925vh`, height: '75vh', flexDirection: "column", justifyContent: 'center'}}>
      <div className={styles.center}>
        <img src={Logo} className={styles.logoSimple} alt="icon" />
        <h2>Whitepaper</h2>
        {/* <div className={styles.roadmapWrapper}>
          <img src={RoadmapImage} alt="roadmap" />
        </div> */}
      </div>
    </div>
  )
};

export default Screen8;
