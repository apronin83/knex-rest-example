CREATE TABLE t_users (
    id         INTEGER      NOT NULL
                            PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR (50) NOT NULL,
    email      VARCHAR (50) NOT NULL,
    password   VARCHAR (50) NOT NULL,
    created_at DATETIME     NOT NULL
                            DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL
                            DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE t_languages (
    id         INTEGER       NOT NULL
                             PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR (255) NOT NULL,
    priority   INTEGER       NOT NULL,
    active     INTEGER       NOT NULL
                             DEFAULT 1,
    created_at DATETIME      NOT NULL
                             DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME      NOT NULL
                             DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE t_sexes (
    id         INTEGER      NOT NULL
                            PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR (50) NOT NULL,
    code       VARCHAR (50),
    eng_name   VARCHAR (50) NOT NULL,
    eng_code   VARCHAR (50),
    priority   INTEGER      NOT NULL,
    active     INTEGER      NOT NULL
                            DEFAULT 1,
    created_at DATETIME     NOT NULL
                            DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL
                            DEFAULT CURRENT_TIMESTAMP
);

/* Потом переименовать таблицу в persons */
CREATE TABLE t_peoples (
    id          INTEGER       NOT NULL
                              PRIMARY KEY AUTOINCREMENT,
    lastname    VARCHAR (255) NOT NULL,
    firstname   VARCHAR (255) NOT NULL,
    distinction VARCHAR (255),
    language_id INTEGER       NOT NULL
                              REFERENCES t_languages (id),
    sex_id      INTEGER       NOT NULL
                              REFERENCES t_sexes (id),
    email       VARCHAR (50),
    phone       VARCHAR (50),
    active      INTEGER       NOT NULL
                              DEFAULT 1,
    created_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP,
    status      INTEGER       NOT NULL
                              DEFAULT 0
);

CREATE TABLE t_person_comment_types (
    id         INTEGER       NOT NULL
                             PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR (255) NOT NULL,
    active     INTEGER       NOT NULL
                             DEFAULT 1,
    created_at DATETIME      NOT NULL
                             DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME      NOT NULL
                             DEFAULT CURRENT_TIMESTAMP,
    status     INTEGER       NOT NULL
                             DEFAULT 0
);

CREATE TABLE t_person_comments (
    id          INTEGER       NOT NULL
                              PRIMARY KEY AUTOINCREMENT,
    person      INTEGER       NOT NULL
                              REFERENCES t_peoples (id), /* Потом переименовать в person_id */
    user        VARCHAR (255), /* Возможно вычисляемое поле по person (ORM) */
    userEmail   VARCHAR (50), /* Возможно вычисляемое поле по person (ORM) */
    commentType INTEGER       NOT NULL
                              REFERENCES t_person_comment_types (id), /* Потом переименовать в comment_type_id */
    content     TEXT          NOT NULL,
    created_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE t_company_types (
    id         INTEGER      NOT NULL
                            PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR (50) NOT NULL,
    code       VARCHAR (50),
    active     INTEGER      NOT NULL
                            DEFAULT 1,
    created_at DATETIME     NOT NULL
                            DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME     NOT NULL
                            DEFAULT CURRENT_TIMESTAMP,
    status     INTEGER      NOT NULL
                            DEFAULT 0
);

CREATE TABLE t_street_prefixes (
    id          INTEGER       NOT NULL
                              PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR (255) NOT NULL,
    description TEXT,
    created_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE t_companies (
    id                              INTEGER       NOT NULL
                                                  PRIMARY KEY AUTOINCREMENT,
    name                            VARCHAR (255) NOT NULL,
    common_name                     VARCHAR (255) NOT NULL,
    company_type_id                 INTEGER       NOT NULL
                                                  REFERENCES t_company_types (id),
    county                          VARCHAR (50),
    regon                           VARCHAR (255),
    voivodship                      VARCHAR (255),
    city                            VARCHAR (50),
    borough                         VARCHAR (255),
    street_prefix_id                INTEGER (50)  REFERENCES t_street_prefixes (id),
    street                          VARCHAR (255),
    house_number                    VARCHAR (10),
    apartment_number                VARCHAR (10),
    zip_code                        VARCHAR (50),
    email                           VARCHAR (50),
    web_page                        VARCHAR (255),
    fax                             VARCHAR (50),
    phone                           VARCHAR (50),
    nip                             VARCHAR (50),
    krs                             VARCHAR (50),
    coordinates_lat                 VARCHAR (50),
    coordinates_lng                 VARCHAR (50),
    coordinates_checked             BOOLEAN       DEFAULT (FALSE),
    google_map_place                VARCHAR (255),
    correspondence_county           VARCHAR (50),
    correspondence_regon            VARCHAR (255),
    correspondence_voivodship       VARCHAR (255),
    correspondence_city             VARCHAR (50),
    correspondence_borough          VARCHAR (255),
    correspondence_street_prefix_id INTEGER (50)  REFERENCES t_street_prefixes (id),
    correspondence_street           VARCHAR (255) NOT NULL,
    correspondence_house_number     VARCHAR (10),
    correspondence_apartment_number VARCHAR (10),
    correspondence_zip_code         VARCHAR (50),
    active                          INTEGER       NOT NULL
                                                  DEFAULT 1,
    created_at                      DATETIME      NOT NULL
                                                  DEFAULT CURRENT_TIMESTAMP,
    updated_at                      DATETIME      NOT NULL
                                                  DEFAULT CURRENT_TIMESTAMP,
    status                          INTEGER       NOT NULL
                                                  DEFAULT 0
);

CREATE TABLE t_company_comment_types (
    id         INTEGER       NOT NULL
                             PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR (255) NOT NULL,
    active     INTEGER       NOT NULL
                             DEFAULT 1,
    created_at DATETIME      NOT NULL
                             DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME      NOT NULL
                             DEFAULT CURRENT_TIMESTAMP,
    status     INTEGER       NOT NULL
                             DEFAULT 0
);

CREATE TABLE t_company_comments (
    id                      INTEGER  NOT NULL
                                     PRIMARY KEY AUTOINCREMENT,
    company_id              INTEGER  NOT NULL
                                     REFERENCES t_companies (id),
    company_comment_type_id INTEGER  NOT NULL
                                     REFERENCES t_company_comment_types (id),
    content                 TEXT     NOT NULL,
    active                  INTEGER  NOT NULL
                                     DEFAULT 1,
    created_at              DATETIME NOT NULL
                                     DEFAULT CURRENT_TIMESTAMP,
    updated_at              DATETIME NOT NULL
                                     DEFAULT CURRENT_TIMESTAMP,
    status                  INTEGER  NOT NULL
                                     DEFAULT 0
);

CREATE TABLE t_company_files (
    id          INTEGER       NOT NULL
                              PRIMARY KEY AUTOINCREMENT,
    company     INTEGER       NOT NULL
                              REFERENCES t_companies (id), /* Потом переименовать в company_id */
    file        VARCHAR (255) NOT NULL, /* Потом переименовать в file1 */
    file2       VARCHAR (255),
    description TEXT,
    active      INTEGER       NOT NULL
                              DEFAULT 1,
    created_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE t_tasks (
    id          INTEGER       NOT NULL
                              PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR (255) NOT NULL,
    description TEXT,
    active      INTEGER       NOT NULL
                              DEFAULT 1,
    created_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      NOT NULL
                              DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE t_positions (
    id         INTEGER       NOT NULL
                             PRIMARY KEY AUTOINCREMENT,
    company_id INTEGER       NOT NULL
                             REFERENCES t_companies (id),
    name       VARCHAR (255) NOT NULL,
    email      VARCHAR (50),
    phone      VARCHAR (50),
    email_2    VARCHAR (50),
    phone_2    VARCHAR (50),
    phone_3    VARCHAR (50),
    comment    TEXT          NOT NULL,
    active     INTEGER       NOT NULL
                             DEFAULT 1,
    created_at DATETIME      NOT NULL
                             DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME      NOT NULL
                             DEFAULT CURRENT_TIMESTAMP,
    status     INTEGER       NOT NULL
                             DEFAULT 0
);

CREATE TABLE t_position_tasks (
    id          INTEGER  NOT NULL
                         PRIMARY KEY AUTOINCREMENT,
    position_id INTEGER  NOT NULL
                         REFERENCES t_positions (id),
    task_id     INTEGER  NOT NULL
                         REFERENCES t_tasks (id),
    active      INTEGER  NOT NULL
                         DEFAULT 1,
    created_at  DATETIME NOT NULL
                         DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME NOT NULL
                         DEFAULT CURRENT_TIMESTAMP,
    status      INTEGER  NOT NULL
                         DEFAULT 0
);

