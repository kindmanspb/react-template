import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./decorators";
import { store } from "./store";

export const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Provider store={store}>
          <Routes />
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
};
