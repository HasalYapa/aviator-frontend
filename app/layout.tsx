import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Real-time Multiplier Dashboard",
    description: "Scrape and visualize data in real-time",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
