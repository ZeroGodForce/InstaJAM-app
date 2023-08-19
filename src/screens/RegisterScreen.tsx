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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const RegisterScreen = ({ navigation }) => {
  const { postRegister } = useAuthApi();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Getting Started</Text>
          <Text style={styles.subtitle}>Create an account to continue</Text>
        </View>
        <KeyboardAwareScrollView>
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
            {({ handleChange, handleSubmit, values }) => {
              return (
                <View style={styles.form}>
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Full name</Text>
                    <TextInput
                      autoCorrect={false}
                      onChangeText={handleChange('name')}
                      placeholder="Jonathan Doe-Smith"
                      placeholderTextColor="#6b7280"
                      style={styles.inputControl}
                      value={values.name}
                    />
                  </View>
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Email address</Text>
                    <TextInput
                      autoCapitalize="none"
                      autoCorrect={false}
                      keyboardType="email-address"
                      onChangeText={handleChange('email')}
                      placeholder="hello@instjam.com"
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
                      value={values.password}
                    />
                  </View>
                  <View style={styles.formAction}>
                    <TouchableOpacity onPress={handleSubmit}>
                      <View style={styles.btn}>
                        <Text style={styles.btnText}>Sign up</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.formFooter}>
                      Already have an account?{' '}
                      <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  form: {
    paddingHorizontal: 24,
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#929292',
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
});