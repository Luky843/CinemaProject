create database LTScinema;

use LTScinema;

create table  users (idu int auto_increment,
					name varchar(30),
					password varchar(30),
					email varchar(30),
					isAdmin int default 0,
					isBlocked int default 0,
		     			cardnumber varchar(10),
					time_of_regisration datetime,
					isDeleted int default 0,
					primary key (idu) 
					);
					

create table movies (idm int auto_increment,
					name varchar(30),
					genre varchar(15),
					description text,
					actors text,
					year_ int,
					img_url varchar(256),
					is_available int default 1,
					primary key(idm)
					);
					
create table shows (ids int auto_increment,
					idmov int,
					showtime datetime,
					is_available int default 1,
					primary key(ids),
					foreign key(idmov) references movies(idm)
					on update restrict
					on delete cascade
					);

create table seats (num int not null,
					isReseved int default 0,
					show_ int not null,
					usr int default null,
					foreign key(show_) references shows(ids)
					on update restrict
					on delete cascade,
					foreign key(usr) references users(idu)
					on update restrict
					on delete set null
					);
					
create table token (idt int auto_increment,
					idu int,
					value_ char(20),
					time_of_create datetime,
					isExpired int default 0,
					primary key (idt),
					foreign key(idu) references users(idu)on update restrict
					on delete set null
					);

create table email_verification (id int auto_increment,
								email varchar(30),
								isExpired int default 0,
								primary key(id)
								);
								
