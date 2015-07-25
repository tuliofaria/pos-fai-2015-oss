<?
    class Equipamento{
        
        public function get($id){
            $q = mysql_query("select * from equipamentos where id = $id");
            $d = mysql_fetch_array($q);
            return $d;
        }
        public function getAll(){
            $q = mysql_query("select * from equipamentos");
            $d = mysql_fetch_array($q);
            $equipamentos = array();
            $q = mysql_query("select * from equipamentos");
            while($d = mysql_fetch_array($q)){
                $equipamentos[] = $d;
            }
            return $equipamentos;
        }
        public function insert($obj){
            mysql_query("insert into equipamentos (nome, descricao, patrimonio, observacoes, cliente_id, produto_id) 
                values(
                '" .$obj->nome."', 
                '" .$obj->descricao."',
                '" .$obj->patrimonio."',
                '" .$obj->observacoes."',
                '" .$obj->cliente_id."',
                '" .$obj->produto_id."'
                 )");

            // exibindo sql
            /*echo "insert into equipamentos (nome, descricao, patrimonio, observacoes, cliente_id, produto_id) 
                values(
                '" .$obj->nome."', 
                '" .$obj->descricao."',
                '" .$obj->patrimonio."',
                '" .$obj->observacoes."',
                '" .$obj->cliente_id."',
                '" .$obj->produto_id."'
                 )";
            echo mysql_error();*/
            return mysql_insert_id();
        }
        public function update($obj){
            mysql_query("update equipamentos set nome = '".$obj->nome."', 
                descricao='".$obj->descricao."',
                patrimonio='".$obj->patrimonio."',
                observacoes='".$obj->observacoes."'
                where id = ".$obj->id);
            return true;
        }
        public function delete($id){
            mysql_query("delete from equipamentos where id = ".$id);
            return true;
        }
    }