import styles from './screen.module.scss';

const Screen2 = () => {
  return (
    <div className={styles.screen} style={{top: `100vh`}}>
      <div className={styles.left}></div>

      <div className={styles.right}>
        <h2>
          POWER 2:<br/>
          Always Free Draw<br />
          for Dual Lotos<br />
          With Double Luck
        </h2>

        <p>
          Dual-Lotto, Double Luck, Win Twice<br/>
          because TWO is better than ONE.
        </p>

        <p>
          For each round, two no-loss free lottos will be generated to enable double luck experience. One draw for two prizes. One for crypto currecny, another one for the airdrop BOOSTER, which plays a critical role in enabling the game to be fun, and most importantly, to give you more chances to get rich.
        </p>

        <p>
          POWER2 is the easiest and most enjoyable way to get rich on the Solana blockchain by using human-centered and gamification design.
        </p>
      </div>
    </div>
  )
};

export default Screen2;
