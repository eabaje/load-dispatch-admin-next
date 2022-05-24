import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
}
  render() {
    return (
      <>
      <html>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <meta name="author" content="Phoenixcoded" />
       
         
   
    
        {/*Favicon icon */}
        <link rel="icon" href="/assets/images/favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css"
          type="text/css"
        />
      <link
      rel="stylesheet"
      type="text/css"
      href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css"
    />

      {/* prism css */}
      
      
         <link
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      rel="stylesheet"
    />
         <link
      rel="stylesheet"
      type="text/css"
      href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
      rel="stylesheet"
    />

      
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      {/* -- vendor css --> */}
      <link rel="stylesheet" href="/assets/css/plugins/prism-coy.css" />
        <link rel="stylesheet" href="/assets/css/fontawesome/font-awesome.min.css" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
         
       
          
        </Head>
        <body>
       
          <Main />
          <NextScript />

          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
          <script src="/assets/js/vendor-all.min.js"></script>
          <script src="/assets/js/plugins/bootstrap.min.js"></script>

          <script src="/assets/js/pcoded.js"></script>
          <script src="/assets/js/ripple.js"></script>

        
          <script src="/assets/js/plugins/prism.js"></script>

        
          <script src="/assets/js/page.js"></script>
    
        </body>
      
      </html>
      </>
    );
  }
}
