import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';
import SocialJSApp from "./App";

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it('render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialJSApp/>, div);
  ReactDOM.unmountComponentAtNode(div);
});