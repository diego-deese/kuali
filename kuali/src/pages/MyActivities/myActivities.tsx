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
import CardCarousel from "../../components/CardCarousel/CardCarousel";


export default function MyActivities() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel");
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const featuredEvents = [
    { title: "Evento de Robótica", date: "15 abril, 11:00 hrs", location: "Auditorio", image: require("../../../assets/cicataPlace.png") },
    { title: "Exposición de Proyectos", date: "22 abril, 13:00 hrs", location: "Sala de Proyectos", image: require("../../../assets/cicataPlace.png") },
  ];

  
  const currentEvent = featuredEvents[currentIndex];

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

      {/* Boton que cambia de lista a carrusel */}
      {activeTab === "upcoming" && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setViewMode(viewMode === "carousel" ? "list" : "carousel")}
        >
          <Text style={styles.toggleText}>
            {viewMode === "carousel" ? "Ver en lista" : "Ver en carrusel"}
          </Text>
        </TouchableOpacity>
      )}


      {activeTab == "upcoming" && viewMode == "carousel" && (
        <CardCarousel
        image={currentEvent.image}
        title={currentEvent.title}
        date={currentEvent.date}
        location={currentEvent.location}
        onNext={() => setCurrentIndex((prev) => prev + 1)}
        onPrev={() => setCurrentIndex((prev) => prev - 1)}
        isFirst={currentIndex === 0}
        isLast={currentIndex === featuredEvents.length - 1}
        />
      )}

      {/* Lista de eventos */}
      {(activeTab == "upcoming" && viewMode == "list") && (
        <ScrollView style={styles.eventList}>
          {upcomingEvents.map((e, i) => (
            <EventCard 
            key={i} 
            title={e.title} 
            date={e.date} />
          ))}
        </ScrollView>
      )}
      {(activeTab == "past") && (
        <ScrollView style={styles.eventList}>
          {pastEvents.map((e, i) => (
            <EventCard 
            key={i} 
            title={e.title} 
            date={e.date} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
