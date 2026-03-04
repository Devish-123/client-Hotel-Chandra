# Stage 1 - Build
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2 - Run
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 10000
ENV PORT=10000
ENTRYPOINT ["java", "-XX:TieredStopAtLevel=1", "-Xms64m", "-Xmx256m", "-jar", "app.jar"]