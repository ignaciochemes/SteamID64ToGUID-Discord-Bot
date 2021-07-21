//  const update = require('../database/discordinfo');
//  const client = require('../index');

//  async function updatedb() {
//      await update.findOneAndUpdate({
//         Servers: client.guilds.cache.size,
//          Users: client.users.cache.size,
//          Channels: client.channels.cache.size
//      });
//      let newData = new update({
//          Servers: client.guilds.cache.size,
//          Users: client.users.cache.size,
//          Channels: client.channels.cache.size
//      });
//      newData.save();
//  }

//  module.exports = updatedb();