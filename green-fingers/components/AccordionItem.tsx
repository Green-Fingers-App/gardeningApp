import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";
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
      toValue: isOpen ? 227 : 0, // Open if isOpen is true, close otherwise
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, contentHeight]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle}>
        <View style={styles.header}>
          <Text style={[textStyles.h4, styles.title]}>{title}</Text>
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
  container: {
    backgroundColor: colors.bgLight,
  },
  header: {
    padding: 8,
    backgroundColor: colors.secondaryDefault,
    borderBottomWidth: 1,
    borderColor: colors.primaryDefault,
  },
  title: {
    color: colors.primaryDefault,
  },
  contentContainer: {
    overflow: "visible",
    position: "relative",
    zIndex: 1,
  },
  content: {
    padding: 8,
    backgroundColor: colors.bgLight,
    height: "100%",
    flexDirection: "column",
    gap: 8,
  },
});

export default AccordionItem;
