import React, { useState } from "react";
import { View, Text, LayoutChangeEvent, StyleSheet } from "react-native";
import Svg, { Line, Polyline, Text as SvgText, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import { MoistureDataPoint, SoilMoisture } from "@/types/models";
import colors from "@/constants/colors";
import textStyles from "@/constants/textStyles";

interface MoistureChartProps {
  data: MoistureDataPoint[];
  expectedMoisture?: SoilMoisture;
}

const yLabels: SoilMoisture[] = [
  "Very Wet",
  "Wet",
  "Moist",
  "Dry",
  "Very Dry",
];

const MoistureChart: React.FC<MoistureChartProps> = ({
  data,
  expectedMoisture,
}) => {
  const [layout, setLayout] = useState({ width: 0, height: 0 });

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setLayout({ width, height });
  };

  const sanitizedData = data.filter(
    (entry) =>
      typeof entry.moisture_level === "number" &&
      isFinite(entry.moisture_level) &&
      !isNaN(entry.moisture_level)
  );

  // Padding
  const leftPadding = 48;
  const rightPadding = 16;
  const topPadding = 16;
  const bottomPadding = 24;

  const chartWidth = layout.width - leftPadding - rightPadding;
  const chartHeight = layout.height - topPadding - bottomPadding;

  const maxMoisture = 1023;
  const minMoisture = 0;

  const points = sanitizedData.map((entry, index) => {
    const x =
      (index / (sanitizedData.length - 1)) * chartWidth + leftPadding;
    const y =
      ((entry.moisture_level - minMoisture) /
        (maxMoisture - minMoisture)) *
      chartHeight +
      topPadding;
    return `${x},${y}`;
  });

  return (
    <View style={styles.wrapper} onLayout={onLayout}>
      {layout.width > 0 && layout.height > 0 && (
        <Svg width={layout.width} height={layout.height}>
          {expectedMoisture && (() => {
            const levelIndex = yLabels.indexOf(expectedMoisture);
            if (levelIndex === -1) return null;

            return (
              <>

                <Defs>
                  <LinearGradient id="moistureGradient" x1="0" y1="0" x2="0" y2="1">
                    {yLabels.map((level, i) => {
                      const offset = (i / (yLabels.length - 1)) * 100;

                      const expectedIndex = yLabels.indexOf(expectedMoisture ?? "");
                      const isExpectedZone = Math.abs(expectedIndex - i) <= 1;

                      return (
                        <Stop
                          key={level}
                          offset={`${offset}%`}
                          stopColor={
                            isExpectedZone ? colors.bgSuccess : colors.bgWarning
                          }
                        />
                      );
                    })}
                  </LinearGradient>
                </Defs>


                <Rect
                  x={leftPadding}
                  y={topPadding}
                  width={chartWidth}
                  height={chartHeight}
                  fill="url(#moistureGradient)"
                />
              </>
            );
          })()}

          {/* Gridlines + Y-axis labels */}
          {yLabels.map((label, i) => {
            const bandHeight = chartHeight / yLabels.length;
            const y = topPadding + bandHeight * i + bandHeight / 2;

            return (
              <React.Fragment key={label}>
                <Line
                  x1={leftPadding}
                  x2={layout.width - rightPadding}
                  y1={y}
                  y2={y}
                  stroke="#ccc"
                  strokeWidth="1"
                />
                <SvgText
                  x={leftPadding - 6}
                  y={y + 4}
                  fontSize="10"
                  fill={colors.textSecondary}
                  textAnchor="end"
                >
                  {label}
                </SvgText>
              </React.Fragment>
            );
          })}

          {/* Moisture line */}
          <Polyline
            points={points.join(" ")}
            fill="none"
            stroke={colors.primaryDefault}
            strokeWidth="2"
          />
        </Svg>
      )}
      <Text style={[textStyles.label, styles.title]}>
        Moisture level of the last 28 days
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 240,
    width: "100%",
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    marginVertical: 8,
    marginBottom: 0,
  },
  title: {
    textAlign: "center",
    margin: 0,
  },
});

export default MoistureChart;
