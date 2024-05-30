import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Linking, Alert } from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PaymentScreen = () => {
  const [loading, setLoading] = useState(false);

  const handlePayment = async (planType) => {
    try {
      setLoading(true);
      const planId = await createPlan(planType);
      await createSubscription(planId, 'email_do_cliente@example.com');
      setLoading(false);
    } catch (error) {
      console.error('Erro ao criar a preferência de pagamento:', error);
      Alert.alert('Erro', 'Houve um erro ao processar o pagamento. Tente novamente.');
      setLoading(false);
    }
  };

  const createPlan = async (planType) => {
    const planData = {
      back_url: "https://www.seusite.com",
      reason: planType === 'monthly' ? "Assinatura Mensal" : "Assinatura Anual",
      auto_recurring: {
        frequency: 1,
        frequency_type: planType === 'monthly' ? "months" : "years",
        transaction_amount: planType === 'monthly' ? 100 : 1000,
        currency_id: "BRL",
        repetitions: null,
        free_trial: {
          frequency: 1,
          frequency_type: "months"
        }
      }
    };

    const response = await axios.post('https://api.mercadopago.com/preapproval_plan', planData, {
      headers: {
        'Authorization': `Bearer TEST-409595205092697-053013-6b8d1c7e90b86d533d2de061a069b056-246362434`,
        'Content-Type': 'application/json'
      },
    });

    return response.data.id;
  };

  const createSubscription = async (planId, payerEmail) => {
    const subscriptionData = {
      preapproval_plan_id: planId,
      payer_email: payerEmail,
      back_url: "https://www.seusite.com",
      reason: "Assinatura",
      external_reference: "Referência Externa"
    };


    const response = await axios.post('https://api.mercadopago.com/preapproval', subscriptionData, {
      headers: {
        'Authorization': `Bearer TEST-409595205092697-053013-6b8d1c7e90b86d533d2de061a069b056-246362434`,
        'Content-Type': 'application/json'
      },
    });

	console.log(response)

    const initPoint = response.data.init_point;

    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(initPoint, {
        dismissButtonStyle: 'cancel',
        preferredBarTintColor: '#453AA4',
        preferredControlTintColor: 'white',
        readerMode: false,
        showTitle: false,
        toolbarColor: '#6200EE',
        secondaryToolbarColor: 'black',
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        animations: {
          startEnter: 'slide_in_right',
          startExit: 'slide_out_left',
          endEnter: 'slide_in_left',
          endExit: 'slide_out_right',
        },
      });
    } else {
      Linking.openURL(initPoint);
    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@payment_storage', value);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
	  	style={styles.button}
        disabled={loading}
		onPress={() => storeData('true')}
      ><Text style={styles.text}>Free</Text></TouchableOpacity>
      <TouchableOpacity
	  	style={styles.button}
        onPress={() => handlePayment('monthly')}
        disabled={loading}
      ><Text style={styles.text}>Assinar Plano Mensal 100,00 R$</Text></TouchableOpacity>
      <TouchableOpacity
	  	style={styles.button}
        onPress={() => handlePayment('annual')}
        disabled={loading}
      ><Text style={styles.text}>Assinar Plano Anual 1000,00 R$</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  button: {
	padding: 10,
	marginBottom: 10,
	borderRadius: 10,
	backgroundColor: "#007EB5",
	color: ""
  },
  text: {
    fontSize: 18,
	color: "#FFFFFF"
  },
});
