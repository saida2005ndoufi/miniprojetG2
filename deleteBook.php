<?php
include 'db.php';

$id = $_POST['id'];

if (empty($id)) {
    echo json_encode(['success' => false, 'message' => 'ID du livre manquant.']);
    exit;
}

$sql = "DELETE FROM books WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de la suppression du livre.']);
}

$stmt->close();
$conn->close();
?>