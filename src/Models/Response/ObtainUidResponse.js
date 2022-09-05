class ObtainUidResponse {
    cfToolsUid = null;
    bohemiaUid = null;
    steamId = null;

    constructor(cfToolsUid, bohemiaUid, steamId) {
        this.cfToolsUid = cfToolsUid ? cfToolsUid : null;
        this.bohemiaUid = bohemiaUid ? bohemiaUid : null;
        this.steamId = steamId ? steamId : null;
    }
}

module.exports = { ObtainUidResponse };