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
      {/* Only if there's more than 1 activity we show the navigation component */}
      {activities.length > 1 && (
        <CarouselNavigation onNext={nextSlide} onPrev={prevSlide} />
      )}
    </View>
  )
}

export default ActivityCarousel
