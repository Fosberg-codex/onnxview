import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { env } from 'onnxruntime-web';

// Set the base path for ONNX Runtime Web WASM files
env.wasm.wasmPaths = '/wasm/';

import { getServerSession } from "next-auth";
import SessionProvider from "./utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plutofloww",
  description: "Run your ML model on the web with with no-code",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <head>  
      <meta name="google-site-verification" content="vsx3jE1PM2M4ELIAiMBV8i-giO7-zrTek2b5E-zuVrY" />
      </head>
      
      <body className={inter.className}>
      <SessionProvider session={session}>
        {children}
        </SessionProvider>
        </body>
     
    </html>
  );
}
