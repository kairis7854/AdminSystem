import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import routes from './router';
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
      <Toaster />
    </Provider>
  );
}

export default App;
