import styles from './screen.module.scss';
import classNames from 'classnames';
import {ReactComponent as PuppyImage} from '../../assets/puppy.svg'

const Screen5b = ({lightMode}) => {

  return (
    <div className={classNames([styles.screen, styles.column, styles.fluid])}>

      <div className={classNames([styles.content, styles.wide])}>
        <h2>
          No-loss for charity
        </h2>

        <p>
          You don't need to spend a penny, just play the POWER2 CUBE <br className='desktop-only' />
          and rescue animals at the same time.
        </p>

        <p>
          1% of net fees will be donated to animal charities, <br className='desktop-only' />
          because our team members are all animals lovers.
        </p>

        <PuppyImage className={styles.puppyImage} />
      </div>

      
    </div>
  )
};

export default Screen5b;
