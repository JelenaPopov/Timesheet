--CATEGORIES
INSERT INTO category (deleted, persisted_at, updated_at, version, name) VALUES (0, now(), now(), 0, 'Software Development');
INSERT INTO category (deleted, persisted_at, updated_at, version, name) VALUES (0, now(), now(), 0, 'Frontend Development');
INSERT INTO category (deleted, persisted_at, updated_at, version, name) VALUES (0, now(), now(), 0, 'Testing');

--CLIENTS
INSERT INTO client (deleted, persisted_at, updated_at, version, first_name, last_name, country, city, street, postal_code)
VALUES (0, now(), now(), 0, 'Milan', 'Jovic', 'Srbija', 'Novi Sad', 'Dositejeva', '400111');
INSERT INTO client (deleted, persisted_at, updated_at, version, first_name, last_name, country, city, street, postal_code)
VALUES (0, now(), now(), 0, 'Tamara', 'Savin', 'Srbija', 'Novi Sad', 'Dalmatinska', '400112');

--USERS
INSERT INTO user (deleted, persisted_at, updated_at, version, first_name, last_name, username, password, weekly_working_hours)
VALUES (0, now(), now(), 0, 'Goran', 'Ivanovic', 'admin', '$2a$12$DlVWrwEROxzkjib4aFbEn.lpsG2PrEj0afB.s26TLrs/QSso7CXGO', 20);

INSERT INTO user (deleted, persisted_at, updated_at, version, first_name, last_name, username, password, weekly_working_hours)
VALUES (0, now(), now(), 0, 'Sima', 'Popov', 'employee', '$2a$12$dG0U0QniRSfJyDBOEW/2iuCK9dErRoAd97mXL1XLUGVSeVlI80pNG', 37.5);

INSERT INTO user (deleted, persisted_at, updated_at, version, first_name, last_name, username, password, weekly_working_hours)
VALUES (0, now(), now(), 0, 'Teodora', 'Jevtic', 'employee2', '$2a$12$LdWxP3/ZmFr2EwO885ZjfOCJGOAEdG.WJT8xhoz727WuW1998RNEO', 30);

INSERT INTO user (deleted, persisted_at, updated_at, version, first_name, last_name, username, password, weekly_working_hours)
VALUES (0, now(), now(), 0, 'Petar', 'Petrovic', 'employee3', '$2a$12$S2qZ8lBTTuZU7WamlNvFx.9YtGaTm2jjruzix7T9oU3RQUmv0kOTq', 30);

--ROLES
INSERT INTO role (deleted, persisted_at, updated_at, version, name) VALUES (0, now(), now(), 0, 'ROLE_ADMIN');
INSERT INTO role (deleted, persisted_at, updated_at, version, name) VALUES (0, now(), now(), 0, 'ROLE_EMPLOYEE');

--USER ROLES
INSERT INTO user_role (deleted, persisted_at, updated_at, version, user_id, role_id) VALUES (0, now(), now(), 0, 1, 1);
INSERT INTO user_role (deleted, persisted_at, updated_at, version, user_id, role_id) VALUES (0, now(), now(), 0, 2, 2);
INSERT INTO user_role (deleted, persisted_at, updated_at, version, user_id, role_id) VALUES (0, now(), now(), 0, 3, 2);
INSERT INTO user_role (deleted, persisted_at, updated_at, version, user_id, role_id) VALUES (0, now(), now(), 0, 4, 2);

--PROJECTS
INSERT INTO project (deleted, persisted_at, updated_at, version, name, description, client_id, team_lead_id)
VALUES (0, now(), now(), 0, 'Ordering food', 'Application for ordering food', 1, 2);

-- EMPLOYEES ON PROJECT
INSERT INTO employee_on_project (project_id, employee_id, start_date, end_date)
VALUES (1, 1, '2022-05-01', '2023-05-01');

INSERT INTO employee_on_project (project_id, employee_id, start_date, end_date)
VALUES (1, 3, '2022-05-01', '2023-05-01');

INSERT INTO employee_on_project (project_id, employee_id, start_date, end_date)
VALUES (1, 4, '2022-01-01','2023-01-01');

--LOGGED HOURS
INSERT INTO logged_hours (deleted, persisted_at, updated_at, version, user_id, project_id, category_id, description, hours, created)
VALUES (0, '2022-04-25', '2022-04-25', 0, 1, 1, 1, 'Create initial Spring project.', 2, '2022-04-25');
INSERT INTO logged_hours (deleted, persisted_at, updated_at, version, user_id, project_id, category_id, description, hours, created)
VALUES (0, '2022-04-25', '2022-04-25', 0, 1, 1, 2, 'Create initial Angular project.', 1, '2022-04-25');

INSERT INTO logged_hours (deleted, persisted_at, updated_at, version, user_id, project_id, category_id, description, hours, created)
VALUES (0, '2022-05-04', '2022-05-04', 0, 1, 1, 1, 'Implement Spring security.', 4, '2022-05-04');

INSERT INTO logged_hours (deleted, persisted_at, updated_at, version, user_id, project_id, category_id, description, hours, created)
VALUES (0, '2022-05-06', '2022-05-06', 0, 1, 1, 2, 'Create register form and login form.', 3, '2022-05-06');