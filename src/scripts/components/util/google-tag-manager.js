/* eslint-disable */

export default {
  /*
  * Initialize GTM tracking if tracking
  * code is present - will add to head in document
  * noscript will not be handled
  *
  * @func init
  * @static
  *
  * @param Category {id} GTM tracking code
  *
  * @return {void}
  */
  init(id) {
    if(id) {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer',id);
    }
  }
};
