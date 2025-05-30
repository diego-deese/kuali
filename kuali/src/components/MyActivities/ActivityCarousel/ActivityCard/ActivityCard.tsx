import React from 'react'
import { ImageBackground, Text, View, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { styles } from './styles'
import { Activity } from '../../../../types/Activity'
import colors from '../../../../constants/colors'
import { CalendarClockIcon, PlaceIcon } from '../../../shared/Icons/Icons'
import { FormattedDate } from '../../../shared/FormattedDate/FormattedDate'
import activityService from '../../../../services/activity.service'
import { useAppActions } from '../../../../context/AppActionsContext'

interface ActivityCardProps {
  activity: Activity
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { navigation } = useAppActions()

  const handlePress = () => {
    navigation.navigate(`/event/${activity.activity_id}/info`)
  }

  return (
    <View style={styles.cardContainer}>
      <Pressable style={{ flex: 1 }} onPress={handlePress}>
        <View style={{ flex: 1 }}>
          <ImageBackground
            style={styles.backgroundImage}
            source={
              activity.activity_id
                ? {
                    uri: activityService.getActivityPosterUrl(
                      activity.activity_id,
                    ),
                  }
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
                    <Text style={styles.metaText}>
                      {activity.location.name}
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>
      </Pressable>
    </View>
  )
}

export default ActivityCard
