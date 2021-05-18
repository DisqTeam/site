import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="theme-dark" lang="en">
        <Head>
          <meta name="theme-color" content="#6812ca" key="colortheme" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Inter:300,400,500,700,900&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=2"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=2"/>
          <link rel="manifest" href="/site.webmanifest?v=2"/>
          <link rel="mask-icon" href="/safari-pinned-tab.svg?v=2" color="#6812ca"/>
          <link rel="shortcut icon" href="/favicon.ico?v=2"/>
          <meta name="apple-mobile-web-app-title" content="Disq"/>
          <meta name="application-name" content="Disq"/>
          <meta name="msapplication-TileColor" content="#7f0086"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
