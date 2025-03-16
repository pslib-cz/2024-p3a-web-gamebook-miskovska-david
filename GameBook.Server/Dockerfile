# Stage 1: Build React app using official Node.js 20 image
FROM node:20 AS node-build
WORKDIR /app/ClientApp

# Kopíruj package.json a package-lock.json pro instalaci závislostí
COPY ClientApp/package.json ClientApp/package-lock.json ./
RUN npm install
RUN npm run build

# Stage 2: Build .NET app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Kopíruj .csproj soubory pro .NET projekt
COPY ["GameBook.Server/GameBook.Server.csproj", "GameBook.Server/"]
COPY ["gamebook.client/gamebook.client.esproj", "gamebook.client/"]

# Obnovení .NET závislostí
RUN dotnet restore "./GameBook.Server.csproj"
COPY . .
WORKDIR "/src/GameBook.Server"
RUN dotnet build "./GameBook.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Stage 3: Publish .NET app
FROM build AS publish
RUN dotnet publish "./GameBook.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final Stage: Run app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GameBook.Server.dll"]
