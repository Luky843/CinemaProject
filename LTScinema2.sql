create database LTScinema;

use LTScinema;

create table  users (idu int auto_increment,
					name varchar(30),
					password varchar(30),
					email varchar(30),
					isAdmin int default 0,
					isBlocked int default 0,
					time_of_regisration datetime,
					isDeleted int default 0,
					primary key (idu) 
					);
					

create table movies (idm int auto_increment,
					name varchar(32),
					genre varchar(32),
					description text,
					actors text,
					year_ int,
					img_url varchar(64),
					is_available int default 1,
					is_show_on_main int default 0,
					is_popular int default 0,
					primary key(idm)
					);
					
create table movie_detail(id int auto_increment,
							id_mov int,
							name varchar(32),
							title varchar(100),
							decrioption_ text,
							duration int,
							country varchar(32),
							directed_by varcahr(32),
							actors text,
							genre varchar(32),
							video_url varchar(128);
							primary key(id),
							foreign key(id_mov) references movies(idm)
							on update references
							on delete cascade
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
								
