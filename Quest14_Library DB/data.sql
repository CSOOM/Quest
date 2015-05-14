INSERT INTO Author(name) VALUES ('기욤 뮈소'), ('한비야'),('요나스 요나손'),('온다 리쿠'), ('김난도');
INSERT INTO Book(title, publisher) VALUES ('센트럴 파크', '밝은세상'), ('지도 밖으로 행군하라', '푸른숲'), ('창문 넘어 도망친 100세 노인', '열린책들'), ('밤의 피크닉', '북폴리오'), ('아프니까 청춘이다', '쌤앤파커스');
INSERT INTO Writes(aid, bid) VALUES (1,1), (2,2), (3,3), (4,4), (5,5);
INSERT INTO RecordList(personName, bid, timeLend) VALUES ('Cathy', 1, '2015-04-11 10:14:00');

INSERT INTO Book(title, publisher) VALUES ('내일','밝은세상'), ('구해줘', '밝은세상'), ('종이여자', '밝은세상');
INSERT INTO Writes(aid, bid) VALUES (1,6), (1,7), (1,8);

INSERT INTO Book(title, publisher) VALUES ('1그램의 용기', '푸른숲');
INSERT INTO Writes(aid, bid) VALUES (2,9);

INSERT INTO Book(title, publisher) VALUES ('여섯 번째 사요코', '노블마인');
INSERT INTO Writes(aid, bid) VALUES (4,10);
--5/12 데이터 다 넣음. 

UPDATE RecordList SET timeReturn = '2015-04-13 11:05:06' WHERE personName = "Cathy" AND bid = 1;
UPDATE RecordList SET timeLend = '2015-04-11 10:14:06' WHERE personName = "Cathy" AND bid = 1;

INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('윤희원', 5, '2015-03-02 08:24:27', '2015-03-04 10:16:21');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('최지원', 2, '2015-03-11 11:04:00', '2015-03-14 22:46:00');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('최지원', 3, '2015-03-14 23:02:00', '2015-03-15 13:23:32');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('정아영', 5, '2015-03-22 16:54:46', '2015-03-31 19:32:17');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('윤희원', 2, '2015-03-25 15:23:13', '2015-03-29 13:14:37');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('최지원', 6, '2015-04-01 09:46:20', '2015-04-12 18:36:01');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('윤희원', 4, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('윤희원', 7, '2015-04-12 21:19:37', '2015-04-17 11:28:12');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('정아영', 7, '2015-04-20 11:34:06', '2015-04-24 20:17:51');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('조수민', 7, '2015-04-28 09:24:29', '2015-05-01 22:36:17');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('최지원', 7, '2015-05-02 14:13:15', '2015-05-04 10:26:36');
--5/14 데이터 다 넣음.

INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('정아영', 8, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('윤희원', 8, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('류근열', 8, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('이희제', 8, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('정아영', 9, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('윤희원', 9, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('윤희원', 10, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('최지원', 10, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('정아영', 1, '2015-04-02 11:44:36', '2015-04-04 14:16:11');
INSERT INTO RecordList(personName, bid, timeLend, timeReturn) VALUES ('조수민', 1, '2015-04-02 11:44:36', '2015-04-04 14:16:11');





--SELECT * FROM Persons ORDER BY LastName;