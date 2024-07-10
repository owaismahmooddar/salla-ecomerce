import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <title>Salla Ecommerce Store</title>
      <link
        rel="icon"
        type="image/png"
        href=" https://cdn.salla.network/images/logo/logo-square.png"
      />
      <link
        rel="apple-touch-icon-precomposed"
        href="https://cdn.salla.network/images/logo/logo-square.png"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
