import React from "react";
import MapViewComponent from "../components/MapViewComponent";
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { windowHeight, windowWidth } from "../Constants";
import { useNavigation } from '@react-navigation/native'
import { Pressable, Image } from 'react-native';


const styles = StyleSheet.create({
	floatingButton: {
		height: windowWidth / 15,
		width: windowWidth / 8,
		borderRadius: windowWidth / 8,
		backgroundColor: 'pink',
		position: 'absolute',
		bottom: '15%',
		right: '36%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	tinyIcon: {
		width: windowWidth / 17,
		height: windowWidth / 17,
		margin: windowWidth / 70,
	},
});

const HomeScreen = () => {

  const { navigate } = useNavigation();

	return (
		<View style={{flex:1}}>
			<MapViewComponent />
			<TouchableOpacity 
				activeOpacity={0.7}
				style={styles.floatingButton} 
				onPress={() => navigate('ScanQR')}
				>
				<Text>Scan Pod</Text>
			</TouchableOpacity>
		</View>
	)
};

export default HomeScreen;
