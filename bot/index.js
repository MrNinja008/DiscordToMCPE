let Discord = null;try {Discord = require("discord.js");} catch(e) {
// Eğer bu satıra atan bir hata alıyorsan alttaki yazıyı oku.
throw new Error("discord.js modülünü yüklemelisin!");}



let fs = null;try {fs = require("fs");} catch(e) {
// Eğer bu satıra atan bir hata alıyorsan alttaki yazıyı oku.
throw new Error("fs modülünü yüklemelisin!");}

let request = null;try {request = require("request");} catch(e) {
// Eğer bu satıra atan bir hata alıyorsan alttaki yazıyı oku.
throw new Error("request modülünü yüklemelisin!");}

const client = new Discord.Client();
function r(t){return t;}
let chalk = {red:r,greenBright:r,blue:r,orange:r};try{chalk = require("chalk");}catch(e){console.log("chalk modülü bulunamadı, yazılar renkli olmayacak.")}
const config = require("./config.js");

let db = null;try {db = require("quick.db");console.log(chalk.greenBright("Veritabanı merkezi quick.db olarak belirlendi."));} catch(e) {try {let {JsonDatabase} = require("wio.db");db = new JsonDatabase("wiodata");console.log(chalk.greenBright("Veritabanı merkezi wio.db olarak belirlendi."));} catch(e) {try {require("fs");db = require("./jsondb.js");console.log(chalk.greenBright("Veritabanı merkezi JSON(fs) olarak belirlendi."));} catch(e) {
// Eğer bu satıra atan bir hata alıyorsan alttaki yazıyı oku.
throw new Error(chalk.red("wio.db, quick.db veya fs modülünü yüklemelisin!"));}}}
client.db = db;
client.chalk = chalk;
client.config = config;
client.request = request;

client.on("ready", async () => {
    console.log(chalk.greenBright("Token doğrulandı, giriş yapıldı ve bot aktif edildi."));
    let guild = client.guilds.cache.get(config.vote.voteguild);
    if(config.vote.enabled && guild && guild.channels.cache.get(config.vote.votechannel) && guild.channels.cache.get(config.vote.votechannel).type == "text") {
        let kanal = guild.channels.cache.get(config.vote.votechannel);
        setInterval(function(){
            request("https://minecraftpocket-servers.com/api/?object=servers&element=voters&key="+config.vote.apikey+"&month=current&format=json", (err,res)=>{
                if(err) return console.log(err);
                // Eğer bu satıra gelen bir hata verdiyse API keyiniz hatalıdır. Configden düzeltin.
                if(res.body == "Error: server key not found") throw new Error("Geçersiz API anahtarı.");
                let votes = JSON.parse(res.body).voters;
                let votesLog = db.get("votes") || [];
                votes.forEach(i=> {
                    let index = votes.indexOf(i);
                    if(votesLog.some(a=> a.nickname == i.nickname && a.votes > i.votes)) {
                        votes[index] = i;
                        kanal.send(i.nickname+" bu ay "+(i.votes+1)+". kez oy verdi!");
                    } else if(!votesLog.some(a=> a.nickname == i.nickname)) {
                        votes.push(i);
                        kanal.send(i.nickname+" sunucuya oy verdi!");
                    }
                });
                db.set("votes", votes);
            })
        }, 10000);
    }
    if(config.talepsistem.enabled) {
        try {
            let {Rcon} = require("rcon-client");
            let rcon = new Rcon({host: config.server.ip,port: config.server.port,password: config.server.rcon.password});
            try {
                rcon.connect().then(async e=>{
                    await rcon.send("registercmd 0 \"" +config.talepsistem.commandopen+"\" \""+config.talepsistem.commandopendesc+"\"");
                    await rcon.send("registercmd 1 \"" +config.talepsistem.commandclose+"\" \""+config.talepsistem.commandclosedesc+"\"");
                    await rcon.send("registercmd 2 \"" +config.talepsistem.commandchat+"\" \""+config.talepsistem.commandchatdesc+"\"");
                    rcon.end();
                })
            }catch(e){console.log("Hatalı rcon şifresi girildiğinden komutlar oluşturulamadı.")}
        }catch(e){console.log("`rcon-client` modülü bulunamadı.")}
    }
    client.cmds = fs.readdirSync("./commands").filter(i=> i.endsWith(".js") && typeof(require("./commands/"+i)) == "object").map(i=> {
        return {
            name: require("./commands/"+i).name,
            execute: require("./commands/"+i).execute,
            file: i
        };
    });
    client.cmds.forEach(i=> {
        if(typeof(i.name) != "string") throw new Error("İsimsiz komut: "+i.file);
        if(typeof(i.execute) != "function") throw new Error("Fonksiyonsuz komut: "+i.file);
    });
})

