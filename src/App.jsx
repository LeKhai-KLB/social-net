import React from "react";
import MainLayout from "./layout";
import { ConfigProvider } from "antd";
import { Outlet } from "react-router";
import AppRouter from "./AppRouter";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
      mutations: {},
    },
  });
  return (
    <ConfigProvider
      theme={{ token: { fontFamily: "Poppins, var(--default-font-family)" } }}
    >
      <QueryClientProvider client={queryClient}>
        <AppRouter>
          <MainLayout>
            <Outlet />
          </MainLayout>
        </AppRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          pauseOnHover
          theme="dark"
        />
      </QueryClientProvider>
    </ConfigProvider>
  );
}
