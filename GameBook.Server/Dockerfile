# Stage 1: Build React app
FROM node:20 AS node-build
WORKDIR /app/ClientApp
COPY ClientApp/package.json ClientApp/package-lock.json ./
RUN npm install
RUN npm run build

# Stage 2: Build .NET app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
RUN apt update && apt install nodejs npm -y
WORKDIR /src
COPY ["GameBook.Server/GameBook.Server.csproj", "GameBook.Server/"]
# Ujisti se, že máš správné soubory
COPY ["gamebook.client/gamebook.client.esproj", "gamebook.client/"]
RUN dotnet restore "./GameBook.Server/GameBook.Server.csproj"
COPY . .
WORKDIR "/src/GameBook.Server"
RUN dotnet build "./GameBook.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Stage 3: Publish the app
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./GameBook.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final Stage: Run app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GameBook.Server.dll"]
