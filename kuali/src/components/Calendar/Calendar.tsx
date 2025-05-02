/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, TouchableOpacity  } from "react-native";
import { Calendar } from "react-native-big-calendar";
import dayjs from "dayjs";
import calendarTheme from "./Calendar.styles";
import { router } from "expo-router";
import EventCalendarCard from "../EventCalendarCard/EventCalendarCard";

/*esto debería ser un fetch a los eventos */
const events = [
  {
    id: 1,
    title: "Conferencia",
    start: dayjs("2025-05-17").set("hour", 12).set("minute", 0).toDate(),
    end: dayjs("2025-05-17").set("hour", 12).set("minute", 30).toDate(), 
  },
  {
    id: 2,
    title: "B",
    start: dayjs("2023-02-11").set("hour", 1).set("minute", 0).toDate(),
    end: dayjs("2023-02-11").set("hour", 2).set("minute", 0).toDate()
  },
  {
    id: 3,
    title: "Conferencia",
    start: dayjs("2025-05-17").set("hour", 12).set("minute", 0).toDate(),
    end: dayjs("2025-05-17").set("hour", 12).set("minute", 30).toDate(), 
  },
];

function getLimitedEvents(events: any[], limitPerDay: number) {
  const grouped: { [key: string]: any[] } = {};

  events.forEach(event => {
    const dayKey = dayjs(event.start).format('YYYY-MM-DD');
    if (!grouped[dayKey]) grouped[dayKey] = [];
    if (grouped[dayKey].length < limitPerDay) {
      grouped[dayKey].push(event);
    }
  });

  return Object.values(grouped).flat();
}


export default function CalendarComponent() {
  const [monthName, setMonthName] = useState(dayjs().format('MMMM'))
  const [monthNumber, setMonthNumber] = useState(dayjs().format('MM'))

  const updateDisplayedMonth = (date: Date) => {
    const newDate = dayjs(date)
    setMonthName(newDate.format('MMMM'))
    setMonthNumber(newDate.format('MM'))
  }

  const handleEventPress = (event: any) => {
    console.log({event})
    router.push({
      pathname: `/event/${event.id}`,
      params: { title: event.title, date: event.start.toISOString() },
    });
    
  }

  return (
    <View>
      <View style={calendarTheme.styles.header}>
        <Text style={calendarTheme.styles.headerMonth}>{monthNumber}</Text>
        <Text style={calendarTheme.styles.headerText}>{monthName}</Text>
      </View>
      <Calendar
        events={getLimitedEvents(events, 2)}
        height={500}
        mode='month'
        theme={calendarTheme}
        onChangeDate={([start]) => updateDisplayedMonth(start)}
        onSwipeEnd={(date) => updateDisplayedMonth(date)}
        renderEvent={(event) => (
          <EventCalendarCard 
            id={event.id}
            title={event.title}
            date={dayjs(event.start).format('YYYY-MM-DD HH:mm')}
            onPress={() => handleEventPress(event)}
          />
        )}
      />
    </View>
  );
}

