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
  title: "Chess Lessons Scheduler | Book Chess Lessons Online",
  description: "The ultimate platform for chess enthusiasts. Schedule lessons, connect with top instructors, and join a thriving chess community. Learn chess online today! An innovative platform to book lessons, connect with instructors, and engage in a vibrant community. Built with Next.js, React, TypeScript, and Clerk and Drizzle-Orm for a seamless learning experience",
  keywords: ["chess lessons", "online chess tutoring", "book chess lessons", "learn chess", "chess instructors", "lessons Scheduler project", "Nextjs", "Tailwind", "Clerk"],
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