async function onMessage(m){
    let {prefix} = config;
    if(!m.content.startsWith(prefix) || m.author.bot || m.channel.type != "text") return;
    let arg = m.content.split(prefix)[1].split(" ");
    let komut = arg[0];
    let args = arg.slice(1);
    if(client.cmds.map(i=> i.name).includes(komut)) {
        komut = client.cmds.filter(i=> i.name == komut)[0];
        komut.execute(m, args, config);
    }
}

async function onWebhookMessage(m){
    if(m.channel.id != config.channel || !m.author.bot) return;
    m.content = m.content.split("").slice(0,m.content.length-6).join("");
    require("./server/events/EventListener")(m.content.split(";")[0], m.content.split(";")[1], m.content.split(";")[2]);
}

async function talepHandler(m){
    let talepler = await db.fetchAll();
    if(m.author.bot) return;
    if(talepler[0] && talepler[0].ID) {
        talepler.filter(i=> i.ID.startsWith("talep_")).forEach(i=> {
            if(i.data.channelID == m.channel.id) {
                try {
                    let {Rcon} = require("rcon-client");
                    let rcon = new Rcon({host: config.server.ip,port: config.server.port,password: config.server.rcon.password});
                    try {
                        rcon.connect().then(async e=>{
                            await rcon.send("taleprcon "+i.data.playerName +" \"§e§lTALEP §r§c"+m.author.tag+" §a> §b"+m.content+"\"");
                            rcon.end();
                        })
                    }catch(e){m.reply("Hatalı rcon şifresi girildiğinden mesaj atılamadı.")}
                }catch(e){m.reply("`rcon-client` modülü bulunamadı.")}
            }
        })
    } else if(db.pin){
        Object.keys(talepler).forEach(i=> {
            if(!i.startsWith("talep_")) {
                delete talepler[i];
            } else if(talepler[i].channelID == m.channel.id) {
                try {
                    let {Rcon} = require("rcon-client");
                    let rcon = new Rcon({host: config.server.ip,port: config.server.port,password: config.server.rcon.password});
                    try {
                        rcon.connect().then(async e=>{
                            await rcon.send("taleprcon "+i.data.playerName +" \"§e§lTALEP §r§c"+m.author.tag+" §a> §b"+m.content+"\"");
                            rcon.end();
                        })
                    }catch(e){m.reply("Hatalı rcon şifresi girildiğinden mesaj atılamadı.")}
                }catch(e){m.reply("`rcon-client` modülü bulunamadı.")}
            }
        });
    }
}

client.on("message", async m => {
    await onMessage(m);
    await onWebhookMessage(m);
    await talepHandler(m);
})

client.login(config.token)
.catch(e => {
    if(e.code == "TOKEN_INVALID") {
        // Eğer bu satıra atan bir hata alıyorsan alttaki yazıyı oku.
        throw new Error("Hatalı token! Lütfen config.js'teki tokeni kontrol et.");
    } else console.error(e);
})

/*

Bir sorun ile karşılaştırsanız bana mesaj atmaktan çekinmeyin:
Discord: Oğuzhan#6561

*/
module.exports = {getClient:function(){return client;}};