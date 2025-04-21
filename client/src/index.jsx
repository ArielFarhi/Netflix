import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { SearchProvider } from "./context/Search";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <>
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <App />
        <Toaster />
      </SearchProvider>
    </QueryClientProvider>
  </>
);
