# Exercise 4 — The three integration architectures

Note: this file captures the analysis for each model (what to mark on your diagram,
and the trade-off sentence). The exercise itself requires you to hand-draw and
photograph the three diagrams into `day06/` — this markdown isn't a substitute for
that, it's the reference to draw from and the write-up to go alongside your photos.

---

## (a) Origin middleware

A module inside the site's own server checks the User-Agent on every incoming
request. If it's a bot, the module serves a pre-rendered snapshot itself. If it's
a human, the request passes through untouched to the normal app.

```
Visitor/bot -> Origin server -> [middleware checks UA]
                                     |-- bot   --> serve snapshot
                                     |-- human --> normal app
```

- **Where bot traffic diverges from human traffic:** inside the origin server's own
  request-handling code, before the normal app logic runs.
- **Who terminates TLS:** the origin — nothing changes about the TLS setup they
  already have.
- **What happens to human latency:** unaffected. Humans never touch anything new;
  the middleware check is a negligible in-process branch.
- **What happens if your service is down:** only the bot-serving branch fails.
  If the middleware is written defensively (catches errors, falls through to the
  normal app on failure), the rest of the site is unaffected. If it's written
  carelessly, a bug here can crash the whole origin process.

**Trade-off sentence:** Zero extra network hops for anyone, but your code runs
inside someone else's server process, so a bug in your code is a bug in their site.

---

## (b) Edge worker

A Cloudflare Worker (or equivalent) sits in front of the origin. It checks the
User-Agent and either fetches a snapshot from your prerender service, or forwards
the request on to the origin unchanged.

```
Visitor/bot -> Edge worker (TLS terminates here) -> [checks UA]
                                                          |-- bot   --> fetch from prerender service
                                                          |-- human --> forward to origin, unchanged
```

- **Where bot traffic diverges from human traffic:** at the edge, before the
  request ever reaches the origin.
- **Who terminates TLS:** the edge worker/CDN, not the origin.
- **What happens to human latency:** one small extra hop at the edge. Usually
  negligible since edge nodes are geographically close to the visitor.
- **What happens if your service is down:** if the worker is written to fail
  open (catch the failure and just forward to origin), only bot traffic is
  affected — humans keep working normally. This is the best failure isolation
  of the three models.

**Trade-off sentence:** Best failure isolation of the three, but you're
constrained by whatever the edge platform allows (execution time limits, no
persistent state), and you don't own the infrastructure you're running on.

---

## (c) Full DNS proxy

The site's DNS points directly at your server. You terminate TLS and inspect
every single request — bot or human — before deciding whether to answer it
yourself or forward it on to the real origin.

```
Visitor/bot -> DNS resolves to your server (TLS terminates here) -> [checks UA]
                                                                          |-- bot   --> serve snapshot directly
                                                                          |-- human --> forward to real origin
```

- **Where bot traffic diverges from human traffic:** at your server — you see
  100% of traffic before any of it reaches the real origin.
- **Who terminates TLS:** your server, for every visitor, human and bot alike.
- **What happens to human latency:** depends on where your server sits relative
  to the origin and the visitor. Could add a real, noticeable hop if you're not
  geographically close to both.
- **What happens if your service is down:** the entire site becomes
  unreachable. There is no "origin" to fail open to — you are the front door,
  full stop.

**Trade-off sentence:** Maximum control — you see and can act on every request
— but maximum blast radius, since you become a single point of failure for a
site you don't own.

---

## Summary

| Model | Fork point | TLS terminates at | Human latency impact | If your service is down |
|---|---|---|---|---|
| (a) Origin middleware | Inside origin's own code | Origin | None | Only bot path fails (if written defensively) |
| (b) Edge worker | CDN edge, in front of origin | Edge worker | Small extra hop | Only bot path fails (if fails open) |
| (c) Full DNS proxy | Your own server | Your server | Depends on your server's location | Entire site goes down |

The general pattern: the further out you move the fork point (origin → edge →
full proxy), the more control and visibility you gain over traffic, but the
more of the site's availability now depends on you.