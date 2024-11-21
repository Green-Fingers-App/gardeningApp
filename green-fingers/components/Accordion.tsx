import React, { useState } from "react";
import { View } from "react-native";
import AccordionItem, { AccordionItemProps } from "@/components/AccordionItem";

interface AccordionProps extends React.ComponentProps<typeof View> {
  children: React.ReactElement<AccordionItemProps>[];
}

const Accordion: React.FC<AccordionProps> = ({ children, ...props }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(index);
  };

  return (
    <View {...props}>
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
