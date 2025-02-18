import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
