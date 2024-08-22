import "~/styles/globals.css";
import { ThemeProvider } from "~/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "~/components/ui/toaster";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { Providers } from "./providers";

export const metadata = {
  // Page Title
  title: "Chess Lessons Scheduler | Book Chess Lessons Online",

  // Meta Description
  description: "The ultimate platform for chess enthusiasts. Schedule lessons, connect with top instructors, and join a thriving chess community. Learn chess online today! An innovative platform to book lessons, connect with instructors, and engage in a vibrant community. Built with Next.js, React, TypeScript, and Clerk and Drizzle-Orm for a seamless learning experience",

  // Keywords for SEO
  keywords: ["chess lessons", "online chess tutoring", "book chess lessons", "learn chess", "chess instructors", "lessons Scheduler project", "Nextjs", "Tailwind", "Clerk"],

  // Favicons and Icons
  icons: [
    { rel: "shortcut icon", href: "/favicon.ico" },
  ],

  // Open Graph Tags for Social Media Sharing
  openGraph: {
    title: "Chess Lessons Scheduler | Book Chess Lessons Online",
    description: "An innovative platform to book lessons, connect with instructors, and engage in a vibrant community. Built with Next.js, React, TypeScript, and Clerk and Drizzle-Orm for a seamless learning experience",
    url: "https://chess-lessons-scheduler.vercel.app/",
    siteName: "Chess Lessons Scheduler",
    images: [
      {
        url: "https://www.chesslessonsscheduler.com/images/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Chess Lessons Scheduler OG Image",
      },
    ],
    type: "website",
  },

 
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorBackground: "#282B30",
          colorPrimary: "#7289da",
        },
      }}
    >
      <html lang="en" className={`${GeistSans.variable}`}>
        <body className="flex min-h-screen flex-col justify-between bg-gradient-to-b from-[#1e2124] to-[#282B30]">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <Providers>{children}</Providers>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
