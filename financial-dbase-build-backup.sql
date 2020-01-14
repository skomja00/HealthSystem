#CREATE DATABASE financial;
USE financial;
/**
 * --------------------------------------------------------------------------------
 *
 * Create funcions and procedures
 *
 * --------------------------------------------------------------------------------
 */  

/**
 * getObjid() will generate a random BIGINT. To prevent collisions  
 *   previous ObjIds are persisted to check if already assigned.
 *
 */
delimiter //
DROP FUNCTION IF EXISTS get_objid//
CREATE FUNCTION get_objid() RETURNS BIGINT DETERMINISTIC
begin
  declare next bigint;
  set next = (FLOOR(1 + RAND() * POW(2,63)));
  while (exists(select next from objids where objid=next) = 1) do
      set next = (FLOOR(1 + RAND() * POW(2,63)));
  end while;
  insert into objids(objid) values (next);
  return next;
end//
delimiter ;


/**
 * getGLAccountObjid() will lookup the GLAccount and return the ObjId
 *
 */
delimiter //
DROP FUNCTION IF EXISTS getGLAccountObjId//
CREATE FUNCTION getGLAccountObjId(AcctName VARCHAR(255)) RETURNS BIGINT DETERMINISTIC
begin
  declare GLAccountObjId bigint;
  set GLAccountObjId = (select GLAccount.ObjId from GLAccount where GLAccount.AcctName=AcctName);
  return GLAccountObjId;
end//
delimiter ;


/**
 * ins_GLAccount() will insert a row into the GLAccount table.
 *
 */
delimiter //
drop procedure if exists ins_GLAccount//
create procedure ins_GLAccount
  (
    ObjId BIGINT,
    AcctName VARCHAR(255)
  )
begin
  insert into GLAccount (
    ObjId,
    AcctName
  )
  values
  (
    ObjId,
    AcctName
  );
end//
delimiter ;

/**
 * ins_DiagMstr() will insert a row into the DiagMstr table.
 *
 */
delimiter //
drop procedure if exists ins_DiagMstr//
create procedure ins_DiagMstr (ObjId bigint, CdType VARCHAR(255), Cd VARCHAR(255), Description VARCHAR(255))
begin
  insert into DiagMstr (
    ObjId,
    CdType,
    Cd,
    Description
  )
  values
  (
    ObjId,
    CdType,
    Cd,
    Description
  );
END//
delimiter ;

/**
 * ins_ProcMstr() will insert a row into the ProcMstr table.
 *
 */
delimiter //
drop procedure if exists ins_ProcMstr//
create procedure ins_ProcMstr (ObjId bigint, CdType VARCHAR(255), Cd VARCHAR(255), Description VARCHAR(255))
begin
  insert into ProcMstr (ObjId, CdType, Cd, Description)
  values (ObjId, CdType, Cd, Description);
END//
delimiter ;

/**
 * ins_Patient() will insert a row into the Patient table.
 *
 */
