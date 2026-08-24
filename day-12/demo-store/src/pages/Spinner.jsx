import { useEffect, useState } from "react";

export default function Spinner() {
  const [status, setStatus] = useState(null);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    window.prerenderReady = false;

    let timer;
    let stopped = false;

    async function pollStatus() {
      try {
        console.log("Fetching /api/status...");

        const response = await fetch(
          "http://127.0.0.1:3000/api/status"
        );

        if (!response.ok) {
          throw new Error(
            `Status API returned ${response.status}`
          );
        }

        const data = await response.json();

        console.log("Status response:", data);

        if (!stopped) {
          setStatus(data.status);
          setPollCount((count) => count + 1);
        }
      } catch (error) {
        console.error(
          "Status polling failed:",
          error
        );
      }

      if (!stopped) {
        timer = setTimeout(
          pollStatus,
          400
        );
      }
    }

    pollStatus();

    return () => {
      stopped = true;

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  useEffect(() => {
    if (status !== null) {
      window.prerenderReady = true;

      console.log(
        "window.prerenderReady = true"
      );
    }
  }, [status]);

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "60px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center"
      }}
    >
      <title>Status Monitor</title>

      <h1>Status Monitor</h1>

      {status === null ? (
        <div>
          <div
            style={{
              fontSize: "50px",
              marginBottom: "20px"
            }}
          >
            ⏳
          </div>

          <h2>Loading status...</h2>

          <p>
            Waiting for the first API response.
          </p>
        </div>
      ) : (
        <div>
          <h2>
            Current status: {status}
          </h2>

          <p>
            The first request has completed.
          </p>

          <p>
            window.prerenderReady is now true.
          </p>

          <p>
            Poll count: {pollCount}
          </p>

          <p>
            This page will continue requesting
            /api/status every 400 milliseconds forever.
          </p>
        </div>
      )}

      <section
        style={{
          marginTop: "40px",
          textAlign: "left",
          lineHeight: "1.6"
        }}
      >
        <p>
          This status monitoring page demonstrates a continuously
          polling application. The page requests the server status
          repeatedly while remaining useful after the first successful
          response. Continuous polling is common in dashboards,
          monitoring systems, notification services, analytics tools,
          and applications that need regularly refreshed information
          without requiring the user to reload the page manually.
        </p>

        <p>
          A prerendering service cannot always assume that network
          silence means a page has finished rendering. This page
          deliberately continues communicating with the server every
          four hundred milliseconds. Because of that behavior, network
          activity may continue long after the important visible
          content has already been rendered and is ready for a crawler
          to consume.
        </p>

        <p>
          The application therefore provides an explicit readiness
          signal through window.prerenderReady. The value starts as
          false when the component mounts. After the first successful
          status response is received and the React state is updated,
          the value changes to true. The prerenderer can then capture
          the page immediately instead of waiting for background
          polling to stop.
        </p>

        <p>
          The renderer also uses a hard render budget so that a broken
          or pathological page cannot occupy a browser slot forever.
          If the application never becomes ready and the network never
          becomes idle, the renderer stops waiting when the maximum
          render time is reached and captures whatever document exists
          at that moment instead of returning an empty response.
        </p>

        <p>
          These two protections solve different problems. The explicit
          readiness signal provides a fast success path when the
          application knows that its important content is ready. The
          hard timeout acts as a safety net when the page behaves
          unexpectedly, continues polling forever, or fails to provide
          a usable readiness signal. Together they make the
          prerendering service more reliable and prevent one unusual
          page from blocking the rendering pipeline.
        </p>

        <p>
          This route is intentionally designed as a hostile test case.
          It keeps performing network requests even after useful page
          content is visible. The page proves that application
          readiness and network inactivity are not the same thing.
          Crawlers should receive the useful rendered content quickly,
          while the background polling process is allowed to continue
          independently.
        </p>
      </section>
    </main>
  );
}