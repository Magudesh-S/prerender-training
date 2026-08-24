const { isVerifiedBot } = require('./verifier');

const GOOGLEBOT_UA =
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
const REAL_GOOGLEBOT_IP = '66.249.66.1';
const YOUR_IP = '36.255.17.7'; 
const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0';

(async () => {
  const a = await isVerifiedBot(GOOGLEBOT_UA, REAL_GOOGLEBOT_IP);
  console.assert(a.verified === true, 'real crawler IP + matching UA should verify', a);

  const b = await isVerifiedBot(GOOGLEBOT_UA, YOUR_IP);
  console.assert(b.verified === false, 'your IP + Googlebot UA must be rejected', b);

  const c = await isVerifiedBot(BROWSER_UA, YOUR_IP);
  console.assert(c.bot === null && c.verified === false, 'browser UA should not be a bot', c);

  console.log({ a, b, c });
})();