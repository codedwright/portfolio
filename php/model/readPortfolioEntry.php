<?php
    function readPortfolioEntry() {
        try {
            global $db;
            $statement = $db->prepare("SELECT * FROM portfolio");
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($results);
            return $json;
        } catch(PDOException $e) {
            $error = '<br>An error occured while reading from the database.';
            $message = '<br>Message: ' . $e->getMessage();
            echo $error . $message . '<br>readPortfolioEntry.php';
            exit();
        }
    }
?>