import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DebugBar } from '@/components';
import { useAuthApi } from '@/hooks';
import { Button, TextInput } from 'react-native-paper';

export const LoginScreen = ({ navigation }) => {
  const { postLogin } = useAuthApi();

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: 'hello@instajam.com', password: 'change-me' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await postLogin(values);
            console.log('====================================');
            console.log('SUBMITTED LOGIN VALUES', JSON.stringify(values, null, 2));
            console.log('====================================');
          } catch (error) {
            alert('An error occurred during LOGIN. Please try again.');

            console.error('Error during LOGIN', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleSubmit, values }) => {
          return (
            <View style={styles.content}>
              <DebugBar data={values} />
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Email" />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry
                  textContentType="password"
                  placeholder="Password" />
              </View>
              <View>
                <Button mode="contained" onPress={handleSubmit}>
                  Submit
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>

      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text>...or press here to create an account</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    padding: 10,
    alignSelf: 'stretch',
    marginHorizontal: 10,
  },
  error: {
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    height: 50,
    marginVertical: 8,
    borderRadius: 5,
  },
  buttons: {
    marginTop: 16,
    flexDirection: 'row',
  },
  button: {
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  registerButton: {
  }
});
