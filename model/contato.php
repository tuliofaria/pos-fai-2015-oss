<?
    class Contatos{
        public function get($id){
            $q = mysql_query("select * from contatos where id = $id");
            $d = mysql_fetch_array($q);
            return $d;
        }
        public function getAll(){
            $q = mysql_query("select * from contatos");
            $d = mysql_fetch_array($q);
            $contatos = array();
            $q = mysql_query("select * from contatos");
            while($d = mysql_fetch_array($q)){
                $contatos[] = $d;
            }
            return $contatos;
        }
        public function insert($obj){
            mysql_query("insert into contatos (nome, email) values('".$obj->nome."', '".$obj->email."')");
            return mysql_insert_id();
        }
        public function update($obj){
            mysql_query("update contatos set nome = '".$obj->nome."', email='".$obj->email."' where id = ".$obj->id);
            return true;
        }
        public function delete($id){
            mysql_query("delete from contatos where id = ".$id);
            return true;
        }
    }