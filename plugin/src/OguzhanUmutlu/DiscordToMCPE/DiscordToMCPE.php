<?php

namespace OguzhanUmutlu\DiscordToMCPE;

use pocketmine\command\Command;
use pocketmine\command\CommandSender;
use pocketmine\command\ConsoleCommandSender;
use pocketmine\command\RemoteConsoleCommandSender;
use pocketmine\event\entity\EntityDamageByEntityEvent;
use pocketmine\event\Listener;
use pocketmine\event\player\PlayerChatEvent;
use pocketmine\event\player\PlayerCommandPreprocessEvent;
use pocketmine\event\player\PlayerDeathEvent;
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
        $this->sendToHook("join;".$e->getPlayer()->getName());
    }

    public function onQuit(PlayerQuitEvent $e) {
        $this->sendToHook("quit;".$e->getPlayer()->getName());
    }

    public function onMessage(PlayerChatEvent $e) {
        if(!$e->isCancelled()) {
            $this->sendToHook("chat;".$e->getPlayer()->getName().";".$e->getMessage());
        }
    }

    public function onDeath(PlayerDeathEvent $e) {
        if(!$e->isCancelled()) {
            $ld = $e->getPlayer()->getLastDamageCause();
            $damager = $ld instanceof EntityDamageByEntityEvent ? ($ld->getDamager() instanceof Player ? $ld->getDamager()->getName() : "") : "";
            $this->sendToHook("death;".$e->getPlayer()->getName().";".$damager.";".($ld ? $ld->getCause() : "-1"));
        }
    }

    public function onPlayerCommand(PlayerCommandPreprocessEvent $e) {
        if(!$e->isCancelled()) {
            if(!$e->getMessage()[0] != "/") return;

            $this->sendToHook("command;".$e->getPlayer()->getName().";".substr($e->getMessage(), 1));
        }
    }

    public function onConsoleCommand(ServerCommandEvent $e) {
        if($e->getSender() instanceof ConsoleCommandSender && !$e->getSender() instanceof RemoteConsoleCommandSender) {
            $this->sendToHook("consolecommand;CONSOLE;".$e->getCommand());
        }
    }

    public function onRconCommand(RemoteServerCommandEvent $e) {
        if ($e->getSender() instanceof RemoteConsoleCommandSender) {
            $this->sendToHook("rconcommand;RCON;" . $e->getCommand());
        }
    }
    public function sendToHook($b): ?string {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $this->getConfig()->getNested("host").":3000?message=".base64_encode($b)."&key=".base64_encode($this->getConfig()->getNested("key")));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        return curl_exec($curl);
    }

    public function onCommand(CommandSender $sender, Command $command, string $label, array $args): bool {
        if(!$sender instanceof RemoteConsoleCommandSender) return true;
        if(!isset($args[0])) return true;
        $this->onSubCommand($sender, $args[0], array_slice($args, 1));
        return true;
    }
    public function onSubCommand(RemoteConsoleCommandSender $sender, $cmd, array $args) {
        if($cmd == "registercmd") {
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
        } else if($cmd == "getplayers") {
            $this->sendToHook("getplayers;".implode(",",array_map(function($n){return $n->getName();},$this->getServer()->getOnlinePlayers())));
        } else if($cmd == "broadcast") {
            $this->getServer()->broadcastMessage($args[0]);
        } else {
            if(!$this->getServer()->getPlayerExact($args[0])) {
                $sender->sendMessage("notfound");
                return;
            }
            $this->getServer()->getPlayerExact($args[0])->sendMessage($args[1]);
        }
    }
}