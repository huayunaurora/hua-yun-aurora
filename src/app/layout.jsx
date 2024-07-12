
import { Inter } from "next/font/google";
import "./globals.css";
import { getWebSetting } from "./api/useContentful";
import Header from "./components/Header";
import { Suspense } from "react";
import Loading from "./Loading";
import Footer from "./components/Footer";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import NotFound from "./not-found";
import Provider from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "HuaYunAurora",
  description: "Hua Yun Aurora Website",
};

export default async function RootLayout({ children }) {

  const webSettings = await getWebSetting()

  const settings = webSettings?.data?.items[0]?.fields

  return (

    <html lang="en">
      <body className={inter.className}>
      <Provider>
        {
          settings &&
          <div className='flex flex-col min-h-lvh w-dvw'>
            <Header header={settings.header} iconHeaderImageUrl={settings.iconHeaderImageUrl} />
            <div className='w-dvw flex h-full mb-auto '>
            {/* <div className="w-full">
            <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"> */}
              <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<NotFound />}>{children}</ErrorBoundary>
              </Suspense>
              {/* </div>
              </div> */}
            </div>
            <Footer />
            
          </div>
        }
           </Provider>
      </body>
    </html>

  );
}
