<?php

if (isset($_POST["text"]) && $_POST["text"] != "") {
    include 'core.php';

    $CoolText = new CoolText();
    echo $CoolText->makeCool(strtolower($_POST["text"]));
}
