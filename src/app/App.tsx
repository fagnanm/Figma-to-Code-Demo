import { UIShell } from "./components/jobber/UIShell";
import { AtlantisThemeContextProvider } from "@jobber/components/AtlantisThemeContext";
import { MainContent } from "./MainContent";

export default function App() {
  return (
    <AtlantisThemeContextProvider>
      <UIShell companyName={"Quest Provider"} activeItem="home">
        <MainContent />
      </UIShell>
    </AtlantisThemeContextProvider>
  );
}