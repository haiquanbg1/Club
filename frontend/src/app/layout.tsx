import Header from "@/components/header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";


import { Roboto } from "next/font/google"


const roboto = Roboto({ subsets: ["vietnamese"], weight: ['100', '400', '700', '900'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={`${roboto.className}`}>
        <Toaster />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header isAuth={false} />
          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
