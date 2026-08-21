*   Trying 104.20.23.154:443...
* Connected to example.com (104.20.23.154) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
*  CAfile: /etc/ssl/certs/ca-certificates.crt
*  CApath: /etc/ssl/certs
* TLSv1.0 (OUT), TLS header, Certificate Status (22):
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.2 (IN), TLS header, Certificate Status (22):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS header, Finished (20):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.2 (OUT), TLS header, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* ALPN, server accepted to use h2
* Server certificate:
*  subject: CN=example.com
*  start date: Jul 29 22:10:08 2026 GMT
*  expire date: Oct 27 22:17:21 2026 GMT
*  subjectAltName: host "example.com" matched cert's "example.com"
*  issuer: C=US; O=SSL Corporation; CN=Cloudflare TLS Issuing ECC CA 3
*  SSL certificate verify ok.
* Using HTTP2, server supports multiplexing
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* Using Stream ID: 1 (easy handle 0x591bd08b39f0)
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
> GET / HTTP/2 -"http method"
> Host: example.com "domain name"
> user-agent: curl/7.81.0 "user-agent"
> accept: */*
> 
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
< HTTP/2 200 - "status code"
< date: Fri, 21 Aug 2026 17:40:21 GMT
< content-type: text/html- "content type"
< server: cloudflare- "server'
< last-modified: Wed, 12 Aug 2026 20:17:18 GMT
< allow: GET, HEAD
< accept-ranges: bytes
< age: 2530
< cf-cache-status: HIT
< cf-ray: a2eb6c23ad613d34-BLR
< 
* TLSv1.2 (IN), TLS header, Supplemental data (23):
<!doctype html><html lang="en"><head><title>Example Domain</title><link rel="icon" href="data:,"><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{background:#eee;width:60vw;margin:15vh auto;font-family:system-ui,sans-serif}h1{font-size:1.5em}div{opacity:0.8}a:link,a:visited{color:#348}</style></head><body><div><h1>Example Domain</h1><p>This domain is for use in documentation examples without needing permission. Avoid use in operations.</p><p><a href="https://iana.org/domains/example">Learn more</a></p></div></body></html>
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* Connection #0 to host example.com left intact



#amazon

*   Trying 18.161.228.210:443...
* Connected to www.amazon.in (18.161.228.210) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
*  CAfile: /etc/ssl/certs/ca-certificates.crt
*  CApath: /etc/ssl/certs
* TLSv1.0 (OUT), TLS header, Certificate Status (22):
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.2 (IN), TLS header, Certificate Status (22):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS header, Finished (20):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.2 (OUT), TLS header, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_128_GCM_SHA256
* ALPN, server accepted to use h2
* Server certificate:
*  subject: CN=www.amazon.in
*  start date: Jan 19 00:00:00 2026 GMT
*  expire date: Jan 17 23:59:59 2027 GMT
*  subjectAltName: host "www.amazon.in" matched cert's "www.amazon.in"
*  issuer: C=US; O=Amazon; CN=Amazon RSA 2048 M01
*  SSL certificate verify ok.
* Using HTTP2, server supports multiplexing
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* Using Stream ID: 1 (easy handle 0x57e5ae3399f0)
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
> GET / HTTP/2
> Host: www.amazon.in
> user-agent: curl/7.81.0
> accept: */*
> 
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* Connection state changed (MAX_CONCURRENT_STREAMS == 128)!
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
< HTTP/2 503 
< content-type: text/html
< date: Fri, 21 Aug 2026 17:49:51 GMT
< x-amz-rid: 92MKNYT96FB2VVHDXJT0
< strict-transport-security: max-age=47474747; includeSubDomains; preload
< server: Server
< x-cache: Error from cloudfront
< via: 1.1 b4708c14d8f50f79391f04136ba2f0a6.cloudfront.net (CloudFront)
< x-amz-cf-pop: MAA50-P1
< alt-svc: h3=":443"; ma=86400
< x-amz-cf-id: lj88RKco1AofI3kaJtT2gdWiMtDBfotTLR5QhvgFIrPfkqB863fEwg==
< 
<!DOCTYPE html>
<!--[if lt IE 7]> <html lang="en-us" class="a-no-js a-lt-ie9 a-lt-ie8 a-lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html lang="en-us" class="a-no-js a-lt-ie9 a-lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html lang="en-us" class="a-no-js a-lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="a-no-js" lang="en-us"><!--<![endif]--><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title dir="ltr">Amazon.in</title>
<meta name="viewport" content="width=device-width">
<link rel="stylesheet" href="https://images-na.ssl-images-amazon.com/images/G/01/AUIClients/AmazonUI-3c913031596ca78a3768f4e934b1cc02ce238101.secure.min._V1_.css">
</head>
<body>

