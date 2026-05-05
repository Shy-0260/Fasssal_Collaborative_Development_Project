-- ================================================================
-- UniHub Database Schema
-- Project : Fasssal Collaborative Development Project
-- App     : Uni Student Hub (index.html / app.js)
-- Author  : Shekh Arman — Database Developer
-- Repo    : github.com/Shy-0260/Fasssal_Collaborative_Development_Project


-- ================================================================
-- SPRINT 1 — MVP TABLES
-- ================================================================

-- 1. Users
--    Stores student and staff accounts.
--    role controls who can edit content (staff/admin only).
CREATE TABLE IF NOT EXISTS Users (
    user_id       INT          AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          ENUM('student','staff','admin') NOT NULL DEFAULT 'student',
    created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. TrainTimetable
--    Powers the "trains" view: example departures + platform info.
--    No FK to Users — content is maintained by staff via admin tools.
CREATE TABLE IF NOT EXISTS TrainTimetable (
    train_id       INT         AUTO_INCREMENT PRIMARY KEY,
    departure_time TIME        NOT NULL,
    destination    VARCHAR(150) NOT NULL,
    platform       VARCHAR(10)  NOT NULL,
    operator       VARCHAR(100),
    days_running   VARCHAR(100),               -- e.g. 'Monday–Friday', 'Daily'
    notes          TEXT,
    updated_at     DATETIME    NOT NULL DEFAULT CURRENT_TIMESTAMP
                               ON UPDATE CURRENT_TIMESTAMP
);

-- 3. FacilityHours

CREATE TABLE IF NOT EXISTS FacilityHours (
    hours_id      INT  AUTO_INCREMENT PRIMARY KEY,
    facility_name ENUM('Gym','Library')                       NOT NULL,
    day_type      ENUM('Weekday','Weekend','Term-time','Holiday') NOT NULL,
    open_time     TIME    NOT NULL,
    close_time    TIME    NOT NULL,
    notes         TEXT,                        -- extra info shown in the view
    updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_schedule (facility_name, day_type)
);

-- ================================================================
-- SPRINT 2 — MMP TABLES  (new tables added in Sprint 2)
-- ================================================================

-- 4. StudentEvents

CREATE TABLE IF NOT EXISTS StudentEvents (
    event_id   INT          AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(200) NOT NULL,
    event_type ENUM('Society','Social','Workshop') NOT NULL,
    description TEXT,
    location   VARCHAR(200),
    event_date DATETIME     NOT NULL,
    created_by INT          NOT NULL,
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_events_user
        FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

-- 5. EventRegistrations

CREATE TABLE IF NOT EXISTS EventRegistrations (
    registration_id INT      AUTO_INCREMENT PRIMARY KEY,
    user_id         INT      NOT NULL,
    event_id        INT      NOT NULL,
    registered_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status          ENUM('confirmed','cancelled') NOT NULL DEFAULT 'confirmed',
    CONSTRAINT fk_reg_user
        FOREIGN KEY (user_id)  REFERENCES Users(user_id),
    CONSTRAINT fk_reg_event
        FOREIGN KEY (event_id) REFERENCES StudentEvents(event_id),
    UNIQUE KEY unique_registration (user_id, event_id)
);

-- 6. Announcements

CREATE TABLE IF NOT EXISTS Announcements (
    announcement_id INT          AUTO_INCREMENT PRIMARY KEY,
    title           VARCHAR(200) NOT NULL,
    body            TEXT         NOT NULL,
    posted_by       INT          NOT NULL,
    posted_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_announce_user
        FOREIGN KEY (posted_by) REFERENCES Users(user_id)
);

-- ================================================================
-- SAMPLE DATA
-- ================================================================

-- Users
INSERT INTO Users (full_name, email, password_hash, role) VALUES
('Alice Johnson',    'alice@wlv.ac.uk',  'hashed_pw_1', 'student'),
('Bob Smith',        'bob@wlv.ac.uk',    'hashed_pw_2', 'student'),
('Dr. Carol White',  'carol@wlv.ac.uk',  'hashed_pw_3', 'staff'),
('Admin User',       'admin@wlv.ac.uk',  'hashed_pw_4', 'admin');

-- TrainTimetable  →  "trains" view: example departures + platform info
INSERT INTO TrainTimetable (departure_time, destination, platform, operator, days_running, notes) VALUES
('07:15', 'Birmingham New Street', '2', 'West Midlands Railway', 'Monday–Friday',  'Peak service — book in advance'),
('08:00', 'Birmingham New Street', '2', 'West Midlands Railway', 'Monday–Friday',  'Peak service'),
('09:30', 'Wolverhampton',         '1', 'Avanti West Coast',     'Daily',           NULL),
('12:00', 'London Euston',         '3', 'Avanti West Coast',     'Daily',           'Advance booking recommended'),
('17:45', 'Birmingham New Street', '2', 'West Midlands Railway', 'Monday–Friday',  'Evening peak'),
('10:00', 'Shrewsbury',            '1', 'Transport for Wales',   'Saturday–Sunday', 'Weekend service only');

-- FacilityHours  →  "gym" view (weekday & weekend hours)
INSERT INTO FacilityHours (facility_name, day_type, open_time, close_time, notes) VALUES
('Gym', 'Weekday', '06:30', '22:00', 'Last entry 21:30. Induction required for new members.'),
('Gym', 'Weekend', '08:00', '20:00', 'Last entry 19:30.');

-- FacilityHours  →  "library" view (term-time schedule + notes)
INSERT INTO FacilityHours (facility_name, day_type, open_time, close_time, notes) VALUES
('Library', 'Term-time', '08:00', '23:00', 'Silent study zones available all day. 24-hour access for postgraduates with valid card.'),
('Library', 'Holiday',   '09:00', '17:00', 'Reduced staffing. Self-service only after 16:00. Closed bank holidays.');

-- StudentEvents  →  "events" view: societies, socials, workshops
INSERT INTO StudentEvents (title, event_type, description, location, event_date, created_by) VALUES
('Coding Society Weekly Meet',    'Society',  'Weekly session open to all skill levels. Bring your laptop.',        'Room MT101',     '2026-05-10 14:00:00', 3),
('International Students Social', 'Social',   'Informal social for international students on campus. Free entry.',  'Student Union',  '2026-05-14 18:00:00', 3),
('CV Writing Workshop',           'Workshop', 'Careers team session on writing a strong CV. Booking required.',     'Lecture Hall B', '2026-05-16 11:00:00', 4),
('Photography Society Shoot',     'Society',  'Outdoor photography session around the university grounds.',         'Main Campus',    '2026-05-17 13:00:00', 3),
('End of Year Social',            'Social',   'Celebrate the end of the academic year with your coursemates.',      'City Centre Bar','2026-06-20 19:00:00', 4);

-- EventRegistrations
INSERT INTO EventRegistrations (user_id, event_id, status) VALUES
(1, 1, 'confirmed'),
(2, 1, 'confirmed'),
(1, 3, 'confirmed'),
(2, 4, 'confirmed');

-- Announcements  →  shown in the right-hand "Details" panel
INSERT INTO Announcements (title, body, posted_by) VALUES
('Welcome to UniHub',
 'Quick info for students on timetables, facilities and events. Use the menu on the left to explore each section. Updated regularly by staff.',
 3),
('Gym Maintenance — 9th May 2026',
 'The gym will be closed on 9th May for annual equipment maintenance. Normal opening hours resume from 10th May.',
 4),
('Library Extended Hours — Exam Period',
 'Extended library hours are now in effect for the exam period. See the Library opening times section for the latest schedule.',
 3);
