FROM azul/zulu-openjdk-alpine:21-jre
EXPOSE 13780

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

ENTRYPOINT java -jar /app.jar