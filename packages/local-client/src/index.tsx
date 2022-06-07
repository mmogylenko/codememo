import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { store } from './state';
import CellList from './components/CellList';

const TITLE = 'CodeMemo'

function App() {
  return (
    <Provider store={store}>
      <Helmet>
          <title>{ TITLE }</title>
      </Helmet>
      <div>
        <CellList />
      </div>
    </Provider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
