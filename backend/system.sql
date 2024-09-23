create database financial_app;

create table users (
    id serial primary key,
    username varchar(50) not null, 
    password TEXT not null);

insert into users (username, password) values ('admin', crypt('admin', gen_salt('bf')));

