<?
    class Ordens{
        public function get($id){
            $q = mysql_query("select * from ordens where id = $id");
            $d = mysql_fetch_array($q);
            return $d;
        }
        public function getAll(){
            $q = mysql_query("select * from ordens");
            $d = mysql_fetch_array($q);
            $ordens = array();
            $q = mysql_query("select * from ordens");
            while($d = mysql_fetch_array($q)){
                $ordens[] = $d;
            }
            return $ordens;
        }
        public function insert($obj){
            mysql_query("insert into ordens (valor, contato_id, cliente_id) values ('".$obj->valor."', 3, 1)");
            return mysql_insert_id();
        }
        public function update($obj){
            mysql_query("update ordens set valor = '".$obj->valor."' where id = ".$obj->id);
            return true;
        }
        public function delete($id){
            mysql_query("delete from ordens where id = ".$id);
            return true;
        }
    }