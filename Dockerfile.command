FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build
WORKDIR /app
COPY ePunla.Command.API/*.csproj ./ePunla.Command.API/
COPY ePunla.Command.Business/*.csproj ./ePunla.Command.Business/
COPY ePunla.Command.DAL/*.csproj ./ePunla.Command.DAL/
COPY ePunla.Command.Domain/*.csproj ./ePunla.Command.Domain/
COPY ePunla.Common.Utilitites/*.csproj ./ePunla.Common.Utilitites/

RUN dotnet restore "ePunla.Command.API/ePunla.Command.API.csproj"

COPY ePunla.Command.API/. ./ePunla.Command.API/
COPY ePunla.Command.Business/. ./ePunla.Command.Business/
COPY ePunla.Command.DAL/. ./ePunla.Command.DAL/
COPY ePunla.Command.Domain/. ./ePunla.Command.Domain/
COPY ePunla.Common.Utilitites/. ./ePunla.Common.Utilitites/


WORKDIR /app
RUN dotnet publish "ePunla.Command.API/ePunla.Command.API.csproj" -c Release -o out

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS runtime
COPY --from=build /app/out ./
CMD ASPNETCORE_URLS=http://*:$PORT dotnet ePunla.Command.API.dll