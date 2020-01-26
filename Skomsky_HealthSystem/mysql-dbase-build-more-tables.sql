#CREATE DATABASE financial;
USE financial;

/**
 * --------------------------------------------------------------------------------
 *
 * Create tables
 *
 * --------------------------------------------------------------------------------
 */  

/* Delete tables and create empty. No need to consider any constraints. */
SET FOREIGN_KEY_CHECKS=0;
 
DROP TABLE IF EXISTS ObjIds;
CREATE TABLE ObjIds (
  ObjId BIGINT UNSIGNED NOT NULL PRIMARY KEY
);

DROP TABLE IF EXISTS Chg;
CREATE TABLE Chg (
  `ObjId` BIGINT NOT NULL,
  `PtObjId` BIGINT NOT NULL,
  `ProcMstrObjId` BIGINT NOT NULL,
  `SvcCd` VARCHAR(255) NULL,
  `SvcDesc` VARCHAR(255) NULL,
  `Qty` DECIMAL(9,2) NULL,
  `Amt` DECIMAL(13,4) NULL,
  `SvcDateTime` DATETIME NULL,
  PRIMARY KEY (`ObjId`),
  FOREIGN KEY (PtObjId) REFERENCES Patient(ObjId))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Pay;
CREATE TABLE Pay (
  `ObjId` BIGINT NOT NULL,
  `PtObjId` BIGINT NOT NULL,
  `Desc` VARCHAR(255) NULL,
  `Amt` DECIMAL(13,4) NULL,
  `PostDateTime` DATETIME NULL,
  PRIMARY KEY (`ObjId`),
  FOREIGN KEY (PtObjId) REFERENCES Patient(ObjId))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Adj;
CREATE TABLE Adj (
  `ObjId` BIGINT NOT NULL,
  `PtObjId` BIGINT NOT NULL,
  `Desc` VARCHAR(255) NULL,
  `Amt` DECIMAL(13,4) NULL,
  `PostDateTime` DATETIME NULL,
  PRIMARY KEY (`ObjId`),
  FOREIGN KEY (PtObjId) REFERENCES Patient(ObjId))
ENGINE = InnoDB;

