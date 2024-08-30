 
import { PersistGate } from "redux-persist/lib/integration/react";
import "./App.css";
import { persistor, store } from "./app/store";
import AppRouter from "./routes/AppRouter";
import { Provider,  } from "react-redux";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </Provider>
      <ToastContainer />
    </div>
  );
}

export default App;
