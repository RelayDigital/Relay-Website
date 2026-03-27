// import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "../components/SmoothScrolling";
import Navbar from "../components/layouts/header/Navbar";
import Footer from "../components/layouts/footer/Footer";
import { GlobalStateProvider } from "../contexts/GlobalStateContext";
import Script from "next/script";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Relay Digital — Technology & Digital Infrastructure",
  description:
    "Relay Digital builds, operates, and invests in technology companies. Software platforms, automation systems, and digital services.",
  keywords:
    "technology company, digital infrastructure, software development, automation systems, SaaS, holding company",
  charset: "UTF-8",
  robots: "index, follow",
  image: "/img/social-media-share-preview.webp",
  url: "http://relaymedia.agency",
};

export const viewport = "width=device-width, initial-scale=1.0";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta charSet={metadata.charset} />
        <meta name="viewport" content={viewport} />
        <meta name="robots" content={metadata.robots} />

        {/* Favicon handled by src/app/icon.png (Next.js App Router convention) */}

        {/* <link
          rel="preload"
          href="/font/Proxima Nova Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/font/Proxima Nova Bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/font/RedHatText[wght].ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/font/RedHatText-Italic[wght].ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        /> */}

        <meta property="og:type" content="website" />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={metadata.url} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />

        <Script
          id="google-tag-ads"
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16609057729"
        ></Script>

        <Script
          id="google-ads"
          async
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `  window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-16609057729');`,
          }}
        ></Script>

        <Script id="calendly-event-snippet" async strategy="afterInteractive">
          {`gtag('event', 'conversion', {'send_to': 'AW-16609057729/AZ3KCLynjboZEMG36O89'});`}
        </Script>

        <Script
          id="calendly-inline-widget"
          async
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof(url) != 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
                'send_to': 'AW-16609057729/AZ3KCLynjboZEMG36O89',
                'event_callback': callback
            });
            return false;
          }`,
          }}
        ></Script>

        <Script
          id="google-tag"
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NQH0Z2981Z"
        ></Script>

        <Script
          id="google-analytics"
          async
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-NQH0Z2981Z');`,
          }}
        ></Script>

        <GoogleAnalytics gaId="G-NQH0Z2981Z" />

        <Script
          id="gtm"
          async
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PXXTT7FJ');`,
          }}
        ></Script>

        <GoogleTagManager gtmId="GTM-PXXTT7FJ" />

        <Script
          id="tiktok"
          async
          dangerouslySetInnerHTML={{
            __html: `!function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
            ttq.load('CPKVPTRC77U0TG5MH620');
            ttq.page();
            }(window, document, 'ttq');`,
          }}
        ></Script>

        <Script
          id="hotjar"
          async
          dangerouslySetInnerHTML={{
            __html: `(function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:5021016,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
          }}
        ></Script>
      </head>
      <body
      // className={inter.className}
      >
        {/* <Analytics /> */}
        <GlobalStateProvider>
          <SmoothScrolling>
            {/* <ContentLoader /> */}
            <Navbar />
            {children}
            <Footer />
          </SmoothScrolling>
        </GlobalStateProvider>
      </body>
    </html>
  );
};

export default RootLayout;
