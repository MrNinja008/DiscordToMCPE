module.exports =

// Botun tam çalışabilmesi için bilgileri doldurup aynı zamanda github'daki plugini sunucunuza eklemelisiniz.
// Github: https://github.com/OguzhanUmutlu/DiscordToMCPE_TR
{
    // https://discord.com/developers sayfasından discord botu oluşturup tokenini alabilirsiniz
    "token": "ODAwMDc3NjExMDE0Njg0NzAy.YAM4Vw.8yhpNs8ah9_l2PyB484F934S7x0",// DEĞİŞTİR
    "prefix": "/",
    "guild": "839920222256889866",// DEĞİŞTİR
    "channel": "840144346817101844",// DEĞİŞTİR
    "talepsistem": {
        "enabled": true,
        "commandopen": "talepolustur",
        "commandchat": "talepgonder",
        "commandclose": "talepkapat",
        "commandopendesc": "Talep oluşturmanızı sağlar",
        "commandchatdesc": "Talebe mesaj göndermenizi sağlar",
        "commandclosedesc": "Talebi kapatmanızı sağlar",
        "category": "840164568310480896"// DEĞİŞTİR
    },
    "vote": {
        "enabled": true,
        "voteguild": "839920222256889866",// DEĞİŞTİR
        "votechannel": "840256818445287465",// DEĞİŞTİR
        "apikey": "7RJzs8YYzP6hjigTFOxgz6e8kPW1eyxXNy"// DEĞİŞTİR
    },
    "server": {
        // Bağlanılacak server
        "ip": "free1.idley.gg",// DEĞİŞTİR
        "port": 31487,// Server portu
        "rcon": {
            // Rcon açık olursa ban atma gibi işlemleri yapabilirsiniz.
            // server.properties'ten de açık olması gerekir.
            "enabled": true,
            "password": "ananinamiyanipic"// DEĞİŞTİR
        }
    }
}