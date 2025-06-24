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

// Optimize font loading to prevent layout shift
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Optimize font loading
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Hoang Le - Portfolio",
  description: "Personal portfolio showcasing my projects and experience in Machine Learning, Data Science, and Web Development.",
  other: {
    'color-scheme': 'dark light',
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preload critical CSS and fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS to prevent layout shifts */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent layout shift by setting initial heights */
            .container { max-width: 1200px; margin: 0 auto; }
            .space-y-16 > * + * { margin-top: 4rem; }
            .min-h-screen { min-height: 100vh; }
            
            /* Optimize animations for better performance */
            * {
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Prevent cumulative layout shift */
            img, video {
              height: auto;
              max-width: 100%;
            }
            
            /* Optimize loading states */
            .animate-pulse {
              animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
            }
            
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: .5; }
            }
          `
        }} />
      </head>
      <body className={`${inter.className} font-sans`} style={{ minHeight: '100vh' }}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
          storageKey="hoang-theme"
        >
          {/* Navigation with fixed height to prevent layout shift */}
          <div style={{ minHeight: '64px' }}>
            <Navigation />
          </div>
          
          {/* Main content area with proper sizing */}
          <div style={{ minHeight: 'calc(100vh - 64px)' }}>
            {children}
          </div>
          
          {/* Toast notifications */}
          <Toaster position="top-right" />
          
          {/* Footer with proper spacing */}
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
          
          {/* Performance monitoring */}
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
