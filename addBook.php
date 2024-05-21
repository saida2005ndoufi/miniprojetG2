<?php
include 'db.php';

$title = $_POST['title'];
$author = $_POST['author'];
$genre = $_POST['genre'];
$isbn = $_POST['isbn'];

if (empty($title) || empty($author) || empty($genre) || empty($isbn)) {
    echo json_encode(['success' => false, 'message' => 'Tous les champs sont obligatoires.']);
    exit;
}

$sql = "INSERT INTO books (title, author, genre, isbn) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ssss', $title, $author, $genre, $isbn);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'ajout du livre.']);
}

$stmt->close();
$conn->close();
?>