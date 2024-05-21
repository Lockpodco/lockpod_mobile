import { API_URL } from "../../services/ServiceUniversals";
import React, { useState, useEffect } from "react";

import { Constants } from "../../components/constants";
import { Button, Alert, Text, StyleSheet, View, Pressable } from "react-native";

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
      position: "absolute",
      top: "50%",
      width: "98%",
      height: 75,
      justifyContent: "center",
      alignItems: "center",

      color: Constants.baseDark,
      backgroundColor: Constants.lightAccent,
      borderRadius: Constants.defaultCornerRadius,
    },

    buttonText: {
      fontWeight: "bold",
      fontSize: 18,
      textTransform: "uppercase",
    },
  });

  // MARK: Body
  return (
    <View>
      <Pressable
        style={styles.button}
        disabled={!loading}
        onPress={openPaymentSheet}
      >
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </View>
  );
};
