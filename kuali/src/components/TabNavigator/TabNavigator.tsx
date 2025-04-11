import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialIcons } from "@expo/vector-icons"
import ProfileId from "../../pages/ProfileId/profileId"
import MyEvents from "../../pages/Calendar/calendar"
import Calendar from "../../pages/Calendar/calendar"
import Header from "../Header/Header"
import colors from "../../constants/colors"

const Tab = createBottomTabNavigator()

// Componentes de pantalla
function BookmarkScreen() {
  return <MyEvents />
}

function CalendarScreen() {
  return <Calendar />
}

function UserScreen() {
  return <ProfileId />
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => <Header onTabPress={(tabName) => console.log(tabName)} />,
        tabBarActiveTintColor: colors.blueIcons,
        tabBarInactiveTintColor: "#8E8E93",
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 80,
          paddingBottom: 5,
          paddingTop: 5,
          backgroundColor: "#ffffff",
          borderTopWidth: 5,
          borderTopColor: colors.highlightCyan,
        },
      }}
    >
      <Tab.Screen
        name="Mis Eventos"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="bookmark" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calendar-today" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Usuario"
        component={UserScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
