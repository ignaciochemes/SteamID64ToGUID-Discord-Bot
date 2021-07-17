const express = require('express');
const { auth } = require('../auth');
//const PrefixSchema = require('../../database/prefix');
const { route } = require('./routing');
const router = express.Router();

router.get("/dash", auth, (req, res) => {
    let servidores = [];
    let guilds = req.user.guilds.filter(p => (p.permissions & 8) === 8);
    for (let key in guilds) {
        if(req.BotClient.guilds.cache.get(guilds[key].id)) {
            servidores.push({
                status: true,
                id: req.BotClient.guilds.cache.get(guilds[key].id).id,
                name: req.BotClient.guilds.cache.get(guilds[key].id).name,
                icon: req.BotClient.guilds.cache.get(guilds[key].id).icon
            })
        } else {
            servidores.push({
                status: false,
                id: guilds[key].id,
                name: guilds[key].name,
                icon: guilds[key].icon
            })
        }
    }
    
    res.render('partials/dash', {
    //res.json({
    user: req.user,
    servidores
  });
});

// router.get('/dash2', (req, res) => {
//     res.json({
//         user: req.user,
//         bot: req.BotClient
//         //canales: servidor.channels.cache
//     });
// })

router.post('/dash/:id/prefix', (req, res) => {
    let newPrefix = req.body.prefix;
    let nuevoPrefix = new PrefixSchema({
        Prefix: newPrefix,
        GuildID: req.params.id,
    });

    nuevoPrefix.save((error, dato) => {
    });
    res.redirect(`/dash/${req.params.id}`)
});

router.get("/dash/:id", auth, async (req, res) => {
    
    let prefix = await PrefixSchema.findOne({GuildID: req.params.id});
    
    res.render('partials/formulario', {
        id: req.params.id
    });
//   let id = req.params.id;
//   let servidor = req.BotClient.guilds.cache.get(id);
//     console.log(emojis);

//   res.json({
//       servidor,
//       canales: servidor.channels.cache,
//       roles: servidor.roles.cache,
//       emojis: servidor.emojis.cache
//   });
//   res.render("dash", {
//     user: req.user,
//     servidor,
//     canales,
//   });
});


  
module.exports = router;