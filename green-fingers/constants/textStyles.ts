import colors from './colors';
import { TextStyle } from 'react-native';

const textStyles: { [key:string]: TextStyle } = {
    h1: {
        fontSize: 32,
        lineHeight: 40,
        color: colors.textPrimary,
        fontFamily: "Montserrat-Medium",
    },
    h2: {
        fontSize: 28,
        lineHeight: 36,
        color: colors.textPrimary,
        fontFamily: "Montserrat-Medium",
    },
    h3: {
        fontSize: 24,
        lineHeight: 32,
        color: colors.textPrimary,
        fontFamily: "Montserrat-Medium",
    },
    h4: {
        fontSize: 16,
        lineHeight: 20,
        color: colors.textPrimary,
        fontFamily: "Montserrat-Medium",
    },
    body: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.textPrimary,
        fontFamily: "Montserrat-Regular",
    },
    caption: {
        fontSize: 12,
        lineHeight: 16,
        color: colors.textPrimary,
        fontFamily: "Montserrat-Regular",
    },
    button: {
        fontSize: 14,
        lineHeight: 20,
        color: colors.textPrimary,
        fontFamily: "Montserrat-Medium",
    },
};

export default textStyles;