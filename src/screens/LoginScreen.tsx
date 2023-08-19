import { DebugBar } from '@/components';
import { useAuthApi } from '@/hooks';
import { Formik } from 'formik';
import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';

export const LoginScreen = ({ navigation }) => {
  const { postLogin } = useAuthApi();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>InstaJam</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>
        </View>
        <Formik
          initialValues={{ email: 'hello@instajam.com', password: 'change-me' }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              await postLogin(values);
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
              <View style={styles.form}>
                <View style={styles.debugbar}>
                  <DebugBar data={values} />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Email address</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    onChangeText={handleChange('email')}
                    placeholder="john@example.com"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    value={values.email}
                  />
                </View>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <TextInput
                    autoCorrect={false}
                    onChangeText={handleChange('password')}
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    style={styles.inputControl}
                    secureTextEntry={true}
                    textContentType="password"
                    value={values.password}
                  />
                </View>
                <View style={styles.formAction}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>Sign in</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.formFooter}>
                    Don't have an account?{' '}
                    <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  debugbar: {
    paddingBottom: 20,
  },
});