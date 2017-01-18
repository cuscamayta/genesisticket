use database_production;

select * from database_production.roles;
insert into database_production.roles (title, createdat, updatedat) values('administrador', now(), now());

select * from database_production.users;
insert into database_production.users (username, firstname, lastname, password, token, createdat, updatedat, idrole) values ('admin','administrador', 'de sistema', 'admin',
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwic3RhdGUiOjEsInVzZXJuYW1lIjoiYmxvcGV6diIsInBhc3N3b3JkIjoiSW5uc2ExMjM0IiwiZmlyc3RuYW1lIjoiQnJlbmRhIiwibGFzdG5hbWUiOiJWZWxhc2NvIiwiZW1haWwiOiJicmVuQGdtYWlsLmNvbSIsImlkcm9sZSI6MSwiaWF0IjoxNDc5ODI0NDEzfQ.M8yU-opUkzRCM2LEDHSPqofE7q72Gsed-mcGTkx0FnM', now(), now(), 1);

select * from database_production.destinations;
insert into database_production.destinations (title, short, createdat, updatedat) values('Santa Cruz', 'SC', now(), now());

select * from database_production.offices;
insert into database_production.offices (title, address, phone, createdat, updatedat, idorigin) values('Central', '.', '0', now(), now(), 1);


select * from database_production.modules;

insert into database_production.modules (title, class, createdat, updatedat) values ('Seguridad', 'fa fa-home', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Configuración', 'fa fa-edit', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Administración', 'fa fa-desktop', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Ventas', 'fa fa-table', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Manifiesto', 'fa fa-bar-chart-o', now(), now());
insert into database_production.modules (title, class, createdat, updatedat) values ('Reportes', 'fa fa-clone', now(), now());

select * from database_production.pages;
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Ajustes', 'setting', now(), now(),1);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Rol', 'role', now(), now(),1);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Usuario', 'user', now(), now(),1);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Permisos', 'permit', now(), now(),1);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Sucursales por usuario', 'useroffice', now(), now(),1);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Tipo de bus', 'bustype', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Buses', 'bus', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Tipo chofer', 'drivertype', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Chofer', 'driver', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Destinos', 'destination', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Sucursal', 'office', now(), now(),2);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Rutas', 'course', now(), now(),2);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Dosificación', 'orderbook', now(), now(),3);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Itinerario', 'travel', now(), now(),3);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Programación diaria', 'schedule', now(), now(),3);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Ticket', 'ticket', now(), now(),4);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Anular factura', 'invalidate', now(), now(),4);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Manifiestos de pasajeros', 'manifest', now(), now(),5);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Manifiestos de equipajes', 'baggage', now(), now(),5);

insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Ventas diarias', 'dailysale', now(), now(),6);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Arqueo de caja', 'dailycash', now(), now(),6);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Ventas por bus', 'dailybus', now(), now(),6);
insert into database_production.pages (title, path, createdat, updatedat, idmodule) values ('Facturas anuladas', 'voidedinvoice', now(), now(),6);

select * from database_production.useroffices;
insert into database_production.useroffices (createdat, updatedat, idoffice, iduser) values(now(), now(), 1, 1);

select * from database_production.permits;
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 1, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 2, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 3, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 4, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 5, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 6, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 7, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 8, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 9, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 10, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 11, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 12, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 13, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 14, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 15, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 16, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 17, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 18, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 19, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 20, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 21, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 22, 1);
insert into database_production.permits (createdat, updatedat, idpage, idrole) values(now(), now(), 23, 1);

select * from database_production.bustypes;
insert into database_production.bustypes (title, path, createdat, updatedat) values ('Tipo Uno', '/app/map/tipoUno.html', now(), now());
insert into database_production.bustypes (title, path, createdat, updatedat) values ('Tipo Dos', '/app/map/tipoDos.html', now(), now());
insert into database_production.bustypes (title, path, createdat, updatedat) values ('Tipo Tres', '/app/map/tipoTres.html', now(), now());
