import styles from './screen.module.scss';
import classNames from 'classnames';

const Screen5b = ({lightMode}) => {

  return (
    <div className={classNames([styles.screen, styles.column, styles.fluid])}>

      <div className={classNames([styles.content, styles.wide])}>
        <h2>
          How to play
        </h2>

        <h3>
          I. One click to deposit. Done!
        </h3>
        <h3>
          II. 1 + 1 prizes are awarded, every, single, day!
        </h3>
        <h3>
          III. Your money is still yours. Withdraw anytime with no fee!
        </h3>

      </div>
      
    </div>
  )
};

export default Screen5b;
