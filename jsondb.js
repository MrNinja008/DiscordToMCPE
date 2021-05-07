module.exports = {
    "fetchAll": function(){
        try {
            JSON.parse(require("fs").readFileSync("./data.json"));
        } catch(e) {
            require("fs").writeFileSync("./data.json", "{}");
        }
        return JSON.parse(require("fs").readFileSync("./data.json"));
    },
    "setAll": function(veri){
        console.log(require("util").inspect(veri));
        require("fs").writeFileSync("./data.json", require("util").inspect(veri));
    },
    "get": function(veri){return this.fetchAll()[veri];},
    "set": function(veri,veri1){let a = this.fetchAll();a[veri]=veri1;this.setAll(a);},
    "delete": function(veri){let a = this.fetchAll();delete a[veri];this.setAll(a);},
    "pin": true
};