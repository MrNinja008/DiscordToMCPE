module.exports =

// Botun tam çalışabilmesi için bilgileri doldurup aynı zamanda github'daki plugini sunucunuza eklemelisiniz.
// Github: https://github.com/OguzhanUmutlu/DiscordToMCPE_TR
{
    // https://discord.com/developers sayfasından discord botu oluşturup tokenini alabilirsiniz
    "token": "Discord Tokeninizi Girin",// DEĞİŞTİR
    "prefix": "/",
    "guild": "Sunucu id'nizi girin",// DEĞİŞTİR
    "logger": {
        "consoleCommand": {
            // Konsolda bir komut çalıştığında harekete geçer.
            // Değişkenler: {command}
            "enabled": false,
            "channel": {
                "guildID": "123456789012345678",
                "channelID": "123456789012345678"
            },
            "message": "Konsolda {command} komudu çalıştırıldı."
        },
        "playerchat": {
            // Bir oyuncu mesaj yazdığında harekete geçer.
            // Değişkenler: {player}, {message}
            "enabled": false,
            "channel": {
                "guildID": "123456789012345678",
                "channelID": "123456789012345678"
            },
            "message": "{player} > {message}"
        },
        "playercommand": {
            // Bir oyuncu komut yazdığında harekete geçer.
            // Değişkenler: {player}, {command}
            "enabled": false,
            "channel": {
                "guildID": "123456789012345678",
                "channelID": "123456789012345678"
            },
            "message": "{player} > /{command}"
        },
        "playerdeath": {
            // Bir oyuncu öldüğünde harekete geçer.
            // Değişkenler: {player}, {killer}
            "enabled": false,
            "channel": {
                "guildID": "123456789012345678",
                "channelID": "123456789012345678"
            },
            "messages": {
                "byPlayer": "{player}, {killer} tarafından öldürüldü.",
                "forReason": [
                    "{player} bir şeye dokunarak öldü.",
                    "{player} canlı tarafından öldürüldü.",
                    "{player} vuruldu.",
                    "{player} bloğun içinde sıkışarak öldü.",
                    "{player} yere düşerek öldü.",
                    "{player} ateşte öldü.",// ateşin içindeyken ölme
                    "{player} yanarak öldü.",// ateşten veya lavdan çıkıp kalan ateş yüzünden ölme
                    "{player} lavda yüzebileceğini sandı.",
                    "{player} boğularak öldü.",
                    "{player} blok tarafından patlatıldı.",
                    "{player} canlı tarafından patlatıldı.",//tnt, ateş topu vs.
                    "{player} boşluğa düşerek öldü.",
                    "{player} intihar etti :(",
                    "{player} büyü ile öldürüldü.",
                    "{player} gizemli bir yolla öldürüldü?!",
                    "{player} açlıktan öldü."
                ],
                "nothing": "{player} öldü."
            }
        },
        "playerjoin": {
            // Bir oyuncu sunucuya katıldığında harekete geçer.
            // Değişkenler: {player}
            "enabled": false,
            "channel": {
                "guildID": "123456789012345678",
                "channelID": "123456789012345678"
            },
            "message": "{player} sunucuya katıldı."
        },
        "playerquit": {
            // Bir oyuncu sunucudan ayrıldığında harekete geçer.
            // Değişkenler: {player}
            "enabled": false,
            "channel": {
                "guildID": "123456789012345678",
                "channelID": "123456789012345678"
            },
            "message": "{player} sunucudan ayrıldı."
        },
        "rconcommand": {
            // RCON'dan komut gönderildiğinde harekete geçer.
            // Değişkenler: {command}
            "enabled": false,
            "channel": {
                "guildID": "123456789012345678",
                "channelID": "123456789012345678"
            },
            "message": "{command} komudu uzaktan çalıştırıldı."
        }
    },
    "talepsistem": {
        "enabled": true,
        "quitclose": true,// Oyuncu oyundan çıkınca talep kapatılsın mı?
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
            "refresh": 120000,// Rcon kaç milisaniyede bir yeniden bağlansın?
            "password": "Rcon şifresini girin."// DEĞİŞTİR
        }
    }
}
