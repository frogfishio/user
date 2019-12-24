FROM node:10-alpine
# COPY .deploy/api.yaml .deploy/start.sh /app/
# COPY templates /app/templates
# COPY build/release/init /app/init
# COPY node_modules /app/node_modules
# RUN chmod 755 /app/start.sh
# CMD /app/start.sh
EXPOSE 8000