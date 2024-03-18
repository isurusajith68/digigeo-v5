import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClientComponent from "./layout-client";
import HomeNavbar from "./components/nav-bar/navbar-component";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mini Atlas",
  description: "Digigeodata",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-hidden h-full`}>
        {/* <body className={inter.className}> */}
        <LayoutClientComponent>
          <HomeNavbar />
          {children}
        </LayoutClientComponent>
      </body>
    </html>
  );
}
