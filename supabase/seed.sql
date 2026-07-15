-- Demonstration prices only. TODO: replace with confirmed price, stock, dimensions and artist data.
insert into products (slug,sku,price_cents,stock,edition_total,edition_number,available,image_path,orientation) values
('cesky-krumlov','COA-CZ-CK-001',48000,10,10,1,true,'/images/products/cesky-krumlov.jpg','portrait'),
('ceske-budejovice','COA-CZ-CB-002',46000,9,10,1,true,'/images/products/ceske-budejovice.jpg','portrait'),
('beroun','COA-CZ-BE-003',42000,8,10,1,true,'/images/products/beroun.jpg','portrait'),
('prague','COA-CZ-PR-004',52000,7,10,1,true,'/images/products/prague.jpg','portrait'),
('tabor','COA-CZ-TA-005',45000,6,10,1,true,'/images/products/tabor.jpg','portrait'),
('czech-republic','COA-CZ-CR-006',56000,5,10,1,true,'/images/products/czech-republic.jpg','portrait'),
('pardubice','COA-CZ-PA-007',44000,4,10,1,true,'/images/products/pardubice.jpg','portrait'),
('kutna-hora','COA-CZ-KH-008',49000,3,10,1,true,'/images/products/kutna-hora.jpg','landscape'),
('hradec-kralove','COA-CZ-HK-009',46000,2,10,1,true,'/images/products/hradec-kralove.jpg','portrait')
on conflict (slug) do update set price_cents=excluded.price_cents,stock=excluded.stock,image_path=excluded.image_path,orientation=excluded.orientation;

insert into product_localizations(product_id,locale,city,title,summary,city_story,heraldry,alt_text)
select id,'en',case slug when 'cesky-krumlov' then 'Český Krumlov' when 'ceske-budejovice' then 'České Budějovice' when 'beroun' then 'Beroun' when 'prague' then 'Prague' when 'tabor' then 'Tábor' when 'czech-republic' then 'Czech Republic' when 'pardubice' then 'Pardubice' when 'kutna-hora' then 'Kutná Hora' else 'Hradec Králové' end,
case slug when 'czech-republic' then 'Czech Republic — Copper Plate Impression' else concat(case slug when 'cesky-krumlov' then 'Český Krumlov' when 'ceske-budejovice' then 'České Budějovice' when 'beroun' then 'Beroun' when 'prague' then 'Prague' when 'tabor' then 'Tábor' when 'pardubice' then 'Pardubice' when 'kutna-hora' then 'Kutná Hora' else 'Hradec Králové' end,' — Copper Plate Impression') end,
'Limited hand-worked city armorial copper impression.','See the typed application seed for the complete bilingual city story.','See the typed application seed for the complete heraldry note.',concat('Handcrafted copper plate impression: ',slug) from products
on conflict (product_id,locale) do nothing;

insert into product_localizations(product_id,locale,city,title,summary,city_story,heraldry,alt_text)
select id,'zh',case slug when 'cesky-krumlov' then '捷克克鲁姆洛夫' when 'ceske-budejovice' then '捷克布杰约维采' when 'beroun' then '贝龙' when 'prague' then '布拉格' when 'tabor' then '塔博尔' when 'czech-republic' then '捷克共和国' when 'pardubice' then '帕尔杜比采' when 'kutna-hora' then '库特纳霍拉' else '赫拉德茨-克拉洛韦' end,
concat(case slug when 'cesky-krumlov' then '捷克克鲁姆洛夫' when 'ceske-budejovice' then '捷克布杰约维采' when 'beroun' then '贝龙' when 'prague' then '布拉格' when 'tabor' then '塔博尔' when 'czech-republic' then '捷克共和国' when 'pardubice' then '帕尔杜比采' when 'kutna-hora' then '库特纳霍拉' else '赫拉德茨-克拉洛韦' end,'｜城市纹章铜板拓印'),
'限量手工城市纹章铜板拓印作品。','完整双语城市故事见应用 TypeScript seed。','完整纹章说明见应用 TypeScript seed。',concat('城市纹章手工铜板拓印作品：',slug) from products
on conflict (product_id,locale) do nothing;
