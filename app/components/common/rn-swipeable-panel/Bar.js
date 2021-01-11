import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Bar = ({}) => {
	return (
		<View style={BarStyles.barContainer}>
			<View style={BarStyles.bar} />
		</View>
	);
};

const BarStyles = StyleSheet.create({
	barContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	bar: {
		width: '40%',
		height: 0,
		borderRadius: 0,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: '#e2e2e2'
	}
});
