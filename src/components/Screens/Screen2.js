import styles from './screen.module.scss';

const Screen1 = () => {
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam molestie ullamcorper felis id placerat. Proin mollis eleifend purus eget imperdiet. Integer ut congue massa. Donec ut convallis ex. Proin nulla tellus, interdum sit amet convallis vitae, vehicula a tortor. Nulla auctor augue at eros auctor, quis pulvinar odio egestas.
        </p>
      </div>
    </div>
  )
};

export default Screen1;
