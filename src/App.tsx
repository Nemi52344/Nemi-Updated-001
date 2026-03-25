import { BrowserRouter } from "react-router-dom";
import AppInner from "./AppInner";

/**
 * App — thin client shell. Wraps AppInner with BrowserRouter.
 * For SSR pre-rendering, entry-server.tsx wraps AppInner with StaticRouter instead.
 */
const App = () => (
  <BrowserRouter>
    <AppInner />
  </BrowserRouter>
);

export default App;
