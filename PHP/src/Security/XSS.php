<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $comment = $_POST['comment'];
    echo "Your comment: $comment";
}
?>
<form method="POST">
    <label for="comment">Comment:</label>
    <textarea name="comment" id="cocmment"></textarea>
    <button type="submit">Submit</button>

</form>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $comment = htmlspecialchars($_POST['commentXSS'], ENT_QUOTES, 'UTF-8');
    echo "Your comment: $comment";
}
?>

<form method="POST">
    <label for="commentXSS">Comment:</label>
    <textarea name="commentXSS" id="commentXSS"></textarea>
    <button type="submit">Submit</button>
</form>