DROP TABLE IF EXISTS HealthProvider;
CREATE TABLE HealthProvider (
  `ObjId` BIGINT NOT NULL,
  `Name` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient (
  `ObjId` BIGINT NOT NULL,
  `MedRecNo` VARCHAR(255) NULL,
  `BirthDateTime` DATETIME NULL,
  `AdmDateTime` DATETIME NULL,
  `DschDateTime` DATETIME NULL,
  `DeathDateTime` DATETIME NULL,
  `Name` VARCHAR(255) NULL,
  `Address` VARCHAR(255) NULL,
  `City` VARCHAR(255) NULL,
  `StateProvince` VARCHAR(255) NULL,
  `Zip` VARCHAR(15) NULL,
  `Phone` VARCHAR(255) NULL,
  `MaritalSts` CHAR(1) NULL,
  `Race` CHAR(1) NULL,
  `HispanicEthnicity` CHAR(1) NULL,
  `Weight` DECIMAL(6,2) NULL,
  `Height` DECIMAL(4,2) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Diag;
CREATE TABLE Diag (
  `ObjId` BIGINT NOT NULL,
  `PtObjId` BIGINT NOT NULL,
  `PrioNo` INT NOT NULL,  
  `Cd` VARCHAR(255) NULL,
  `CdType` VARCHAR(255) NULL,
  `Description` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`),
  FOREIGN KEY (PtObjId) REFERENCES Patient(ObjId))
ENGINE = InnoDB;

DROP TABLE IF EXISTS DiagMstr;
CREATE TABLE DiagMstr (
  `ObjId` BIGINT NOT NULL,
  `CdType` VARCHAR(255) NULL,
  `Cd` VARCHAR(255) NULL,
  `Description` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Proc;
CREATE TABLE Proc (
  `ObjId` BIGINT NOT NULL,
  `PtObjId` BIGINT NOT NULL,
  `Cd` VARCHAR(255) NULL,
  `CdType` VARCHAR(255) NULL,
  `Description` varchar(255) NULL,
  PRIMARY KEY (`ObjId`),
  FOREIGN KEY (PtObjId) REFERENCES Patient(ObjId))
ENGINE = InnoDB;

DROP TABLE IF EXISTS ProcMstr;
CREATE TABLE ProcMstr (
  `ObjId` BIGINT NOT NULL,
  `Cd` VARCHAR(255) NULL,
  `CdType` VARCHAR(255) NULL,
  `Description` varchar(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

SET FOREIGN_KEY_CHECKS=1;

/**
 * --------------------------------------------------------------------------------
 *
 * Create funcions and procedures
 *
 * --------------------------------------------------------------------------------
 */  

/**
 * getObjid() will generate a random BIGINT. To prevent collisions  
 *   previous ObjIds are persisted to check IF already assigned.
 *
 */
DELIMITER //
DROP FUNCTION IF EXISTS Get_ObjId//
CREATE FUNCTION Get_ObjId() RETURNS BIGINT DETERMINISTIC
BEGIN
  DECLARE next BIGINT;
  SET next = (FLOOR(1 + RAND() * POW(2,63)));
  /* IF already used continue until finding an available ObjId */
  WHILE (exists(SELECT next FROM objids WHERE objid=next) = 1) do
      SET next = (FLOOR(1 + RAND() * POW(2,63)));
  END WHILE;
  INSERT INTO objids(objid) VALUES (next);
  RETURN NEXT;
END//
DELIMITER ;


/**
 * ins_HealthProvider() will insert a row into the HealthProvider table.
 *
 */
DELIMITER //
DROP PROCEDURE IF EXISTS ins_HealthProvider//
CREATE PROCEDURE ins_HealthProvider (ObjId BIGINT, Name VARCHAR(255))
BEGIN
  INSERT INTO HealthProvider (
    ObjId,
    Name
  )
  VALUES
  (
    ObjId,
    Name
  );
END//
DELIMITER ;


/**
 * ins_DiagMstr() will insert a row into the DiagMstr table.
 *
 */
DELIMITER //
DROP PROCEDURE IF EXISTS ins_DiagMstr//
CREATE PROCEDURE ins_DiagMstr (ObjId BIGINT, CdType VARCHAR(255), Cd VARCHAR(255), Description VARCHAR(255))
BEGIN
  INSERT INTO DiagMstr (
    ObjId,
    CdType,
    Cd,
    Description
  )
  VALUES
  (
    ObjId,
    CdType,
    Cd,
    Description
  );
END//
DELIMITER ;

/**
 * ins_ProcMstr() will insert a row into the ProcMstr table.
 *
 */
DELIMITER //
DROP PROCEDURE IF EXISTS ins_ProcMstr//
CREATE PROCEDURE ins_ProcMstr (ObjId BIGINT, CdType VARCHAR(255), Cd VARCHAR(255), Description VARCHAR(255))
BEGIN
  INSERT INTO ProcMstr (ObjId, CdType, Cd, Description)
  VALUES (ObjId, CdType, Cd, Description);
END//
DELIMITER ;

/**
 * ins_Patient() will insert a row into the Patient table.
 *
 */
DELIMITER //
DROP PROCEDURE IF EXISTS ins_Patient//
CREATE PROCEDURE ins_Patient
  (
	MedRecNo VARCHAR(255),
	BirthDateTime DATETIME,
	AdmDateTime DATETIME,
	DschDateTime DATETIME,
	DeathDateTime DATETIME,
	Name VARCHAR(255),
	Address VARCHAR(255),
	City VARCHAR(255),
	StateProvince VARCHAR(255),
	Zip VARCHAR(15),
	Phone VARCHAR(255),
	MaritalSts CHAR(1),
	Race CHAR(1),
	HispanicEthnicity CHAR(1),
	Weight DECIMAL(6,2),
	Height DECIMAL(4,2)
  )
BEGIN
  INSERT INTO Patient
  (
	ObjId,
	MedRecNo,
	BirthDateTime,
	AdmDateTime,
	DschDateTime,
	DeathDateTime,
	Name,
	Address,
	City,
	StateProvince,
	Zip,
	Phone,
	MaritalSts,
	Race,
	HispanicEthnicity,
	Weight,
	Height
  )
  VALUES
  (
	Get_ObjId(),
	MedRecNo,
	BirthDateTime,
	AdmDateTime,
	DschDateTime,
	DeathDateTime,
	Name,
	Address,
	City,
	StateProvince,
	Zip,
	Phone,
	MaritalSts,
	Race,
	HispanicEthnicity,
	Weight,
	Height
  );
END//
DELIMITER ;


/**
 * add_Diagnosis() will insert a row into the Diag table for a Patient for the given MedRecNo.
 *
 */
DELIMITER //
DROP PROCEDURE IF EXISTS add_Diagnosis//
CREATE PROCEDURE add_Diagnosis(MedRecNo VARCHAR(255), PrioNo INT, Cd VARCHAR(255))
add_Diagnosis:BEGIN
	DECLARE precount int;
    DECLARE postcount int;
	DECLARE count int;
    DECLARE PtObjId BIGINT;
	/* check IF we can find the patient for this MedRecNo */
	SET PtObjId = (SELECT COUNT(*) FROM Patient WHERE Patient.MedRecNo=MedRecNo);
	IF (PtObjId is null) THEN # Patient Not Found MedRecNo
		LEAVE add_Diagnosis;
	END IF;
	SET count = (SELECT COUNT(*) FROM DiagMstr WHERE DiagMstr.Cd=Cd);
	IF (count = 0) THEN # Diagnosis Code Not Found In DiagMstr
		LEAVE add_Diagnosis;
	END IF;
	START TRANSACTION;
        SET precount = (SELECT COUNT(*) FROM Diag);
		INSERT INTO Diag (
			ObjId,
            PtObjId,
			PrioNo,
			Cd,
			CdType,
			Description)
		VALUES 
			(Get_ObjId(),
			(SELECT Patient.ObjId FROM Patient WHERE Patient.MedRecNo=MedRecNo),
			PrioNo,
			Cd,
			(SELECT DiagMstr.CdType FROM DiagMstr WHERE DiagMstr.Cd=Cd),
			(SELECT DiagMstr.Description FROM DiagMstr WHERE DiagMstr.Cd=Cd));
		SET postcount = (SELECT COUNT(*) FROM Diag);
        SET count = postcount - precount;
		IF (count = 1) THEN
			COMMIT;
		ELSE 
			ROLLBACK;
		END IF;
END//
DELIMITER ;

/**
 * --------------------------------------------------------------------------------
 *
 * Populate a sample SET of data
 *
 * --------------------------------------------------------------------------------
 */
 
call ins_HealthProvider(Get_ObjId(), 'Laboratory Services');
call ins_HealthProvider(Get_ObjId(), 'Pharmacy Services');
call ins_HealthProvider(Get_ObjId(), 'X-Ray Services');
call ins_HealthProvider(Get_ObjId(), 'Ultrasound Services');
call ins_HealthProvider(Get_ObjId(), 'Monitoring Services');
call ins_HealthProvider(Get_ObjId(), 'Professional Services');
call ins_HealthProvider(Get_ObjId(), 'Technical Services');
call ins_HealthProvider(Get_ObjId(), 'ECG Services');
   
call ins_DiagMstr(Get_ObjId(), 'ICD-10-CM', 'R51',      'Headache');
call ins_DiagMstr(Get_ObjId(), 'ICD-10-CM', 'R11.0',    'Nausea');
call ins_DiagMstr(Get_ObjId(), 'ICD-10-CM', 'S61.409A', 'Unspecifed open wound of unspecIFied hand, initial encounter');
call ins_DiagMstr(Get_ObjId(), 'ICD-10-CM', 'J11.1',    'Influenza due to unidentIFied influenza virus with other respiratory manIFestations');
call ins_DiagMstr(Get_ObjId(), 'ICD-10-CM', 'W61.43D',  'Pecked by turkey, subsequent encounter');

# A.M.A. Code SET
call ins_ProcMstr(Get_ObjId(), 'CPT', '99211', 'Patient Office or Other Outpatient Services');
call ins_ProcMstr(Get_ObjId(), 'CPT', '99281', 'Emergency department visit for the evaluation and management of a patient');
call ins_ProcMstr(Get_ObjId(), 'CPT', '90672', 'Influenza virus vaccine');
# Hospital IP Code SET
call ins_ProcMstr(Get_ObjId(), 'ICD-10-PCS', 'BP2VZZZ', 'Computerized Tomography (CT Scan) of Bilateral Upper Extremities');
call ins_ProcMstr(Get_ObjId(), 'ICD-10-PCS', 'BP3FZZZ', 'Magnetic Resonance Imaging (MRI) of Left Upper Arm');
call ins_ProcMstr(Get_ObjId(), 'ICD-10-PCS', 'B24CZZZ', 'Ultrasonography of Pericardium');
call ins_ProcMstr(Get_ObjId(), 'ICD-10-PCS', '0BJK0ZZ', 'Inspection of Right Lung, Open Approach');
call ins_ProcMstr(Get_ObjId(), 'ICD-10-PCS', '0BJL0ZZ', 'Inspection of Left Lung, Open Approach');
call ins_ProcMstr(Get_ObjId(), 'ICD-10-PCS', '4A02X4Z', 'Measurement of Cardiac Electrical Activity, External Approach');
#Center Medicare/Medicaid Hosp codes
call ins_ProcMstr(Get_ObjId(), 'HCPCS', 'A6413', 'Adhesive bandage, first-aid type, any size, each');
call ins_ProcMstr(Get_ObjId(), 'HCPCS', 'A6448', 'Light compression bandage, elastic, knitted/woven, width less than 3 inches, per yard');
call ins_ProcMstr(Get_ObjId(), 'HCPCS', 'A6216', 'Gauze, non-impregnated, non-sterile, pad size 16 sq. in. or less, without adhesive border, each dressing');
#National Drug Codes
call ins_ProcMstr(Get_ObjId(), 'NDC', '0363-0157', 'Aspirin Regular Strength');                                              
call ins_ProcMstr(Get_ObjId(), 'NDC', '50580-412', 'Tylenol Extra Strength');
call ins_ProcMstr(Get_ObjId(), 'NDC', '0573-0150', 'Advil');
call ins_ProcMstr(Get_ObjId(), 'NDC', '0573-0168', 'Advil Migraine');
call ins_ProcMstr(Get_ObjId(), 'NDC', '69968-0060', 'Polysporin First Aid Antibiotic');

call ins_Patient(
	'R040111111',          /*MedRecNo*/
	'1999-06-01 00:00:00', /*BirthDateTime*/
	'2019-07-01 15:00:00', /*AdmDateTime*/
	'2019-07-01 23:00:00', /*DschDateTime*/
	NULL,                  /*DeathDateTime*/
	'Rutherford,Amelia',   /*Name*/
	'123 Main St.',        /*Address*/
	'Anytown',             /*City*/
	'PA',                  /*StateProvince*/
	'12345',               /*Zip*/
	'123-456-7890',        /*Phone*/
	'M',                   /*MaritalSts*/
	'W',                   /*Race*/
	'N',                   /*Hispanic-Ethnicity*/
	112.0,                 /*Weight*/
	5.10                   /*Height*/
	);

call ins_Patient(
	'R040111112',          /*MedRecNo*/
	'1995-06-01 00:00:00', /*BirthDateTime*/
	'2019-07-01 15:00:00', /*AdmDateTime*/
	'2019-07-01 23:00:00', /*DschDateTime*/
	NULL,                  /*DeathDateTime*/
	'Simpson, Nicola',     /*Name*/
	'9303 Lyon Drive',     /*Address*/
	'Hill Valley',         /*City*/
	'CA',                  /*StateProvince*/
	'95420',               /*Zip*/
	'123-456-7890',        /*Phone*/
	'M',                   /*MaritalSts*/
	'W',                   /*Race*/
	'N',                   /*Hispanic-Ethnicity*/
	130.0,                 /*Weight*/
	5.5                    /*Height*/
	);

call ins_Patient(
	'R040111113',          /*MedRecNo*/
	'1978-12-01 00:00:00', /*BirthDateTime*/
	'2019-07-01 15:00:00', /*AdmDateTime*/
	'2019-07-01 23:00:00', /*DschDateTime*/
	NULL,                  /*DeathDateTime*/
	'Hughes, Donna',       /*Name*/
	'Wall St.',            /*Address*/
	'Anytown',             /*City*/
	'PA',                  /*StateProvince*/
	'12345',               /*Zip*/
	'123-456-7890',        /*Phone*/
	'M',                   /*MaritalSts*/
	'W',                   /*Race*/
	'N',                   /*Hispanic-Ethnicity*/
	112.0,                 /*Weight*/
	5.08                   /*Height*/
	);

call ins_Patient(
	'R040111114',          /*MedRecNo*/
	'1945-03-18 00:00:00', /*BirthDateTime*/
	'2019-03-17 15:00:00', /*AdmDateTime*/
	'2019-03-18 23:00:00', /*DschDateTime*/
	'1999-03-18 00:00:00', /*DeathDateTime*/
	'Hamilton, Edward',    /*Name*/
	'10 Downing St.',      /*Address*/
	'AnyCity',             /*City*/
	'PA',                  /*StateProvince*/
	'12345',               /*Zip*/
	'123-456-7890',        /*Phone*/
	'M',                   /*MaritalSts*/
	'W',                   /*Race*/
	'N',                   /*Hispanic-Ethnicity*/
	185.0,                 /*Weight*/
	5.11                   /*Height*/
	);

call ins_Patient(
	'R040111115',          /*MedRecNo*/
	'1991-06-03 00:00:00', /*BirthDateTime*/
	'2019-10-01 15:00:00', /*AdmDateTime*/
	'2019-10-05 23:00:00', /*DschDateTime*/
	NULL,                  /*DeathDateTime*/
	'Martin, Elizabeth',   /*Name*/
	'1 River Rd.',         /*Address*/
	'River City',          /*City*/
	'PA',                  /*StateProvince*/
	'12345',               /*Zip*/
	'123-456-7890',        /*Phone*/
	'M',                   /*MaritalSts*/
	'W',                   /*Race*/
	'N',                   /*Hispanic-Ethnicity*/
	122.0,                 /*Weight*/
	5.09                   /*Height*/
	);

call add_Diagnosis('R040111111', 1, 'R51');
call add_Diagnosis('R040111112', 1, 'R11.0');
call add_Diagnosis('R040111113', 1, 'S61.409A');
call add_Diagnosis('R040111115', 1, 'J11.1');
call add_Diagnosis('R040111114', 1, 'W61.43D');

-- SELECT * FROM chg;
-- SELECT * FROM pay;
-- SELECT * FROM adj;
-- SELECT * FROM HealthProvider;
-- SELECT * FROM DiagMstr;
-- SELECT * FROM ProcMstr;
-- SELECT * FROM Patient;
-- SELECT * FROM Diag;
-- SELECT * FROM Patient inner join Diag on Diag.PtObjId=Patient.Objid;