<!--
        To discuss automated access to Amazon data please contact api-services-support@amazon.com.
        For information about migrating to our APIs refer to our Marketplace APIs at https://developer.amazonservices.in/ref=rm_c_sv, or our Product Advertising API at https://affiliate-program.amazon.in/gp/advertising/api/detail/main.html/ref=rm_c_ac for advertising use cases.
-->

<!--
Correios.DoNotSend
-->

<div class="a-container a-padding-double-large" style="min-width:350px;padding:44px 0 !important">

    <div class="a-row a-spacing-double-large" style="width: 350px; margin: 0 auto">

        <div class="a-row a-spacing-medium a-text-center"><i class="a-icon a-logo" alt="Amazon logo"></i></div>

        <div class="a-box a-alert a-alert-info a-spacing-base">
            <div class="a-box-inner">
                <i class="a-icon a-icon-alert" alt="Alert icon"></i>
                <h4>Click the button below to continue shopping</h4>
                </div>
            </div>

            <div class="a-section">

                <div class="a-box a-color-offset-background">
                    <div class="a-box-inner a-padding-extra-large">

                        <form method="get" action="/errors_page/validateCaptcha" name="">
                            <input type="hidden" name="amzn" value="zk5vXseqS2ZuKuiJR6IxHA==" /><input type="hidden" name="amzn-r" value="&#047;" />
                            <input type="hidden" name="field-keywords" value="TTTLYE" />
                            <div class="a-section a-spacing-extra-large">

                                <div class="a-row">
                                    <span class="a-button a-button-primary a-span12">
                                        <span class="a-button-inner">
                                            <button type="submit" class="a-button-text" alt="Continue shopping">Continue shopping</button>
                                        </span>
                                    </span>
                                </div>

                            </div>
                        </form>

                    </div>
                </div>

            </div>

        </div>

        <div class="a-divider a-divider-section"><div class="a-divider-inner"></div></div>

        <div class="a-text-center a-spacing-small a-size-mini">
            <a href="https://www.amazon.in/gp/help/customer/display.html/ref=footer_cou?ie=UTF8&nodeId=200545940">Conditions of Use &amp; Sale</a>
            <span class="a-letter-space"></span>
            <span class="a-letter-space"></span>
            <span class="a-letter-space"></span>
            <span class="a-letter-space"></span>
            <a href="https://www.amazon.in/gp/help/customer/display.html/ref=footer_privacy?ie=UTF8&nodeId=200534380">Privacy Notice</a>
        </div>

        <div class="a-text-center a-size-mini a-color-base">
          &copy; 1996-2025, Amazon.com, Inc. or its affiliates
        </div>
    </div>
</body></html>
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* Connection #0 to host www.amazon.in left intact

#google meet

