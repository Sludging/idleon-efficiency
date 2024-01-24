#!/usr/bin/env bash

# Get the current prefix by extracting it from the next.config.js file.
CURRENT_PATCH=$(grep -P -o '^const currentPatch = "\K[a-zA-Z0-9\.-]*' next.config.js)

if [ "$NODE_ENV" = "production" ] || [ "$NODE_ENV" = "preview" ]; then
    echo "Uploading latest build files to idleon-efficiency-images/${CURRENT_PATCH}/_next/static"

    # This should always be executed from the root of the repo, or the pathing won't be correct.
    aws s3 sync .next/static s3://idleon-efficiency-images/${CURRENT_PATCH}/_next/static --acl bucket-owner-full-control --cache-control max-age=2592000,public --expires 2044-01-01T00:00:00Z
else
    echo "Skipping upload, not in production (${NODE_ENV})"
fi

