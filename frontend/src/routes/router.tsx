import ApplicateCompletePage from "@/features/applicate/pages/ApplicateCompletePage";
import ApplicatePage from "@/features/applicate/pages/ApplicatePage.tsx";
import WelcomePage from "@/features/welcome/pages/WelcomePage";
import { RouteObject } from "react-router-dom";
import ApplicationErrorPage from "@/features/applicate/pages/ApplicationErrorPage.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/applicate",
    element: <ApplicatePage />,
  },
  {
    path: "/complete",
    element: <ApplicateCompletePage />,
  },
  {
    path: "/error",
    element: <ApplicationErrorPage />,
  },
];
