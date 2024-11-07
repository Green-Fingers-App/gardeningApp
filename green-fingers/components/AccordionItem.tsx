import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";

export interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen = false,
  onToggle,
}) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const toggleAccordion = () => {
    if (onToggle) onToggle(); // Toggle state in parent

    Animated.timing(animation, {
      toValue: isOpen ? 0 : contentHeight, // Animate to 0 if closing, or to content height if opening
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    if (contentHeight === 0) {
      // Set height only once
      setContentHeight(event.nativeEvent.layout.height);
      animation.setValue(isOpen ? event.nativeEvent.layout.height : 0); // Sync initial animation value
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>

      {/* Animated height for the content */}
      <Animated.View style={[styles.contentContainer, { height: animation }]}>
        <View onLayout={handleLayout} style={styles.content}>
          {children ? (
            <Text>{children}</Text>
          ) : (
            <Text style={styles.placeholder}>No content available</Text>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 5, borderWidth: 1, borderColor: "lightgray" },
  header: { padding: 10, backgroundColor: "#f1f1f1" },
  title: { fontSize: 16 },
  contentContainer: { overflow: "hidden" },
  content: { padding: 10, backgroundColor: "lightyellow" },
  placeholder: { color: "gray" },
});

export default AccordionItem;
