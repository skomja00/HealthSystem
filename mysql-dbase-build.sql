USE SP20_3308_tun49199;
/**
    Delete/create empty tables and insert starter set of data. 
*/
/**
    Temporarily remove any constraints to drop, build and insert starter set of data. 
*/
    SET FOREIGN_KEY_CHECKS=0;
    DROP TABLE IF EXISTS `user_role`;
    DROP TABLE IF EXISTS `web_user`;
    DROP TABLE IF EXISTS `PatientVisit`;
    DROP FUNCTION IF EXISTS get_user_role_id;
    DROP FUNCTION IF EXISTS get_web_user_id;
    SET FOREIGN_KEY_CHECKS=1;

/**
 *    Create user_role table 
**/
    CREATE TABLE `user_role` (
        `user_role_id` INT(11) NOT NULL,
        `user_role_type` VARCHAR(10) NOT NULL,
        PRIMARY KEY (`user_role_id`),
        UNIQUE INDEX `user_role_id_UNIQUE` (`user_role_id` ASC)
    )
    ENGINE = InnoDB;


/**
 *  Add data to user_role table since your web_user table references data from user_role, you’ll need to enter records into user_role first.
**/
    INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (1,'admin');
    INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (2,'manager');
    INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (3,'services');
    INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (4,'office');
    INSERT INTO `user_role` (`user_role_id`, `user_role_type`) VALUES (5,'documents');
    /* Try to add a record with a duplicate primary key (i.e. 3000 below) and notice the database management system will not let that record be inserted. */
    /* MySQL output: Error Code: 1062. Duplicate entry '3000' for key 'PRIMARY'*/

/**
 * get_user_role_id() will return the user_role_id given a user_role_type
 * @params  VARCHAR(10) urt  User Role Type
 * @returns INT(11)     urid User Role Id
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
    END //
    DELIMITER ;
    
/**
    Create web_user table 
*/
CREATE TABLE `web_user` (
    `web_user_id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_email` VARCHAR(55) NULL,
    `user_password` VARCHAR(45) NULL,
    `image` VARCHAR(200) NULL,
    `birthday` DATE NULL,
    `membership_fee` DECIMAL(8,2) NULL,
    `user_role_id` INT(11) NOT NULL,
    PRIMARY KEY (`web_user_id`),
    UNIQUE INDEX `user_email_uidx` (`user_email` ASC),
    CONSTRAINT `user_role_id_fk` FOREIGN KEY (`user_role_id`) REFERENCES `user_role` (`user_role_id`) 
    ) 
    ENGINE = InnoDB;
    
	 
    #test FK constraint
    #result:
    #     Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails 
    #     (`SP20_3308_tun49199`.`PatientVisit`, CONSTRAINT `web_user_id_fk_1` FOREIGN KEY (`web_user_id`) REFERENCES `web_user` (`web_user_id`))
    #select * 
    #from PatientVisit
    #where PatientVisit.web_user_id = get_web_user_id('business@gmail.com');
    #
    #delete 
    #from web_user
    #where web_user.user_role_id = get_user_role_id('business');

    
