import { StatusBar } from 'expo-status-bar';
import React, { useCallback } from 'react'
import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Formik } from 'formik';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DebugBar } from '@/components';
import { useApi } from '@/hooks';


export const RegisterScreen = ({ navigation }) => {
  const { postUpload } = useApi();
  // const [authState, setAuthState] = useState(AuthState.None);


  // If the user presses "login" from the auth screen, try to log them in
  // with the supplied credentials
  const handleLogin = useCallback(async () => {

    }, []);

  // If the user presses "register" from the auth screen, try to register a
  // new account with the  supplied credentials and login as the newly created user
  const handleRegister = useCallback(async () => {
    
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          try {
            await postUpload(values);
            console.log('====================================');
            console.log('SUBMITTED FORMIK VALUES', JSON.stringify(values, null, 2));
            console.log('====================================');
            navigation.goBack();
          } catch (error) {
            alert('An error occurred while uploading the photo. Please try again.');

            console.error('Error uploading file', error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.content}>

            <DebugBar data={values} />

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
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
        

            <View style={styles.buttons}>
              <Pressable onPress={handleLogin}  >
                <Text>Login</Text>
              </Pressable>

              <Pressable onPress={handleRegister}>
                <Text>Register</Text>
              </Pressable>
              <Button onPress={handleSubmit} title="Submit" />

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
    // backgroundColor: ovenLabTheme.colors.darkBlue[400],
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
    // color: ovenLabTheme.colors.white,
  },

  input: {
    borderWidth: 1,
    // borderColor: ovenLabTheme.colors.gray,
    padding: 10,
    height: 50,
    marginVertical: 8,
    // backgroundColor: ovenLabTheme.colors.white,
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
    // backgroundColor: ovenLabTheme.colors.singleton.deepPurple,
  }
});
