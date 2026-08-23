magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-6$ dig https://www.bbc.com/

### dig

; <<>> DiG 9.18.39-0ubuntu0.22.04.2-Ubuntu <<>> https://www.bbc.com/
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 64130
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;https://www.bbc.com/.          IN      A

;; AUTHORITY SECTION:
.                       86394   IN      SOA     a.root-servers.net. nstld.verisign-grs.com. 2026082201 1800 900 604800 86400

;; Query time: 28 msec
;; SERVER: 8.8.8.8#53(8.8.8.8) (UDP)
;; WHEN: Sat Aug 22 23:51:07 IST 2026
;; MSG SIZE  rcvd: 124

### dis-ns

magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-6$ dig ns www.bbc.com

; <<>> DiG 9.18.39-0ubuntu0.22.04.2-Ubuntu <<>> ns www.bbc.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 6568
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 1, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 512
;; QUESTION SECTION:
;www.bbc.com.                   IN      NS

;; ANSWER SECTION:
www.bbc.com.            20900   IN      CNAME   www.bbc.com.pri.bbc.com.
www.bbc.com.pri.bbc.com. 300    IN      CNAME   bbc.map.fastly.net.

;; AUTHORITY SECTION:
fastly.net.             30      IN      SOA     ns1.fastly.net. hostmaster.fastly.com. 2017052201 3600 600 604800 30

;; Query time: 69 msec
;; SERVER: 8.8.8.8#53(8.8.8.8) (UDP)
;; WHEN: Sat Aug 22 23:51:45 IST 2026
;; MSG SIZE  rcvd: 160

### curl command
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-6$ 

HTTP/2 200 
content-type: text/html; charset=utf-8
belfrage-cache-status: MISS
bid: sally
brequestid: cc9cc3c3a28949a18c3daa3217a2c2cd
bsig: c990265b32be2c25ea425fe459b11097
cache-control: public, stale-if-error=90, stale-while-revalidate=30, max-age=30
etag: "3tq7ogemu4dedi"
referrer-policy: no-referrer-when-downgrade
req-svc-chain: FASTLY,GTM,BELFRAGE,BBCX
via: 1.1 BBC-GTM, 1.1 Belfrage, 1.1 varnish
x-content-type-options: nosniff
x-correlation-id: 7f4f49e8-21ad-4b9a-a70f-2f782f1e5b42
x-frame-options: SAMEORIGIN
origin-agent-cluster: ?0
nel: {"report_to":"default","max_age":2592000,"include_subdomains":true,"failure_fraction":0.25}
x-bbc-edge-cache-status: EXPIRED
x-bbc-origin-response-status: 200
report-to: {"group":"default","max_age":2592000,"endpoints":[{"url":"https://default.bbc-reporting-api.app/report-endpoint","priority":1}],"include_subdomains":true}
server: BBC-GTM
strict-transport-security: max-age=31536000; preload
x-robots-tag: bingbot: noarchive
fastly-restarts: 1
accept-ranges: bytes
date: Sat, 22 Aug 2026 18:23:55 GMT
x-fastly-cache-status: HIT-STALE-CLUSTER
x-served-by: cache-qbk-voml4860028-QBK
x-cache: HIT
x-cache-hits: 0
x-timer: S1787423035.270153,VS0,VE81
x-fastly-pre-flight-cache: MISS, MISS
x-fastly-pre-flight-cache-status: MISS-CLUSTER
x-cache-age: 817
x-lb-nocache: true
vary: X-BBC-Edge-Scheme,Accept-Encoding
alt-svc: h3=":443";ma=86400,h3-29=":443";ma=86400,h3-27=":443";ma=86400
content-length: 625663