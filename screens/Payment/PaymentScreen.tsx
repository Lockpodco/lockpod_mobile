import { API_URL } from "../../services/ServiceUniversals";
import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements } from "@stripe/react-stripe-js";

import { Button, Alert, Text, StyleSheet, View } from "react-native";
import { Screen } from "react-native-screens";

import { PaymentIntent, useStripe } from "@stripe/stripe-react-native";

export const CheckoutScreen = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  // MARK: FetchPaymentSheetParams
  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payments/create-payment-intent`, {
      method: "POST",
      headers: {
        ContentType: "application/json",
      },
    });

    const { paymentIntent, publishableKey } = await response.json();

    return {
      paymentIntent,
      publishableKey,
    };
  };

  // MARK: initializePaymentSheet
  const initializePaymentSheet = async () => {
    const { paymentIntent, publishableKey } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Lock Pod Co.",
      paymentIntentClientSecret: paymentIntent,
      returnURL: "/",
      allowsDelayedPaymentMethods: false,
      defaultBillingDetails: {
        name: "Steve Jobs",
      },
    });

    if (!error) {
      setLoading(true);
    }
  };

  // MARK: OpenPaymentSheet
  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "your order is confirmed");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  // MARK: Styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      flexDirection: "column",
      paddingTop: 10,
      alignItems: "center",
    },

    button: {
      flex: 1,
      // backgroundColor: "red",
    },
  });

  // MARK: Body
  return (
    <Screen style={styles.container}>
      <Text style={styles.button}>hello!</Text>
      <View style={styles.button}>
        <Button
          disabled={!loading}
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </View>
    </Screen>
  );
};
