<?
    class Cliente{
        public function get($id){
            $q = mysql_query("select * from clientes where id = $id");
            $d = mysql_fetch_array($q);
            return $d;
        }
        public function getAll(){
            $q = mysql_query("select * from clientes");
            $d = mysql_fetch_array($q);
            $clientes = array();
            $q = mysql_query("select * from clientes");
            while($d = mysql_fetch_array($q)){
                $clientes[] = $d;
            }
            return $clientes;
        }
        public function insert($obj){
            mysql_query("insert into clientes (nome, cpf_cnpj) values('".$obj->nome."', '".$obj->cpf_cnpj."')");
            return mysql_insert_id();
        }
        public function update($obj){
            mysql_query("update clientes set nome = '".$obj->nome."', cpf_cnpj='".$obj->cpf_cnpj."' where id = ".$obj->id);
            return true;
        }
        public function delete($id){
            mysql_query("delete from clientes where id = ".$id);
            return true;
        }
    }