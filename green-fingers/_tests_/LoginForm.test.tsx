jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => []),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

const mockLogin = jest.fn(); 

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

jest.mock('@expo/vector-icons', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    MaterialCommunityIcons: (props: any) => <View {...props} />,
  };
});

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LoginForm from '../app/(auth)/login.tsx';
import { AuthContext } from '../context/AuthContext';

describe('LoginForm', () => {
  const renderComponent = () => render(<LoginForm />);


  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText, getByTestId } = renderComponent();

    expect(getByText('WELCOME BACK')).toBeTruthy();
    expect(getByPlaceholderText('Enter your email')).toBeTruthy();
    expect(getByPlaceholderText('Enter your password')).toBeTruthy();
  });

  it('shows error if email is empty', async () => {
    const { getByText, getByTestId } = renderComponent();

    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('Please enter your email')).toBeTruthy();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('shows error if password is empty', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(getByText('Please enter your password')).toBeTruthy();
    });

    expect(mockLogin).not.toHaveBeenCalled();
  });

  it('calls login function with correct values', async () => {
    const { getByText, getByPlaceholderText, getByTestId } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'secret123');
  fireEvent.press(getByTestId('login-button'));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'secret123');
    });
  });
});

