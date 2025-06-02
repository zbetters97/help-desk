import { ErrorBoundary } from "react-error-boundary";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import * as Pages from "./pages";
import Layout from "./layout/Layout";
import AppProviders from "./pages/AppProviders";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "/auth",
          element: <Pages.AuthPage />,
          errorElement: <Pages.ErrorPage is404={false} />,
        },
        {
          path: "/dashboard",
          element: <Pages.HomePage />,
          errorElement: <Pages.ErrorPage is404={false} />,
        },
        {
          path: "/tickets",
          element: <Pages.TicketPage />,
          errorElement: <Pages.ErrorPage is404={false} />,
        },
        {
          path: "/tickets/:ticketId",
          element: <Pages.TicketPage />,
          errorElement: <Pages.ErrorPage is404={false} />,
        },
        {
          path: "*",
          element: <Pages.ErrorPage is404={true} />,
          errorElement: <Pages.ErrorPage is404={false} />,
        },
      ],
    },
  ]);

  return (
    <AppProviders>
      <RouterProvider router={router}>
        <ErrorBoundary
          FallbackComponent={(props) => <Pages.ErrorPage {...props} />}
        />
      </RouterProvider>
    </AppProviders>
  );
};

export default App;