/**
 *  Add data to web_user table
 */

    /* try to delete a user_role record that has been referenced by a web_user record */
    /* Error Code: 1451. Cannot delete or update a parent row: a foreign key constraint fails */
    -- DELETE FROM user_role WHERE user_role.user_role_id = get_user_role_id('patient'); 

    /* At least one of these records shall have null for all nullable non character fields. */    
    INSERT INTO `web_user` 
        (`user_email`,
        `user_password`,
        `image`,
        `birthday`,
        `membership_fee`,
        `user_role_id`) 
	values
        ('nulls@gmail.com',
        null,
        null,
        null,
        null,
        get_user_role_id('admin'));
    INSERT INTO `web_user` 
        (`user_email`,
        `user_password`,
        `image`,
        `birthday`,
        `membership_fee`,
        `user_role_id`) 
	VALUES
        ('services@gmail.com',
        'p',
        'http://cis-linux2.temple.edu/~sallyk/pics_user/tony.jpg',
        '1990-11-19', 
        4.95,            
        get_user_role_id('services'));
    INSERT INTO `web_user` 
        (`user_email`,
        `user_password`,
        `image`,
        `birthday`,
        `membership_fee`,
        `user_role_id`) 
	VALUES
        ('office@gmail.com',
        'p',       
        'http://cis-linux2.temple.edu/~sallyk/pics_user/gene.jpg',        
        '1984-12-11',  
        4.95,            
        get_user_role_id('office'));
    INSERT INTO `web_user` 
        (`user_email`,
        `user_password`,
        `image`,
        `birthday`,
        `membership_fee`,
        `user_role_id`) 
	VALUES
        ('documents@gmail.com',   
        'p',    
        'https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-183-1437941062.jpg?itok=PQbfGWVo',        
        '1999-07-23', 
        4.95,            
        get_user_role_id('documents'));
    INSERT INTO `web_user` 
        (`user_email`,
        `user_password`,
        `image`,
        `birthday`,
        `membership_fee`,
        `user_role_id`) 
	VALUES
        ('manager@gmail.com',     
        'p',      
        'http://cis-linux2.temple.edu/~sallyk/pics_user/andrew.jpg',       
        '1991-06-03', 
        4.95,            
        get_user_role_id('manager'));
    INSERT INTO `web_user` 
        (`user_email`,
        `user_password`,
        `image`,
        `birthday`,
        `membership_fee`,
        `user_role_id`) 
	VALUES
        ('admin@gmail.com',       
        'p',        
        'https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-304-1447083303.jpg?itok=K_kYuqXu',         
        '1985-01-01', 
        4.95,            
        get_user_role_id('admin'));
    INSERT INTO `web_user` 
        (`user_email`,
        `user_password`,
        `image`,
        `birthday`,
        `membership_fee`,
        `user_role_id`) 
	VALUES
        ('sallyk',                  
        'p',            
        'http://cis-linux2.temple.edu/~sallyk/pics_user/sally.jpg',    
        '1985-01-01', 
        4.95,            
        get_user_role_id('admin'));
    
    /* Try to add a record that has an invalid (non-existent) user_role_id and notice that the database management system will not let that record be inserted. */
    /* Error Code: 1452. Cannot add or update a child row: a foreign key constraint fails */
--      INSERT INTO `web_user` 
--          (`user_email`,              `user_password`,`image_url`,                                     `birthday`,  `membership_fee`,`user_role_id`) values
--          ('hailey.hacker@gmail.com', 'hhacker',      'www.healthsystems.com/hailyh.png',          '1985-01-01', 14.95,           get_user_role_id('hacker'));


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
    

-- /**
--  * Create PatientVisit/"other" table 
-- */
CREATE TABLE `PatientVisit` (
    `VisitId` INT(11) NOT NULL AUTO_INCREMENT,
    `PatientName` varchar(255) DEFAULT NULL,
    `ImageUrl` varchar(2100) NULL,
    `MedRecNo` varchar(255) NOT NULL,
    `Description` varchar(2100) NOT NULL,
    `VisitDateTime` datetime NOT NULL,
    `Diagnosis` varchar(255) NULL,
    `VisitCharge` decimal(14,3) NULL,
    `web_user_id` INT(11) NOT NULL,
    PRIMARY KEY (`VisitId`),
    UNIQUE INDEX `MedRecNo_VisitDateTime_uidx` (`MedRecNo`, `VisitDateTime`),
    CONSTRAINT `web_user_id_fk_1` FOREIGN KEY (`web_user_id`) REFERENCES `web_user` (`web_user_id`)
    ) 
    ENGINE=InnoDB; 
 
-- select *
-- from information_schema.table_constraints
-- where constraint_schema = 'SP20_3308_tun49199';
    
