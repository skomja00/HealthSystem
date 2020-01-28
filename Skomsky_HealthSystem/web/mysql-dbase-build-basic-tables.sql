/**
	Delete/create empty tables and insert starter set of data. 
*/
USE SP20_3308_tun49199;

/**
	Temporarily remove any constraints to drop, build and insert started data from scratch. 
*/
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `user_role`;
DROP TABLE IF EXISTS `web_user`;
DROP TABLE IF EXISTS `patient`;
SET FOREIGN_KEY_CHECKS=1;

/**
 *	Create user_role table 
**/
	CREATE TABLE `user_role` (
		`user_role_id` INT(11) NOT NULL,
		`user_role_type` VARCHAR(10) NOT NULL,
		PRIMARY KEY (`user_role_id`),
		UNIQUE INDEX `user_role_id_UNIQUE` (`user_role_id` ASC),
		UNIQUE INDEX `user_role_type_UNIQUE` (`user_role_type` ASC)
	)
	ENGINE = InnoDB;


/**
 *  Add data to user_role table since your web_user table references data from user_role, you’ll need to enter records into user_role first.
 *  The Services, Business Office, and Document roles are segragated so other than the admin/manager no one person has total access 
 *  The patients will have a user role to access only their data.
 *   A guest account will have limited view-only access to limited parts of the system
**/
	INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (1000,'admin');
	INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (2000,'manager');
	INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (3000,'services');
	INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (4000,'busofc');
	INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (5000,'documents');
	/* Try to add a record with a duplicate primary key (i.e. 3000 below) and notice the database management system will not let that record be inserted. */
	/* MySQL output: Error Code: 1062. Duplicate entry '3000' for key 'PRIMARY'*/
	-- INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (3000,'guest'); 
	INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (6000,'patient');
	INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (7000,'guest');


/**
 * get_user_role_id() will return the user_role_id given a user_role_type
 * @params  VARCHAR(10) User Role Type
 * @returns INT(11)     User Role Id
 */
	DELIMITER //
	DROP FUNCTION IF EXISTS get_user_role_id//
	CREATE FUNCTION get_user_role_id(urt VARCHAR(10)) RETURNS INT(11) DETERMINISTIC
	BEGIN
		DECLARE urid INT(11);
		SET urid = (SELECT ur.user_role_id FROM user_role AS ur WHERE ur.user_role_type = urt);
        /* return a flag value if the user role type does not exist */
        IF (ISNULL(urid)) THEN 
			SET urid = 9999;
		END IF;
		RETURN urid;
	END//
	DELIMITER ;
