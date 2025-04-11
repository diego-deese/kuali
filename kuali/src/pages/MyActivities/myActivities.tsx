import React, { useState } from "react"
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import styles from "./myActivities.styles"
import EventCard from "../../components/EventCard/EventCard"

export default function MyActivities() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingEvents = [
    { title: "Evento ", date: "10 abril 2025" },
    { title: "Evento ", date: "15 abril 2025" },
    { title: "Evento ", date: "15 mayo 2025" },
    { title: "Evento ", date: "15 junio 2025" },
    { title: "Evento ", date: "15 julio 2025" },
    { title: "Evento ", date: "15 agosto 2025" },
    { title: "Evento ", date: "15 diciembre 2025" },
    { title: "Evento ", date: "15 abril 2026" },
  ]

  const pastEvents = [
    { title: "Evento pasado ", date: "10 enero 2025" },
    { title: "Evento pasado ", date: "12 marzo 2025" },
  ]

  const events = activeTab === "upcoming" ? upcomingEvents : pastEvents

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab("upcoming")}>
          <Text
            style={
              activeTab === "upcoming" ? styles.activeTab : styles.inactiveTab
            }
          >
            Eventos próximos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("past")}>
          <Text
            style={activeTab === "past" ? styles.activeTab : styles.inactiveTab}
          >
            Historial
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de eventos */}
      <ScrollView style={styles.eventList}>
        {events.map((e, i) => (
          <EventCard key={i} title={e.title} date={e.date} />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
