import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import routes from './router';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
