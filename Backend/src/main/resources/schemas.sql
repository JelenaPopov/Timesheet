DROP TABLE IF EXISTS category;

CREATE TABLE category (
    id BIGINT NOT NULL auto_increment,
    deleted BIT,
    persisted_at DATETIME,
    updated_at DATETIME,
    version INTEGER NOT NULL,
    name VARCHAR (255) UNIQUE NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE project DROP FOREIGN KEY FK_project_client_id;
ALTER TABLE project DROP FOREIGN KEY FK_project_team_lead_id;

DROP TABLE IF EXISTS client;

CREATE TABLE client (
    id BIGINT NOT NULL auto_increment,
    deleted BIT,
    persisted_at DATETIME,
    updated_at DATETIME,
    version INTEGER NOT NULL,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    country VARCHAR (255) NOT NULL,
    city VARCHAR (255) NOT NULL,
    street VARCHAR (255) NOT NULL,
    postal_code VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE user_role DROP FOREIGN KEY FK_user_role_role;
ALTER TABLE user_role DROP FOREIGN KEY FK_user_role_user;

DROP TABLE IF EXISTS role;

CREATE TABLE role (
    id BIGINT NOT NULL auto_increment,
    deleted BIT,
    persisted_at datetime,
    updated_at datetime,
    version INTEGER NOT NULL,
    name VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
);

DROP TABLE IF EXISTS user_role;

CREATE TABLE user_role (
      id BIGINT NOT NULL auto_increment,
      deleted BIT,
      persisted_at datetime,
      updated_at datetime,
      version INTEGER NOT NULL,
      role_id BIGINT,
      user_id BIGINT,
      PRIMARY KEY (id)
);

DROP TABLE IF EXISTS user;

CREATE TABLE user (
    id BIGINT NOT NULL auto_increment,
    deleted BIT,
    persisted_at datetime,
    updated_at datetime,
    version INTEGER NOT NULL,
    first_name VARCHAR (255) NOT NULL,
    last_name VARCHAR (255) NOT NULL,
    username VARCHAR (255) NOT NULL,
    password VARCHAR (255),
    weekly_working_hours DOUBLE,
    PRIMARY KEY (id)
);

ALTER TABLE user_role ADD CONSTRAINT FK_user_role_role FOREIGN KEY (role_id) REFERENCES role (id);
ALTER TABLE user_role ADD CONSTRAINT FK_user_role_user FOREIGN KEY (user_id) REFERENCES user (id);

DROP TABLE IF EXISTS project;

CREATE TABLE project (
    id BIGINT NOT NULL auto_increment,
    deleted BIT,
    persisted_at DATETIME,
    updated_at DATETIME,
    version INTEGER NOT NULL,
    name VARCHAR (255) NOT NULL,
    description VARCHAR (255) NOT NULL,
    client_id BIGINT,
    team_lead_id BIGINT,
    PRIMARY KEY (id)
);

ALTER TABLE project ADD CONSTRAINT FK_project_client_id FOREIGN KEY (client_id) REFERENCES client (id);
ALTER TABLE project ADD CONSTRAINT FK_project_team_lead_id FOREIGN KEY (team_lead_id) REFERENCES user (id);

DROP TABLE IF EXISTS employee_on_project;

CREATE TABLE employee_on_project (
    project_id BIGINT,
    employee_id BIGINT,
    start_date date,
    end_date date,
    PRIMARY KEY (project_id, employee_id)
);