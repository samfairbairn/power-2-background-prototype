import styles from './screen.module.scss';

const Screen5 = () => {
  return (
    <div className={styles.screen} style={{top: `400vh`}}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <h2>
          Power of 2<br />
          fun cubic game
        </h2>

        <p>
          Each deposit has weekly dual lottos:<br/>
          POWER2 Cube Lotto 1 + Magic Cube Lotto 2.<br />
          And you can keep auto-joining the dual-lottos game.
        </p>

        <p>
          In the POWER2 Cube Lotto 1,<br />
          the more you play, there's more power of 2.<br />
          The more people join, the larger the cube, the bigger the prize.
        </p>

        <p>
          As for the Magic Cube Lotto 2,<br />
          everything is possible.
        </p>

        <p>
          Are you ready for the various transformative cubic games?
        </p>
      </div>
    </div>
  )
};

export default Screen5;
