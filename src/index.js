import React from 'react';
import ReactDOM from 'react-dom';
// import ReactDOM from 'react-dom';
import App from './App';
import { ProSidebarProvider } from 'react-pro-sidebar';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
ReactDOM.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
