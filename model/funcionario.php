<?
    class Funcionario{
        public function get($id){
            $q = mysql_query("select * from funcionarios where id = $id");
            $d = mysql_fetch_array($q);
            return $d;
        }
        public function getAll(){
            $q = mysql_query("select * from funcionarios");
            $d = mysql_fetch_array($q);
            $funcionarios = array();
            $q = mysql_query("select * from funcionarios");
            while($d = mysql_fetch_array($q)){
                $funcionarios[] = $d;
            }
            return $funcionarios;
        }
        public function insert($obj){
            mysql_query("insert into funcionarios (nome, email, senha, created, modified) values('".$obj->nome."', '".$obj->email."', '".$obj->senha."', '".date('Y-m-d H:i:s')."', '".date('Y-m-d H:i:s')."')");
            return mysql_insert_id();
        }
        public function update($obj){
            mysql_query("update funcionarios set nome = '".$obj->nome."', email = '".$obj->email."', senha = '".$obj->senha."', modified = '".date('Y-m-d H:i:s')."' where id = ".$obj->id);
            return true;
        }
        public function delete($id){
            mysql_query("delete from funcionarios where id = ".$id);
            return true;
        }
    }