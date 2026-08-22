magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-2$ curl -s https://www.zoho.com/ | grep -o  "<title>[^<]*</title>"
<title>Zoho | Cloud Software Suite for Businesses</title>
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-2$ curl -s https://www.flipkart.com/ | grep -o  "<title>[^<]*</title>"
<title>Flipkart reCAPTCHA</title>
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-2$ curl -s https://www.zomato.com/ | grep -o  "<title>[^<]*</title>"
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-2$ curl -s https://web.whatsapp.com/ | grep -o  "<title>[^<]*</title>"
magudesh@LAPTOP-9ODR7CHM:~/prerendering_learning/prerender-training/day-2$ curl -s https://www.indiatoday.in/ | grep -o  "<title>[^<]*</title>"
<title>Latest News, Breaking News Today - Entertainment, Cricket, Business, Politics - India Today</title>


#summary 
here title exatracted for flipkart,zoho and india today but it can't extracted from whatsapp and zomata.