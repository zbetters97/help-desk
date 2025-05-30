import AuthProvider from "src/features/auth/context/AuthProvider";
import TicketProvider from "src/features/ticket/context/TicketProvider";

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <TicketProvider>{children}</TicketProvider>
    </AuthProvider>
  );
};

export default AppProviders;
