import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

const images = []

for (let i = 13; i < 253; i++) {
  images.push(require(`../../assets/sequence/mAGIC CUBE 0111.257.${i}.png`));
}

const ImageSequence = () => {

  const [isLoaded, setIsLoaded] = useState(false)
  const [frame, setFrame] = useState(0)
  const curFrame = useRef(0)
  // const loadedImages = useRef([])
  const loaded = useRef(0)
  const lastTick = useRef(0)

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = function() {
        loaded.current++
        // loadedImages.current.push(img)
        resolve(img)
      }
      img.onerror = img.onabort = function() {
        reject(src)
      }
      img.src = src
    })
  }


  useEffect(() => {

    const render = () => {
      curFrame.current = curFrame.current + 1
      if (curFrame.current + 1 < images.length) {
        curFrame.current = curFrame.current + 1
      } else {
        curFrame.current = 0
      }
      setFrame(curFrame.current)
    }

    const tick = () => {
      const now = Date.now();
      const delta = now - lastTick.current;
      if (delta > 1000/30) {
        lastTick.current = now;
        render()
      }
      requestAnimationFrame(tick)
    }

    const preloadImages = async () => {
      const imagesPromiseList = []
        for (const i of images) {
          imagesPromiseList.push(preloadImage(i))
        }
    
        await Promise.all(imagesPromiseList)
        setIsLoaded(true)
        tick()
    }

    preloadImages()
  }, [])

  return (
    <div className={styles.imageSequence}>
      {isLoaded && (
        <>
          {images.map((i, index) => (
            <img key={`sequence-${i}`} className={classNames([styles.image, index === frame && styles.active])} src={i} alt={`sequence-${i}`} />
          ))}
        </>
      )}
    </div>
  )
};

export default ImageSequence;
