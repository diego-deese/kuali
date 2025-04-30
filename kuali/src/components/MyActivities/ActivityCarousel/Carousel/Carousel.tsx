import React from 'react'
import { View } from 'react-native'
import ActivityCard from '../ActivityCard/ActivityCard'
import CarouselNavigation from '../CarouselNavigation/CarouselNavigation'
import { styles } from './styles'
import { Activity } from '../../../../types/Activity'
import useCarousel from '../../../../hooks/MyActivities/useCarousel'

interface ActivityCarouselProps {
  activities: Activity[]
}

const ActivityCarousel: React.FC<ActivityCarouselProps> = ({ activities }) => {
  const { currentEvent, nextSlide, prevSlide } = useCarousel(activities)

  if (activities.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <ActivityCard activity={{ image_url: null, ...currentEvent }} />
      <CarouselNavigation onNext={nextSlide} onPrev={prevSlide} />
      {/* Si se necesita implementar la vista de lista, se agregaría aquí */}
    </View>
  )
}

export default ActivityCarousel
