import { BaseToast, ErrorToast } from 'react-native-toast-message';
import colors from './colors';
import textStyles from './textStyles';

export const toastConfig = {
	success: (props: any) => {
		return (
			<BaseToast
				{...props}
				style={{
					borderLeftColor: colors.textSuccess,
					backgroundColor: colors.bgSuccess,
					borderRadius: 8,
					borderWidth: 1,
					borderColor: colors.textSuccess,
				}}
				text1Style={{
					...textStyles.h4,
					color: colors.textSuccess,
				}}
				text2Style={{
					...textStyles.body,
					color: colors.textSuccess,
				}}
			/>
		);
	},
	error: (props: any) => {
		return (
			<ErrorToast
				{...props}
				style={{
					borderLeftColor: colors.textError,
					backgroundColor: colors.bgError,
					borderRadius: 8,
					borderWidth: 1,
					borderColor: colors.textError,
				}}
				text1Style={{
					...textStyles.h4,
					color: colors.textError,
				}}
				text2Style={{
					...textStyles.body,
					color: colors.textError,
				}}
			/>
		);
	},
}
