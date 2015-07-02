alter table cardapios drop foreign key fk_cardapios_cardapios1;
ALTER TABLE cardapios DROP INDEX fk_cardapios_cardapios1_idx;
alter table cardapios drop column cardapio_id;
alter table cardapios add column cardapio_id integer;
alter table cardapios add foreign key (cardapio_id) references produtos(id);
