import { useRef } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
import { routes } from "./routes/router";

function App() {
  const renderRoutes = useRoutes(routes);
  const location = useLocation();
  const nodref = useRef(null);

  return (
    <>
      <SwitchTransition>
        <CSSTransition key={location.pathname} classNames="slide" timeout={300}>
          <div ref={nodref} className="h-full flex flex-col relative">
            {renderRoutes}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
}

export default App;
