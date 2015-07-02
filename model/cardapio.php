<?php

class Cardapio {

    public function get($id) {
        $q = mysql_query("select  c.*,(select p.nome from produtos p where p.id = c.cardapio_id) as produto  from cardapios c where c.id = $id");
        $d = mysql_fetch_array($q);
        return $d;
    }

    public function getAll($produtoId) {
        $cardapios = array();
        $q = mysql_query("select c.*,(select p.nome from produtos p where p.id = c.cardapio_id) as produto  from cardapios c where c.produto_id = " . $produtoId);
        while ($d = mysql_fetch_array($q)) {
            $cardapios[] = $d;
        }
        return $cardapios;
    }

    public function insert($obj) {
        mysql_query("insert into cardapios (qtd,produto_id,cardapio_id) values(" . $obj->qtd . "," . $obj->produto_id . "," . $obj->cardapio_id . ")");
        return mysql_insert_id();
    }

    public function update($obj) {
        mysql_query("update cardapios set qtd = " . $obj->qtd . ",cardapio_id = " . $obj->cardapio_id . " where id = " . $obj->id);
        return true;
    }

    public function delete($id) {
        mysql_query("delete from cardapios where id = " . $id);
        return true;
    }

}
