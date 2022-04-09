FROM golang:1.16.12-alpine3.15 as build
ENV OSSUTIL_VERSION 1.7.8
WORKDIR /go/src/aliyun
RUN apk add --no-cache curl && \
    curl -Lo /go/src/aliyun/ossutil.zip https://github.com/aliyun/ossutil/archive/${OSSUTIL_VERSION}.zip && \
    unzip /go/src/aliyun/ossutil.zip && \
    cd ossutil-${OSSUTIL_VERSION} && \
    go mod init github/com/aliyun/ossutil-${OSSUTIL_VERSION} && \
    go mod tidy && \
    go get && \
    go env -w GO111MODULE=auto && \
    go build ossutil.go && \
    cp ossutil /

FROM alpine:3.15
ENV OSSUTIL_VERSION 1.7.8
LABEL maintainer="zkh-fe"
COPY --from=build /ossutil /usr/local/bin/ossutil
COPY .ossutilconfig /root
