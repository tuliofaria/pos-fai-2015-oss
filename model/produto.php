<?php
    class Produto{
        public function get($id){
            $q = mysql_query("select * from produtos where id = $id");
            $d = mysql_fetch_array($q);
            return $d;
        }
        public function getAll(){           
            $produtos = array();
            $q = mysql_query("select * from produtos");
            while($d = mysql_fetch_array($q)){
                $produtos[] = $d;
            }
            return $produtos;
        }
        public function insert($obj){
            mysql_query("insert into produtos (nome) values('".$obj->nome."')");
            return mysql_insert_id();
        }
        public function update($obj){
            mysql_query("update produtos set nome = '".$obj->nome."' where id = ".$obj->id);
            return true;
        }
        public function delete($id){
            mysql_query("delete from produtos where id = ".$id);
            return true;
        }
    }