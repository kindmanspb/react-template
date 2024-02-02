import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@app/App";

const isMockEnabled = window.location.search.includes("mock=enable");

async function enableMocking() {
  if (isMockEnabled) {
    // eslint-disable-next-line import/no-internal-modules
    const { worker } = await import("../mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