/**
 * Add data to Patient/"other" table 
*/
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('OMalley, Donna',       
        'http://cis-linux2.temple.edu/~sallyk/pics_user/claudia.jpg',
        'TUN143981',
        'Office Visit',     
        '1970-03-17 10:35:32', 
        'Patient Office or Other Outpatient Services',      
        154.95,
        get_web_user_id('office@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Martin, Elizabeth',
        'http://cis-linux2.temple.edu/~sallyk/pics_user/rose.jpg',
        'TUN114977',
        'Vaccination',
        '2019-11-06 15:30:47', 
        'Influenza virus vaccine',
        45.00,
        get_web_user_id('admin@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Rutherford, Amelia',  
        'http://cis-linux2.temple.edu/~sallyk/pics_user/sally.jpg',
        'TUN193741',
        'ED Visit',
        '2019-12-07 22:35:41',
        'Emergency department visit for the evaluation and management of a patient',
        2000.00,
        get_web_user_id('admin@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Hamilton, Edward',   
        'http://cis-linux2.temple.edu/~sallyk/pics_user/tony.jpg',
        'TUN111114',
        'Office Visit'  ,
        '2019-10-12 08:14:00', 
        'Patient Office or Other Outpatient Services',      
        150.00,
        get_web_user_id('admin@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Chandler, Dana',      
        'https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-444-1471294001.jpg?itok=vHA39piz',
        'TUN147765',
        'Vaccination'   , 
        '2019-11-06 15:35:21', 
        'Influenza virus vaccine',                             
        45.00,
        get_web_user_id('admin@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Pearson, Ella',        
        'https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-914-1564714433.jpg?itok=1mwPImKw',
        'TUN559116',
        'Vaccination', 
        '2019-11-06 15:42:21',  
        'Influenza virus vaccine',                             
        45.00,
        get_web_user_id('admin@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Sanders, Jared',       
        'https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-173-1437489687.jpg',
        'TUN158929',
        'Vaccination',
        '2019-11-06 15:49:02',
        'Influenza virus vaccine',                             
        45.00,
        get_web_user_id('admin@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Jennings, Ada',        
        'https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-910-1564072808.jpg?itok=gnW_YI77',
        'TUN922629',
        'Office Visit',   
        '2019-12-07 14:21:59',  
        'Patient Office or Other Outpatient Services',         
        150.00,
        get_web_user_id('admin@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Longstreth, Cindy',       
        'https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-190-1441242687.png',
        'TUN111119',
        'Vaccination',   
        '2019-11-13 09:36:21',
        'Influenza virus vaccine',                             
        45.00,
        get_web_user_id('admin@gmail.com'));
    INSERT INTO `PatientVisit` 
        (`PatientName`,
        `ImageUrl`,
        `MedRecNo`,
        `Description`,
        `VisitDateTime`,
        `Diagnosis`,
        `VisitCharge`,
        `web_user_id`)
    values
        ('Miller, Charles',   
        'https://cis.temple.edu/sites/default/files/styles/portrait-small/public/user_pictures/picture-108-1522178489.jpg?itok=Xcw9PenQ',
        'TUN111120',
        'ED Visit',     
        '2020-01-01 00:01:06', 
        'Emergency department visit for the evaluation and management of a patient',   
        2000.00,
        get_web_user_id('admin@gmail.com'));
--    
-- a. Run a SELECT statement that lists all the columns of all the records of your “other” table, selecting out each column and presenting them in an order that you think users would like to view the data (don't use SELECT * ). Sort the data by whichever column you decided to show first. 
-- select 
--      `Balance`
--      ,`MedRecNo`
--      ,`PatientName`
--      ,`Description`
--      ,`Diagnosis`
--      ,`VisitDateTime`
--      ,`VisitDateTime`
--      ,`ImageUrl`
--      ,`Patient_Id`
--      ,`web_user_id`
-- from patient 
-- order by `balance` desc;


-- b. The SELECT statement above but adding a WHERE clause so that you see some of the records but not all. 
-- select 
--      `Balance`
--      ,`MedRecNo`
--      ,`PatientName`
--      ,`Description`
--      ,`Diagnosis`
--      ,`VisitDateTime`
--      ,`VisitDateTime`
--      ,`ImageUrl`
--      ,`Patient_Id`
--      ,`web_user_id`
-- from patient 
-- where patient.description = 'office visit'
-- order by `balance` desc;


-- c. A SELECT statement that shows all the records from the web_user table joined with the user_role table. Show the role name first, then email address then all the other columns (from both tables) in an order you think users would like to see the data – except don’t list the role id twice. Order the records of the result set by the first columns (primary sort role name, secondary sort email address). Note: There should be as many rows in your result set as you have records in your user table. If you have a lot more (and see duplication), you have forgotten the WHERE clause that joins the two tables together.
-- USE SP20_3308_tun49199;
-- select 
--     user_role.user_role_type
--     ,web_user.user_email
--     ,user_role.user_role_id
--     ,web_user.web_user_id
--     ,web_user.user_password
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
 * create a json formatted similar to...
 *
*/

-- select 
--     '{'
--     ,concat('    "VisitId" : "', pv.VisitId,'",')
--     ,concat('    "PatientName" : "', pv.PatientName,'",')
--     ,concat('    "ImageUrl" : "', pv.ImageUrl,'",')
--     ,concat('    "MedRecNo" : "', pv.MedRecNo,'",')
--     ,concat('    "Description" : "', pv.Description,'",')
--     ,concat('    "VisitDateTime" : "', coalesce(pv.VisitDateTime,'null'),'",')
--     ,concat('    "VisitDateTime" : "', coalesce(pv.VisitDateTime,'null'),'",')
--     ,concat('    "Diagnosis" : "', pv.Diagnosis,'",')
--     ,concat('    "VisitCharge" : "', pv.VisitCharge,'",')
--     ,concat('    "webUserId" : "', wu.web_user_id,'",')
--     ,concat('    "webUserEmail" : "', wu.user_email,'",')
--     ,concat('    "webMembershipFee" : "', wu.membership_fee,'"')
--     ,'},'
-- from PatientVisit as pv
-- join web_user as wu on wu.web_user_id = pv.web_user_id_fk
-- -- 
-- select 
--     pv.VisitId,
--     pv.PatientName,
--     pv.ImageUrl,
--     pv.MedRecNo,
--     pv.Description,
--     pv.VisitDateTime,
--     pv.Diagnosis,
--     pv.VisitCharge,
--     wu.web_user_id,
--     wu.user_email,
--     wu.user_password,
--     wu.membership_fee,
--     ur.user_role_id
-- from PatientVisit as pv
-- join web_user as wu on wu.web_user_id = pv.web_user_id
-- join user_role as ur on ur.user_role_id = wu.user_role_id;
-- 
-- 

-- SELECT
--     web_user_id,
--     user_email,
--     user_password,
--     membership_fee,
--     image,
--     birthday,
--     web_user.user_role_id,
--     user_role_type
-- FROM web_user, user_role
-- where web_user.user_role_id = user_role.user_role_id
-- ORDER BY web_user_id;
-- 
-- 
-- SELECT 
-- web_user_id, 
-- user_email, user_password, image, membership_fee, birthday, image,
-- 
--                     + "web_user.user_role_id, user_role_type "
--                     + "FROM web_user, user_role where web_user.user_role_id = user_role.user_role_id "
--                     + "ORDER BY web_user_id;
-- 
-- SELECT web_user_id, user_email, user_password, membership_fee, birthday,
-- web_user.user_role_id, user_role_type
-- FROM web_user, user_role
-- WHERE web_user.user_role_id = user_role.user_role_id
-- AND user_email = "sallyk" and user_password = "p"



DELIMITER $$
DROP PROCEDURE IF EXISTS `list`$$
CREATE PROCEDURE list()
BEGIN
select
	# Column 1 Name
	'Visits By Date' as a,

    # Column 2 Description 
    pv.Description as b,

    # Column 3 Description, Date 
    concat(
	    convert(convert(pv.VisitDateTime,date),char),
        ' $',
        (select convert(sum(a.VisitCharge),char) from PatientVisit as a 
            where a.Description = pv.Description
            and convert(a.VisitDateTime,date) = convert(pv.VisitDateTime,date))) as c,

    # Column 3 Description, Date, Visit
    (select concat(pv.MedRecNo,' $',cast(pv.VisitCharge as char)) 
		from PatientVisit as b
        where b.Description = pv.Description 
        and convert(b.VisitDateTime,date) = convert(pv.VisitDateTime,date)
        and b.MedRecNo = pv.MedRecNo) as d
from PatientVisit as pv;
END$$
DELIMITER ;




select description,VisitDateTime,VisitCharge
from PatientVisit as pv
join web_user as wu on wu.web_user_id = pv.web_user_id
join user_role as ur on ur.user_role_id = wu.user_role_id
where pv.Description = 'office visit' 
and convert('2020-04-01',date) = convert(pv.VisitDateTime,date);

select description,VisitDateTime,VisitCharge
from PatientVisit as pv
join web_user as wu on wu.web_user_id = pv.web_user_id
join user_role as ur on ur.user_role_id = wu.user_role_id
where pv.Description = 'vaccination' 
and convert('2019-11-06',date) = convert(pv.VisitDateTime,date);

select description,VisitDateTime,VisitCharge
from PatientVisit as pv
join web_user as wu on wu.web_user_id = pv.web_user_id
join user_role as ur on ur.user_role_id = wu.user_role_id
where pv.Description = 'U07.1' 
and convert('2020-03-28',date) = convert(pv.VisitDateTime,date);
