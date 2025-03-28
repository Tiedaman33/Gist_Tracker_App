import "@/styles/globals.css"; // ✅ Global styles should only be imported here
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Define a custom font
const inter = Inter({ subsets: ["latin"] });

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={`${inter.className} flex flex-col min-h-screen bg-gray-100`}>
        {/* Header */}
        <Header />

        {/* Main content */}
        <main className="flex-grow p-4">
          <Component {...pageProps} /> {/* ✅ This renders the current page */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </SessionProvider>
  );
}
