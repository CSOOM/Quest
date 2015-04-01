window.back = new Background(document.querySelectorAll('.background')[0]);
var addcatefunc = new Button_addCategory(back, document.getElementsByClassName('addCate button')[0]);

var category1 = new Category(back, '기본',  '#ffbb99');
back.addCategory(category1);
var category2 = new Category(back, '할 일',  '#f8df9d');
back.addCategory(category2);
var category3 =new Category(back, '아이디어',  '#caf1a1');
back.addCategory(category3);
var category4 =new Category(back, '정보',  '#a1caf1');		
back.addCategory(category4);

category2.addMemo(new Memo(category2, "4/1", "링크들 총 정리"));
category3.addMemo(new Memo(category3, "Tech Talk", "Meteor JS"));
category4.addMemo(new Memo(category4, "맛집", "대학로\n도쿄스테이크\n\n강남\n마루가메제면"))
category4.addMemo(new Memo(category4, "화장품", "VDL\n스킨프로\n\n이니스프리\n미네랄파우더\n\n에스쁘아\n누드쿠션\n\n"))
