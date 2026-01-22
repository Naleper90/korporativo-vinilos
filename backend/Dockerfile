# Build stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# El flag -Dmaven.test.skip=true es más agresivo que -DskipTests
# Evita compilar los tests por completo
RUN mvn clean package -Dmaven.test.skip=true

# Run stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]
