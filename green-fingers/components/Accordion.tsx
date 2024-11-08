import React, { useState } from "react";
import { View } from "react-native";
import AccordionItem, { AccordionItemProps } from "@/components/AccordionItem";

interface AccordionProps {
  children: React.ReactElement<AccordionItemProps>[];
}

const Accordion: React.FC<AccordionProps> = ({ children }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  return (
    <View>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen: openIndex === index,
            onToggle: () => handleToggle(index),
          });
        }
        return child;
      })}
    </View>
  );
};

export default Accordion;
