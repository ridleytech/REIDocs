/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {textText} from '../src/actions/index';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// it('renders correctly', () => {
//   renderer.create(<App />);
// });

test('text', () => {
  const val = textText();

  expect(val).toBe(3);
});
