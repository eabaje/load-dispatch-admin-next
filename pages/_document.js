import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
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
          <meta
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
            name="viewport"
          />
         
   
    
        {/*Favicon icon */}
        <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.6.4/css/bootstrap-datepicker.css"
          type="text/css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.datatables.net/1.11.3/css/jquery.dataTables.css"
        />

      {/* prism css */}
        <link rel="stylesheet" href="assets/css/plugins/prism-coy.css" />
        <link rel="stylesheet" href="assets/css/fontawesome/font-awesome.min.css" />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.0/css/font-awesome.min.css"
        />

        

      
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat&display=swap"
          rel="stylesheet"
        />
      {/* -- vendor css --> */}
        <link rel="stylesheet" href="assets/css/style.css" />
         
       
          
        </Head>
        <body>
       
          <Main />
          <NextScript />

          <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
          <script src="/public/assets/js/vendor-all.min.js"></script>
          <script src="/public/assets/js/plugins/bootstrap.min.js"></script>

          <script src="/public/assets/js/pcoded.js"></script>
          <script src="assets/js/ripple.js"></script>

        
          <script src="/public/assets/js/plugins/prism.js"></script>

          <script src="/public/assets/js/horizontal-menu.js"></script>
          <script src="/public/assets/js/page.js"></script>
    
        </body>
      
      </html>
      </>
    );
  }
}
