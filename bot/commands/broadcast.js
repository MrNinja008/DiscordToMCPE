module.exports = {
    name: "duyuru",
    execute: async function(m, args, config){
        if(!args[0]) return m.reply("Kullanım: /duyuru <mesaj>");
        require("../index").getClient().currentrcon.send("exrcon broadcast "+args.join(" "));
    }
}