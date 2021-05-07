<?php

namespace OguzhanUmutlu\DiscordToMCPE;

use pocketmine\command\Command;
use pocketmine\command\CommandSender;
use pocketmine\command\ConsoleCommandSender;
use pocketmine\command\RemoteConsoleCommandSender;
use pocketmine\event\Listener;
use pocketmine\event\player\PlayerChatEvent;
use pocketmine\event\player\PlayerCommandPreprocessEvent;
use pocketmine\event\player\PlayerJoinEvent;
use pocketmine\event\player\PlayerQuitEvent;
use pocketmine\event\server\RemoteServerCommandEvent;
use pocketmine\event\server\ServerCommandEvent;
use pocketmine\Player;
use pocketmine\plugin\PluginBase;
use pocketmine\utils\Config;

class DiscordToMCPE extends PluginBase implements Listener {
    public $talepler = [];
    /*** @var Command[] */
    public $commands = [];
    public function onEnable() {
        $this->getServer()->getPluginManager()->registerEvents($this, $this);
        $this->saveDefaultConfig();
        $cnf = new Config($this->getDataFolder()."data.yml", Config::YAML, $this->commands);
        $this->commands = $cnf->getAll();
        foreach($this->commands as $i => $x) {
            $this->commands[$i] = new Cmd($x[0], $x[1]);
            $this->getServer()->getCommandMap()->register($this->getName(), $this->commands[$i]);
        }
    }

    public function onJoin(PlayerJoinEvent $e) {
        $this->sendToDiscord("join;".$e->getPlayer()->getName());
    }

    public function onQuit(PlayerQuitEvent $e) {
        $this->sendToDiscord("quit;".$e->getPlayer()->getName());
    }

    public function onMessage(PlayerChatEvent $e) {
        if(!$e->isCancelled()) {
            $this->sendToDiscord("chat;".$e->getPlayer()->getName().";".$e->getMessage());
        }
    }

    public function onPlayerCommand(PlayerCommandPreprocessEvent $e) {
        if(!$e->isCancelled()) {
            $start = strlen($e->getMessage())-1;
            for($i=$start;$i>-1;$i--) {
                if(str_split($e->getMessage())[$i] != "." && str_split($e->getMessage())[$i] != "/") {
                    $start = $i;
                }
            }
            $this->sendToDiscord("command;".$e->getPlayer()->getName().";".substr($e->getMessage(), $start));
        }
    }

    public function onConsoleCommand(ServerCommandEvent $e) {
        if($e->getSender() instanceof ConsoleCommandSender && !$e->getSender() instanceof RemoteConsoleCommandSender) {
            $this->sendToDiscord("consolecommand;CONSOLE;".$e->getCommand());
        }
    }

    public function onRconCommand(RemoteServerCommandEvent $e) {
        if ($e->getSender() instanceof RemoteConsoleCommandSender) {
            $this->sendToDiscord("rconcommand;RCON;" . $e->getCommand());
        }
    }
    public function sendToDiscord($b): ?string {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $this->getConfig()->getNested("webhook-url", "Sadece botun görebildiği kanaldaki webhook URL'sini buraya girin."));
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(["content" => $b." ** **", "username" => $this->getConfig()->getNested("webhook-name", "Sadece botun görebildiği kanaldaki webhook adını buraya girin.")]));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        return curl_exec($curl);
    }

    public function onCommand(CommandSender $sender, Command $command, string $label, array $args): bool {
        if(!$sender instanceof RemoteConsoleCommandSender) return true;
        if($command->getName() == "registercmd") {
            if(isset($this->commands[(int)$args[0]])) {
                $this->getServer()->getCommandMap()->unregister($this->commands[(int)$args[0]]);
            }
            $this->commands[(int)$args[0]] = new Cmd($args[1], $args[2]);
            $this->getServer()->getCommandMap()->register($this->getName(), $this->commands[(int)$args[0]]);
            foreach($this->getServer()->getOnlinePlayers() as $player) {
                $player->sendCommandData();
            }
            $cnf = new Config($this->getDataFolder()."data.yml", Config::YAML, array_map(function($n){return [$n->getName(), $n->getDescription()];},$this->commands));
            $cnf->save();
            $cnf->reload();
        } else {
            if(!$this->getServer()->getPlayerExact($args[0])) {
                $sender->sendMessage("notfound");
                return true;
            }
            $this->getServer()->getPlayerExact($args[0])->sendMessage($args[1]);
        }
        return true;
    }
}