*   Trying 142.251.43.142:443...
* Connected to meet.google.com (142.251.43.142) port 443 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
*  CAfile: /etc/ssl/certs/ca-certificates.crt
*  CApath: /etc/ssl/certs
* TLSv1.0 (OUT), TLS header, Certificate Status (22):
* TLSv1.3 (OUT), TLS handshake, Client hello (1):
* TLSv1.2 (IN), TLS header, Certificate Status (22):
* TLSv1.3 (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS header, Finished (20):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, Encrypted Extensions (8):
* TLSv1.3 (IN), TLS handshake, Certificate (11):
* TLSv1.3 (IN), TLS handshake, CERT verify (15):
* TLSv1.3 (IN), TLS handshake, Finished (20):
* TLSv1.2 (OUT), TLS header, Finished (20):
* TLSv1.3 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.3 (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / TLS_AES_256_GCM_SHA384
* ALPN, server accepted to use h2
* Server certificate:
*  subject: CN=*.google.com
*  start date: Aug  5 20:42:25 2026 GMT
*  expire date: Oct 28 20:42:24 2026 GMT
*  subjectAltName: host "meet.google.com" matched cert's "*.google.com"
*  issuer: C=US; O=Google Trust Services; CN=WE2
*  SSL certificate verify ok.
* Using HTTP2, server supports multiplexing
* Connection state changed (HTTP/2 confirmed)
* Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* Using Stream ID: 1 (easy handle 0x619f825149f0)
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
> GET / HTTP/2
> Host: meet.google.com
> user-agent: curl/7.81.0
> accept: */*
> 
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* TLSv1.3 (IN), TLS handshake, Newsession Ticket (4):
* old SSL session ID is stale, removing
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
< HTTP/2 200 
< content-type: text/html; charset=utf-8
< cache-control: no-cache, no-store, max-age=0, must-revalidate
< pragma: no-cache
< expires: Mon, 01 Jan 1990 00:00:00 GMT
< date: Fri, 21 Aug 2026 17:53:26 GMT
< p3p: CP="This is not a P3P policy! See g.co/p3phelp for more info."
< strict-transport-security: max-age=31536000
< accept-ch: Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Full-Version, Sec-CH-UA-Full-Version-List, Sec-CH-UA-Model, Sec-CH-UA-WoW64, Sec-CH-UA-Form-Factors, Sec-CH-UA-Platform, Sec-CH-UA-Platform-Version
< content-security-policy: script-src 'nonce-moVtT07FEBWszXqIzSsuaA' 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: http:;object-src 'none';base-uri 'self';report-uri /_/MeetingsUi/cspreport
< content-security-policy: require-trusted-types-for 'script';report-uri /_/MeetingsUi/cspreport
< cross-origin-opener-policy: same-origin-allow-popups
< cross-origin-resource-policy: same-site
< permissions-policy: ch-ua-arch=*, ch-ua-bitness=*, ch-ua-full-version=*, ch-ua-full-version-list=*, ch-ua-model=*, ch-ua-wow64=*, ch-ua-form-factors=*, ch-ua-platform=*, ch-ua-platform-version=*
< reporting-endpoints: default="/_/MeetingsUi/web-reports?bl=boq_meetingsuiserver_20260817.05_p0&plid=boq_hlane_sE7qFbNV6ek&context=eJwV1HdUFMYaBXBdme_SXarKUpciLKBYiYqxJqCUZWmi5llQgw0r9l6jiahERdSYRENiNMbyrLHEZy-gdA0iRsSCYgNRUaK-mz9-537nzJ05Z_6YsczTGyxdmsT4uzTZkOvSJLHVMU0yDaetacc0OyjTeFyzhaJ3lWmG0wrPm5oOIeWaCPKsv6sJpFfnqjQW56s0ce73NKmUEn1fM4Pcau5r2tHiuIeaDLo77qHmCTV78FBjQzOSqjWLaPfAas1hGrOiWjOXbFZVa_Q0MPKRZuS_lj_SzCL98yz108sslTJ9oxpPf5hnq3O0rOyaWkd2VdeUjmZa56vFlN0iX22nO_SYvorJV99T-nau09eUTd2O5avPyPNGvgqlh18UqA8UOLZAdSLHiQXKg9TSAqWljtSDMrIKVDal_lygxtMk8thdoAyUrytUZVTfpVBZdS1UR_sUKq--hWol9TxTqCLp65JCtY36vilUA6mdZ5HqQXPXFKlM2vVtkTpNfYuLVAxdri1SaF6sXCllfLFavL9YrSLzumLlQbkWJeou1VqVKHPrEjWlZYlaSHlDSlQlfTenRB2gJ0dK1GvyDSlVYeQQVaoM9J_kUjWVbi8uVdVUdahUvaX-h0vVMCosLlW3aI3ndbWVJOm6sqOlC6-rLVS5_oZqoOb6v5QL1c3-S2nn_KXGUDotdy5TmWTUl6llvcrUU1OZaqA5X5WptYT7ZcqdJoTfVMvozFbmrptq8ZpytYn6nypXw2n8y3K1iF5qbylLu1sqv0mFekCntBXqOp3IqFCfL6hTkXSy9KMqofh3VpJMx2ts5H90_8vm8phmV7jKAkqrdZcp5FznLjo6kOklR2nwq9YyjMrmh8nfFDYpXHpRw-l-0vxMP2koYBb2k9fe_aWpT3-ZNKC_zKGZYyNlCb0sjhTLkkiJ8YqSUfRBHyVO3lEybmCUTKNlY6Ikg1x_iJJ2VHsmSszPRsmB1tFyhW4FRotrZLR0oMTqaBlP9i-jJYC6OMRIDEX2jZEUWjYmRlbTWtpEWyiHfqG9tJ-O0Qk6TxepgFJqY3j_GGmwNIqdlVF26I2yjz4EGcUp2CjvOhtFE2qUbT2M8kl_o0STkQaRNsYorSl9n1Hm0Y-0k8yuGEVHJeVGqSHte_bom2axsp1OUgnNs4yV9dRvbqwMozbzYyWMNmbEyh7Kyo2V36nmVqw0rYiVtcokO-guvaU8d5NU0Wm9SXIp08ckm8ktyCQdqW8_kxipU4JJ-pD5eJM4UOYSk_xK79aYRLPWJKu2m-Qn2nycSatyTbKR2l43yed0o94kz2i6eZxkUEpEnMyg2ylx8oqeT4yTBuq9Nk4i6WhWnORTaHachO2Lk3jK2B8nOeSXFyfd6Zf6ODlOu1zj5QBFt4-XkVTYM14eUGnfeDkTHi_nkuLlKpmlxosNdRkbLxcWxUs5LX4cL5so9328lJCxa4KcTkwQ2zEJ4k2RExIkgR4VJMgHSn2UIFNoQ02C7KS0IYmymL4bmygH6Pj8RCmi4JWJ0ulYokTR5KuJspyWVCRKNnV7lShxlOSeJGmk8U8SKyptnyRPaFi_JJlB6_snyXfkn5wkPejdsCSxG54kXdazm8MuvT2aJLZ_JEnxpSSppskPkmQFJbsNkGF0ZN4A2bNogJwlh5MDxEB11QPkPT3umyx1NLPTQFlIXo2DpA11o8G0cc1dWVV9TzLJ7dE90dOz4AdST2nPHsgUunfkoTyimyer5W-KLHgkJprXrkaW0LPRNeJ35JnYr3gutpefiwNN7v5C8ia-EDXphexe8kI23nohT-68kJCOtYIBtdI0uVZ-21Arttm1Er-_Vu5erJWH9FVFrWTQbLM6KY-qk7yxdXLq9zpJdHwpD4a-lJiUlzJgdr1UzKmXwp31coPiztbLTPqspl4iqEubV9KDwimaEmkwjaAxNJlm0AJaRhcuv5I8-v7dK_mJqta_FtcNr6X05Wu5SduGvJHA1Dcyd9obWUQn5r2Rs5RQ_0as0CAXrBtE59YgPfUNkrv3rXy67630pJGX3spY6nzzrXQlm9_eyfugRjELbpTywY3y58xGOUv2GY3SkkKLGiWl8h-5WvReiki1-yDrTnyQTRRS-UE60z73jxLe9qNE05ilTTCBnC2bQkfrBzTFRtINaYqLF5rC_VJTrOyqwWr6crkG46jyoAa6Kxp4UcwzDRocm-HAoWbwsDHDU70ZLprMcJUa5phh6GIznFpnhvNkddoMdhSab4a-tJseF5rB3FVhXGeFipaCsZ8IJtL9JEENTfuvYDYNmgMMpR2FwFUHcxTRpQhzXKWfZ5pjJ62fb45uy83R6aA5tv1jjh1U3dECT2lWqAXmRVhgKaWOtUAaVZdZ4BlpGi0AmvqFJWbRidmWOE0vT1qigUY-tMQ4yqVCWl9tiWg_K4wLsEL_jlYw0snPrGATYwUHap1ghRXrrbCaJvxphamUl2uFQvr6nhW-1Vgjm_w6WCOIVna0RmqkNVzGWyN0ojXCaFW6NdbRxxxruJ5k9yO71JG6UlGEDW5Q5RkbHCmywbEbNrC-bQMbCqLaVraw8bWFA7X1s4V3d1t8PsQW0WRbZwtH6mPXHP1orak5sujAiOaYltUc75y0eOupxUc6atRiV7IWzVK1sKBnk7Sop5PTtEhfqMUsqv1Zi6BftWhDXa5q0YtW39BiA1W3tUM9jUqyQ58UO0TQf7fZ4Qj9cNAOC2zt8RWNXWaP0lX2uEmT1thjGh08ZY_VF-yxnpo02ENR3hwHJOxwwECacNoB6fTxogMuwREFlKxzxBAqmOyIL6Y5YjidX-mIqxT7oyOe7XZEPR3d64g9uY44SNY3HbHmviN-eugIrYcTnMjdywmZnZzg2pkzeZKefMiP_MlAQRRC8eFOOLzRCe8KnPCs2Ak5Fs5w_8QZ3hSZ5gwT7T7tjMabzmha7oytfVpgO71NboFbRS1QSemNLTCb5g9uieU0fE9LfEntjrfE079bIuVeS4ymEe9b4jfPVljVoRVGp7XChjAX9Ih1QS_qTU-HuMB_lAuCSbfcBQ7bmPTNDhd47-EadT3EPeR13gV-VFXrgkcU-9oFiTTvvQu2035vHQ7T7wYd9tJ-OkCH6Aj9GaTDkxE61FLEeB2iaVK6Dq-36HDimg5bP-qQQzspNNgV3f8V5oreZNfXFc50LNwVp-hQPGea_40rllBRgStu0JAaV4ygQGc3dKQudNzbDf-jsDlu6E3ui9zgQyHb3fB1tRvWUonGHTepyskdmSHuyKIGek-Zw9wxdLM7RtGJw5wr3TGSDP-4oyLUA72HeyCcBs3wwFBKOe6BVDLP94ANmcw8kUwj9J4YTTNoHh3398QZGt3VE1sme2Ib3cr2RBVVnvfEA0rL98RGalHgidYvPLHYwQsr6FGQF57Tx7ZeMAvxgi7cC57k3s8LxoVe6JnlhQjy3uqFANrZRo99tKa7Hro-enhR3lw9Sqjncj0iqFWWHmeK9bhIQx_q-Zfp0cHgjW7Uk8aO9sZEmr3MG59me8NuszeG5Xjj4iNvrHjsjQyaau-D2bSA8l19MNXPBzPpvtEHa1N9sIEqfvTBpZ99cI2OFPvgBD0p8YHL3z7woPMuvrhKv4b54nfKifFFk1O-WHjJF8vpaZEvXtGKD77IoEHww1BKN_hhOjXv5Ic5nf2wrdIPExxbYxpZBrSGPb0e1xqbJ7fGD_RLG3_sppQQf4ymvkZ_9KPba_xRRetu-2MTvb7nj49kdt8f6TX-mEVraQMdtgjACTpHV6iI_qK8DgEopGL6oWMAcmh1WADfXwAGfxqA4dQiOQCulLU0AFvo4aoAPCHNlQCY039uBCCFLt8KwOl7AbhICfUBGEiTrQzw8jDg2CQDTlHVZAP2phtQvsiAShq0zoBhtDDbgCuHDCiiLncM-JRi3hiQQGP8ArGocyAe9wrEc7qSFoh8Mi0JxB85gZjXPwi-g4MQSLnfB6GA7jQG4dsWwbgcHoxrdDE9GFfpBlVQ-9XBCKWe9Bkl0CBKodE0iabTfFpKq-hb2kw_UvLhYAyhnGPB6HaO55BvXjAM1F21QW9S2jZ4U9AGH-hsZFuYj2wLG4r_tS3mXmyLpZR5py32dG0He2vzrG3bS0R7KfvdZY3eO2Xi5KFpo0alj5mQOnXamKmjpkwfNWVo-5D2nUM-aRfaJqTT0Ekh_weTC_xt"
< document-policy: include-js-call-stacks-in-crash-reports
< server: ESF
< x-xss-protection: 0
< x-frame-options: SAMEORIGIN
< x-content-type-options: nosniff
< set-cookie: NID=534=ZoG9Ybgyh8Y_Zw9mQu4eKNASGXunbchkxY76IEON1qL97VpxWqAJasO6mC1h4YVrY4ivWDIeSDR-RTmwmvGg4SBrDWts7Ewo0qHUfTJKML8uXyQJE2oQz13ayvv4xma2E2_ogOzJdhFP_yjv3_hrBAEnGiuH5W1YKW3AeK3HootISMi5TxENaeVGD4eF1BpPyc7F4Q; expires=Sat, 20-Feb-2027 17:53:26 GMT; path=/; domain=.google.com; HttpOnly
< alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
< accept-ranges: none
< vary: Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site,Accept-Encoding
< x-l2-request-path: l2-managed-9
< 
* TLSv1.2 (IN), TLS header, Supplemental data (23):
<!doctype html><html lang="en" dir="ltr"><head><base href="https://meet.google.com/"><link rel="canonical" href="https://meet.google.com/"><meta name="referrer" content="origin-when-cross-origin"><meta name="viewport" content="width=device-width, initial-scale=1,minimum-scale=1,maximum-scale=1 user-scalable=no"><meta name="google-site-verification" content="J1ZK0YwjP8g0NsiW7RZ81apZBOTks8Wmc1UTz7zI5PI"><meta name="google-site-verification" content="wD8N7i1JTNTkezJ49swvWW48f8_9xveREV4oB-0Hf5o"><link rel="shortcut icon" href="https://www.gstatic.com/images/branding/productlogos/meet_2026/v2/web-24dp/logo_meet_2026_color_1x_web_24dp.png" sizes="24x24"><link rel="shortcut icon" href="https://www.gstatic.com/images/branding/productlogos/meet_2026/v2/web-32dp/logo_meet_2026_color_1x_web_32dp.png" sizes="32x32"><link rel="shortcut icon" href="https://www.gstatic.com/images/branding/productlogos/meet_2026/v2/web-36dp/logo_meet_2026_color_1x_web_36dp.png" sizes="36x36"><link rel="shortcut icon" href="https://www.gstati* TLSv1.2 (IN), TLS header, Supplemental data (23):
c.com/images/branding/productlogos/meet_2026/v2/web-48dp/logo_meet_2026_color_1x_web_48dp.png" sizes="48x48"><link rel="shortcut icon" href="https://www.gstatic.com/images/branding/productlogos/meet_2026/v2/web-64dp/logo_meet_2026_color_1x_web_64dp.png" sizes="64x64"><link rel="shortcut icon" href="https://www.gstatic.com/images/branding/productlogos/meet_2026/v2/web-96dp/logo_meet_2026_color_1x_web_96dp.png" sizes="96x96"><link rel="shortcut icon" href="https://www.gstatic.com/images/branding/productlogos/meet_2026/v2/web-512dp/logo_meet_2026_color_1x_web_512dp.png" sizes="512x512"><title>Google Meet - Online Video Calls, Meetings and Conferencing</title><meta name="description" content="Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers."><meta name="twitter:card" content="summary"/><meta name="twitter:card" content="summary"/><meta property="og:url" content="https://meet.google.com"/><meta property="og:type" content="website"/><meta p* TLSv1.2 (IN), TLS header, Supplemental data (23):
roperty="og:title" content="Meet"/><meta property="og:description" content="Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers."/><meta property="og:image" content="https://www.gstatic.com/images/branding/productlogos/meet_2026/v2/web-512dp/logo_meet_2026_color_1x_web_512dp.png"/></head><body style="height:100%;overflow:hidden;-webkit-font-smoothing:antialiased;color:rgba(0,0,0,0.87);font-family:Roboto,RobotoDraft,Helvetica,Arial,sans-serif;font-weight:400;margin:0;-webkit-text-size-adjust:100%;-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-user-select:none"><div class="root"><div style="padding:32px 64px"><img src="https://www.gstatic.com/images/branding/productlogos/meet_2026/v2/web-96dp/logo_meet_2026_color_2x_web_96dp.png" alt="Meet" style="border:none"></div><div style="color:#5f6368;font-size:20px;font-weight:500;padding-left:16px">Google Meet - Online Video Calls, Meetings and Conferencing</div><div style="color:rgba(0,0,0,0.871);font-size:15px;padding:16px">Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.</div><script type="application/ld+json" nonce="moVtT07FEBWszXqIzSsuaA">{"@context": "https://schema.org", "@type": "Product", "brand": {"@type": "Organization", "name": "Google"}, "name": "Google Meet", "description":  "Real-time meetings by Google. Using your browser, share your video, desktop, and presentations with teammates and customers.", "url": "https://meet.google.com", "logo": "https:\/\/www.gstatic.com\/images\/branding\/productlogos\/meet_2026\/v2\/web-512dp\/logo_meet_2026_color_1x_web_512dp.png", "isRelatedTo": {"@type": "Product", "name": "G Suite"}, "offers": {"@type": "Offer", "availability": "https://schema.org/InStock", "price": "6", "priceCurrency": "USD", "url": "https://gsuite.google.com/"}, "sameAs": [ "https://twitter.com/gsuite", "https://blog.google/products/g-suite/", "https://www.youtube.com/playlist?list=PLU8ezI8GYqs4* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (IN), TLS header, Supplemental data (23):
* TLSv1.2 (OUT), TLS header, Supplemental data (23):
* Connection #0 to host meet.google.com left intact
70EdSOM7gdqgb6caBRGWH", "https://en.wikipedia.org/wiki/Google_Hangouts#Google_Hangouts_Meet", "https://www.wikidata.org/wiki/Q56669074" ]}</script></div></body></html>