/**
	Create web_user table 
*/
CREATE TABLE `web_user` (
	`web_user_id` INT(11) NOT NULL AUTO_INCREMENT,
	`user_email` VARCHAR(45) NOT NULL,
	`user_password` VARCHAR(45) NULL,
	`image` VARCHAR(200) NULL,
	`birthday` DATE NULL,
	`membership_fee` DECIMAL(8,2) NULL,
	`user_role_id` INT(11) NULL,
	PRIMARY KEY (`web_user_id`),
	UNIQUE INDEX `user_email_UNIQUE` (`user_email` ASC),
	INDEX `user_role_id_fk_idx` (`user_role_id` ASC),
	CONSTRAINT `user_role_id_fk` FOREIGN KEY (`user_role_id`) REFERENCES `user_role` (`user_role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION);
/**
 *  Add data to web_user table
 */

	/* At least one of these records shall have all of its fields populated. */
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                     `birthday`,  `membership_fee`,`user_role_id`) values
        ('hughes.donna@gmail.com',      'hughesd',      'http://cis-linux2.temple.edu/~sallyk/pics_user/gene.jpg',  '1999-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                     `birthday`,  `membership_fee`,`user_role_id`) values
        ('martin.elizabeth@gmail.com',  'martine',      'http://cis-linux2.temple.edu/~sallyk/pics_user/gene.jpg',   '1985-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                     `birthday`,  `membership_fee`,`user_role_id`) values
        ('rutherford.amelia@gmail.com', 'rutherforda',  'http://cis-linux2.temple.edu/~sallyk/pics_user/sally.jpg',  '1999-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                     `birthday`,  `membership_fee`,`user_role_id`) values
        ('hamilton.edward@gmail.com',   'hamiltone',    'http://cis-linux2.temple.edu/~sallyk/pics_user/tony.jpg',   '1999-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                     `birthday`,  `membership_fee`,`user_role_id`) values
        ('chandler.dana@gmail.com',     'chandlerd',     'http://cis-linux2.temple.edu/~sallyk/pics_user/karl.jpg',  '1999-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                     `birthday`,  `membership_fee`,`user_role_id`) values
        ('pearson.ella@gmail.com',      'pearsone',     'http://cis-linux2.temple.edu/~sallyk/pics_user/rose.jpg',   '1999-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                      `birthday`,  `membership_fee`,`user_role_id`) values
        ('sanders.jared@gmail.com',     'sandersj',     'http://cis-linux2.temple.edu/~sallyk/pics_user/claudia.jpg', '1981-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                      `birthday`,  `membership_fee`,`user_role_id`) values
        ('jennings.ada@gmail.com',      'jenningsa',    'http://cis-linux2.temple.edu/~sallyk/pics_user/rose.jpg',    '2003-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                      `birthday`,  `membership_fee`,`user_role_id`) values
        ('allen.jillian@gmail.com',     'allenj',       'http://cis-linux2.temple.edu/~sallyk/pics_user/sally.jpg',   '1968-01-01', 14.95,           get_user_role_id('patient'));
	INSERT INTO `web_user` 
		(`user_email`,                  `user_password`,`image`,                                                      `birthday`,  `membership_fee`,`user_role_id`) values
        ('clarke.jeremy@gmail.com',     'clarkej',      'http://cis-linux2.temple.edu/~sallyk/pics_user/tony.jpg',   '1999-01-01', 14.95,           get_user_role_id('patient'));

    /* try to delete a user_role record that has been referenced by a web_user record */
    /* Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails */
	-- DELETE FROM user_role WHERE user_role.user_role_id = get_user_role_id('patient'); 

	/* At least one of these records shall have null for all nullable non character fields. */    
	INSERT INTO `web_user` 
		(`user_email`,              `user_password`,`image`,                                                       `birthday`,  `membership_fee`,`user_role_id`) values
		('brianne.user@gmail.com',   null,           null,	                                                        null,        null,            null);
	INSERT INTO `web_user` 
		(`user_email`,              `user_password`,`image`,                                                       `birthday`,  `membership_fee`,`user_role_id`) values 
		('services.sam@gmail.com', 'eeditor',       'http://cis-linux2.temple.edu/~sallyk/pics_user/andrew.jpg',   '2002-01-01', 0.00,            get_user_role_id('services'));
	INSERT INTO `web_user` 
		(`user_email`,              `user_password`,`image`,                                                       `birthday`,  `membership_fee`,`user_role_id`) values 
		('busofc.betty@gmail.com', 'eeditor',       'http://cis-linux2.temple.edu/~sallyk/pics_user/andrew.jpg',   '2002-01-01', 0.00,            get_user_role_id('busofc'));
	INSERT INTO `web_user` 
		(`user_email`,              `user_password`,`image`,                                                       `birthday`,  `membership_fee`,`user_role_id`) values 
		('documents.darnell@gmail.com', 'eeditor',  'http://cis-linux2.temple.edu/~sallyk/pics_user/andrew.jpg',   '2002-01-01', 0.00,            get_user_role_id('documents'));
	INSERT INTO `web_user` 
		(`user_email`,              `user_password`,`image`,                                                       `birthday`,  `membership_fee`,`user_role_id`) values
		('manager.marvin@gmail.com','mmanager',     'http://cis-linux2.temple.edu/~sallyk/pics_user/andrew.jpg',   '1991-01-01', 0.00,            get_user_role_id('manager'));
	INSERT INTO `web_user` 
		(`user_email`,              `user_password`,`image`,                                                       `birthday`,  `membership_fee`,`user_role_id`) values
		('admin.alvin@gmail.com',   'aadmin',       'http://cis-linux2.temple.edu/~sallyk/pics_user/andrew.jpg',   '1985-01-01', 0.00,            get_user_role_id('admin'));
	
    /* Try to add a record that has an invalid (non-existent) user_role_id and notice that the database management system will not let that record be inserted. */
    /* Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails */
--  	INSERT INTO `web_user` 
--  		(`user_email`,              `user_password`,`image`,                                     `birthday`,  `membership_fee`,`user_role_id`) values
--  		('hailey.hacker@gmail.com', 'hhacker',      'www.healthsystems.com/hailyh.png',          '1985-01-01', 14.95,           get_user_role_id('hacker'));


/**
 * get_web_user_id() will return the web_user_id given a user_email
 * @params  VARCHAR(45) User Email
 * @returns INT(11)     Web User Id
 */
	DELIMITER //
	DROP FUNCTION IF EXISTS get_web_user_id//
	CREATE FUNCTION get_web_user_id(uem VARCHAR(45)) RETURNS INT(11) DETERMINISTIC
	BEGIN
		DECLARE wuid INT(11);
		SET wuid = (SELECT wu.web_user_id FROM web_user AS wu WHERE wu.user_email = uem);
		RETURN wuid;
	END//
	DELIMITER ;
/**
 * Create Patient/"other" table 
*/
	CREATE TABLE `patient` (
		/* Id: primary key, auto-increment, name this field with table name followed by “_id”) */
		`Patient_Id` INT(11) NOT NULL AUTO_INCREMENT,
		/* Name or some kind of character identifier (require it to be unique, click on “UQ”) */
		`MedRecNo` VARCHAR(255) NOT NULL,
		/* image URL – a long varchar since fully qualified URLs can be pretty long */
		`ImageUrl` VARCHAR(2100) NOT NULL,
		/* long character (description) */
		`Description` VARCHAR(2100) NOT NULL,
		/* 1 of 2:· at least two nullable (user optional) non-character fields, e.g., integer, decimal (for money), date */
		`AdmDateTime` DATETIME NULL,
		/* 2 of 2:· at least two nullable (user optional) non-character fields, e.g., integer, decimal (for money), date */
		`DschDateTime` DATETIME NULL,
		/* “web_user_id”, a foreign key that points to the user who contributed this information */
		`web_user_id_fk` INT(11) NOT NULL,
		/* 1 OF 3 You can add more fields if you like, but don’t add too many  */
		`Diagnosis` VARCHAR(255) NULL,
		/* 2 OF 3 You can add more fields if you like, but don’t add too many  */
		`Patient_Name` VARCHAR(255) NULL,
		/* 3 OF 3 You can add more fields if you like, but don’t add too many  */
        `Balance` DECIMAL(14,3) NULL,        
		PRIMARY KEY (`Patient_Id`),
		UNIQUE INDEX `MedRecNo_UNIQUE` (`MedRecNo` ASC),
		CONSTRAINT `web_user_id_fk` FOREIGN KEY (`web_user_id_fk`) REFERENCES `web_user` (`web_user_id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
	)
	ENGINE = InnoDB;
/**
 * Add data to Patient/"other" table 
*/
	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,    `AdmDateTime`,        `DschDateTime`,      `web_user_id_fk`,                               `Diagnosis`,                                            `Patient_Name`,       `Balance`) values
        ('TUN111111','www.healthsystems.com/hughesd.png', 'Offie Visit',     '2020-01-13 11:00:00','2020-01-13 16:50',  get_web_user_id('hughes.donna@gmail.com'),      'Patient Office or Other Outpatient Services   ',      'Hughes, Donna',       150.00);

	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,    `AdmDateTime`,        `DschDateTime`,      `web_user_id_fk`,                               `Diagnosis`,                                            `Patient_Name`,       `Balance`) values
        ('TUN111112','www.healthsystems.com/martine.png', 'Vaccination'   , '2020-01-13 11:00:00','2020-01-13 16:50',   get_web_user_id('martin.elizabeth@gmail.com'),  'Influenza virus vaccine',                             'Martin, Elizabeth',   45.00);

	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,    `AdmDateTime`,        `DschDateTime`,     `web_user_id_fk`,                                `Diagnosis`,                                                                    `Patient_Name`,       `Balance`) values
        ('TUN111113','www.healthsystems.com/rutherforda.png','ED Visit',    '2020-01-13 11:00:00','2020-01-13 16:50',  get_web_user_id('rutherford.amelia@gmail.com'),  'Emergency department visit for the evaluation and management of a patient,',  'Rutherford, Amelia',  2000.00);

	INSERT INTO `patient`  
		(`MedRecNo`,  `ImageUrl`,                          `Description`,    `AdmDateTime`,        `DschDateTime`,     `web_user_id_fk`,                                `Diagnosis`,                                            `Patient_Name`,       `Balance`) values
        ('TUN111114','www.healthsystems.com/hamiltone.png','Office Visit'  ,'2020-10-12 08:00:00', NULL,               get_web_user_id('hamilton.edward@gmail.com'),    'Patient Office or Other Outpatient Services',         'Hamilton, Edward',   150.00);

	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,    `AdmDateTime`,        `DschDateTime`,     `web_user_id_fk`,                                `Diagnosis`,                                            `Patient_Name`,       `Balance`) values
        ('TUN111115','www.healthsystems.com/chandlerd.png','Vaccination'   ,'2020-01-13 11:00:00','2020-01-13 16:50',  get_web_user_id('chandler.dana@gmail.com'),      'Influenza virus vaccine',                             'Chandler, Dana',      45.00);

	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,   `AdmDateTime`,        `DschDateTime`,      `web_user_id_fk`,                                `Diagnosis`,                                           `Patient_Name`,        `Balance`) values
        ('TUN111116','www.healthsystems.com/pearsone.png','Vaccination'   ,'2020-01-13 11:00:00','2020-01-13 16:50',   get_web_user_id('pearson.ella@gmail.com'),       'Influenza virus vaccine',                             'Pearson, Ella',        45.00);

	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,    `AdmDateTime`,        `DschDateTime`,      `web_user_id_fk`,                                `Diagnosis`,                                           `Patient_Name`,        `Balance`) values
        ('TUN111117','www.healthsystems.com/sandersj.png','Vaccination'   , '2020-01-13 11:00:00','2020-01-13 16:50',   get_web_user_id('sanders.jared@gmail.com'),      'Influenza virus vaccine',                             'Sanders, Jared',       45.00);
 
	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,     `AdmDateTime`,        `DschDateTime`,     `web_user_id_fk`,                                 `Diagnosis`,                                           `Patient_Name`,        `Balance`) values
        ('TUN111118','www.healthsystems.com/jenningsa.png','Office Visit'   ,'2020-10-12 08:00:00', NULL,               get_web_user_id('jennings.ada@gmail.com'),       'Patient Office or Other Outpatient Services',         'Jennings, Ada',        150.00);

	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,    `AdmDateTime`,        `DschDateTime`,       `web_user_id_fk`,                                 `Diagnosis`,                                           `Patient_Name`,        `Balance`) values
        ('TUN111119','www.healthsystems.com/allenj.png',  'Vaccination'   ,   '2020-01-13 11:00:00','2020-01-13 16:50',  get_web_user_id('allen.jillian@gmail.com'),      'Influenza virus vaccine',                             'Allen, Jillian',       45.00);

	INSERT INTO `patient` 
		(`MedRecNo`,  `ImageUrl`,                          `Description`,    `AdmDateTime`,        `DschDateTime`,      `web_user_id_fk`,                                  `Diagnosis`,                                                                   `Patient_Name`,    `Balance`) values
        ('TUN111120','www.healthsystems.com/clarkej.png', 'ED Visit'   ,     '2020-10-12 08:00:00', NULL,              get_web_user_id('clarke.jeremy@gmail.com'),       'Emergency department visit for the evaluation and management of a patient',   'Clarke, Jeremy',   2000.00);
   
   
