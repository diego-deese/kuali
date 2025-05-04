import { useState } from 'react'
import { Activity } from '../../types/Activity'

const useCarousel = (events: Activity[]) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'list' | 'card'>('card')

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + events.length) % events.length,
    )
  }

  const changeViewMode = (mode: 'list' | 'card') => {
    setViewMode(mode)
  }

  return {
    currentIndex,
    currentEvent: events[currentIndex],
    nextSlide,
    prevSlide,
    viewMode,
    changeViewMode,
  }
}

export default useCarousel
