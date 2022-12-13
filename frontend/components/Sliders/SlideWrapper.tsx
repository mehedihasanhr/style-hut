import React from 'react'
import styles from './slider.module.css'

export const SlideWrapper = ({
  children,
  currentSlide,
  prev,
  next,
  jump,
  index,
}: any) => {
  return (
    <div
      key={index}
      className={`pointer-events-none select-none ${
        jump ? styles.slide_static : ''
      } ${styles.slide} 
        ${index === currentSlide ? styles.active : ''} 
        ${!jump && index === prev ? styles.prev : ''} 
        ${!jump && index === next ? styles.next : ''}`}
    >
      {children}
    </div>
  )
}
