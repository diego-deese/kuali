import React from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import styles from './myActivities.styles'
import ActivityCarousel from '../../components/MyActivities/ActivityCarousel/ActivityCarousel/ActivityCarousel'
import { useMyActivities } from '../../hooks/MyActivities/useMyActivities'
import ViewModeSelector from '../../components/MyActivities/ViewModeSelector/ViewModeSelector'
import TabSelector from '../../components/MyActivities/TabSelector/TabSelector'
import ActivitiesList from '../../components/MyActivities/ActivitiesList/ActivitiesList'
import colors from '../../constants/colors'

export default function MyActivities() {
  const {
    activities,
    viewMode,
    activeTab,
    showViewSelector,
    refreshing,
    handleRefresh,
  } = useMyActivities()

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.selectionBlue}
            colors={[colors.selectionBlue]}
          />
        }
      >
        <TabSelector
          activeTab={activeTab.activeTab}
          onTabChange={activeTab.handleTabChange}
        />

        {showViewSelector && (
          <ViewModeSelector
            viewMode={viewMode.viewMode}
            onViewModeChange={viewMode.handleViewModeChange}
          />
        )}

        <View style={styles.container}>
          {activeTab.activeTab === 'upcoming' &&
          viewMode.viewMode === 'card' ? (
            <ActivityCarousel
              activities={
                activities.activitiesToDisplay
                  ? activities.activitiesToDisplay
                  : []
              }
            />
          ) : (
            <ActivitiesList
              activities={
                activities.activitiesToDisplay
                  ? activities.activitiesToDisplay
                  : []
              }
            />
          )}
        </View>
      </ScrollView>
    </View>
  )
}
