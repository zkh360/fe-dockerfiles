FROM node:16.13.1-alpine
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories && \
  apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ca-certificates \
  ttf-freefont
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
  && mkdir -p /home/pptruser/Downloads /app /app/uploads \
  && chown -R pptruser:pptruser /home/pptruser \
  && chown -R pptruser:pptruser /app \
  && apk add --update curl \
  && rm -rf /var/cache/apk/*

# Run everything after as non-privileged user.
USER pptruser
