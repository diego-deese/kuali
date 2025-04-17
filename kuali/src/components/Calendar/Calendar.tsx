/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-big-calendar";
import dayjs from "dayjs";
import calendarTheme from "./Calendar.styles";

/*esto debería ser un fetch a los eventos */
const events = [
  {
    title: "A",
    start: dayjs("2025-04-17").set("hour", 12).set("minute", 0).toDate(),
    end: dayjs("2025-04-17").set("hour", 12).set("minute", 30).toDate()
  },
  {
    title: "B",
    start: dayjs("2023-02-11").set("hour", 1).set("minute", 0).toDate(),
    end: dayjs("2023-02-11").set("hour", 2).set("minute", 0).toDate()
  }
];

const Theme = {
    palette: {
      primary: {
        main: '#75BEA6',
        contrastText: '#ffffff',
      },
      gray: {
        '100': '#75BEA6',
        '200': '#767676',
        '300': '#888',
        '500': '#aaa',
        '800': '#ccc',
      },
    },
  }


export default function CalendarComponent() {
  const [monthName, setMonthName] = useState(dayjs().format('MMMM'))
  const [monthNumber, setMonthNumber] = useState(dayjs().format('MM'))

  const updateDisplayedMonth = (date: Date) => {
    const newDate = dayjs(date)
    setMonthName(newDate.format('MMMM'))
    setMonthNumber(newDate.format('MM'))
  }

  return (
    <View>
      <View style={calendarTheme.styles.header}>
        <Text style={calendarTheme.styles.headerMonth}>{monthNumber}</Text>
        <Text style={calendarTheme.styles.headerText}>{monthName}</Text>
      </View>
      <Calendar
        events={events}
        height={500}
        mode='month'
        theme={calendarTheme}
        onChangeDate={([start]) => updateDisplayedMonth(start)}
        onSwipeEnd={(date) => updateDisplayedMonth(date)}
      />
    </View>
  );
}

