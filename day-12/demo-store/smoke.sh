#!/usr/bin/env bash

# =========================================================
# DAY 12 PRERENDER SMOKE TESTS
# =========================================================

BASE_URL="http://localhost:3000"

BOT_UA='Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'

PASS=0
FAIL=0


pass() {
    echo "PASS - $1"
    PASS=$((PASS + 1))
}


fail() {
    echo "FAIL - $1"
    FAIL=$((FAIL + 1))
}


echo ""
echo "========================================"
echo " Prerender Smoke Tests"
echo "========================================"
echo ""


# =========================================================
# CLEAN CACHE FIRST
# =========================================================

rm -rf cache/*


# =========================================================
# TEST 1
# HUMAN REQUEST SHOULD BE PROXIED
# =========================================================

response=$(curl -s -i \
    "$BASE_URL/")

if ! echo "$response" | grep -qi "X-Prerender:"; then
    pass "human request bypasses prerender"
else
    fail "human request bypasses prerender"
fi


# =========================================================
# TEST 2
# SPINNER MUST FINISH WITHIN 10 SECOND BUDGET
# =========================================================

rm -rf cache/*

start=$(date +%s)

response=$(curl -s -i \
    -A "$BOT_UA" \
    "$BASE_URL/spinner")

end=$(date +%s)

elapsed=$((end - start))


if [ "$elapsed" -lt 10 ]; then
    pass "spinner completes within render budget (${elapsed}s)"
else
    fail "spinner completes within render budget (${elapsed}s)"
fi


# Spinner should be prerendered.
if echo "$response" |
    grep -qi "X-Prerender: miss"; then

    pass "spinner prerender MISS"

else

    fail "spinner prerender MISS"

fi


# Spinner rendered content should exist.
if echo "$response" |
    grep -qi "Current status: online"; then

    pass "spinner rendered after prerenderReady"

else

    fail "spinner rendered after prerenderReady"

fi


# =========================================================
# TEST 3
# SOFT 404 MISS
# =========================================================

rm -rf cache/*

response=$(curl -s -i \
    -A "$BOT_UA" \
    "$BASE_URL/product/does-not-exist")


if echo "$response" |
    grep -q "404 Not Found"; then

    pass "ghost product returns 404 on MISS"

else

    fail "ghost product returns 404 on MISS"

fi


if echo "$response" |
    grep -qi "X-Prerender: miss"; then

    pass "ghost product first request is MISS"

else

    fail "ghost product first request is MISS"

fi


if echo "$response" |
    grep -qi "Product Not Found"; then

    pass "ghost product contains rendered not-found body"

else

    fail "ghost product contains rendered not-found body"

fi


# =========================================================
# TEST 4
# SOFT 404 HIT
# =========================================================

response=$(curl -s -i \
    -A "$BOT_UA" \
    "$BASE_URL/product/does-not-exist")


if echo "$response" |
    grep -q "404 Not Found"; then

    pass "ghost product returns 404 on HIT"

else

    fail "ghost product returns 404 on HIT"

fi


if echo "$response" |
    grep -qi "X-Prerender: hit"; then

    pass "ghost product second request is HIT"

else

    fail "ghost product second request is HIT"

fi


# =========================================================
# TEST 5
# SANITY FAIL MUST NOT CACHE
# =========================================================

rm -rf cache/*

response=$(curl -s -i \
    -A "$BOT_UA" \
    "$BASE_URL/sanity-fail")


if echo "$response" |
    grep -qi "X-Prerender: sanity-fallback"; then

    pass "junk snapshot triggers sanity fallback"

else

    fail "junk snapshot triggers sanity fallback"

fi


# Request again.
response=$(curl -s -i \
    -A "$BOT_UA" \
    "$BASE_URL/sanity-fail")


if echo "$response" |
    grep -qi "X-Prerender: sanity-fallback"; then

    pass "junk snapshot was not cached"

else

    fail "junk snapshot was not cached"

fi


if echo "$response" |
    grep -qi "X-Prerender: hit"; then

    fail "sanity-fail incorrectly became cache HIT"

else

    pass "sanity-fail never becomes HIT"

fi


# =========================================================
# TEST 6
# SCRIPT-FREE SNAPSHOT
# =========================================================
#
# Use the ghost 404 because we already know it is cacheable
# and produces a rendered snapshot.
# =========================================================

rm -rf cache/*

curl -s \
    -A "$BOT_UA" \
    "$BASE_URL/product/does-not-exist" \
    > /dev/null


response=$(curl -s \
    -A "$BOT_UA" \
    "$BASE_URL/product/does-not-exist")


if echo "$response" |
    grep -qi "<script"; then

    fail "cached snapshot contains script tags"

else

    pass "cached snapshot is script-free"

fi


# =========================================================
# RESULTS
# =========================================================

echo ""
echo "========================================"
echo " RESULTS"
echo "========================================"
echo "PASS: $PASS"
echo "FAIL: $FAIL"
echo "========================================"
echo ""


if [ "$FAIL" -gt 0 ]; then
    exit 1
fi

exit 0