<?php

$email = $_POST['natalia_rn9@hotmail.com'];
$data_envio = date('d/m/Y');
$hora_envio = date('H:i:s');

// -------------

	$arquivo = "
	<style type='text/css'>
	body {
	margin:0px;
	font-family:Verdane;
	font-size:12px;
	color: #666666;
	}
	a{
	color: #666666;
	text-decoration: none;
	}
	a:hover {
	color: #FF0000;
	text-decoration: none;
	}
	</style>
    <html>
        <table width='510' border='1' cellpadding='1' cellspacing='1' bgcolor='#CCCCCC'>
            <tr>
              <td>
                <tr>
                  <td width='320'>E-mail:<b>$email</b></td>
	            </tr>
            </td>
          </tr>  
          <tr>
            <td>Este e-mail foi enviado em <b>$data_envio</b> &agrave;s <b>$hora_envio</b></td>
          </tr>
        </table>
    </html>
	";

// -------------------------

	//email para quem será enviado o formulário
	$destino = "natalia_rn9@hotmail.com";
	$assunto = "Ordem alterada";

	$headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
    $headers .= 'From: OSS <$email>';
	
	$enviaremail = mail($destino, $assunto, $arquivo, $headers);
	if($enviaremail){
	   $mgm = "E-mail enviado com sucesso!";
	} else {
	   $mgm = "Erro ao enviar e-mail!";
	}
?>