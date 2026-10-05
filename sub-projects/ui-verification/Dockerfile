ARG PLAYWRIGHT_VERSION
FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble

ENV YARN_NODE_LINKER=node-modules \
    NODE_ENV=production \
    NODE_PATH=/opt/ui-verification/node_modules
WORKDIR /opt/ui-verification
RUN corepack enable
COPY package.json yarn.lock ./
RUN yarn install --immutable
COPY runner.cjs ./runner.cjs
CMD ["sleep", "infinity"]
