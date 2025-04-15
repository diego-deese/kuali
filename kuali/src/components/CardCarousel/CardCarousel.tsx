import React from "react";
import { 
    View, 
    Text, 
    Image, 
    //StyleSheet
} from "react-native";
import styles from "./CardCarousel.styles";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
    image: any; 
    title: string;
    date: string;
    location: string;
  }
  
  export default function CardCarousel({ image, title, date, location }: Props) {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.row}>
          <FontAwesome name="calendar" size={14} color="#fff" />
          <Text style={styles.text}>{date}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="map-marker" size={14} color="#fff" />
          <Text style={styles.text}>{location}</Text>
        </View>
      </View>
    </View>
  );
}