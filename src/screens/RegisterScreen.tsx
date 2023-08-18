import React from 'react'
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DebugBar } from '@/components';
import { useAuthApi } from '@/hooks';
import { Button, TextInput } from 'react-native-paper';

export const RegisterScreen = ({ navigation }) => {
  const { postRegister } = useAuthApi();

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await postRegister(values);
            console.log('====================================');
            console.log('SUBMITTED REGISTRATION VALUES', JSON.stringify(values, null, 2));
            console.log('====================================');
          } catch (error) {
            alert('An error occurred during registration. Please try again.');

            console.error('Error during registration', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <View style={styles.content}>
            <DebugBar data={values} />
            <View style={styles.inputContainer}>
              <TextInput
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder="Name"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                mode="outlined"
                value={values.email}
                onChangeText={handleChange('email')}
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={values.password}
                onChangeText={handleChange('password')}
                secureTextEntry
                textContentType="password"
                placeholder="Password"
              />
            </View>
            <View>
              <Button mode="contained" onPress={handleSubmit}>
                Submit
              </Button>
            </View>
          </View>
        )}
      </Formik>
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
