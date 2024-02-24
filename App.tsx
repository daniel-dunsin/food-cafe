import { Provider } from "react-redux";
import { Navigator } from "./src/navigation";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