delimiter //
drop procedure if exists ins_Patient//
create procedure ins_Patient
  (
ObjId BIGINT,
MedRecNo VARCHAR(255),
GLAccountObjId BIGINT,
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
begin
  insert into Patient
  (
ObjId,
MedRecNo,
GLAccountObjId,
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
  values
  (
ObjId,
MedRecNo,
GLAccountObjId,
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
end//
delimiter ;


/**
 * ins_HealthProvider() will insert a row into the HealthProvider table.
 *
 */
delimiter //
drop procedure if exists ins_HealthProvider//
create procedure ins_HealthProvider (ObjId bigint, GLAccountObjId VARCHAR(255), Name VARCHAR(255))
begin
  insert into HealthProvider (
    ObjId,
    GLAccountObjId,
    Name
  )
  values
  (
    ObjId,
    GLAccountObjId,
    Name
  );
END//
delimiter ;
/**
 * --------------------------------------------------------------------------------
 *
 * Create tables
 *
 * --------------------------------------------------------------------------------
 */  
drop table if exists objids;
create table objids (
  objid bigint unsigned not null primary key
);

DROP TABLE IF EXISTS Chg;
CREATE TABLE Chg (
  `ObjId` BIGINT NOT NULL,
  `SvcCd` VARCHAR(255) NULL,
  `SvcDesc` VARCHAR(255) NULL,
  `Qty` DECIMAL(9,2) NULL,
  `Amt` DECIMAL(13,4) NULL,
  `SvcDateTime` DATETIME NULL,
  `CreditAcctId` VARCHAR(255) NULL,
  `DebitAcctId` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Pay;
CREATE TABLE Pay (
  `ObjId` BIGINT NOT NULL,
  `Desc` VARCHAR(255) NULL,
  `Amt` DECIMAL(13,4) NULL,
  `PostDateTime` DATETIME NULL,
  `CreditGLAcctId` VARCHAR(255) NULL,
  `DebitGLAcctId` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Adj;
CREATE TABLE Adj (
  `ObjId` BIGINT NOT NULL,
  `Desc` VARCHAR(255) NULL,
  `Amt` DECIMAL(13,4) NULL,
  `PostDateTime` DATETIME NULL,
  `CreditGLAcctId` VARCHAR(255) NULL,
  `DebitGLAcctId` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;


/**
 * GeneralLedger cheatsheet:
 * asset  db+ cr-
 * liab   db- cr+
 * equity db- cr+
 *
 */
DROP TABLE IF EXISTS GeneralLedger;
CREATE TABLE GeneralLedger (
  `ObjId` BIGINT NOT NULL,
  `AcctName` VARCHAR(255) NULL,
  `DebitAmt` DECIMAL(13,4) NULL,
  `DbAcctObjId` BIGINT NULL,
  `CreditAmt` DECIMAL(13,4) NULL,
  `CrAcctObjId` BIGINT NULL,
  `PostDateTime` DATETIME NOT NULL,
  `FiscPer` BIGINT NULL,
  `FiscStrDateTime` DATETIME NULL,
  `FiscStpDateTime` DATETIME NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;


DROP TABLE IF EXISTS GLAccount;
CREATE TABLE GLAccount (
  `ObjId` BIGINT NOT NULL,
  `AcctName` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Patient;
CREATE TABLE Patient (
  `ObjId` BIGINT NOT NULL,
  `MedRecNo` VARCHAR(255) NULL,
  `GLAccountObjid` VARCHAR(255) NOT NULL,
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

DROP TABLE IF EXISTS HealthProvider;
CREATE TABLE HealthProvider (
  `ObjId` BIGINT NOT NULL,
  `GLAccountObjId` VARCHAR(255) NOT NULL,
  `Name` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS Diag;
CREATE TABLE Diag (
  `ObjId` BIGINT NOT NULL,
  `PatientObjId` BIGINT NOT NULL,
  `Cd` VARCHAR(255) NULL,
  `CdType` VARCHAR(255) NULL,
  `Description` VARCHAR(255) NULL,
  PRIMARY KEY (`ObjId`))
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
  `PatientObjId` BIGINT NOT NULL,
  `Cd` VARCHAR(255) NULL,
  `CdType` VARCHAR(255) NULL,
  `Description` varchar(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;

DROP TABLE IF EXISTS ProcMstr;
CREATE TABLE ProcMstr (
  `ObjId` BIGINT NOT NULL,
  `Cd` VARCHAR(255) NULL,
  `CdType` VARCHAR(255) NULL,
  `Description` varchar(255) NULL,
  PRIMARY KEY (`ObjId`))
ENGINE = InnoDB;


/**
 * --------------------------------------------------------------------------------
 *
 * Populate a sample set of data
 *
 * --------------------------------------------------------------------------------
 */
-- ins_FinTrans(date,                  description                                debitacct,           debitamt, creditacct,               creditamt);
-- ins_FinTrans('2019-06-01 00:00:00', 'Philips PAGEWRITER TC50 CARDIOGRAPH',     'Medical Equipment', 11882.00,                'AcctPay',  11882.00);
-- ins_FinTrans('2019-06-01 00:00:00', 'GE Vivid 7 Dimension Ultrasound Machine', 'Medical Equipment', 16000.00,                'AcctPay',  16000.00);
-- ins_FinTrans('2019-06-01 00:00:00', 'SIEMENS LUMINOS TF X-Ray',                'Medical Equipment', 18500.00,                'AcctPay',  18500.00);
-- ins_FinTrans('2019-06-01 00:00:00', 'GE CARESCAPE VC 150 Patient Monitor',     'Medical Equipment',  2250.00,                'AcctPay',   2250.00);
-- ins_FinTrans('2019-06-01 00:00:00', 'Medical Software and Healthcare IT',      'Medical Equipment',  5000.00,                'AcctPay',   5000.00);


-- call ins_ProcMstr(get_objid(), 'CPT', '99211', 'Patient Office or Other Outpatient Services');
-- call ins_HealthProvider(get_objid(), getGLAccountObjId('Monitoring Services'), 'Monitoring Services');


-- GeneralLedger cheatsheet:
-- asset  db+  cr-
-- liab   db-  cr+
-- equity db-  cr+
--
--
--                             DEBIT                         |                            CREDIT
-- -----------------------------------------------------------------------------------------------------------------------
--                             ASSET                         |                           LIABILITY                
-- call ins_GLAccount(get_objid(), 'AcctRcv');               |     call ins_GLAccount(get_objid(), 'AcctPay');
-- call ins_GLAccount(get_objid(), 'Medical Equipment');     |     call ins_GLAccount(get_objid(), 'ProfWagesPay');    
-- call ins_GLAccount(get_objid(), 'Cash');                  |     call ins_GLAccount(get_objid(), 'TechWagesPay');      
--                                                           |
--                                                           |                            EQUITY
--                                                           |                            
--                                                           |                            REVENUE
--                                                           |     call ins_GLAccount(get_objid(), 'Laboratory Services');
--                                                           |     call ins_GLAccount(get_objid(), 'Pharmacy Services');
--                                                           |     call ins_GLAccount(get_objid(), 'X-Ray Services');
--                                                           |     call ins_GLAccount(get_objid(), 'Ultrasound Services');
--                                                           |     call ins_GLAccount(get_objid(), 'Monitoring Services');
--                                                           |     call ins_GLAccount(get_objid(), 'Professional Services');
--                                                           |     call ins_GLAccount(get_objid(), 'Technical Services');
--                                                           |     call ins_GLAccount(get_objid(), 'ECG Services');
--                                                           |                            
--                                                           |                            EXPENSE (expenses are almost always debited)
--                                                           |     call ins_GLAccount(get_objid(), 'Rutherford,Amelia');
--                                                           |     call ins_GLAccount(get_objid(), 'Simpson, Nicola');
--                                                           |     call ins_GLAccount(get_objid(), 'Hughes, Donna');
--                                                           |     call ins_GLAccount(get_objid(), 'Hamilton, Edward');
--                                                           |     call ins_GLAccount(get_objid(), 'Martin, Elizabeth');
--
call ins_HealthProvider(get_objid(), getGLAccountObjId('Laboratory Services'));
call ins_HealthProvider(get_objid(), getGLAccountObjId('Pharmacy Services'));
call ins_HealthProvider(get_objid(), getGLAccountObjId('X-Ray Services'));
call ins_HealthProvider(get_objid(), getGLAccountObjId('Ultrasound Services'));
call ins_HealthProvider(get_objid(), getGLAccountObjId('Monitoring Services'));
call ins_HealthProvider(get_objid(), getGLAccountObjId('Professional Services'));
call ins_HealthProvider(get_objid(), getGLAccountObjId('Technical Services'));
call ins_HealthProvider(get_objid(), getGLAccountObjId('ECG Services'));
   
call ins_DiagMstr(get_objid(), 'ICD-10-CM', 'R51',      'Headache');
call ins_DiagMstr(get_objid(), 'ICD-10-CM', 'R11.0',    'Nausea');
call ins_DiagMstr(get_objid(), 'ICD-10-CM', 'S61.409A', 'Unspecified open wound of unspecified hand, initial encounter');
call ins_DiagMstr(get_objid(), 'ICD-10-CM', 'J11.1',    'Influenza due to unidentified influenza virus with other respiratory manifestations');
call ins_DiagMstr(get_objid(), 'ICD-10-CM', 'W61.43A',  'Pecked by turkey, initial encounter');

# A.M.A. Code Set
call ins_ProcMstr(get_objid(), 'CPT', '99211', 'Patient Office or Other Outpatient Services');
call ins_ProcMstr(get_objid(), 'CPT', '99281', 'Emergency department visit for the evaluation and management of a patient');
call ins_ProcMstr(get_objid(), 'CPT', '90672', 'Influenza virus vaccine');
# Hospital IP Code Set
call ins_ProcMstr(get_objid(), 'ICD-10-PCS', 'BP2VZZZ', 'Computerized Tomography (CT Scan) of Bilateral Upper Extremities');
call ins_ProcMstr(get_objid(), 'ICD-10-PCS', 'BP3FZZZ', 'Magnetic Resonance Imaging (MRI) of Left Upper Arm');
call ins_ProcMstr(get_objid(), 'ICD-10-PCS', 'B24CZZZ', 'Ultrasonography of Pericardium');
call ins_ProcMstr(get_objid(), 'ICD-10-PCS', '0BJK0ZZ', 'Inspection of Right Lung, Open Approach');
call ins_ProcMstr(get_objid(), 'ICD-10-PCS', '0BJL0ZZ', 'Inspection of Left Lung, Open Approach');
call ins_ProcMstr(get_objid(), 'ICD-10-PCS', '4A02X4Z', 'Measurement of Cardiac Electrical Activity, External Approach');
#Center Medicare/Medicaid Hosp codes
call ins_ProcMstr(get_objid(), 'HCPCS', 'A6413', 'Adhesive bandage, first-aid type, any size, each');
call ins_ProcMstr(get_objid(), 'HCPCS', 'A6448', 'Light compression bandage, elastic, knitted/woven, width less than 3 inches, per yard');
call ins_ProcMstr(get_objid(), 'HCPCS', 'A6216', 'Gauze, non-impregnated, non-sterile, pad size 16 sq. in. or less, without adhesive border, each dressing');
#National Drug Codes
call ins_ProcMstr(get_objid(), 'NDC', '0363-0157', 'Aspirin Regular Strength');                                              
call ins_ProcMstr(get_objid(), 'NDC', '50580-412', 'Tylenol Extra Strength');
call ins_ProcMstr(get_objid(), 'NDC', '0573-0150', 'Advil');
call ins_ProcMstr(get_objid(), 'NDC', '0573-0168', 'Advil Migraine');
call ins_ProcMstr(get_objid(), 'NDC', '69968-0060', 'Polysporin First Aid Antibiotic');

call ins_Patient(
  get_objid(),           /*ObjId*/              'R040111111',          /*MedRecNo*/      getGLAccountObjId('Rutherford,Amelia'), /*GLAcct*/
  '1999-06-01 00:00:00', /*BirthDateTime*/      '2019-07-01 15:00:00', /*AdmDateTime*/   '2019-07-01 23:00:00',                  /*DschDateTime*/
  NULL,                  /*DeathDateTime*/      'Rutherford,Amelia',   /*Name*/          '123 Main St.',                         /*Address*/
  'Anytown',             /*City*/               'PA',                  /*StateProvince*/ '12345',                                /*Zip*/
  '123-456-7890',        /*Phone*/              'M',                   /*MaritalSts*/    'W',                                    /*Race*/
  'N',                   /*Hispanic-Ethnicity*/ 112.0,                 /*Weight*/         5.10                                   /*Height*/
);

call ins_Patient(
  get_objid(),           /*ObjId*/              'R040111112',          /*MedRecNo*/      getGLAccountObjId('Simpson, Nicola'),   /*GLAcct*/
  '1995-06-01 00:00:00', /*BirthDateTime*/      '2019-07-01 15:00:00', /*AdmDateTime*/   '2019-07-01 23:00:00',                  /*DschDateTime*/
  NULL,                  /*DeathDateTime*/      'Simpson, Nicola',     /*Name*/          '22 Ruth Ave',                          /*Address*/
  'Anytown',             /*City*/               'PA',                  /*StateProvince*/ '12345',                                /*Zip*/
  '123-456-7890',        /*Phone*/              'M',                   /*MaritalSts*/    'W',                                    /*Race*/
  'N',                   /*Hispanic-Ethnicity*/ 130.0,                 /*Weight*/         5.5                                    /*Height*/
);

call ins_Patient(
  get_objid(),           /*ObjId*/              'R040111113',          /*MedRecNo*/      getGLAccountObjId('Hughes, Donna'),     /*GLAcct*/
  '1978-12-01 00:00:00', /*BirthDateTime*/      '2019-07-01 15:00:00', /*AdmDateTime*/   '2019-07-01 23:00:00',                  /*DschDateTime*/
  NULL,                  /*DeathDateTime*/      'Hughes, Donna',       /*Name*/          'Wall St.',                             /*Address*/
  'Anytown',             /*City*/               'PA',                  /*StateProvince*/ '12345',                                /*Zip*/
  '123-456-7890',        /*Phone*/              'M',                   /*MaritalSts*/    'W',                                    /*Race*/
  'N',                   /*Hispanic-Ethnicity*/ 112.0,                 /*Weight*/         5.75                                   /*Height*/
);

call ins_Patient(
  get_objid(),           /*ObjId*/              'R040111114',          /*MedRecNo*/      getGLAccountObjId('Hamilton, Edward'),    /*GLAcct*/
  '1945-03-18 00:00:00', /*BirthDateTime*/      '2019-03-17 15:00:00', /*AdmDateTime*/   '2019-03-18 23:00:00',                    /*DschDateTime*/
  '1999-03-18 00:00:00', /*DeathDateTime*/      'Hamilton, Edward',    /*Name*/          '10 Downing St.',                         /*Address*/
  'AnyCity',             /*City*/               'PA',                  /*StateProvince*/ '12345',                                  /*Zip*/
  '123-456-7890',        /*Phone*/              'M',                   /*MaritalSts*/    'W',                                      /*Race*/
  'N',                   /*Hispanic-Ethnicity*/ 185.0,                 /*Weight*/         5.11                                     /*Height*/
);

call ins_Patient(
  get_objid(),           /*ObjId*/              'R040111115',          /*MedRecNo*/      getGLAccountObjId('Martin, Elizabeth'), /*GLAcct*/
  '1991-06-03 00:00:00', /*BirthDateTime*/      '2019-10-01 15:00:00', /*AdmDateTime*/   '2019-10-05 23:00:00',                  /*DschDateTime*/
  NULL,                  /*DeathDateTime*/      'Martin, Elizabeth',   /*Name*/          '1 River Rd.',                          /*Address*/
  'River City',          /*City*/               'PA',                  /*StateProvince*/ '12345',                                /*Zip*/
  '123-456-7890',        /*Phone*/              'M',                   /*MaritalSts*/    'W',                                    /*Race*/
  'N',                   /*Hispanic-Ethnicity*/ 112.0,                 /*Weight*/         5.10                                   /*Height*/
);


select * from GLAccount;
select * from HealthProvider;
select * from DiagMstr;
select * from ProcMstr;
select * from Patient;
