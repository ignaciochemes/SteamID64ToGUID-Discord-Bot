-- Esquema base para la migración a PostgreSQL
-- Crea tablas, constraints e índices necesarios para el bot

-- Usuarios (Discord)
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    discord_user_id TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Catálogo de juegos/servicios
CREATE TABLE IF NOT EXISTS games (
    key TEXT PRIMARY KEY,
    display_name TEXT NOT NULL
);

-- Servidores configurados por usuario y juego
CREATE TABLE IF NOT EXISTS user_servers (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    game_key TEXT NOT NULL REFERENCES games(key),
    host TEXT NOT NULL,
    query_port INTEGER NOT NULL DEFAULT 2302,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT uq_user_game UNIQUE (user_id, game_key)
);

-- Log de comandos ejecutados
CREATE TABLE IF NOT EXISTS commands_log (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    command_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Conversiones GUID (SteamID64 -> GUID)
CREATE TABLE IF NOT EXISTS guid_conversions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    steam_id64 TEXT NOT NULL,
    guid CHAR(32) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_guid_hex CHECK (guid ~ '^[0-9a-f]{32}$'),
    CONSTRAINT chk_steam_id64_digits CHECK (steam_id64 ~ '^[0-9]{17}$')
);

-- Conversiones UID (SteamID64 -> CFTools/Bohemia UID)
CREATE TABLE IF NOT EXISTS uid_conversions (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    steam_id64 TEXT NOT NULL,
    cftools_uid VARCHAR(64) NOT NULL,
    bohemia_uid VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_uid_steam_id64_digits CHECK (steam_id64 ~ '^[0-9]{17}$'),
    CONSTRAINT uq_uid_steam_pair UNIQUE (steam_id64, cftools_uid)
);

-- Pings a servidores (cache/observabilidad opcional)
CREATE TABLE IF NOT EXISTS server_pings (
    id BIGSERIAL PRIMARY KEY,
    server_id BIGINT NOT NULL REFERENCES user_servers(id) ON DELETE CASCADE,
    status TEXT NOT NULL,
    ping_ms INTEGER,
    raw JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Estadísticas diarias (agregados opcionales)
CREATE TABLE IF NOT EXISTS stats_daily (
    day DATE PRIMARY KEY,
    commands_total INTEGER NOT NULL DEFAULT 0,
    guid_conversions_total INTEGER NOT NULL DEFAULT 0,
    uid_conversions_total INTEGER NOT NULL DEFAULT 0
);

-- Índices recomendados
CREATE INDEX IF NOT EXISTS idx_commands_log_user_id ON commands_log (user_id);
CREATE INDEX IF NOT EXISTS idx_commands_log_cmd_created_at ON commands_log (command_name, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_guid_conversions_user_created ON guid_conversions (user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_uid_conversions_user_created ON uid_conversions (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_server_pings_server_created ON server_pings (server_id, created_at DESC);