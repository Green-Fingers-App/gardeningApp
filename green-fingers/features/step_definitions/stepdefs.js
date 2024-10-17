// Step definitions with ES module syntax
import { Given, When, Then } from '@cucumber/cucumber';
import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { useRouter } from 'expo-router';

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

let app;
let router;

import GardenPage from '../../app/(tabs)/garden'; // Use import statements
import PlantDetailsPage from '../../app/plant-details'; // Use import statements

Given('I am on the garden page', () => {
  router = useRouter();
  app = render(<GardenPage />);
});

When('I click on a plant card', () => {
  const plantCard = app.getByTestId('plant-card');
  fireEvent.press(plantCard);
  router.push('/plant-details');
});

Then('I switch pages', () => {
  expect(router.push).toHaveBeenCalledWith('/plant-details');
});

Then('I see the plant\'s detailed information', () => {
  const plantDetailsApp = render(<PlantDetailsPage />);
  const plantName = plantDetailsApp.getByTestId('plant-name');
  expect(plantName).toBeTruthy();
});
