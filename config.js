module.exports =

// Botun tam çalışabilmesi için bilgileri doldurup aynı zamanda github'daki plugini sunucunuza eklemelisiniz.
// Github: https://github.com/OguzhanUmutlu/DiscordToMCPE_TR
{
    // https://discord.com/developers sayfasından discord botu oluşturup tokenini alabilirsiniz
    "token": "Discord botunun tokeni",// DEĞİŞTİR
    "prefix": "/",
    "guild": "Sunucunuzun id'si",// DEĞİŞTİR
    "channel": "Webhook'un kayıtlı olduğu kanal id'si",// DEĞİŞTİR
    "talepsistem": {
        "enabled": true,
        "commandopen": "talepolustur",
        "commandchat": "talepgonder",
        "commandclose": "talepkapat",
        "commandopendesc": "Talep oluşturmanızı sağlar",
        "commandchatdesc": "Talebe mesaj göndermenizi sağlar",
        "commandclosedesc": "Talebi kapatmanızı sağlar",
        "category": "Talep kategorisinin id'si"// DEĞİŞTİR
    },
    "server": {
        // Bağlanılacak server
        "ip": "Server ipsi",// DEĞİŞTİR
        "port": 19132,// Server portu
        "rcon": {
            // Rcon açık olursa ban atma gibi işlemleri yapabilirsiniz.
            // server.properties'ten de açık olması gerekir.
            "enabled": true,
            "password": "Rcon şifresi"// DEĞİŞTİR
        }
    }
}