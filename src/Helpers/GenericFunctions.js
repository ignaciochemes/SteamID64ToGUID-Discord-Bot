/**
 * Formatea segundos de uptime a string legible: "Xd Xh Xm Xs".
 */
export const formatUptime = (uptimeInSeconds) => {
    const days = Math.floor(uptimeInSeconds / 86400);
    const hours = Math.floor((uptimeInSeconds % 86400) / 3600);
    const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
    const seconds = Math.floor(uptimeInSeconds % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};