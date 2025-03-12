// card.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = ({ children, className, style, ...props }) => {
  return (
    <View style={[styles.card, style]} {...props}>
      {children}
    </View>
  );
};

const CardHeader = ({ children, className, style, ...props }) => {
  return (
    <View style={[styles.cardHeader, style]} {...props}>
      {children}
    </View>
  );
};

const CardTitle = ({ children, className, style, ...props }) => {
  return (
    <Text style={[styles.cardTitle, style]} {...props}>
      {children}
    </Text>
  );
};

const CardContent = ({ children, className, style, ...props }) => {
  return (
    <View style={[styles.cardContent, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    marginVertical: 8,
    marginHorizontal: 2,
  },
  cardHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export { Card, CardHeader, CardTitle, CardContent };
