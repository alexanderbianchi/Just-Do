create database perntodo;

CREATE TYPE category AS ENUM ();

CREATE TYPE weekday AS ENUM ('mon','tue','wen','thu','fri','sat','sun');

ALTER TYPE category ADD VALUE ($SOMETHING)

create table todo(
    todo_id serial primary key,
    task varchar(50),
    description varchar(255),
    dueday weekday,
    category category
)