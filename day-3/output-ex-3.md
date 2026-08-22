magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-3$ node fetch-title.js https://www.flipkart.com/
(node:55406) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/magudesh/prerendering_learning/prerender-training/day-3/fetch-title.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /home/magudesh/prerendering_learning/prerender-training/day-3/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
Response {
  status: 403,
  statusText: 'Forbidden',
  headers: Headers {
    'access-control-allow-credentials': 'true',
    'access-control-allow-origin': 'https://www.flipkart.com',
    'x-captcha-validate': 'true',
    'access-control-allow-headers': 'x-captcha-validate',
    'access-control-expose-headers': 'x-captcha-validate',
    'content-length': '787',
    'content-type': 'text/html'
  },
  body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
  bodyUsed: true,
  ok: false,
  redirected: false,
  type: 'basic',
  url: 'https://www.flipkart.com/'
} 403 Headers {
  'access-control-allow-credentials': 'true',
  'access-control-allow-origin': 'https://www.flipkart.com',
  'x-captcha-validate': 'true',
  'access-control-allow-headers': 'x-captcha-validate',
  'access-control-expose-headers': 'x-captcha-validate',
  'content-length': '787',
  'content-type': 'text/html'
} 155 [
  '<title>Flipkart reCAPTCHA</title>',
  index: 113,
  input: '<!DOCTYPE html><html lang=en><meta charset=UTF-8><meta content="width=device-width,initial-scale=1"name=viewport><title>Flipkart reCAPTCHA</title><link href=https://static-assets-web.flixcart.com/batman-returns/batman-returns/s/recaptcha.css rel=stylesheet><script src="https://www.google.com/recaptcha/enterprise.js?render=6Lc49B0pAAAAAIVgOhfwW8i7t7SRO0KSnlSVZRAq"></script><script src=https://static-assets-web.flixcart.com/apex-static/js/recaptcha-enterprise-v1.js async defer></script><div class=container><img alt="Flipkart Logo"class=logo src="https://rukminim1.flixcart.com/www/60/60/promos/14/06/2024/88011666-ce1d-40f0-a8eb-1bac7d164885.png?q=60"><h1 class=header>Are you a human?</h1><p class=subText>Confirming...<div class=loaderContainer><div class=loader></div></div></div>',
  groups: undefined
]
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-3$ node fetch-title.js https://www.youtube.com/
(node:55504) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/magudesh/prerendering_learning/prerender-training/day-3/fetch-title.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /home/magudesh/prerendering_learning/prerender-training/day-3/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-type': 'text/html; charset=utf-8',
    'x-content-type-options': 'nosniff',
    'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
    pragma: 'no-cache',
    expires: 'Mon, 01 Jan 1990 00:00:00 GMT',
    date: 'Sat, 22 Aug 2026 08:20:36 GMT',
    p3p: 'CP="This is not a P3P policy! See http://support.google.com/accounts/answer/151657?hl=en-GB for more info."',
    'x-frame-options': 'SAMEORIGIN',
    'strict-transport-security': 'max-age=31536000',
    'cross-origin-opener-policy': 'same-origin-allow-popups; report-to="youtube_main"',
    'permissions-policy': 'ch-ua-arch=*, ch-ua-bitness=*, ch-ua-full-version=*, ch-ua-full-version-list=*, ch-ua-model=*, ch-ua-wow64=*, ch-ua-form-factors=*, ch-ua-platform=*, ch-ua-platform-version=*',
    'content-security-policy': "base-uri 'self';object-src 'none';script-src 'report-sample' 'nonce-emKt8BlvYXPskSp4KidONg' 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval';report-uri https://csp.withgoogle.com/csp/youtube_main/strict, require-trusted-types-for 'script'",
    'accept-ch': 'Sec-CH-Viewport-Width, Sec-CH-DPR, Device-Memory',
    vary: 'Sec-CH-Viewport-Width, Sec-CH-DPR, Device-Memory',
    'origin-trial': 'AmhMBR6zCLzDDxpW+HfpP67BqwIknWnyMOXOQGfzYswFmJe+fgaI6XZgAzcxOrzNtP7hEDsOo1jdjFnVr2IdxQ4AAAB4eyJvcmlnaW4iOiJodHRwczovL3lvdXR1YmUuY29tOjQ0MyIsImZlYXR1cmUiOiJXZWJWaWV3WFJlcXVlc3RlZFdpdGhEZXByZWNhdGlvbiIsImV4cGlyeSI6MTc1ODA2NzE5OSwiaXNTdWJkb21haW4iOnRydWV9, AiDEBptUfVeO93q48VdVMe/ubupazdAl8AaHP+NBzdnW8quUcHdzJUyGSfrmtpKJu7EOvwRp9ug2rEo3XU+WMAMAAAB2eyJvcmlnaW4iOiJodHRwczovL3lvdXR1YmUuY29tOjQ0MyIsImZlYXR1cmUiOiJEZXZpY2VCb3VuZFNlc3Npb25DcmVkZW50aWFsczIiLCJleHBpcnkiOjE3NzQzMTA0MDAsImlzU3ViZG9tYWluIjp0cnVlfQ==',
    'report-to': '{"group":"youtube_main","max_age":2592000,"endpoints":[{"url":"https://csp.withgoogle.com/csp/report-to/youtube_main"}]}',
    'reporting-endpoints': 'crash-reporting="/web-reports?context=eJwNzXtM1lUcx3Ee3hu3B3meH8_l9zvn6NaMAmsokDJJusycqQxitbLCxS10GBelB6IicpUJm5Ii1IjAVpOYTRhBMSSDpQUryFQ2HRdThqZB0PACXqjOH6-d8z3n8zknpDcwYkOBbUtkkW3vep_tVpPPNnVfiS1taYkt749SW6PzRf_SmRDSHrZzdpOdqRQ7331lp_sbO2N_2llZHMrxukVkji-iuSuM1L4wDmjTC2HEP-agJMeBvcTBp5UOYj9xYP7ioGLcwfEIJ48mOzlT7yS41cnonJOqVQafPW8wlm6QvM2grMzgA21tlUHPEQPVYvBSl8Hiawbj8wb_bQonOS2cxDN6VS6iV7mYf8ZFSKGLy7tcfN_uYv15FzWzLu7ddbEz1E2q6SbL56a8zs1Qo5uWz91M9bkpGHCTP-xm4l83DX4e1nk93G95uLndQ0qpB1uth8FBD8cMLxEuL3dXeMmM9RKU4mV_tpeBPC_N73mpu-blhr9JySKT3mUmLRtNjr5scrvUZLrS5MI-k90_mAT16P2PJvmjJiNjJmdmTRaum1TPmeybN7HdMXkqxCLVshCJFgMZFgcqLcarLDIaLcLbLSZPWlT2W_z0m0XVOYsldy0u-wt6AwRR4YLdWneCoG6NoDVRMLxWcOM5QUemoE9ju-D9nYKaIkGTVl0uGNFuvavnesHkYUF8s-C1rwVBHYITWkW34IkTAs_PgojfBafPCz4eFhzSRi4Igi8Ktl0S5GrNVwT5U4JTM7ozK9izoDNLJDwg6XxIMqCtWyHZoCVpcXGSmETJqRRJxQsS22ZJ9SuSGm0oU3I8X7KnUHKnSFK2V981SFIOSdYckez4VpLZKQk-LTl4TlKrdY5KqqZ0_m9J8ozkyk39321JW6Bia5Di2TDFYqfiaUORpG00Ff9EKK5rV6MU7csUedGKLSu1eH22WnEvQfHR4wr3k4ovkxQhmxUnsxRf-BSXShWucoVX8-xSzH2oqNmriN-veLtaEXhQUVSv6NIiGxS1RxWTrTrfphjUersVEz2K1H799q-Kty4q3tE8E4qMq4qzfyk6pnR3Wvce9AsYjfQLeD3KLyA8NGio8_BQgLP_WFuT_9LoNwuLfcVZOcvfyMmK3lpUWOCLzil4NTq7KNeXm52Zlx4XExcfszo2YXnMI-k7Yv4HcCctFg"',
    'document-policy': 'include-js-call-stacks-in-crash-reports',
    'content-encoding': 'gzip',
    server: 'ESF',
    'x-xss-protection': '0',
    'set-cookie': '__Secure-YNID=21.YT=jbb_rijw9g5p20aR0PVMlUQye9c7SomxXwoF90u24h5VikMRqkAqUaO4OcGvUExeDS9kNKMd1jbmbBBxK3COBJEDU54mE0tZSVB2s_9LveXX3pEW7FNiS0fW0syNypVzpPcCEHqLQ1EWav9fV4n9H_yi6bYfWJYhFh_1PM27goIxKo5ASKPXEUFkgW0i3pI33gm9CxlzuAqi8K2RkEEUZn-94JIlkDA_pIzz37_-MWUaHmrBYqace0FXC5MRoACFmaNM2PxGLXTTyRjmr2o8xGEUWU5wKRybW8VuoSczEYlQbvgxR7SQ3ptdJfuDD7gvzA5xStLdx2utCHSwl0WoKQ; expires=Thu, 18-Feb-2027 08:20:36 GMT; path=/; domain=.youtube.com; Secure; HttpOnly; SameSite=none, GPS=1; Domain=.youtube.com; Expires=Sat, 22-Aug-2026 08:50:36 GMT; Path=/; Secure; HttpOnly, YSC=R3sTqjr_uwk; Domain=.youtube.com; Path=/; Secure; HttpOnly; SameSite=none, __Secure-ROLLOUT_TOKEN=CNia1s2ukdbThgEQ_Kfh6-azlgMY_Kfh6-azlgM%3D; Domain=youtube.com; Expires=Thu, 18-Feb-2027 08:20:36 GMT; Path=/; Secure; HttpOnly; SameSite=none; Partitioned, __Secure-YEC=; Domain=.youtube.com; Expires=Sun, 26-Nov-2023 08:20:36 GMT; Path=/; Secure; HttpOnly; SameSite=lax, VISITOR_INFO1_LIVE=VCPoSMeKBFk; Domain=.youtube.com; Expires=Thu, 18-Feb-2027 08:20:36 GMT; Path=/; Secure; HttpOnly; SameSite=none, VISITOR_PRIVACY_METADATA=CgJJThIEGgAgaQ%3D%3D; Domain=.youtube.com; Expires=Thu, 18-Feb-2027 08:20:36 GMT; Path=/; Secure; HttpOnly; SameSite=none',
    'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
    'transfer-encoding': 'chunked'
  },
  body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
  bodyUsed: true,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://www.youtube.com/'
} 200 Headers {
  'content-type': 'text/html; charset=utf-8',
  'x-content-type-options': 'nosniff',
  'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
  pragma: 'no-cache',
  expires: 'Mon, 01 Jan 1990 00:00:00 GMT',
  date: 'Sat, 22 Aug 2026 08:20:36 GMT',
  p3p: 'CP="This is not a P3P policy! See http://support.google.com/accounts/answer/151657?hl=en-GB for more info."',
  'x-frame-options': 'SAMEORIGIN',
  'strict-transport-security': 'max-age=31536000',
  'cross-origin-opener-policy': 'same-origin-allow-popups; report-to="youtube_main"',
  'permissions-policy': 'ch-ua-arch=*, ch-ua-bitness=*, ch-ua-full-version=*, ch-ua-full-version-list=*, ch-ua-model=*, ch-ua-wow64=*, ch-ua-form-factors=*, ch-ua-platform=*, ch-ua-platform-version=*',
  'content-security-policy': "base-uri 'self';object-src 'none';script-src 'report-sample' 'nonce-emKt8BlvYXPskSp4KidONg' 'unsafe-inline' 'strict-dynamic' https: http: 'unsafe-eval';report-uri https://csp.withgoogle.com/csp/youtube_main/strict, require-trusted-types-for 'script'",
  'accept-ch': 'Sec-CH-Viewport-Width, Sec-CH-DPR, Device-Memory',
  vary: 'Sec-CH-Viewport-Width, Sec-CH-DPR, Device-Memory',
  'origin-trial': 'AmhMBR6zCLzDDxpW+HfpP67BqwIknWnyMOXOQGfzYswFmJe+fgaI6XZgAzcxOrzNtP7hEDsOo1jdjFnVr2IdxQ4AAAB4eyJvcmlnaW4iOiJodHRwczovL3lvdXR1YmUuY29tOjQ0MyIsImZlYXR1cmUiOiJXZWJWaWV3WFJlcXVlc3RlZFdpdGhEZXByZWNhdGlvbiIsImV4cGlyeSI6MTc1ODA2NzE5OSwiaXNTdWJkb21haW4iOnRydWV9, AiDEBptUfVeO93q48VdVMe/ubupazdAl8AaHP+NBzdnW8quUcHdzJUyGSfrmtpKJu7EOvwRp9ug2rEo3XU+WMAMAAAB2eyJvcmlnaW4iOiJodHRwczovL3lvdXR1YmUuY29tOjQ0MyIsImZlYXR1cmUiOiJEZXZpY2VCb3VuZFNlc3Npb25DcmVkZW50aWFsczIiLCJleHBpcnkiOjE3NzQzMTA0MDAsImlzU3ViZG9tYWluIjp0cnVlfQ==',
  'report-to': '{"group":"youtube_main","max_age":2592000,"endpoints":[{"url":"https://csp.withgoogle.com/csp/report-to/youtube_main"}]}',
  'reporting-endpoints': 'crash-reporting="/web-reports?context=eJwNzXtM1lUcx3Ee3hu3B3meH8_l9zvn6NaMAmsokDJJusycqQxitbLCxS10GBelB6IicpUJm5Ii1IjAVpOYTRhBMSSDpQUryFQ2HRdThqZB0PACXqjOH6-d8z3n8zknpDcwYkOBbUtkkW3vep_tVpPPNnVfiS1taYkt749SW6PzRf_SmRDSHrZzdpOdqRQ7331lp_sbO2N_2llZHMrxukVkji-iuSuM1L4wDmjTC2HEP-agJMeBvcTBp5UOYj9xYP7ioGLcwfEIJ48mOzlT7yS41cnonJOqVQafPW8wlm6QvM2grMzgA21tlUHPEQPVYvBSl8Hiawbj8wb_bQonOS2cxDN6VS6iV7mYf8ZFSKGLy7tcfN_uYv15FzWzLu7ddbEz1E2q6SbL56a8zs1Qo5uWz91M9bkpGHCTP-xm4l83DX4e1nk93G95uLndQ0qpB1uth8FBD8cMLxEuL3dXeMmM9RKU4mV_tpeBPC_N73mpu-blhr9JySKT3mUmLRtNjr5scrvUZLrS5MI-k90_mAT16P2PJvmjJiNjJmdmTRaum1TPmeybN7HdMXkqxCLVshCJFgMZFgcqLcarLDIaLcLbLSZPWlT2W_z0m0XVOYsldy0u-wt6AwRR4YLdWneCoG6NoDVRMLxWcOM5QUemoE9ju-D9nYKaIkGTVl0uGNFuvavnesHkYUF8s-C1rwVBHYITWkW34IkTAs_PgojfBafPCz4eFhzSRi4Igi8Ktl0S5GrNVwT5U4JTM7ozK9izoDNLJDwg6XxIMqCtWyHZoCVpcXGSmETJqRRJxQsS22ZJ9SuSGm0oU3I8X7KnUHKnSFK2V981SFIOSdYckez4VpLZKQk-LTl4TlKrdY5KqqZ0_m9J8ozkyk39321JW6Bia5Di2TDFYqfiaUORpG00Ff9EKK5rV6MU7csUedGKLSu1eH22WnEvQfHR4wr3k4ovkxQhmxUnsxRf-BSXShWucoVX8-xSzH2oqNmriN-veLtaEXhQUVSv6NIiGxS1RxWTrTrfphjUersVEz2K1H799q-Kty4q3tE8E4qMq4qzfyk6pnR3Wvce9AsYjfQLeD3KLyA8NGio8_BQgLP_WFuT_9LoNwuLfcVZOcvfyMmK3lpUWOCLzil4NTq7KNeXm52Zlx4XExcfszo2YXnMI-k7Yv4HcCctFg"',
  'document-policy': 'include-js-call-stacks-in-crash-reports',
  'content-encoding': 'gzip',
  server: 'ESF',
  'x-xss-protection': '0',
  'set-cookie': '__Secure-YNID=21.YT=jbb_rijw9g5p20aR0PVMlUQye9c7SomxXwoF90u24h5VikMRqkAqUaO4OcGvUExeDS9kNKMd1jbmbBBxK3COBJEDU54mE0tZSVB2s_9LveXX3pEW7FNiS0fW0syNypVzpPcCEHqLQ1EWav9fV4n9H_yi6bYfWJYhFh_1PM27goIxKo5ASKPXEUFkgW0i3pI33gm9CxlzuAqi8K2RkEEUZn-94JIlkDA_pIzz37_-MWUaHmrBYqace0FXC5MRoACFmaNM2PxGLXTTyRjmr2o8xGEUWU5wKRybW8VuoSczEYlQbvgxR7SQ3ptdJfuDD7gvzA5xStLdx2utCHSwl0WoKQ; expires=Thu, 18-Feb-2027 08:20:36 GMT; path=/; domain=.youtube.com; Secure; HttpOnly; SameSite=none, GPS=1; Domain=.youtube.com; Expires=Sat, 22-Aug-2026 08:50:36 GMT; Path=/; Secure; HttpOnly, YSC=R3sTqjr_uwk; Domain=.youtube.com; Path=/; Secure; HttpOnly; SameSite=none, __Secure-ROLLOUT_TOKEN=CNia1s2ukdbThgEQ_Kfh6-azlgMY_Kfh6-azlgM%3D; Domain=youtube.com; Expires=Thu, 18-Feb-2027 08:20:36 GMT; Path=/; Secure; HttpOnly; SameSite=none; Partitioned, __Secure-YEC=; Domain=.youtube.com; Expires=Sun, 26-Nov-2023 08:20:36 GMT; Path=/; Secure; HttpOnly; SameSite=lax, VISITOR_INFO1_LIVE=VCPoSMeKBFk; Domain=.youtube.com; Expires=Thu, 18-Feb-2027 08:20:36 GMT; Path=/; Secure; HttpOnly; SameSite=none, VISITOR_PRIVACY_METADATA=CgJJThIEGgAgaQ%3D%3D; Domain=.youtube.com; Expires=Thu, 18-Feb-2027 08:20:36 GMT; Path=/; Secure; HttpOnly; SameSite=none',
  'alt-svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
  'transfer-encoding': 'chunked'
} 286 [
  '<title>YouTube</title>',
  index: 6336,
  input: '<!DOCTYPE html><html style="font-size: 62.5%;font-family: Roboto, Arial, sans-serif;" lang="en-GB" darker-dark-theme darker-dark-theme-deprecate system-icons color-version="v2_0" typography typography-spacing><head><script data-id="_gd" nonce="emKt8BlvYXPskSp4KidONg">window.WIZ_global_data = {"AfY8Hf":true,"FL1an":false,"HiPsbb":0,"MUE6Ne":"youtube_web","MuJWjd":false,"TSDtV":"%.@.]","UUFaWc":"%.@.null,1000,2]","cfb2h":"youtube.web-front-end-critical_20260819.03_p0","fPDxwd":[],"hsFLT":"%.@.null,10,3]","iCzhFc":false,"nQyAE":{},"oxN3nb":{"1":false,"0":false,"610401301":false,"899588437":false,"772657768":true,"513659523":false,"568333945":true,"1331761403":true,"651175828":false,"722764542":false,"748402145":false,"748402146":false,"748402147":true,"1602613185":true,"861377723":false,"861377724":false,"869336903":false,"882674507":false,"869336904":false,"869336905":false,"283953155":false,"919444824":true,"928875398":true,"683749201":false},"u4g7r":"%.@.null,1,3]","xnI9P":true,"xwAfE":true,"yFnxrf":2486};</script><meta http-equiv="X-UA-Compatible" content="IE=edge"/><meta http-equiv="origin-trial" content="ApvK67ociHgr2egd6c2ZjrfPuRs8BHcvSggogIOPQNH7GJ3cVlyJ1NOq/COCdj0+zxskqHt9HgLLETc8qqD+vwsAAABteyJvcmlnaW4iOiJodHRwczovL3lvdXR1YmUuY29tOjQ0MyIsImZlYXR1cmUiOiJQcml2YWN5U2FuZGJveEFkc0FQSXMiLCJleHBpcnkiOjE2OTUxNjc5OTksImlzU3ViZG9tYWluIjp0cnVlfQ=="/><meta name="apple-itunes-app" content="app-id=544007664, app-argument=https://www.youtube.com/?referring_app=com.apple.mobilesafari-smartbanner, affiliate-data=ct=smart_app_banner_polymer&amp;pt=9008"><script nonce="emKt8BlvYXPskSp4KidONg">var ytcfg={d:function(){return window.yt&&yt.config_||ytcfg.data_||(ytcfg.data_={})},get:function(k,o){return k in ytcfg.d()?ytcfg.d()[k]:o},set:function(){var a=arguments;if(a.length>1)ytcfg.d()[a[0]]=a[1];else{var k;for(k in a[0])ytcfg.d()[k]=a[0][k]}}};\n' +
    `window.ytcfg.set('EMERGENCY_BASE_URL', '\\/error_204?t\\x3djserror\\x26level\\x3dERROR\\x26client.name\\x3d1\\x26client.version\\x3d2.20260820.08.00');</script><script nonce="emKt8BlvYXPskSp4KidONg">(function(){window.yterr=window.yterr||true;window.unhandledErrorMessages={};window.unhandledErrorCount=0;\n` +
    'window.onerror=function(msg,url,line,columnNumber,error){var err;if(error)err=error;else{err=new Error;err.stack="";err.message=msg;err.fileName=url;err.lineNumber=line;if(!isNaN(columnNumber))err["columnNumber"]=columnNumber}var message=String(err.message);if(!err.message||message in window.unhandledErrorMessages||window.unhandledErrorCount>=5)return;window.unhandledErrorCount+=1;window.unhandledErrorMessages[message]=true;var img=new Image;window.emergencyTimeoutImg=img;img.onload=img.onerror=function(){delete window.emergencyTimeoutImg};\n' +
    'var combinedLineAndColumn=err.lineNumber;if(!isNaN(err["columnNumber"]))combinedLineAndColumn=combinedLineAndColumn+(":"+err["columnNumber"]);var stack=err.stack||"";var values={"msg":message,"type":err.name,"client.params":"unhandled window error","file":err.fileName,"line":combinedLineAndColumn,"stack":stack.substr(0,500)};var thirdPartyScript=!err.fileName||err.fileName==="<anonymous>"||stack.indexOf("extension://")>=0;var replaced=stack.replace(/https:\\/\\/www.youtube.com\\//g,"");if(replaced.match(/https?:\\/\\/[^/]+\\//))thirdPartyScript=\n' +
    'true;else if(stack.indexOf("trapProp")>=0&&stack.indexOf("trapChain")>=0)thirdPartyScript=true;else if(message.indexOf("redefine non-configurable")>=0)thirdPartyScript=true;var baseUrl=window["ytcfg"].get("EMERGENCY_BASE_URL","https://www.youtube.com/error_204?t=jserror&level=ERROR");var unsupported=message.indexOf("window.customElements is undefined")>=0;if(thirdPartyScript||unsupported)baseUrl=baseUrl.replace("level=ERROR","level=WARNING");var parts=[baseUrl];var key;for(key in values){var value=\n' +
    'values[key];if(value)parts.push(key+"="+encodeURIComponent(value))}img.src=parts.join("&")};\n' +
    '(function(){function _getExtendedNativePrototype(tag){var p=this._nativePrototypes[tag];if(!p){p=Object.create(this.getNativePrototype(tag));var p$=Object.getOwnPropertyNames(window["Polymer"].Base);var i=0;var n=void 0;for(;i<p$.length&&(n=p$[i]);i++)if(!window["Polymer"].BaseDescriptors[n])try{p[n]=window["Polymer"].Base[n]}catch(e){throw new Error("Error while copying property: "+n+". Tag is "+tag);}try{Object.defineProperties(p,window["Polymer"].BaseDescriptors)}catch(e){throw new Error("Polymer define property failed for "+\n' +
    'Object.keys(p));}this._nativePrototypes[tag]=p}return p}function handlePolymerError(msg){window.onerror(msg,window.location.href,0,0,new Error(Array.prototype.join.call(arguments,",")))}var origPolymer=window["Polymer"];var newPolymer=function(config){if(!origPolymer._ytIntercepted&&window["Polymer"].Base){origPolymer._ytIntercepted=true;window["Polymer"].Base._getExtendedNativePrototype=_getExtendedNativePrototype;window["Polymer"].Base._error=handlePolymerError;window["Polymer"].Base._warn=handlePolymerError}return origPolymer.apply(this,\n' +
    'arguments)};var origDescriptor=Object.getOwnPropertyDescriptor(window,"Polymer");Object.defineProperty(window,"Polymer",{set:function(p){if(origDescriptor&&origDescriptor.set&&origDescriptor.get){origDescriptor.set(p);origPolymer=origDescriptor.get()}else origPolymer=p;if(typeof origPolymer==="function")Object.defineProperty(window,"Polymer",{value:origPolymer,configurable:true,enumerable:true,writable:true})},get:function(){return typeof origPolymer==="function"?newPolymer:origPolymer},configurable:true,\n' +
    'enumerable:true})})();}).call(this);\n' +
    '</script><script nonce="emKt8BlvYXPskSp4KidONg">window.Polymer=window.Polymer||{};window.Polymer.legacyOptimizations=true;window.Polymer.setPassiveTouchGestures=true;window.ShadyDOM={force:true,preferPerformance:true,noPatch:true};\n' +
    `window.polymerSkipLoadingFontRoboto = true;window.ShadyCSS = {disableRuntime: true};</script><link rel="shortcut icon" href="https://www.youtube.com/s/desktop/6f290082/img/favicon.ico" type="image/x-icon"><link rel="icon" href="https://www.youtube.com/s/desktop/6f290082/img/favicon_32x32.png" sizes="32x32"><link rel="icon" href="https://www.youtube.com/s/desktop/6f290082/img/favicon_48x48.png" sizes="48x48"><link rel="icon" href="https://www.youtube.com/s/desktop/6f290082/img/favicon_96x96.png" sizes="96x96"><link rel="icon" href="https://www.youtube.com/s/desktop/6f290082/img/favicon_144x144.png" sizes="144x144"><title>YouTube</title><link rel="canonical" href="https://www.youtube.com/"><link rel="alternate" media="handheld" href="https://m.youtube.com/"><link rel="alternate" media="only screen and (max-width: 640px)" href="https://m.youtube.com/"><meta property="og:image" content="https://www.youtube.com/img/desktop/yt_1200.png"><meta property="og:title" content="YouTube"><meta property="fb:app_id" content="87741124305"><link rel="alternate" href="android-app://com.google.android.youtube/http/www.youtube.com/"><link rel="alternate" href="ios-app://544007664/vnd.youtube/www.youtube.com/"><meta name="description" content="Enjoy the videos and music that you love, upload original content and share it all with friends, family and the world on YouTube."><meta name="keywords" content="video, sharing, camera phone, video phone, free, upload"><script nonce="emKt8BlvYXPskSp4KidONg">if ('undefined' == typeof Symbol || 'undefined' == typeof Symbol.iterator) {delete Array.prototype.entries;}</script><script nonce="emKt8BlvYXPskSp4KidONg">var ytcsi={gt:function(n){n=(n||"")+"data_";return ytcsi[n]||(ytcsi[n]={tick:{},info:{},gel:{preLoggedGelInfos:[]}})},now:window.performance&&window.performance.timing&&window.performance.now&&window.performance.timing.navigationStart?function(){return window.performance.timing.navigationStart+window.performance.now()}:function(){return(new Date).getTime()},tick:function(l,t,n){var ticks=ytcsi.gt(n).tick;var v=t||ytcsi.now();if(ticks[l]){ticks["_"+l]=ticks["_"+l]||[ticks[l]];ticks["_"+l].push(v)}ticks[l]=\n` +
    'v},info:function(k,v,n){ytcsi.gt(n).info[k]=v},infoGel:function(p,n){ytcsi.gt(n).gel.preLoggedGelInfos.push(p)},setStart:function(t,n){ytcsi.tick("_start",t,n)}};\n' +
    '(function(w,d){function isGecko(){if(!w.navigator)return false;try{if(w.navigator.userAgentData&&w.navigator.userAgentData.brands&&w.navigator.userAgentData.brands.length){var brands=w.navigator.userAgentData.brands;var i=0;for(;i<brands.length;i++)if(brands[i]&&brands[i].brand==="Firefox")return true;return false}}catch(e){setTimeout(function(){throw e;})}if(!w.navigator.userAgent)return false;var ua=w.navigator.userAgent;return ua.indexOf("Gecko")>0&&ua.toLowerCase().indexOf("webkit")<0&&ua.indexOf("Edge")<\n' +
    '0&&ua.indexOf("Trident")<0&&ua.indexOf("MSIE")<0}ytcsi.setStart(w.performance?w.performance.timing.responseStart:null);var isPrerender=(d.visibilityState||d.webkitVisibilityState)=="prerender";var vName=!d.visibilityState&&d.webkitVisibilityState?"webkitvisibilitychange":"visibilitychange";if(isPrerender){var startTick=function(){ytcsi.setStart();d.removeEventListener(vName,startTick)};d.addEventListener(vName,startTick,false)}if(d.addEventListener)d.addEventListener(vName,function(){ytcsi.tick("vc")},\n' +
    'false);if(isGecko()){var isHidden=(d.visibilityState||d.webkitVisibilityState)=="hidden";if(isHidden)ytcsi.tick("vc")}var slt=function(el,t){setTimeout(function(){var n=ytcsi.now();el.loadTime=n;if(el.slt)el.slt()},t)};w.__ytRIL=function(el){if(!el.getAttribute("data-thumb"))if(w.requestAnimationFrame)w.requestAnimationFrame(function(){slt(el,0)});else slt(el,16)}})(window,document);\n' +
    '</script><script nonce="emKt8BlvYXPskSp4KidONg">(function() {var img = new Image().src = "https://i.ytimg.com/generate_204";})();</script><script src="https://www.youtube.com/s/desktop/6f290082/jsbin/web-animations-next-lite.min.vflset/web-animations-next-lite.min.js" nonce="emKt8BlvYXPskSp4KidONg"></script><script src="https://www.youtube.com/s/desktop/6f290082/jsbin/webcomponents-all-noPatch.vflset/webcomponents-all-noPatch.js" nonce="emKt8BlvYXPskSp4KidONg"></script><script src="https://www.youtube.com/s/desktop/6f290082/jsbin/fetch-pol'... 861137 more characters,
  groups: undefined
]
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-3$ node fetch-title.js https://leetcode.com/
(node:55647) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/magudesh/prerendering_learning/prerender-training/day-3/fetch-title.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /home/magudesh/prerendering_learning/prerender-training/day-3/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
Response {
  status: 403,
  statusText: 'Forbidden',
  headers: Headers {
    date: 'Sat, 22 Aug 2026 08:21:00 GMT',
    'content-type': 'text/html; charset=UTF-8',
    'transfer-encoding': 'chunked',
    connection: 'close',
    'accept-ch': 'Sec-CH-UA-Bitness, Sec-CH-UA-Arch, Sec-CH-UA-Full-Version, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-UA-Full-Version-List, Sec-CH-UA-Platform, Sec-CH-UA, UA-Bitness, UA-Arch, UA-Full-Version, UA-Mobile, UA-Model, UA-Platform-Version, UA-Platform, UA',
    'cf-mitigated': 'challenge',
    'content-security-policy': "default-src 'none'; script-src 'nonce-BsTRHfqyHTAemgiY4sEFx2' 'unsafe-eval' https://challenges.cloudflare.com; script-src-attr 'none'; style-src 'unsafe-inline'; img-src 'self' https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com blob:; child-src 'self' https://challenges.cloudflare.com blob:; worker-src blob:; form-action http: https:; base-uri 'self'",
    server: 'cloudflare',
    'critical-ch': 'Sec-CH-UA-Bitness, Sec-CH-UA-Arch, Sec-CH-UA-Full-Version, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-UA-Full-Version-List, Sec-CH-UA-Platform, Sec-CH-UA, UA-Bitness, UA-Arch, UA-Full-Version, UA-Mobile, UA-Model, UA-Platform-Version, UA-Platform, UA',
    'cross-origin-embedder-policy': 'require-corp',
    'cross-origin-opener-policy': 'same-origin',
    'cross-origin-resource-policy': 'same-origin',
    'origin-agent-cluster': '?1',
    'permissions-policy': 'accelerometer=(),camera=(),clipboard-read=(),clipboard-write=(),geolocation=(),gyroscope=(),hid=(),magnetometer=(),microphone=(),payment=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),usb=(),xr-spatial-tracking=*',
    'referrer-policy': 'same-origin',
    'server-timing': 'chlray;desc="a2f076269b04b2be"',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'SAMEORIGIN',
    'strict-transport-security': 'max-age=15552000; includeSubDomains; preload',
    'content-encoding': 'br',
    'cf-ray': 'a2f076269b04b2be-BLR'
  },
  body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
  bodyUsed: true,
  ok: false,
  redirected: false,
  type: 'basic',
  url: 'https://leetcode.com/'
} 403 Headers {
  date: 'Sat, 22 Aug 2026 08:21:00 GMT',
  'content-type': 'text/html; charset=UTF-8',
  'transfer-encoding': 'chunked',
  connection: 'close',
  'accept-ch': 'Sec-CH-UA-Bitness, Sec-CH-UA-Arch, Sec-CH-UA-Full-Version, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-UA-Full-Version-List, Sec-CH-UA-Platform, Sec-CH-UA, UA-Bitness, UA-Arch, UA-Full-Version, UA-Mobile, UA-Model, UA-Platform-Version, UA-Platform, UA',
  'cf-mitigated': 'challenge',
  'content-security-policy': "default-src 'none'; script-src 'nonce-BsTRHfqyHTAemgiY4sEFx2' 'unsafe-eval' https://challenges.cloudflare.com; script-src-attr 'none'; style-src 'unsafe-inline'; img-src 'self' https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com; frame-src 'self' https://challenges.cloudflare.com blob:; child-src 'self' https://challenges.cloudflare.com blob:; worker-src blob:; form-action http: https:; base-uri 'self'",
  server: 'cloudflare',
  'critical-ch': 'Sec-CH-UA-Bitness, Sec-CH-UA-Arch, Sec-CH-UA-Full-Version, Sec-CH-UA-Mobile, Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-UA-Full-Version-List, Sec-CH-UA-Platform, Sec-CH-UA, UA-Bitness, UA-Arch, UA-Full-Version, UA-Mobile, UA-Model, UA-Platform-Version, UA-Platform, UA',
  'cross-origin-embedder-policy': 'require-corp',
  'cross-origin-opener-policy': 'same-origin',
  'cross-origin-resource-policy': 'same-origin',
  'origin-agent-cluster': '?1',
  'permissions-policy': 'accelerometer=(),camera=(),clipboard-read=(),clipboard-write=(),geolocation=(),gyroscope=(),hid=(),magnetometer=(),microphone=(),payment=(),publickey-credentials-get=(),screen-wake-lock=(),serial=(),sync-xhr=(),usb=(),xr-spatial-tracking=*',
  'referrer-policy': 'same-origin',
  'server-timing': 'chlray;desc="a2f076269b04b2be"',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'strict-transport-security': 'max-age=15552000; includeSubDomains; preload',
  'content-encoding': 'br',
  'cf-ray': 'a2f076269b04b2be-BLR'
} 208 [
  '<title>Just a moment...</title>',
  index: 40,
  input: `<!DOCTYPE html><html lang="en-US"><head><title>Just a moment...</title><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=Edge"><meta name="robots" content="noindex,nofollow"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="content-security-policy" content="default-src &#39;none&#39;; script-src &#39;nonce-BsTRHfqyHTAemgiY4sEFx2&#39; &#39;unsafe-eval&#39; https://challenges.cloudflare.com; script-src-attr &#39;none&#39;; style-src &#39;unsafe-inline&#39;; img-src &#39;self&#39; https://challenges.cloudflare.com; connect-src &#39;self&#39; https://challenges.cloudflare.com; frame-src &#39;self&#39; https://challenges.cloudflare.com blob:; child-src &#39;self&#39; https://challenges.cloudflare.com blob:; worker-src blob:; form-action http: https:; base-uri &#39;self&#39;"><style>*{box-sizing:border-box;margin:0;padding:0}html{line-height:1.15;-webkit-text-size-adjust:100%;color:#313131;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"}body{display:flex;flex-direction:column;height:100vh;min-height:100vh}.main-content{margin:8rem auto;padding-left:1.5rem;max-width:60rem}@media (width <= 720px){.main-content{margin-top:4rem}}#challenge-error-text{background-image:url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iI0IyMEYwMyIgZD0iTTE2IDNhMTMgMTMgMCAxIDAgMTMgMTNBMTMuMDE1IDEzLjAxNSAwIDAgMCAxNiAzbTAgMjRhMTEgMTEgMCAxIDEgMTEtMTEgMTEuMDEgMTEuMDEgMCAwIDEtMTEgMTEiLz48cGF0aCBmaWxsPSIjQjIwRjAzIiBkPSJNMTcuMDM4IDE4LjYxNUgxNC44N0wxNC41NjMgOS41aDIuNzgzem0tMS4wODQgMS40MjdxLjY2IDAgMS4wNTcuMzg4LjQwNy4zODkuNDA3Ljk5NCAwIC41OTYtLjQwNy45ODQtLjM5Ny4zOS0xLjA1Ny4zODktLjY1IDAtMS4wNTYtLjM4OS0uMzk4LS4zODktLjM5OC0uOTg0IDAtLjU5Ny4zOTgtLjk4NS40MDYtLjM5NyAxLjA1Ni0uMzk3Ii8+PC9zdmc+");background-repeat:no-repeat;background-size:contain;padding-left:34px}</style><meta http-equiv="refresh" content="360"></head><body><div class="main-wrapper" role="main"><div class="main-content"><noscript><div class="h2"><span id="challenge-error-text">Enable JavaScript and cookies to continue</span></div></noscript></div></div><script nonce="BsTRHfqyHTAemgiY4sEFx2">(function(){window._cf_chl_opt = {cFPWv: 'b',cH: 'kmPcGzaDnfDCHTxq28b1TqIW1wxLvEhSU4.AhFj00d0-1787386860-1.2.1.1-rrptO0YYO1mxcUDhYnOstlP3kgkrmyPQG3HiAgDsjsX9dWRf4gi5gsJJiXHdFykG',cITimeS: '1787386860',cN: 'BsTRHfqyHTAemgiY4sEFx2',cRay: 'a2f076269b04b2be',cTplB: '0',cTplC:0,cTplO:0,cTplV:5,cType: 'managed',cUPMDTk:"/?__cf_chl_tk=9npia6yOkWju6cXUqiqv2YIyN.EkMjyZhYmFK486GdA-1787386860-1.0.1.1-UW7WmYggKMdOCjzarzu5JYmH5VGZwc3RJsYasvb3pG0",cvId: '3',cZone: 'leetcode.com',fa:"/?__cf_chl_f_tk=9npia6yOkWju6cXUqiqv2YIyN.EkMjyZhYmFK486GdA-1787386860-1.0.1.1-UW7WmYggKMdOCjzarzu5JYmH5VGZwc3RJsYasvb3pG0",md: 'R7yYhEfHYfHM2EmhPcvLsUk21eVyc7NP7ZQT1HErVQc-1787386860-1.2.1.1-kIusopbC2gHFcPUYlfhr1EFZPJEEX38H_m7dyXfPINFanIh6rHRv9nM9jYCcI9Z8_JtkKBAg5YrCD41j0yHtn_uj_w1.WAHWJpyfKQX.0mIvcDn0zvSLfmJlAyG1GCY6de.85bnjZ5N8Fb9lOt7.9VvX66Y1fBDe_kdLJ_n2ZgmwpTq52aTKee63PRvtiJgSVw4khb8iMmKvBIdTDbZ10GFwkvLVwqM3h34U3cdT9OzWN4AqhkWlfGEH7JflNSh3RpqvBXwCnCT_lyB6HzSRuG8x5o1h.7r0.Wl3rzH3HQs5ok11zpueIi6SAm.h1S30UyDzPasa36EvxQH1kdy2K1gjWbj0yQLGln9P1o2O0UxtMS0MswEmysEI2Cw3N5o9jOoj118q0.KzxQ6A6O6McQS4v7EBQ98TeJ11II64TmA7QIx9e3SvYBKsJTULrGwUYL6.A._DUVgcJ0SQBJd7bIMjOcnIpGw210esZXgyY2_gAgh9xsxv9meW0BfZF7sIAsqOjexTvLN0Zw0kWauCxRT72B777p9LRoCXYpIWX4azuD_oRJa84wXVH7gp0oM3yO4L.lDKXpfuIrlDTqrbsNnc.jZ3QBWnYg1hz7pQxCF8zH5GmrvNaeobPfquL_SvIbrKiQn1fw400iXkRE4SyvBEozPycy69VowBV9uBR2ToZYlL5QZGayNEwxLDWiBC7HKPOHXsL7V7z25y.DEhaJmloByHxyo88tuphvXhiUbqcdnJ2PfPVlnkgv2hxCCclZCSXZmd94EHPKSeVgYbczKNdXOSqWE9Ky7DTr1COckCPbD5donJ6Sv81COxkppBv1.jyF8seyxxukDWPcCUIh056To57eZk6pDyQoRrbV6VEyitITw94bK68GSvUO6Q88jR70WUv9ns0tEvW5sAYIiL4hC0WP_rWl2k43FEnznuGRTFC7fZaWKSUPZ0nAi20QtgDrX0tDwTwDUijKP.pOOFVknvtX97I5Cn7ihKlwrZuN787qoD2p8nRthsDBEe3V3es2NWPwsMRjqUOCOoBg',mdrd: 'RYJ35yVvXuuAvBg6icggHfjzVwB6X6qVpGn9OGrN4tA-1787386860-1.2.1.1-w5PrmB4alCDAUYsPZihD4bZpyUHTV5eq1OD_tH.8EOFQATSORcWyi3RbLwQ5SUs93UwpAJPGXSzplEQ4lrD5VZIArCiLIidf10gFNQHxBabeNBYYdtHVG9D2jrX89aFiGyuvytndp8Ppirk5E0HwqlQMXPyfhc1BAs0MeN4Ccv0V9dK8dU7yKxdTxrtZKGz9WZXcryP_s.1Uilcgl2VJWwFQdjxh2BvfWklj6R63Q1f0H_dWgSx75dvcOnObaJm79ZbkXNSTuP5amv5bDxyrpg',};var a = document.createElement('script');a.nonce = 'BsTRHfqyHTAemgiY4sEFx2';a.src = '/cdn-cgi/challenge-platform/h/b/orchestrate/chl_page/v1?ray=a2f076269b04b2be';window._cf_chl_opt.cOgUHash = location.hash === '' && location.href.indexOf('#') !== -1 ? '#' : location.hash;window._cf_chl_opt.cOgUQuery = location.search === '' && location.href.slice(0, location.href.length - window._cf_chl_opt.cOgUHash.length).indexOf('?') !== -1 ? '?' : location.search;if (window.history && window.history.replaceState) {var ogU = location.pathname + window._cf_chl_opt.cOgUQuery + window._cf_chl_opt.cOgUHash;history.replaceState(null, null,"/?__cf_chl_rt_tk=9npia6yOkWju6cXUqiqv2YIyN.EkMjyZhYmFK486GdA-1787386860-1.0.1.1-UW7WmYggKMdOCjzarzu5JYmH5VGZwc3RJsYasvb3pG0"+ window._cf_chl_opt.cOgUHash);a.onload = function() {history.replaceState(null, null, ogU);}}document.getElementsByTagName('head')[0].appendChild(a);}());</script></body></html>`,
  groups: undefined
]
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-3$ node fetch-title.js https://www.ibm.com/in-en
(node:55788) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/magudesh/prerendering_learning/prerender-training/day-3/fetch-title.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /home/magudesh/prerendering_learning/prerender-training/day-3/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-security-policy': 'upgrade-insecure-requests',
    'x-frame-options': 'SAMEORIGIN',
    'last-modified': 'Sat, 22 Aug 2026 07:46:30 GMT',
    etag: '"31ed8-6599df38971f9-gzip"',
    'accept-ranges': 'bytes',
    'content-type': 'text/html;charset=utf-8',
    'x-content-type-options': 'nosniff',
    'cache-control': 'max-age=600',
    expires: 'Sat, 22 Aug 2026 08:31:24 GMT',
    'x-akamai-transformed': '0 - 0 -',
    'content-encoding': 'gzip',
    date: 'Sat, 22 Aug 2026 08:21:24 GMT',
    'content-length': '40782',
    connection: 'keep-alive',
    vary: 'Accept-Encoding',
    'strict-transport-security': 'max-age=31536000',
    'set-cookie': 'ak_bmsc=323DB6419543AB4FC25EB56B649B9004~000000000000000000000000000000~YAAQPUYDF3khi+ufAQAAenKPKAAONHziOHVTdfJAvXknfFs0gWN2zltT6MHtFPIA+wNCqgvxrRBKokhjvOInwnpp7qgZJ+zVTo+K9lEWU2DnEKs+TSZgYxfATmeLW3Fl4f7tbSRvGRu03AuiaFvmu3APz4wDIuUfVfuWsqzHtrU9xrRU5uc9r5hONSeZFQ02JCuRCpFB8TQMZmnCjYhdailfpWA1+bLc6RSqNnpd3ugwh1Ta1Xu9fw1SxoyH246fwfRAnvwJRrWAw8pmemwz1f29PJ2tBPrBUo7/2Mr/u945CqH8zc9C5dbbiuEpM6HHClOCaNu5M7FJAI0WKdEUq/giBw61arplW4iUfWv8QlH3jnEPbMMB; Domain=.ibm.com; Path=/; Expires=Sat, 22 Aug 2026 10:21:24 GMT; Max-Age=7200; HttpOnly, bm_sz=4460594E5A4ECD484A8491828F9611A2~YAAQPUYDF3ohi+ufAQAAenKPKACcjdes5z/+j8R2LFtu5uuQjlkw0De8hb18ALrhZeyqk8tlUX1IvkaN75jTueDlB5pCTJv0n8Rm3D3V/YXpZWj9bZiYLAW4D+g+TwVacqYV44NleFpOIKn4HklTRLom33RjCi1rkjbf3sj18kkaUeCQ2gB4ij+Rl7v0x4eIJMDW9+GKk7spTCw7Dwr9SpLMC0rhGoUc9leGCEYwbzTeAbKUiyUWxhQdxjK2s5iyk2sF5L6e8XldwR4tviehS2iO6RbNsSkX2jTW6+zlpOAEF0PA82xctoh4DlUZUruvEUuSmfvD1VzROcIGUK7SDHN6sbFzNL/B7A==~3490097~3158328; Domain=.ibm.com; Path=/; Expires=Sat, 22 Aug 2026 12:21:24 GMT; Max-Age=14400'
  },
  body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
  bodyUsed: true,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'https://www.ibm.com/in-en'
} 200 Headers {
  'content-security-policy': 'upgrade-insecure-requests',
  'x-frame-options': 'SAMEORIGIN',
  'last-modified': 'Sat, 22 Aug 2026 07:46:30 GMT',
  etag: '"31ed8-6599df38971f9-gzip"',
  'accept-ranges': 'bytes',
  'content-type': 'text/html;charset=utf-8',
  'x-content-type-options': 'nosniff',
  'cache-control': 'max-age=600',
  expires: 'Sat, 22 Aug 2026 08:31:24 GMT',
  'x-akamai-transformed': '0 - 0 -',
  'content-encoding': 'gzip',
  date: 'Sat, 22 Aug 2026 08:21:24 GMT',
  'content-length': '40782',
  connection: 'keep-alive',
  vary: 'Accept-Encoding',
  'strict-transport-security': 'max-age=31536000',
  'set-cookie': 'ak_bmsc=323DB6419543AB4FC25EB56B649B9004~000000000000000000000000000000~YAAQPUYDF3khi+ufAQAAenKPKAAONHziOHVTdfJAvXknfFs0gWN2zltT6MHtFPIA+wNCqgvxrRBKokhjvOInwnpp7qgZJ+zVTo+K9lEWU2DnEKs+TSZgYxfATmeLW3Fl4f7tbSRvGRu03AuiaFvmu3APz4wDIuUfVfuWsqzHtrU9xrRU5uc9r5hONSeZFQ02JCuRCpFB8TQMZmnCjYhdailfpWA1+bLc6RSqNnpd3ugwh1Ta1Xu9fw1SxoyH246fwfRAnvwJRrWAw8pmemwz1f29PJ2tBPrBUo7/2Mr/u945CqH8zc9C5dbbiuEpM6HHClOCaNu5M7FJAI0WKdEUq/giBw61arplW4iUfWv8QlH3jnEPbMMB; Domain=.ibm.com; Path=/; Expires=Sat, 22 Aug 2026 10:21:24 GMT; Max-Age=7200; HttpOnly, bm_sz=4460594E5A4ECD484A8491828F9611A2~YAAQPUYDF3ohi+ufAQAAenKPKACcjdes5z/+j8R2LFtu5uuQjlkw0De8hb18ALrhZeyqk8tlUX1IvkaN75jTueDlB5pCTJv0n8Rm3D3V/YXpZWj9bZiYLAW4D+g+TwVacqYV44NleFpOIKn4HklTRLom33RjCi1rkjbf3sj18kkaUeCQ2gB4ij+Rl7v0x4eIJMDW9+GKk7spTCw7Dwr9SpLMC0rhGoUc9leGCEYwbzTeAbKUiyUWxhQdxjK2s5iyk2sF5L6e8XldwR4tviehS2iO6RbNsSkX2jTW6+zlpOAEF0PA82xctoh4DlUZUruvEUuSmfvD1VzROcIGUK7SDHN6sbFzNL/B7A==~3490097~3158328; Domain=.ibm.com; Path=/; Expires=Sat, 22 Aug 2026 12:21:24 GMT; Max-Age=14400'
} 458 [
  '<title>IBM</title>',
  index: 675,
  input: ' \n' +
    '<!DOCTYPE HTML>\n' +
    '\n' +
    '<html lang="en">\n' +
    '<head>\r\n' +
    '    \r\n' +
    '      \r\n' +
    '    \r\n' +
    '    \r\n' +
    '    \r\n' +
    '    \r\n' +
    '    \r\n' +
    '    \r\n' +
    '      \r\n' +
    '    \r\n' +
    '    \r\n' +
    '    \r\n' +
    '    \r\n' +
    '    \r\n' +
    '    <meta charset="UTF-8"/>\r\n' +
    '    <meta name="languageCode" content="en"/>\r\n' +
    '    <meta name="countryCode" content="in"/>\r\n' +
    '    <meta name="searchTitle" content="IBM"/>\r\n' +
    '    <meta name="focusArea" content="Cross IBM SDRs"/>\r\n' +
    `    <meta name='primaryTaxonomyEn' content="IBM"/>\r\n` +
    '    <meta name="siteSection" content="home"/>\r\n' +
    '    <meta name="primaryTopic" content="IBM"/>\r\n' +
    '    <meta name="productName"/>\r\n' +
    '    <meta name="pageType" content="IBM Homepage"/>\r\n' +
    '      \r\n' +
    '      \r\n' +
    '          <meta name="featuredContent" content="false"/>\r\n' +
    '      \r\n' +
    '    \r\n' +
    '    <title>IBM</title>\r\n' +
    '      <meta name="content-page-ref" content="eROxip4tByGTXXkYPHZou4Sx2tQ9Yny1AN9VNOmDoDuXdpCWq8mPAxUAd36QHdh0uX5DLAELN8kcObodQWtduQ"/>\n' +
    '<script defer="defer" type="text/javascript" src="https://rum.hlx.page/.rum/@adobe/helix-rum-js@%5E2/dist/micro.js" data-routing="program=131558,environment=1281329,tier=publish"></script>\n' +
    '<link rel="icon" sizes="16x16" href="/content/dam/adobe-cms/default-images/icon-16x16.png"/>\r\n' +
    '      <link rel="icon" sizes="32x32" href="/content/dam/adobe-cms/default-images/icon-32x32.png"/>\r\n' +
    '      <link rel="icon" sizes="150x150" href="/content/dam/adobe-cms/default-images/icon-150x150.png"/>\r\n' +
    '      <link rel="icon" sizes="192x192" href="/content/dam/adobe-cms/default-images/icon-192x192.png"/>\r\n' +
    '      <link rel="icon" sizes="512x512" href="/content/dam/adobe-cms/default-images/icon-512x512.png"/>\r\n' +
    '      <link rel="apple-touch-icon" sizes="57x57" href="/content/dam/adobe-cms/default-images/apple-touch-icon-57x57.png"/>\r\n' +
    '      <link rel="apple-touch-icon" sizes="76x76" href="/content/dam/adobe-cms/default-images/apple-touch-icon-76x76.png"/>\r\n' +
    '      <link rel="apple-touch-icon" sizes="120x120" href="/content/dam/adobe-cms/default-images/apple-touch-icon-120x120.png"/>\r\n' +
    '      <link rel="apple-touch-icon" sizes="152x152" href="/content/dam/adobe-cms/default-images/apple-touch-icon-152x152.png"/>\r\n' +
    '      <link rel="apple-touch-icon" sizes="180x180" href="/content/dam/adobe-cms/default-images/apple-touch-icon-180x180.png"/>\r\n' +
    '\r\n' +
    '    \r\n' +
    '    <meta name="description" content="For more than a century, IBM has been a global technology innovator, leading advances in AI, automation and hybrid cloud solutions that help businesses grow."/>\r\n' +
    '    <meta name="template" content="full-width-layout"/>\r\n' +
    '    \r\n' +
    '    <meta name="viewport" content="width=device-width, initial-scale=1"/>\r\n' +
    '    <meta name="robots" content="index, follow, max-image-preview:large"/>\r\n' +
    '    \r\n' +
    '    \r\n' +
    '      \r\n' +
    '      \r\n' +
    '      \r\n' +
    '      \r\n' +
    '      \r\n' +
    '    <link rel="canonical" href="https://www.ibm.com/in-en"/>\r\n' +
    '\r\n' +
    '      \r\n' +
    '          <link rel="preload" as="image" href="/content/adobe-cms/in/en/homepage/jcr:content/root/leadspace_container/leadspace_expanded/image.coreimg.jpeg/1787327927270/ibm-bob-email-3-new.png" fetchpriority="high"/>\r\n' +
    '      \r\n' +
    '\r\n' +
    '    \n' +
    '    <link rel="preload" href="/etc.clientlibs/adobe-cms/clientlibs/clientlib-masthead-container.lc-1faea730e67c940d05aba6ae2faa69f4-lc.min.js" as="script">\n' +
    '\n' +
    '\r\n' +
    '\r\n' +
    '    \r\n' +
    '\r\n' +
    '    \r\n' +
    '    \n' +
    '    <script defer src="/etc.clientlibs/adobe-cms/clientlibs/clientlib-smartling-context.lc-d30c41c1c7a4511befbe3e285d76955a-lc.min.js"></script>\n' +
    '\n' +
    '\r\n' +
    '\r\n' +
    '      \r\n' +
    '\r\n' +
    '      \r\n' +
    '      <script type="text/javascript">\r\n' +
    '          !function(e, a, n, t) {\r\n' +
    '              var i = e.head;\r\n' +
    '              if (i) {\r\n' +
    '                  if (a) return;\r\n' +
    '                  var o = e.createElement("style");\r\n' +
    '                  o.id = "alloy-prehiding", o.innerText = n, i.appendChild(o),\r\n' +
    '                      setTimeout(function() {\r\n' +
    '                          o.parentNode && o.parentNode.removeChild(o)\r\n' +
    '                      }, t)\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '          (document, document.location.href.indexOf("adobe_authoring_enabled") !== -1, "body { opacity: 0 !important }", 900);\r\n' +
    '      </script>\r\n' +
    '      \r\n' +
    '      \r\n' +
    '<!--      <script type="text/javascript">\r\n' +
    '          (function(c,l,a,r,i,t,y){\r\n' +
    '              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};\r\n' +
    '              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;\r\n' +
    '              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);\r\n' +
    '          })(window, document, "clarity", "script", "s52kp7iw7g");\r\n' +
    '      </script>-->\r\n' +
    '      \r\n' +
    '    <style id="prevent-layout-shift-style">\n' +
    '    c4d-masthead-container:not(:defined) {\n' +
    '        min-height: 114px; /* Reserve space before it loads */\n' +
    '        display: block !important; \n' +
    '        opacity: 0; /* Hide visually but keep space */\n' +
    '        transition: opacity 0.3s ease-in-out;\n' +
    '    }\n' +
    '\n' +
    '    c4d-masthead-container:defined {\n' +
    '        transition: opacity 0.3s ease-in-out;\n' +
    '        opacity: 1;\n' +
    '    }\n' +
    '\n' +
    '    c4d-leadspace:not(:defined) {\n' +
    '        display:none;\n' +
    '    }\n' +
    '\n' +
    '    c4d-table-of-contents:not(:defined) {\n' +
    '        display:none;\n' +
    '    }\n' +
    '\n' +
    '    c4d-link-list:not(:defined) {\n' +
    '        display:none;\n' +
    '    }\n' +
    '</style>\r\n' +
    '\r\n' +
    '      <script src="https://assets.adobedtm.com/0f2de1d5b89a/565c2aeb0d39/launch-560e54b3e83c.min.js" type="text/javascript" async="async"></script>\r\n' +
    '     <script type="text/javascript" async="async">\r\n' +
    '\tvar adobeDataLayer = window.adobeDataLayer || [];\r\n' +
    '\t</script>\r\n' +
    '\r\n' +
    '    <script type="text/javascript">\r\n' +
    '        window.searchKey = {\r\n' +
    "            templateName: 'full\\u002Dwidth\\u002Dlayout',\r\n" +
    "            taxonomylist: 'taxonomy : Brands \\/ IBM',\r\n" +
    "            L0Tag: 'Topics,Brands,Geography,Compliance Entities,Product Categories,Events,Computer Languages,Content Format,Series,Content Type,CMaaS Focus Areas,Deployment Types,Product Types,Search Index,Unified Taxonomy,Site Sections,Page Types,Persona,Journey Stage,Journey Step,Industries',\r\n" +
    '        }\r\n' +
    '    </script>\r\n' +
    '\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="ar-sa" href="https://www.ibm.com/sa-ar"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="de-de" href="https://www.ibm.com/de-de"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="en-us" href="https://www.ibm.com/"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="en-ca" href="https://www.ibm.com/ca-en"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="ko-kr" href="https://www.ibm.com/kr-ko"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="pt-br" href="https://www.ibm.com/br-pt"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="en-tw" href="https://www.ibm.com/tw-en"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="ar-qa" href="https://www.ibm.com/qa-ar"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="en-in" href="https://www.ibm.com/in-en"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="es-es" href="https://www.ibm.com/es-es"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="ar-ae" href="https://www.ibm.com/ae-ar"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="zh-cn" href="https://www.ibm.com/cn-zh"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="es-mx" href="https://www.ibm.com/mx-es"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="fr-ca" href="https://www.ibm.com/ca-fr"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="it-it" href="https://www.ibm.com/it-it"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="x-default" href="https://www.ibm.com/"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="id-id" href="https://www.ibm.com/id-id"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="en-au" href="https://www.ibm.com/au-en"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="en-uk" href="https://www.ibm.com/uk-en"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="fr-fr" href="https://www.ibm.com/fr-fr"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="ja-jp" href="https://www.ibm.com/jp-ja"/>\r\n' +
    '    \r\n' +
    '        <link rel="alternate" hreflang="en-id" href="https://www.ibm.com/id-en"/>\r\n' +
    '    \r\n' +
    '\r\n' +
    '    \r\n' +
    '\r\n' +
    '    <script type="text/javascript">\r\n' +
    "        var languageCode = document.getElementsByName('languageCode')[0].content;\r\n" +
    "        var countryCode = document.getElementsByName('countryCode')[0].content;\r\n" +
    "        var focusArea = document.getElementsByName('focusArea')[0].content;\r\n" +
    "        var primaryTopic = document.getElementsByName('primaryTopic')[0]?.content?.trim() || '';\r\n" +
    "        var productName = document.getElementsByName('productName')[0]?.content?.trim() || '';\r\n" +
    "        var pageType = document.getElementsByName('pageType')[0]?.content?.trim() || '';\r\n" +
    '\r\n' +
    "        var promptTitle = '';\r\n" +
    "        var prompt1 = '';\r\n" +
    "        var prompt2 = '';\r\n" +
    "        var prompt3 = '';\r\n" +
    '        var prompts = [prompt1, prompt2, prompt3].filter(Boolean);\r\n' +
    '        var promptConfig = promptTitle || prompts.length ? { title: promptTitle, prompts: prompts } : null;\r\n' +
    '\r\n' +
    '        /* Define digital data object based on _appInfo object */\r\n' +
    '          window._ibmAnalytics = {\r\n' +
    '              settings: {\r\n' +
    '                 name: "AEM Sites",\r\n' +
    '                 tealiumProfileName: "adobe-launch"\r\n' +
    '              },\r\n' +
    '           };\r\n' +
    '        window.digitalData = {\r\n' +
    '            page: {\r\n' +
    '                category: {\r\n' +
    "                    primaryCategory: '',\r\n" +
    '                },\r\n' +
    '                taxonomy: Object.assign({\r\n' +
    '                    primaryTopic: primaryTopic,\r\n' +
    '                    productName: productName,\r\n' +
    '                    pageType: pageType\r\n' +
    '                }, promptConfig ? { promptConfig: promptConfig } : {}),\r\n' +
    '                pageInfo: {\r\n' +
    "                    language: languageCode + '-' + countryCode,\r\n" +
    '                    ibm: {\r\n' +
    "                        siteID: 'MarketingAEM',\r\n" +
    '                        country: countryCode,\r\n' +
    '                        messaging: {\r\n' +
    '                            routing: {\r\n' +
    '                                focusArea: focusArea,\r\n' +
    '                                languageCode: languageCode,\r\n' +
    '                                regionCode: countryCode\r\n' +
    '                            },\r\n' +
    '                            translation: {\r\n' +
    '                                languageCode: languageCode,\r\n' +
    '                                regionCode: countryCode\r\n' +
    '                            }\r\n' +
    '                        },\r\n' +
    '                        sections: 0,\r\n' +
    '                        patterns: 0,\r\n' +
    '             '... 194830 more characters,
  groups: undefined
]
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-3$ node fetch-title.js http://localhost:3000
(node:56512) [MODULE_TYPELESS_PACKAGE_JSON] Warning: Module type of file:///home/magudesh/prerendering_learning/prerender-training/day-3/fetch-title.js is not specified and it doesn't parse as CommonJS.
Reparsing as ES module because module syntax was detected. This incurs a performance overhead.
To eliminate this warning, add "type": "module" to /home/magudesh/prerendering_learning/prerender-training/day-3/package.json.
(Use `node --trace-warnings ...` to show where the warning was created)
Response {
  status: 200,
  statusText: 'OK',
  headers: Headers {
    'content-type': 'text/html; charset=utf-8',
    vary: 'Accept-Encoding',
    'content-encoding': 'gzip',
    date: 'Sat, 22 Aug 2026 08:22:28 GMT',
    connection: 'keep-alive',
    'keep-alive': 'timeout=5',
    'transfer-encoding': 'chunked'
  },
  body: ReadableStream { locked: true, state: 'closed', supportsBYOB: true },
  bodyUsed: true,
  ok: true,
  redirected: false,
  type: 'basic',
  url: 'http://localhost:3000/'
} 200 Headers {
  'content-type': 'text/html; charset=utf-8',
  vary: 'Accept-Encoding',
  'content-encoding': 'gzip',
  date: 'Sat, 22 Aug 2026 08:22:28 GMT',
  connection: 'keep-alive',
  'keep-alive': 'timeout=5',
  'transfer-encoding': 'chunked'
} 54 [
  '<title>Files within day-2&#47;</title>',
  index: 131,
  input: `<!DOCTYPE html><html lang="en"> <head> <meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>Files within day-2&#47;</title> <style>body { margin: 0; padding: 30px; background: #fff; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; -webkit-font-smoothing: antialiased;}main { max-width: 920px;}header { display: flex; justify-content: space-between; flex-wrap: wrap;}h1 { font-size: 18px; font-weight: 500; margin-top: 0; color: #000;}header h1 a { font-size: 18px; font-weight: 500; margin-top: 0; color: #000;}h1 i { font-style: normal;}ul { margin: 0 0 0 -2px; padding: 20px 0 0 0;}ul li { list-style: none; font-size: 14px; display: flex; justify-content: space-between;}a { text-decoration: none;}ul a { color: #000; padding: 10px 5px; margin: 0 -5px; white-space: nowrap; overflow: hidden; display: block; width: 100%; text-overflow: ellipsis;}header a { color: #0076FF; font-size: 11px; font-weight: 400; display: inline-block; line-height: 20px;}svg { height: 13px; vertical-align: text-bottom;}ul a::before { display: inline-block; vertical-align: middle; margin-right: 10px; width: 24px; text-align: center; line-height: 12px;}ul a.file::before { content: url("data:image/svg+xml;utf8,<svg width='15' height='19' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M10 8C8.34 8 7 6.66 7 5V1H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2V8h-4zM8 5c0 1.1.9 2 2 2h3.59L8 1.41V5zM3 0h5l7 7v9c0 1.66-1.34 3-3 3H3c-1.66 0-3-1.34-3-3V3c0-1.66 1.34-3 3-3z' fill='black'/></svg>");}ul a:hover { text-decoration: underline;}ul a.folder::before { content: url("data:image/svg+xml;utf8,<svg width='20' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M18.784 3.87a1.565 1.565 0 0 0-.565-.356V2.426c0-.648-.523-1.171-1.15-1.171H8.996L7.908.25A.89.89 0 0 0 7.302 0H2.094C1.445 0 .944.523.944 1.171v2.3c-.21.085-.398.21-.565.356a1.348 1.348 0 0 0-.377 1.004l.398 9.83C.42 15.393 1.048 16 1.8 16h15.583c.753 0 1.36-.586 1.4-1.339l.398-9.83c.021-.313-.125-.69-.397-.962zM1.843 3.41V1.191c0-.146.104-.272.25-.272H7.26l1.234 1.088c.083.042.167.104.293.104h8.282c.125 0 .25.126.25.272V3.41H1.844zm15.54 11.712H1.78a.47.47 0 0 1-.481-.46l-.397-9.83c0-.147.041-.252.125-.356a.504.504 0 0 1 .377-.147H17.78c.125 0 .272.063.377.147.083.083.125.209.125.334l-.418 9.83c-.021.272-.23.482-.481.482z' fill='black'/></svg>");}ul a.lambda::before { content: url("data:image/svg+xml; utf8,<svg width='15' height='19' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M3.5 14.4354H5.31622L7.30541 9.81311H7.43514L8.65315 13.0797C9.05676 14.1643 9.55405 14.5 10.7 14.5C11.0171 14.5 11.291 14.4677 11.5 14.4032V13.1572C11.3847 13.1766 11.2622 13.2024 11.1541 13.2024C10.6351 13.2024 10.3829 13.0281 10.1595 12.4664L8.02613 7.07586C7.21171 5.01646 6.54865 4.5 5.11441 4.5C4.83333 4.5 4.62432 4.53228 4.37207 4.59038V5.83635C4.56667 5.81052 4.66036 5.79761 4.77568 5.79761C5.64775 5.79761 5.9 6.0042 6.4045 7.19852L6.64234 7.77954L3.5 14.4354Z' fill='black'/><rect x='0.5' y='0.5' width='14' height='18' rx='2.5' stroke='black'/></svg>");}ul a.file.gif::before,ul a.file.jpg::before,ul a.file.png::before,ul a.file.svg::before { content: url("data:image/svg+xml;utf8,<svg width='16' height='16' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='black' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'><rect x='6' y='6' width='68' height='68' rx='5' ry='5'/><circle cx='24' cy='24' r='8'/><path d='M73 49L59 34 37 52m16 20L27 42 7 58'/></svg>");}::selection { background-color: #79FFE1; color: #000;}::-moz-selection { background-color: #79FFE1; color: #000;}@media (min-width: 768px) { ul {display: flex;flex-wrap: wrap; } ul li {width: 230px;padding-right: 20px; }}@media (min-width: 992px) { body {padding: 45px; } h1, header h1 a {font-size: 15px; } ul li {font-size: 13px;box-sizing: border-box;justify-content: flex-start; }}</style> </head> <body> <main> <header> <h1> <i>Index of&nbsp;</i>  <a href="/">day-2&#47;</a>  </h1> </header> <ul id="files">  <li> <a href="&#47;Screenshot 2026-08-22 003728.png" title="Screenshot 2026-08-22 003728.png" class="file png">Screenshot 2026-08-22 003728.png</a> </li>  <li> <a href="&#47;Screenshot 2026-08-22 003731.png" title="Screenshot 2026-08-22 003731.png" class="file png">Screenshot 2026-08-22 003731.png</a> </li>  <li> <a href="&#47;Screenshot 2026-08-22 110026.png" title="Screenshot 2026-08-22 110026.png" class="file png">Screenshot 2026-08-22 110026.png</a> </li>  <li> <a href="&#47;Screenshot 2026-08-22 110028.png" title="Screenshot 2026-08-22 110028.png" class="file png">Screenshot 2026-08-22 110028.png</a> </li>  <li> <a href="&#47;parsing-notes.md" title="parsing-notes.md" class="file md">parsing-notes.md</a> </li>  <li> <a href="&#47;store.html" title="store.html" class="file html">store.html</a> </li>  <li> <a href="&#47;two-views.md" title="two-views.md" class="file md">two-views.md</a> </li>  </ul></main> </body></html>`,
  groups: undefined
]
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-3$ 