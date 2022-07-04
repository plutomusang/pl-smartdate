import React from 'react';
import ReactDOM from 'react-dom/client';
import { SmartDate } from './SmartDate';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SmartDate value='1/24/2022' />);