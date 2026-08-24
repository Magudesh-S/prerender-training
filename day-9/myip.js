#!/usr/bin/env node
/**
 * check-my-ip.js — fetch your own public IP and check it against the
 * live GPTBot / OAI-SearchBot ranges.
 *
 * Expected result: NOT in range, for both bots — you're a person on a
 * home/office/ISP connection, not OpenAI's crawler infrastructure. If
 * this ever prints "true," something's very wrong (or you're running
 * this from inside OpenAI's cloud).
 *
 * Usage: node check-my-ip.js
 */

const { getRanges, ipInRanges } = require("./ranges");

async function main() {
  console.log("Fetching your public IP (equivalent to curl ifconfig.me)...\n");
  const res = await fetch("https://ifconfig.me/ip");
  const myIP = (await res.text()).trim();
  console.log(`Your public IP: ${myIP}\n`);

  for (const botId of ["gptbot", "oai-searchbot"]) {
    const cidrs = await getRanges(botId);
    const inRange = ipInRanges(myIP, cidrs);
    console.log(`  ${botId}: ${inRange ? "⚠️  INSIDE range" : "not in range (expected)"}`);
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});