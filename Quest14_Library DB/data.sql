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



--SELECT * FROM Persons ORDER BY LastName;