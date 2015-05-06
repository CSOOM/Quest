CREATE TABLE Author(
	aid INTEGER,
	name VARCHAR(20) NOT NULL,
	PRIMARY KEY(aid)
);

CREATE TABLE Book(
	bid INTEGER,
	title VARCHAR(30) NOT NULL,
	publisher VARCHAR(20),
	PRIMARY KEY(bid)
);

CREATE TABLE Writes(
	aid INTEGER,
	bid INTEGER,
	PRIMARY KEY(aid, bid),
	FOREIGN KEY(aid) REFERENCES Author(aid),
	FOREIGN KEY(bid) REFERENCES Book(bid)
);

CREATE TABLE RecordList(
	rid INTEGER,
	personName VARCHAR(20) DEFAULT "Guest",
	bid INTEGER NOT NULL,
	timeLend TIMESTAMP,
	timeReturn TIMESTAMP,
	PRIMARY KEY(rid),
	FOREIGN KEY(bid) REFERENCES Book(bid)
);

