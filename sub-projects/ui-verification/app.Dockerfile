FROM node:24-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable && corepack prepare yarn@4.5.1 --activate
WORKDIR /workspace
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install --immutable && mkdir -p .next
COPY sub-projects/ui-verification/app-entrypoint.sh /usr/local/bin/ui-app-entrypoint
COPY sub-projects/ui-verification/app-healthcheck.cjs /usr/local/bin/ui-app-healthcheck.cjs
RUN chmod +x /usr/local/bin/ui-app-entrypoint
EXPOSE 3000
ENTRYPOINT ["/usr/local/bin/ui-app-entrypoint"]
