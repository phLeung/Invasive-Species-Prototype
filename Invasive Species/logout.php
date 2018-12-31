<?php
//logs user out, destroys current session, and redirects to home page
session_start();
$_SESSION["user"] = null;
session_destroy();
echo '<script type="text/javascript">window.location.href="index.php";</script>'
?>