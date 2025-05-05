import React from 'react'
import { Text, TextStyle } from 'react-native'

interface FormattedDateProps {
  date: Date
  showTime?: boolean
  showSeparator?: boolean
  style?: TextStyle
  dateStyle?: TextStyle
  timeStyle?: TextStyle
  separator?: string
  showWeekday?: boolean // Nuevo parámetro para decidir si se muestra el nombre del día
}

/**
 * Componente para mostrar fechas formateadas de manera consistente en toda la aplicación.
 *
 * @param date - Objeto Date a formatear
 * @param showTime - Si se debe mostrar la hora (por defecto: true)
 * @param showSeparator - Si se debe mostrar el separador entre fecha y hora (por defecto: true)
 * @param style - Estilos para aplicar al contenedor de texto completo
 * @param dateStyle - Estilos específicos para la parte de la fecha
 * @param timeStyle - Estilos específicos para la parte de la hora
 * @param separator - Texto a mostrar entre fecha y hora (por defecto: " a las ")
 * @param showWeekday - Si se debe mostrar el nombre del día (por defecto: true)
 */
export const FormattedDate: React.FC<FormattedDateProps> = ({
  date,
  showTime = true,
  showSeparator = true,
  style,
  dateStyle,
  timeStyle,
  separator = ' a las ',
  showWeekday = true,
}) => {
  const formattedDate = date.toLocaleDateString('es-MX', {
    weekday: showWeekday ? 'long' : undefined, // Condicional para mostrar el nombre del día
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedTime = date.toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (showTime) {
    return (
      <Text style={style}>
        <Text style={dateStyle}>{formattedDate}</Text>
        {showSeparator && <Text>{separator}</Text>}
        <Text style={timeStyle}>{formattedTime}</Text>
      </Text>
    )
  }

  return <Text style={[style, dateStyle]}>{formattedDate}</Text>
}
