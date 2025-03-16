?FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
RUN apt update && apt install nodejs npm -y
WORKDIR /src
COPY ["Gamebook.Server/Gamebook.Server.csproj", "Gamebook.Server/"]
COPY ["gamebook.client/gamebook.client.esproj", "gamebook.client/"]
RUN dotnet restore "Gamebook.Server/Gamebook.Server.csproj"
COPY . .
WORKDIR "/src/Gamebook.Server"
RUN dotnet build "Gamebook.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Gamebook.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Gamebook.Server.dll"]