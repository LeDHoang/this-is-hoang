import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Footer } from "@/components/ui/footer";
import { Eye } from "@mynaui/icons-react";
import { Navigation } from "@/components/navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hoang Le - Portfolio",
  description: "Personal portfolio showcasing my projects and experience in Machine Learning, Data Science, and Web Development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          storageKey="hoang-theme"
        >
          <Navigation />
          {children}
          <Toaster position="top-right" />
          <Footer
            logo={<Eye className="h-10 w-10" />}
            brandName="Watcher Corp"
            socialLinks={[]}
            mainLinks={[
              { href: "/", label: "Home" },
              { href: "/about", label: "About" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ]}
            legalLinks={[
              { href: "/privacy", label: "Privacy" },
              { href: "/terms", label: "Terms" },
            ]}
            copyright={{
              text: `© ${new Date().getFullYear()} Watcher Corp`,
              license: "All rights reserved - We are always watching",
            }}
          />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
