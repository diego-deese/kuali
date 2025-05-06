import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles'
import { Activity } from '../../../../types/Activity'
import colors from '../../../../constants/colors'
import { CalendarClockIcon, PlaceIcon } from '../../../shared/Icons/Icons'
import { formatDate } from '../../../../utils/parsing'
import { FormattedDate } from '../../../shared/FormattedDate/FormattedDate'

interface ActivityCardProps {
  activity: Activity & {
    image_url: string | null
  }
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        style={styles.backgroundImage}
        source={
          activity.image_url
            ? { uri: activity.image_url }
            : require('../../../../../assets/cicataPlace.png')
        }
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.7)']}
          style={styles.gradient}
        >
          <View style={styles.footer}>
            <Text style={styles.eventTitle}>{activity.title}</Text>
            <View style={styles.eventMeta}>
              <View style={styles.metaItem}>
                <CalendarClockIcon color={colors.solidWhite} />
                <FormattedDate
                  date={new Date(activity.event_date)}
                  separator=', '
                  showWeekday={false}
                  style={styles.metaText}
                />
              </View>
              <View style={styles.metaItem}>
                <PlaceIcon color={colors.solidWhite} />
                <Text style={styles.metaText}>{activity.location.name}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default ActivityCard
