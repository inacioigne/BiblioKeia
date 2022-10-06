import { Html, Head, Main, NextScript } from 'next/document'


export default function Document() {
    return (
        <Html>
        <Head>
        {/* <title>BiblioKeia</title> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" ></link>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alkalami&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:ital,wght@0,100;0,400;0,800;1,100&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
        <Main />
        <NextScript />

        </body>

        </Html>

    )
 

}