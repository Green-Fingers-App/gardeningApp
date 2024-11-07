import React, { useState, ReactElement, isValidElement } from "react";
import { View, StyleSheet } from "react-native";
import { AccordionItemProps } from "./AccordionItem";

interface AccordionProps {
  children: ReactElement<AccordionItemProps>[];
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <View style={styles.accordion}>
      {React.Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return React.cloneElement(child as ReactElement<AccordionItemProps>, {
            isOpen: index === openIndex,
            onToggle: () => handleToggle(index),
          });
        }
        return child;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    width: "100%",
    gap: 0,
  },
});

export default Accordion;
