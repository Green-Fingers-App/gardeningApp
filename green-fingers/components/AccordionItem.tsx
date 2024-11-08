import colors from "@/constants/colors";
import React, { useEffect, useRef, useState } from "react";
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

  const handleLayout = (event: LayoutChangeEvent) => {
    if (contentHeight === 0) {
      setContentHeight(event.nativeEvent.layout.height);
      animation.setValue(isOpen ? event.nativeEvent.layout.height : 0);
    }
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isOpen ? 300 : 0, // Open if isOpen is true, close otherwise
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, contentHeight]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.contentContainer, { height: animation }]}>
        <View onLayout={handleLayout} style={styles.content}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    padding: 10,
    backgroundColor: colors.primaryDefault,
    color: colors.textSecondary,
  },
  title: { fontSize: 16 },
  contentContainer: { overflow: "hidden" },
  content: { padding: 10, backgroundColor: colors.bgLight, height: "100%" },
});

export default AccordionItem;
