import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Pressable, Image, Animated } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';

const PaymentDisplay = () => {

	return (
		<StripeProvider
			publishableKey="pk_live_51P8o6YP66cGixuA1TNpR0SMrCpOviHz2KggvKnIk2TKviFPyOTzFZ1s5LvyKSOBn3bS9GGMKCVrtLJA4ZSCCC1Rt00qVZoUz0F"
			urlScheme=""
			merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
		>

		<View>

		</View>

		</StripeProvider>
	);
};

export default function Wallet() {

}
