<?php
session_start(); // Session starten, um die Erfolgsmeldung zu speichern

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Benutzereingaben abrufen
    $vorname = $_POST['vorname'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $nachricht = $_POST['nachricht'];

    // 2. Eingaben bereinigen und kodieren (WICHTIG!)
    $vorname = htmlspecialchars($vorname, ENT_QUOTES, 'UTF-8');
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = filter_var($email, FILTER_SANITIZE_EMAIL); // Email validieren und bereinigen
    $nachricht = htmlspecialchars($nachricht, ENT_QUOTES, 'UTF-8');

    // 3. Email validieren (optional aber sehr empfohlen)
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $_SESSION['message'] = "Ungültige E-Mail-Adresse.";
      $_SESSION['message_type'] = "error";
      header("Location: index.html"); // Zurück zur Homepage
      exit;
    }

    // 4. Eingaben verarbeiten (z. B. in Datenbank speichern oder in eine Datei schreiben)
    // Hier fügen Sie Ihren Code ein, um die Daten zu verarbeiten.

    // 5. Erfolgsmeldung speichern
    $_SESSION['message'] = "Vielen Dank für Ihre Nachricht!";
    $_SESSION['message_type'] = "success";

    // 6. Weiterleitung zur Homepage
    header("Location: index.html"); // oder index.php
    exit;

} else {
    // Wenn das Formular nicht per POST gesendet wurde
    $_SESSION['message'] = "Ungültige Anfrage.";
    $_SESSION['message_type'] = "error";
    header("Location: index.html"); // Zurück zur Homepage
    exit;
}
?>