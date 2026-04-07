import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";

import { GA_TRACKING_ID } from "@/utils/gtag";

interface DocumentProps extends DocumentInitialProps {
  isProduction: boolean;
}

export default class CustomDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentProps> {
    const initialProps = await Document.getInitialProps(ctx);

    // Check if in production
    const isProduction = process.env.NODE_ENV === "production";

    return {
      ...initialProps,
      isProduction,
    };
  }

  render() {
    const { isProduction } = this.props;

    return (
      <Html lang="en">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.VWO = window.VWO || [];
                // Set browser language to Spanish
                window.VWO.push(['setBrowserLanguage', 'es']);
              `,
            }}
          />
          {/* Start VWO Async V3.0 SmartCode */}
          <link rel="preconnect" href="https://dev.visualwebsiteoptimizer.com" />
          <script
            type="text/javascript"
            id="vwoCode"
            dangerouslySetInnerHTML={{
              __html: `
window._vwo_code || (function() {
    var account_id = 1216670,
        version = 3.0,
        settings_tolerance = 2000,
        hide_element = 'body',
        hide_element_style =
        'opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;transition:none !important';
    /* DO NOT EDIT BELOW THIS LINE */
    var t=window,n=document;if(-1<n.URL.indexOf('__vwo_disable__')||t._vwo_code)return;var i=!1,o=n.currentScript,e={sT:settings_tolerance,hES:hide_element_style,hE:hide_element};try{e=Object.assign(JSON.parse(localStorage.getItem('_vwo_'+account_id+'_config')),e)}catch(e){}var code={nonce:o.nonce,settings_tolerance:function(){return e.sT},hide_element:function(){return performance.getEntriesByName('first-contentful-paint')[0]?'':e.hE},hide_element_style:function(){return'{'+e.hES+'}'},getVersion:function(){return version},finish:function(){var e;!i&&(i=!0,e=n.getElementById('_vis_opt_path_hides'))&&e.parentNode.removeChild(e)},finished:function(){return i},addScript:function(e){var t=n.createElement('script');t.src=e,o.nonce&&t.setAttribute('nonce',o.nonce),t.fetchPriority='high',n.head.appendChild(t)},init:function(){t._vwo_settings_timer=setTimeout(function(){code.finish()},this.settings_tolerance());var e=n.createElement('style');e.id='_vis_opt_path_hides',o.nonce&&e.setAttribute('nonce',o.nonce),e.textContent=this.hide_element()+this.hide_element_style(),n.head.appendChild(e),this.addScript('https://dev.visualwebsiteoptimizer.com/tag/'+account_id+'.js')}};t._vwo_code=code;code.init();})();
              `.trim(),
            }}
          />
          {/* End VWO Async SmartCode */}
          {/* We only want to add the scripts if in production */}
          {isProduction && (
            <>
              {/* Global Site Tag (gtag.js) - Google Analytics */}
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${GA_TRACKING_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
