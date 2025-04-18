import React, { useState } from 'react'
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import styles from './myActivities.styles'
import EventCard from '../../components/EventCard/EventCard'
import CardCarousel from '../../components/CardCarousel/CardCarousel'
import ToggleButton from '../../components/ToggleButton/ToggleButton'

export default function MyActivities() {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [currentIndex, setCurrentIndex] = useState(0)

  const upcomingEvents = [
    { title: 'Evento ', date: '10 abril 2025', id: 1 },
    { title: 'Evento ', date: '15 abril 2025', id: 2 },
    { title: 'Evento ', date: '15 mayo 2025', id: 3 },
    { title: 'Evento ', date: '15 junio 2025', id: 4 },
    { title: 'Evento ', date: '15 julio 2025', id: 5 },
    { title: 'Evento ', date: '15 agosto 2025', id: 6 },
    { title: 'Evento ', date: '15 diciembre 2025', id: 7 },
    { title: 'Evento ', date: '15 abril 2026', id: 8 },
  ]

  const pastEvents = [
    { title: 'Evento pasado ', date: '10 enero 2025', id: 9 },
    { title: 'Evento pasado ', date: '12 marzo 2025', id: 10 },
  ]

  const featuredEvents = [
    {
      title: 'Evento de Robótica',
      date: '15 abril, 11:00 hrs',
      location: 'Auditorio',
      image: require('../../../assets/cicataPlace.png'),
      id: 11,
    },
    {
      title: 'Exposición de Proyectos',
      date: '22 abril, 13:00 hrs',
      location: 'Sala de Proyectos',
      image: require('../../../assets/cicataPlace.png'),
      id: 12,
    },
  ]

  const currentEvent = featuredEvents[currentIndex]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('upcoming')}>
          <Text
            style={
              activeTab === 'upcoming' ? styles.activeTab : styles.inactiveTab
            }
          >
            Eventos próximos
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('past')}>
          <Text
            style={activeTab === 'past' ? styles.activeTab : styles.inactiveTab}
          >
            Historial
          </Text>
        </TouchableOpacity>
      </View>

      {/* Boton que cambia de lista a carrusel */}
      {activeTab === 'upcoming' && (
        <ToggleButton
          options={['Lista', 'Tarjeta']}
          selected={viewMode === 'list' ? 'Lista' : 'Tarjeta'}
          onChange={(selectedOption) =>
            setViewMode(selectedOption === 'Lista' ? 'list' : 'card')
          }
        />
      )}

      {activeTab == 'upcoming' && viewMode == 'card' && (
        <CardCarousel
          image={currentEvent.image}
          title={currentEvent.title}
          date={currentEvent.date}
          id={currentEvent.id}
          location={currentEvent.location}
          onNext={() => setCurrentIndex((prev) => prev + 1)}
          onPrev={() => setCurrentIndex((prev) => prev - 1)}
          isFirst={currentIndex === 0}
          isLast={currentIndex === featuredEvents.length - 1}
        />
      )}

      {/* Lista de eventos */}
      {activeTab == 'upcoming' && viewMode == 'list' && (
        <ScrollView style={styles.eventList}>
          {upcomingEvents.map((e, i) => (
            <EventCard key={i} title={e.title} date={e.date} id={e.id} />
          ))}
        </ScrollView>
      )}
      {activeTab == 'past' && (
        <ScrollView style={styles.eventList}>
          {pastEvents.map((e, i) => (
            <EventCard key={i} title={e.title} date={e.date} id={e.id} />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
