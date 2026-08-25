import fs from "node:fs/promises";
import path from "node:path";
import {
  spawnSync,
} from "node:child_process";

async function main() {
  const files =
    await fs.readdir("cache");

  const snapshots =
    files.filter(
      (file) =>
        file.endsWith(".json")
    );

  let failures = 0;

  for (const file of snapshots) {
    const hash =
      path.basename(
        file,
        ".json"
      );

    console.log("");
    console.log(
      `===== ${hash} =====`
    );

    const result =
      spawnSync(
        process.execPath,
        [
          "inspect-snapshot.js",
          hash,
        ],
        {
          stdio: "inherit",
        }
      );

    if (result.status !== 0) {
      failures++;
    }
  }

  console.log("");

  if (failures === 0) {
    console.log(
      "All snapshots healthy."
    );
  } else {
    console.log(
      `${failures} unhealthy snapshot(s).`
    );

    process.exit(1);
  }
}

main();