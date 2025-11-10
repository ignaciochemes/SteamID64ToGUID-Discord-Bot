-- Permitir GUIDs duplicados en guid_conversions
-- Se elimina la restricción UNIQUE y se agrega un índice no único

ALTER TABLE IF EXISTS guid_conversions
    DROP CONSTRAINT IF EXISTS guid_conversions_guid_key;

CREATE INDEX IF NOT EXISTS idx_guid_conversions_guid
    ON guid_conversions (guid);