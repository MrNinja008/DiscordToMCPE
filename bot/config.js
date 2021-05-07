module.exports =

// Botun tam çalışabilmesi için bilgileri doldurup aynı zamanda github'daki plugini sunucunuza eklemelisiniz.
// Github: https://github.com/OguzhanUmutlu/DiscordToMCPE_TR
{
    // https://discord.com/developers sayfasından discord botu oluşturup tokenini alabilirsiniz
    "token": "Discord Tokeninizi Girin",// DEĞİŞTİR
    "prefix": "/",
    "guild": "Sunucu id'nizi girin",// DEĞİŞTİR
    "channel": "Webhook olan kanal id'sini girin",// DEĞİŞTİR
    "talepsistem": {
        "enabled": true,
        "commandopen": "talepolustur",
        "commandchat": "talepgonder",
        "commandclose": "talepkapat",
        "commandopendesc": "Talep oluşturmanızı sağlar",
        "commandchatdesc": "Talebe mesaj göndermenizi sağlar",
        "commandclosedesc": "Talebi kapatmanızı sağlar",
        "category": "Talep kategorisinin id'sini girin"// DEĞİŞTİR
    },
    "vote": {
        "enabled": true,
        "voteguild": "Oyların kayıt edileceği sunucu id'sini girin",// DEĞİŞTİR
        "votechannel": "Oyların kayıt edileceği kanal id'sini girin",// DEĞİŞTİR
        "apikey": "Sunucunun keyini girin"// DEĞİŞTİR
    },
    "server": {
        // Bağlanılacak server
        "ip": "Sunucu ipsini girin",// DEĞİŞTİR
        "port": 19132,// Server portu
        "rcon": {
            // Rcon açık olursa ban atma gibi işlemleri yapabilirsiniz.
            // server.properties'ten de açık olması gerekir.
            "enabled": true,
            "password": "Rcon şifresini girin."// DEĞİŞTİR
        }
    }
}
