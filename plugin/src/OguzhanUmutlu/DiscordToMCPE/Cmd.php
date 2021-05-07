<?php

namespace OguzhanUmutlu\DiscordToMCPE;

use pocketmine\command\Command;
use pocketmine\command\CommandSender;

class Cmd extends Command {
    public function __construct(string $name, string $description) {
        parent::__construct($name, $description);
    }

    public function execute(CommandSender $sender, string $commandLabel, array $args) {}
}