-- a. Run a SELECT statement that lists all the columns of all the records of your “other” table, selecting out each column and presenting them in an order that you think users would like to view the data (don't use SELECT * ). Sort the data by whichever column you decided to show first. 
-- select 
--  	`Balance`
--  	,`MedRecNo`
--  	,`Patient_Name`
--  	,`Description`
--  	,`Diagnosis`
--  	,`AdmDateTime`
--  	,`DschDateTime`
--  	,`ImageUrl`
--  	,`Patient_Id`
--  	,`web_user_id_fk`
-- from patient 
-- order by `balance` desc;


-- b. The SELECT statement above but adding a WHERE clause so that you see some of the records but not all. 
-- select 
--  	`Balance`
--  	,`MedRecNo`
--  	,`Patient_Name`
--  	,`Description`
--  	,`Diagnosis`
--  	,`AdmDateTime`
--  	,`DschDateTime`
--  	,`ImageUrl`
--  	,`Patient_Id`
--  	,`web_user_id_fk`
-- from patient 
-- where patient.description = 'office visit'
-- order by `balance` desc;


-- c. A SELECT statement that shows all the records from the web_user table joined with the user_role table. Show the role name first, then email address then all the other columns (from both tables) in an order you think users would like to see the data – except don’t list the role id twice. Order the records of the result set by the first columns (primary sort role name, secondary sort email address). Note: There should be as many rows in your result set as you have records in your user table. If you have a lot more (and see duplication), you have forgotten the WHERE clause that joins the two tables together.
-- USE SP20_3308_tun49199;
-- select 
-- 	user_role.user_role_type
--     ,web_user.user_email
-- 	,user_role.user_role_id
--     ,web_user.web_user_id
-- 	,web_user.user_password
--     ,web_user.image
--     ,web_user.birthday
--     ,web_user.membership_fee
--     ,web_user.user_role_id
-- from web_user
-- left join user_role on user_role.user_role_id = web_user.user_role_id
-- order by user_role.user_role_type , web_user.user_email;
-- 
-- select count(*) as web_user_count from web_user;


/**
 * create a json formatted as follows;
 *
    "webUserId": "1",
    "userEmail": "andrew@temple.edu",
    "userPassword": "pw",
    "image": "http://cis-linux2.temple.edu/~sallyk/pics_user/andrew.jpg",
    "birthday": "11/22/2001",
    "membershipFee": "",
    "userRoleId": "3",
    "userRoleType": "Member",
    "errorMsg": ""
*/
select 
concat('"webUserId": "',wu.web_user_id,'",')
,concat('"userEmail": "',wu.user_email,'",')
,concat('"userPassword": "',wu.user_password,'",')
,concat('"image": "',wu.image,'",')
,concat('"birthday": "',wu.birthday,'",')
,concat('"membershipFee": "',wu.membership_fee,'",')
,concat('"userRoleId": "',ur.user_role_id,'",')
,concat('"userRoleType": "',ur.user_role_type,'",')
,'"errorMsg": ""'

from web_user as wu
left join user_role as ur on ur.user_role_id = wu.user_role_id


