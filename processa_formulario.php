<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars($_POST['form_name']);
    $telefone = htmlspecialchars($_POST['fonm_phone']);
    $email = htmlspecialchars($_POST['form_email']);
    $assunto = htmlspecialchars($_POST['form_subject']);
    $mensagem = htmlspecialchars($_POST['form_message']);

    $to = "luaneataide@gmail.com";
    $subject = "Formulário de Contato: $assunto";
    $body = "Nome: $nome\nTelefone: $telefone\nEmail: $email\n\nMensagem:\n$mensagem";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem.";
    }
}
?>