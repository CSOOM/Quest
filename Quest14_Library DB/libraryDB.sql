CREATE TABLE Author(
	aid INTEGER AUTO_INCREMENT,
	name VARCHAR(20) NOT NULL,
	PRIMARY KEY(aid)
);

CREATE TABLE Book(
	bid INTEGER AUTO_INCREMENT,
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
	rid INTEGER AUTO_INCREMENT,
	personName VARCHAR(20) DEFAULT "Guest",
	bid INTEGER NOT NULL,
	timeLend TIMESTAMP,
	timeReturn TIMESTAMP,
	PRIMARY KEY(rid),
	FOREIGN KEY(bid) REFERENCES Book(bid)
);


SELECT b.bid, b.title, a.name, b.publisher
FROM Book b, Author a, Writes w
WHERE b.bid = w.bid AND w.aid = a.aid
ORDER BY b.bid;

SELECT b.bid, b.title, a.name, b.publisher 
FROM Book b, Author a, Writes w 
WHERE b.bid = w.bid AND w.aid = a.aid 
AND b.title LIKE ? AND a.name LIKE ? AND b.publisher LIKE ?
ORDER BY b.bid;

SELECT rid, personName, timeLend, timeReturn 
FROM RecordList 
WHERE bid = ? 
ORDER BY rid;