class ObtainGuidResponse {
    guid = null;
    steamId = null;

    constructor(guid, steamId) {
        this.guid = guid ? guid : null;
        this.steamId = steamId ? steamId : null;
    }
}

module.exports = { ObtainGuidResponse };