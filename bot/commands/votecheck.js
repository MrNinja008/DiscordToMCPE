module.exports = {
    name: "oyliste",
    execute: async function(m, args, config){
        if(!config.vote.enabled) return m.reply("Bu komut devre dışı bırakılmış.");
        // komudu aktif etmek için configden vote -> enabled kısmını true yapın

        require("request")("https://minecraftpocket-servers.com/api/?object=servers&element=voters&key="+config.vote.apikey+"&month=current&format=json", (err,res)=>{
            if(err) return console.log(err);
            // Eğer bu satıra gelen bir hata verdiyse API keyiniz hatalıdır. Configden düzeltin.
            if(res.body == "Error: server key not found") throw new Error("Geçersiz API anahtarı.");
            m.reply("Bu ay oy verenler: "+JSON.parse(res.body).voters.map(i=> "\n**"+i.nickname+"** `"+i.votes+"` kere oy vermiş").join(""));
        })
    }
}