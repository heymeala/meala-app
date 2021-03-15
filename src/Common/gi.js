import React from 'react'

const GI = [{"Nahrungsmittel":"Stopfleber***", "GI": 0},
    {"Nahrungsmittel":"Alkohol", "GI": 0},
    {"Nahrungsmittel":"Fisch (Lachs, Thunfisch, Sardinen, Sardellen, etc.)***", "GI": 0},
    {"Nahrungsmittel":"Käse (Mozzarella, Camembert, Emmentaler, etc.)***", "GI": 0},
    {"Nahrungsmittel":"Fleisch***", "GI": 0},
    {"Nahrungsmittel":"Rotwein, Weißwein, Champagner***", "GI": 0},
    {"Nahrungsmittel":"Wurst (Salami, Würstchen, etc.), Schinken***", "GI": 0},
    {"Nahrungsmittel":"Meeresfrüchte*** (Garnelen, Muscheln, Austern)", "GI": 0},
    {"Nahrungsmittel":"Mayonnaise (selbst gemacht: Eier, Öl, Senf)", "GI": 0},
    {"Nahrungsmittel":"Gänsefett, Margarine***", "GI": 0},
    {"Nahrungsmittel":"Eier***", "GI": 0},
    {"Nahrungsmittel":"Kaffee, Tee***", "GI": 0},
    {"Nahrungsmittel":"Geflügel*** (Hähnchen, Pute, etc.)", "GI": 0},
    {"Nahrungsmittel":"Rind (Steak, Filet)***", "GI": 0},
    {"Nahrungsmittel":"Sauerrahm, Crème fraîche***/**", "GI": 0},
    {"Nahrungsmittel":"Sojasauce ohne Zucker und Farbstoffe", "GI": 0},
    {"Nahrungsmittel":"Öl (Olivenöl, Sonnenblumenöl, etc.)***", "GI": 0},
    {"Nahrungsmittel":"Krustentiere (Hummer, Krabben, Languste)", "GI": 5},
    {"Nahrungsmittel":"Gewürze, Kräuter (Pfeffer, Petersilie, Basilikum, Oregano, Zimt, Vanille, etc.)", "GI": 5},
    {"Nahrungsmittel":"Essig", "GI": 5},
    {"Nahrungsmittel":"Balsamico Essig", "GI": 5},
    {"Nahrungsmittel":"Avocado", "GI": 10},
    {"Nahrungsmittel":"Spaghetti, mit niedrigem ", "GI": 14},
    {"Nahrungsmittel":"Nudeln, Spaghetti, mit niedrigem ", "GI": 14},
    {"Nahrungsmittel":"Mangold", "GI": 15},
    {"Nahrungsmittel":"Lupine (Süßlupine)", "GI": 15},
    {"Nahrungsmittel":"Kleie (Weizen, Hafer ...)", "GI": 15},
    {"Nahrungsmittel":"Agavensirup", "GI": 15},
    {"Nahrungsmittel":"Spargel", "GI": 15},
    {"Nahrungsmittel":"Gurke", "GI": 15},
    {"Nahrungsmittel":"Brokkoli", "GI": 15},
    {"Nahrungsmittel":"Oliven", "GI": 15},
    {"Nahrungsmittel":"Mandeln", "GI": 15},
    {"Nahrungsmittel":"Zwiebeln", "GI": 15},
    {"Nahrungsmittel":"Champignons, Pilze", "GI": 15},
    {"Nahrungsmittel":"Soja", "GI": 15},
    {"Nahrungsmittel":"Tofu", "GI": 15},
    {"Nahrungsmittel":"Ingwer", "GI": 15},
    {"Nahrungsmittel":"Radieschen, Rettich", "GI": 15},
    {"Nahrungsmittel":"Rosenkohl", "GI": 15},
    {"Nahrungsmittel":"Chicoree", "GI": 15},
    {"Nahrungsmittel":"Pesto", "GI": 15},
    {"Nahrungsmittel":"Pinienkerne", "GI": 15},
    {"Nahrungsmittel":"Rhabarber", "GI": 15},
    {"Nahrungsmittel":"Fenchel", "GI": 15},
    {"Nahrungsmittel":"Stangensellerie", "GI": 15},
    {"Nahrungsmittel":"Pepperoni", "GI": 15},
    {"Nahrungsmittel":"Pistazien", "GI": 15},
    {"Nahrungsmittel":"Paprika", "GI": 15},
    {"Nahrungsmittel":"Sauerkraut", "GI": 15},
    {"Nahrungsmittel":"Schalotte", "GI": 15},
    {"Nahrungsmittel":"Johannisbeeren, schwarz", "GI": 15},
    {"Nahrungsmittel":"Essiggurken", "GI": 15},
    {"Nahrungsmittel":"Johannisbrotmehl (Carobpulver)", "GI": 15},
    {"Nahrungsmittel":"Spinat", "GI": 15},
    {"Nahrungsmittel":"Zucchini", "GI": 15},
    {"Nahrungsmittel":"Lauch, Frühlingszwiebel", "GI": 15},
    {"Nahrungsmittel":"Nüsse", "GI": 15},
    {"Nahrungsmittel":"Salat, grün", "GI": 15},
    {"Nahrungsmittel":"Kohl, Kraut", "GI": 15},
    {"Nahrungsmittel":"Erdnüsse", "GI": 15},
    {"Nahrungsmittel":"Sauerampfer", "GI": 15},
    {"Nahrungsmittel":"Sprossen", "GI": 15},
    {"Nahrungsmittel":"Physalis, Kapstachelbeere", "GI": 15},
    {"Nahrungsmittel":"Getreide, gekeimt", "GI": 15},
    {"Nahrungsmittel":"Blumenkohl", "GI": 15},
    {"Nahrungsmittel":"Tempeh", "GI": 15},
    {"Nahrungsmittel":"Stangenbohnen", "GI": 15},
    {"Nahrungsmittel":"Zuckererbsenschote", "GI": 15},
    {"Nahrungsmittel":"Weizenkeime", "GI": 15},
    {"Nahrungsmittel":"Ratatouille", "GI": 20},
    {"Nahrungsmittel":"Zitronensaft, ohne Zucker", "GI": 20},
    {"Nahrungsmittel":"Kakaopulver, ohne Zucker", "GI": 20},
    {"Nahrungsmittel":"Auber", "GI": 20},
    {"Nahrungsmittel":"Sojajoghurt (natur)", "GI": 20},
    {"Nahrungsmittel":"Bambussprossen", "GI": 20},
    {"Nahrungsmittel":"Karotten, roh", "GI": 20},
    {"Nahrungsmittel":"Schokolade, schwarz (über 85 % Kakaogehalt)", "GI": 20},
    {"Nahrungsmittel":"Palmherzen", "GI": 20},
    {"Nahrungsmittel":"Artischocke", "GI": 20},
    {"Nahrungsmittel":"Acerolakirsche, Antillenkirsche", "GI": 20},
    {"Nahrungsmittel":"Soja-Sahne", "GI": 20},
    {"Nahrungsmittel":"Tamarisoße (ohne Zucker oder Süßstoff)", "GI": 20},
    {"Nahrungsmittel":"Fruktose, Fruchtzucker (Montignac®)", "GI": 20},
    {"Nahrungsmittel":"Zitrone", "GI": 20},
    {"Nahrungsmittel":"Konfitüre, Marmelade, ohne Zucker (Montignac®)", "GI": 20},
    {"Nahrungsmittel":"Mandeln, gemahlen", "GI": 20},
    {"Nahrungsmittel":"Haselnuss, gemahlen", "GI": 20},
    {"Nahrungsmittel":"Schokolade, schwarz (über 70 % Kakaogehalt)", "GI": 25},
    {"Nahrungsmittel":"Erdnussmus, ungezuckert", "GI": 25},
    {"Nahrungsmittel":"Himbeere, frisch", "GI": 25},
    {"Nahrungsmittel":"Mandelmus, ungezuckert (aus ganzen Mandeln)", "GI": 25},
    {"Nahrungsmittel":"Haselnuss", "GI": 25},
    {"Nahrungsmittel":"Hummus (vegetarischer Brotaufstrich aus Kichererbsen)", "GI": 25},
    {"Nahrungsmittel":"Cashewkerne", "GI": 25},
    {"Nahrungsmittel":"Brombeeren", "GI": 25},
    {"Nahrungsmittel":"Haselnussmus, ungezuckert", "GI": 25},
    {"Nahrungsmittel":"Linsen, grün", "GI": 25},
    {"Nahrungsmittel":"Heidelbeeren", "GI": 25},
    {"Nahrungsmittel":"Stachelbeere", "GI": 25},
    {"Nahrungsmittel":"Grapefruit, frisch", "GI": 25},
    {"Nahrungsmittel":"Erdbeeren, frisch", "GI": 25},
    {"Nahrungsmittel":"Kürbiskerne", "GI": 25},
    {"Nahrungsmittel":"Kirschen", "GI": 25},
    {"Nahrungsmittel":"Johannisbeeren, rot", "GI": 25},
    {"Nahrungsmittel":"Sojamehl", "GI": 25},
    {"Nahrungsmittel":"Mungobohnen", "GI": 25},
    {"Nahrungsmittel":"Bohnenkerne, grün (Flageolet)", "GI": 25},
    {"Nahrungsmittel":"Gerstengraupen, grob", "GI": 25},
    {"Nahrungsmittel":"Spalterbsen", "GI": 25},
    {"Nahrungsmittel":"Goji Beere", "GI": 25},
    {"Nahrungsmittel":"pęczak", "GI": 25},
    {"Nahrungsmittel":"Mandarinen, Clementinen", "GI": 30},
    {"Nahrungsmittel":"Weiße Bohnen, Perlbohnen", "GI": 30},
    {"Nahrungsmittel":"Tomate", "GI": 30},
    {"Nahrungsmittel":"Knoblauch", "GI": 30},
    {"Nahrungsmittel":"Marmelade, ohne Zucker", "GI": 30},
    {"Nahrungsmittel":"Bohnen, grün", "GI": 30},
    {"Nahrungsmittel":"Sojamilch", "GI": 30},
    {"Nahrungsmittel":"Apfel, getrocknet", "GI": 30},
    {"Nahrungsmittel":"Linsen, braun", "GI": 30},
    {"Nahrungsmittel":"Rote Bete, roh", "GI": 30},
    {"Nahrungsmittel":"Passionsfrucht, Maracuja, Grenadille", "GI": 30},
    {"Nahrungsmittel":"Mandelmilch", "GI": 30},
    {"Nahrungsmittel":"Quark, nicht abgetropft**", "GI": 30},
    {"Nahrungsmittel":"Milch aus Milchpulver**", "GI": 30},
    {"Nahrungsmittel":"Sojanudeln", "GI": 30},
    {"Nahrungsmittel":"Milch (vollfett oder fettarm)**", "GI": 30},
    {"Nahrungsmittel":"Weiße Rübe, roh", "GI": 30},
    {"Nahrungsmittel":"Linsen, gelb", "GI": 30},
    {"Nahrungsmittel":"Schwarzwurzeln", "GI": 30},
    {"Nahrungsmittel":"Birne, frisch", "GI": 30},
    {"Nahrungsmittel":"Hafermilch (ungekocht)", "GI": 30},
    {"Nahrungsmittel":"Gerstengraupen, fein (Perlgraupen)", "GI": 30},
    {"Nahrungsmittel":"Aprikosen, getrocknet", "GI": 30},
    {"Nahrungsmittel":"Pumpernickel (Montignac®)", "GI": 32},
    {"Nahrungsmittel":"Vollkornbrot (Montignac®)", "GI": 34},
    {"Nahrungsmittel":"Sprossenbrot (aus gekeimtem Getreide)", "GI": 35},
    {"Nahrungsmittel":"Granatapfel, frisch", "GI": 35},
    {"Nahrungsmittel":"Banane, leicht grün", "GI": 35},
    {"Nahrungsmittel":"Amarant", "GI": 35},
    {"Nahrungsmittel":"Joghurt**", "GI": 35},
    {"Nahrungsmittel":"Tomaten, getrocknet", "GI": 35},
    {"Nahrungsmittel":"Pflaume, frisch", "GI": 35},
    {"Nahrungsmittel":"Quinoa", "GI": 35},
    {"Nahrungsmittel":"Tomatensaft", "GI": 35},
    {"Nahrungsmittel":"Kichererbsen", "GI": 35},
    {"Nahrungsmittel":"Aprikosen, frisch", "GI": 35},
    {"Nahrungsmittel":"Apfelmus, Apfelkompott", "GI": 35},
    {"Nahrungsmittel":"Hefe", "GI": 35},
    {"Nahrungsmittel":"Orange, frisch", "GI": 35},
    {"Nahrungsmittel":"Mandelmus, ungezuckert (aus geschälten Mandeln)", "GI": 35},
    {"Nahrungsmittel":"Senf, scharf", "GI": 35},
    {"Nahrungsmittel":"Bohnen, schwarz", "GI": 35},
    {"Nahrungsmittel":"Apfel, frisch", "GI": 35},
    {"Nahrungsmittel":"Bohnen, rot", "GI": 35},
    {"Nahrungsmittel":"Adzuki-Bohnen", "GI": 35},
    {"Nahrungsmittel":"Suppennudeln aus Hartweizen", "GI": 35},
    {"Nahrungsmittel":"Sonnenblumenkerne", "GI": 35},
    {"Nahrungsmittel":"Bierhefe", "GI": 35},
    {"Nahrungsmittel":"Feige, frisch", "GI": 35},
    {"Nahrungsmittel":"Wasa Köstlich (24 % Ballaststoffgehalt)", "GI": 35},
    {"Nahrungsmittel":"Tomatensoße, ohne Zucker", "GI": 35},
    {"Nahrungsmittel":"Falafel (aus Kichererbsen)", "GI": 35},
    {"Nahrungsmittel":"Eiscreme (mit Fruchtzucker)", "GI": 35},
    {"Nahrungsmittel":"Wildreis", "GI": 35},
    {"Nahrungsmittel":"Nektarine", "GI": 35},
    {"Nahrungsmittel":"Leinsamen/Sesam/Mohn, ganz", "GI": 35},
    {"Nahrungsmittel":"Kichererbsenmehl", "GI": 35},
    {"Nahrungsmittel":"Cherimoya, Zimtapfel, Annonenfrucht", "GI": 35},
    {"Nahrungsmittel":"Cassoulet (franz. Bohnen-Fleisch-Eintopf)", "GI": 35},
    {"Nahrungsmittel":"Bohnen, Borlotti", "GI": 35},
    {"Nahrungsmittel":"Kichererbsen (Dose)", "GI": 35},
    {"Nahrungsmittel":"Pfirsich, frisch", "GI": 35},
    {"Nahrungsmittel":"Sellerie, roh", "GI": 35},
    {"Nahrungsmittel":"Quitte, frisch", "GI": 35},
    {"Nahrungsmittel":"Erbsen, frisch", "GI": 35},
    {"Nahrungsmittel":"Schokoladenriegel, ohne Zucker (Montignac®)", "GI": 35},
    {"Nahrungsmittel":"Mais, ursprünglicher (Indien)", "GI": 35},
    {"Nahrungsmittel":"Erbsen, frisch", "GI": 35},
    {"Nahrungsmittel":"Kokosnuss", "GI": 35},
    {"Nahrungsmittel":"Kokosnuss, gemahlen", "GI": 35},
    {"Nahrungsmittel":"Emmer (alte Getreidesorte)", "GI": 40},
    {"Nahrungsmittel":"Quittengelee (ohne Zucker)", "GI": 40},
    {"Nahrungsmittel":"Pepino, Melonenbirne", "GI": 40},
    {"Nahrungsmittel":"Jamswurzel", "GI": 40},
    {"Nahrungsmittel":"Ravioli (aus Hartweizen)", "GI": 40},
    {"Nahrungsmittel":"Apfelsaft, ungezuckert", "GI": 40},
    {"Nahrungsmittel":"Karottensaft, ohne Zucker", "GI": 40},
    {"Nahrungsmittel":"Sesammus, Tahin", "GI": 40},
    {"Nahrungsmittel":"Dicke Bohnen, roh", "GI": 40},
    {"Nahrungsmittel":"Pflaumen, getrocknet", "GI": 40},
    {"Nahrungsmittel":"Hafer", "GI": 40},
    {"Nahrungsmittel":"Kokosmilch", "GI": 40},
    {"Nahrungsmittel":"Karotten, gekocht*", "GI": 40},
    {"Nahrungsmittel":"Apfelwein, trocken", "GI": 40},
    {"Nahrungsmittel":"Vollkornnudeln, al dente", "GI": 40},
    {"Nahrungsmittel":"Kamut, Vollkorn", "GI": 40},
    {"Nahrungsmittel":"Bohnen, rot (Dose)", "GI": 40},
    {"Nahrungsmittel":"Vollkornbrot (100 %) mit Hefe/Sauerteig", "GI": 40},
    {"Nahrungsmittel":"Matzen (ungesäuertes Fladenbrot, Vollkornmehl)", "GI": 40},
    {"Nahrungsmittel":"Sorbet, ohne Zucker", "GI": 40},
    {"Nahrungsmittel":"Sandgebäck aus Vollkornmehl, ohne Zucker", "GI": 40},
    {"Nahrungsmittel":"Erdnussbutter", "GI": 40},
    {"Nahrungsmittel":"Zichorie (Getränk)", "GI": 40},
    {"Nahrungsmittel":"Haferflocken, grob", "GI": 40},
    {"Nahrungsmittel":"Falafel (aus Bohnen)", "GI": 40},
    {"Nahrungsmittel":"Quinoamehl", "GI": 40},
    {"Nahrungsmittel":"Buchweizen Pfannkuchen", "GI": 40},
    {"Nahrungsmittel":"Buchweizen Pasta", "GI": 40},
    {"Nahrungsmittel":"Spaghetti, Vollkorn, al dente gekocht", "GI": 40},
    {"Nahrungsmittel":"Hartweizen, trocken, vorgegart (10 Min. Kochzeit)", "GI": 45},
    {"Nahrungsmittel":"Emmer-Vollkornmehl (alte Getreidesorte)", "GI": 45},
    {"Nahrungsmittel":"Blé, pilpil de", "GI": 45},
    {"Nahrungsmittel":"Mangosaft, ohne Zucker", "GI": 45},
    {"Nahrungsmittel":"Traubensaft (ungezuckert)", "GI": 45},
    {"Nahrungsmittel":"Capellini (dünne Spaghetti)", "GI": 45},
    {"Nahrungsmittel":"Grapefruitsaft, ungezuckert", "GI": 45},
    {"Nahrungsmittel":"Orangensaft, zuckerfrei", "GI": 45},
    {"Nahrungsmittel":"Banane, jaune (sans taches noires)", "GI": 45},
    {"Nahrungsmittel":"Kochbanane, roh", "GI": 45},
    {"Nahrungsmittel":"Couscous, Vollkorn", "GI": 45},
    {"Nahrungsmittel":"Tomatensoße (mit Zucker)", "GI": 45},
    {"Nahrungsmittel":"Trauben, frisch", "GI": 45},
    {"Nahrungsmittel":"Milchzucker", "GI": 45},
    {"Nahrungsmittel":"Kamutbrot", "GI": 45},
    {"Nahrungsmittel":"Kamut-Vollkornmehl", "GI": 45},
    {"Nahrungsmittel":"Vollkorntoast, ohne Zucker", "GI": 45},
    {"Nahrungsmittel":"Erbsen (Dose)", "GI": 45},
    {"Nahrungsmittel":"Vollkornbulgur (gekocht)", "GI": 45},
    {"Nahrungsmittel":"Preiselbeeren", "GI": 45},
    {"Nahrungsmittel":"Vollkorncerealien, ohne Zucker", "GI": 45},
    {"Nahrungsmittel":"Dinkel (Vollkorn)", "GI": 45},
    {"Nahrungsmittel":"Dinkel (Vollkorn)", "GI": 45},
    {"Nahrungsmittel":"Fruchtaufstrich (Konfitüre), ohne Zucker", "GI": 45},
    {"Nahrungsmittel":"Müsli (Montignac®)", "GI": 45},
    {"Nahrungsmittel":"Pumpernickel", "GI": 45},
    {"Nahrungsmittel":"Spaghetti, al dente gekocht (5 Minuten)", "GI": 45},
    {"Nahrungsmittel":"Basmatireis, Vollkorn", "GI": 45},
    {"Nahrungsmittel":"Weizenvollkornmehl", "GI": 45},
    {"Nahrungsmittel":"Banane, grün", "GI": 45},
    {"Nahrungsmittel":"Tamarinde, süß", "GI": 50},
    {"Nahrungsmittel":"Ananas (Dose)", "GI": 50},
    {"Nahrungsmittel":"Pfirsich (Dose, gezuckert)", "GI": 50},
    {"Nahrungsmittel":"Ananassaft, ungezuckert", "GI": 50},
    {"Nahrungsmittel":"Basmatireis, Langkorn", "GI": 50},
    {"Nahrungsmittel":"Mango", "GI": 50},
    {"Nahrungsmittel":"Bulgur (gekocht )", "GI": 50},
    {"Nahrungsmittel":"Sushi", "GI": 50},
    {"Nahrungsmittel":"Surimi", "GI": 50},
    {"Nahrungsmittel":"Topinambur, Erdbirne", "GI": 50},
    {"Nahrungsmittel":"Müsli, ohne Zucker", "GI": 50},
    {"Nahrungsmittel":"Kaki", "GI": 50},
    {"Nahrungsmittel":"Kiwi*", "GI": 50},
    {"Nahrungsmittel":"Süßkartoffeln", "GI": 50},
    {"Nahrungsmittel":"All Bran™ von Kelloggs", "GI": 50},
    {"Nahrungsmittel":"Wasa™ light rye", "GI": 50},
    {"Nahrungsmittel":"E", "GI": 50},
    {"Nahrungsmittel":"Litschi/Lychee, frisch", "GI": 50},
    {"Nahrungsmittel":"Naturreis", "GI": 50},
    {"Nahrungsmittel":"Vollkornnudeln", "GI": 50},
    {"Nahrungsmittel":"Feigen, getrocknet", "GI": 50},
    {"Nahrungsmittel":"Ananas (frische Frucht)", "GI": 50},
    {"Nahrungsmittel":"Brot mit Quinoa (ca. 65 % Quinoa)", "GI": 50},
    {"Nahrungsmittel":"Buchweizen, Vollkorn (dunkles Korn)", "GI": 50},
    {"Nahrungsmittel":"Sojajoghurt (aromatisiert)", "GI": 50},
    {"Nahrungsmittel":"Roggenvollkornbrot (100 %)", "GI": 50},
    {"Nahrungsmittel":"Chayote, püriert", "GI": 50},
    {"Nahrungsmittel":"Preiselbeer/Heidelbeersaft, ungezuckert", "GI": 50},
    {"Nahrungsmittel":"Kekse aus Vollkornmehl, ohne Zucker", "GI": 50},
    {"Nahrungsmittel":"Couscous (Vollkorngries)", "GI": 50},
    {"Nahrungsmittel":"Makkaroni (aus Hartweizen)", "GI": 50},
    {"Nahrungsmittel":"Banane, jaune (taches noires)", "GI": 50},
    {"Nahrungsmittel":"Fonio", "GI": 50},
    {"Nahrungsmittel":"Zuckermais", "GI": 55},
    {"Nahrungsmittel":"Ahornsirup", "GI": 55},
    {"Nahrungsmittel":"Pizza", "GI": 55},
    {"Nahrungsmittel":"Banane, reif", "GI": 55},
    {"Nahrungsmittel":"Senf, süß", "GI": 55},
    {"Nahrungsmittel":"Ketchup", "GI": 55},
    {"Nahrungsmittel":"Mispel", "GI": 55},
    {"Nahrungsmittel":"Sandgebäck (Mehl, Butter, Zucker)", "GI": 55},
    {"Nahrungsmittel":"Reis, rot", "GI": 55},
    {"Nahrungsmittel":"Tagliatelle, weich gekocht", "GI": 55},
    {"Nahrungsmittel":"Chicorée-Sirup", "GI": 55},
    {"Nahrungsmittel":"Maniok, bitter", "GI": 55},
    {"Nahrungsmittel":"Maniok, süß", "GI": 55},
    {"Nahrungsmittel":"Datteln", "GI": 55},
    {"Nahrungsmittel":"Spaghetti, weiß, weich gekocht", "GI": 55},
    {"Nahrungsmittel":"Birnen, Konserve", "GI": 55},
    {"Nahrungsmittel":"Reis, gepufft", "GI": 60},
    {"Nahrungsmittel":"Special K®", "GI": 60},
    {"Nahrungsmittel":"Chips", "GI": 60},
    {"Nahrungsmittel":"Cola, Limonaden, Erfrischungsgetränke", "GI": 60},
    {"Nahrungsmittel":"Croissant", "GI": 60},
    {"Nahrungsmittel":"Couscous", "GI": 60},
    {"Nahrungsmittel":"Milchbrot", "GI": 60},
    {"Nahrungsmittel":"Porridge, gekocht aus Haferflocken", "GI": 60},
    {"Nahrungsmittel":"Grieß (aus Hartweizen)", "GI": 60},
    {"Nahrungsmittel":"Reis, Langkorn", "GI": 60},
    {"Nahrungsmittel":"Eiscreme, gezuckert", "GI": 60},
    {"Nahrungsmittel":"Ovomaltine", "GI": 60},
    {"Nahrungsmittel":"Maronen, Esskastanien", "GI": 60},
    {"Nahrungsmittel":"Lasagne (aus Hartweizen)", "GI": 60},
    {"Nahrungsmittel":"Schokoladenpulver, gezuckert", "GI": 60},
    {"Nahrungsmittel":"Reis aus der Camargue", "GI": 60},
    {"Nahrungsmittel":"Honig", "GI": 60},
    {"Nahrungsmittel":"Chinesische Reisnudeln", "GI": 60},
    {"Nahrungsmittel":"Mars®, Snickers®, Nuts®, etc.", "GI": 60},
    {"Nahrungsmittel":"Vollkornmehl", "GI": 60},
    {"Nahrungsmittel":"Mayonnaise (industriell hergestellt, gezuckert)", "GI": 60},
    {"Nahrungsmittel":"Fruchtcocktail in Zuckersirup, Konserve", "GI": 60},
    {"Nahrungsmittel":"Papaya*", "GI": 60},
    {"Nahrungsmittel":"Kürbis (verschiedene)*", "GI": 65},
    {"Nahrungsmittel":"Marmelade, gezuckert", "GI": 65},
    {"Nahrungsmittel":"Kartoffeln mit Schale gegart (Wasser, Dampf)", "GI": 65},
    {"Nahrungsmittel":"Mehrkornbrot", "GI": 65},
    {"Nahrungsmittel":"Graubrot (mit Hefe)", "GI": 65},
    {"Nahrungsmittel":"Rote Bete, gekocht*", "GI": 65},
    {"Nahrungsmittel":"Rosinen", "GI": 65},
    {"Nahrungsmittel":"Quittengelee (mit Zucker)", "GI": 65},
    {"Nahrungsmittel":"Brotfrucht (Brotfruchtbaum)", "GI": 65},
    {"Nahrungsmittel":"Sorbet, gezuckert", "GI": 65},
    {"Nahrungsmittel":"Roggenbrot (30 % Roggen)", "GI": 65},
    {"Nahrungsmittel":"Müsli (mit Zucker oder Honig gesüßt)", "GI": 65},
    {"Nahrungsmittel":"Melone, Honigmelone*", "GI": 65},
    {"Nahrungsmittel":"Schokobrötchen", "GI": 65},
    {"Nahrungsmittel":"Getrockneter Zuckerrohrsaft", "GI": 65},
    {"Nahrungsmittel":"Kastanienmehl", "GI": 65},
    {"Nahrungsmittel":"Dinkel", "GI": 65},
    {"Nahrungsmittel":"Aprikosen (Dose, mit Zucker)", "GI": 65},
    {"Nahrungsmittel":"Konfitüre, gezuckert", "GI": 65},
    {"Nahrungsmittel":"Dicke Bohnen, gekocht", "GI": 65},
    {"Nahrungsmittel":"Mehl 50 % Vollkorn", "GI": 65},
    {"Nahrungsmittel":"Nudeln aus Vollkornreismehl", "GI": 65},
    {"Nahrungsmittel":"Kastanienmehl", "GI": 65},
    {"Nahrungsmittel":"Rohrzucker", "GI": 65},
    {"Nahrungsmittel":"Mais, gekocht", "GI": 65},
    {"Nahrungsmittel":"Zucker, weiß (Saccharose)", "GI": 70},
    {"Nahrungsmittel":"Popcorn (ohne Zucker)", "GI": 70},
    {"Nahrungsmittel":"Maismehl", "GI": 70},
    {"Nahrungsmittel":"Risotto", "GI": 70},
    {"Nahrungsmittel":"Reis, weiß, Standard", "GI": 70},
    {"Nahrungsmittel":"Tacos", "GI": 70},
    {"Nahrungsmittel":"Schokoladenriegel, zuckerhaltig", "GI": 70},
    {"Nahrungsmittel":"Gnocchi", "GI": 70},
    {"Nahrungsmittel":"Teigwaren, Nudeln (aus Weichweizen)", "GI": 70},
    {"Nahrungsmittel":"Melasse, Sirup", "GI": 70},
    {"Nahrungsmittel":"Cerealien, raffiniert, gezuckert", "GI": 70},
    {"Nahrungsmittel":"Maisbrei, Polenta", "GI": 70},
    {"Nahrungsmittel":"Zwieback", "GI": 70},
    {"Nahrungsmittel":"Bagels", "GI": 70},
    {"Nahrungsmittel":"Biskuit", "GI": 70},
    {"Nahrungsmittel":"Rohzucker", "GI": 70},
    {"Nahrungsmittel":"Kochbanane (gekocht)", "GI": 70},
    {"Nahrungsmittel":"Baguette, Weißbrot", "GI": 70},
    {"Nahrungsmittel":"Reisbrot", "GI": 70},
    {"Nahrungsmittel":"Brioche", "GI": 70},
    {"Nahrungsmittel":"Salzkartoffeln", "GI": 70},
    {"Nahrungsmittel":"Bier*", "GI": 70},
    {"Nahrungsmittel":"Hirse", "GI": 70},
    {"Nahrungsmittel":"Kohlrübe, Steckrübe (gekocht)", "GI": 70},
    {"Nahrungsmittel":"Amarant, gepufft", "GI": 70},
    {"Nahrungsmittel":"Ravioli (aus Weichweizen)", "GI": 70},
    {"Nahrungsmittel":"Polenta, Maisgrieß", "GI": 70},
    {"Nahrungsmittel":"Brot, ungesäuert (aus Weißmehl)", "GI": 70},
    {"Nahrungsmittel":"Pellkartoffeln", "GI": 70},
    {"Nahrungsmittel":"Jasminreis (Duftreis)", "GI": 70},
    {"Nahrungsmittel":"Kohlrübe, gelbe, Steckrübe", "GI": 70},
    {"Nahrungsmittel":"Wassermelone*", "GI": 75},
    {"Nahrungsmittel":"Hamburgerbrötchen", "GI": 75},
    {"Nahrungsmittel":"Lasagne (aus Weichweizen)", "GI": 75},
    {"Nahrungsmittel":"Weißes Toastbrot", "GI": 75},
    {"Nahrungsmittel":"Donuts, Berliner, Krapfen", "GI": 75},
    {"Nahrungsmittel":"Schnellkochreis", "GI": 75},
    {"Nahrungsmittel":"Waffeln (mit Zucker)", "GI": 75},
    {"Nahrungsmittel":"Kürbis (Riesenkürbis)*", "GI": 75},
    {"Nahrungsmittel":"Riz, farine de (complète)", "GI": 75},
    {"Nahrungsmittel":"Sportgetränke", "GI": 75},
    {"Nahrungsmittel":"Kartoffelpüree (selbst zubereitet)", "GI": 80},
    {"Nahrungsmittel":"Crackers made from white flour", "GI": 80},
    {"Nahrungsmittel":"Maizena", "GI": 85},
    {"Nahrungsmittel":"Weißmehl", "GI": 85},
    {"Nahrungsmittel":"Milchreis, gezuckert", "GI": 85},
    {"Nahrungsmittel":"Reispudding, Reiskuchen", "GI": 85},
    {"Nahrungsmittel":"Reismilch", "GI": 85},
    {"Nahrungsmittel":"Weiße Rübe, gekocht*", "GI": 85},
    {"Nahrungsmittel":"Sellerie (Knolle), gekocht*", "GI": 85},
    {"Nahrungsmittel":"Tapioka", "GI": 85},
    {"Nahrungsmittel":"Pastinake*", "GI": 85},
    {"Nahrungsmittel":"Cornflakes, Maisflocken", "GI": 85},
    {"Nahrungsmittel":"Pfeilwurzelmehl (Arrow Root)", "GI": 85},
    {"Nahrungsmittel":"Weißbrot ohne Gluten", "GI": 90},
    {"Nahrungsmittel":"Kartoffelpüree (Instantflocken)", "GI": 90},
    {"Nahrungsmittel":"Klebreis, glutenhaltig", "GI": 90},
    {"Nahrungsmittel":"Kartoffeln, gebacken mit Schale", "GI": 90},
    {"Nahrungsmittel":"Reismehl", "GI": 95},
    {"Nahrungsmittel":"Kartoffelstärke", "GI": 95},
    {"Nahrungsmittel":"Kartoffelgratin, Bratkartoffeln", "GI": 95},
    {"Nahrungsmittel":"Pommes frites", "GI": 95},
    {"Nahrungsmittel":"Maltodextrin", "GI": 95},
    {"Nahrungsmittel":"Maisstärke", "GI": 95},
    {"Nahrungsmittel":"Reissirup", "GI": 95},
    {"Nahrungsmittel":"Stärke, modifiziert", "GI": 100},
    {"Nahrungsmittel":"Glukose (Traubenzucker)", "GI": 100},
    {"Nahrungsmittel":"Glukosesirup", "GI": 100},
    {"Nahrungsmittel":"Weizensirup, Reissirup", "GI": 100},
    {"Nahrungsmittel":"Maissirup", "GI": 115}]

//export default GI

 const GItwo = [
    {
        "foodTags": "Foie gras",
        "de": "Stopfleber",
        "en": "Foie gras",
        "GI": 0
    },
    {
        "foodTags": "Alcohol",
        "de": "Alkohol",
        "en": "Alcohol",
        "GI": 0
    },
    {
        "foodTags": "Fish",
        "de": "Fisch (Lachs, Thunfisch, Sardinen, Sardellen, etc.)",
        "en": "Fish (salmon, tuna, sardines, anchovies, etc.)",
        "GI": 0
    },
    {
        "foodTags": "Cheese",
        "de": "Käse (Mozzarella, Camembert, Emmentaler, etc.)",
        "en": "Cheese (Mozzarella, Camembert, Emmental, etc.)",
        "GI": 0
    },
    {
        "foodTags": "Meat",
        "de": "Fleisch",
        "en": "Meat",
        "GI": 0
    },
    {
        "foodTags": "Wine",
        "de": "Rotwein, Weißwein, Champagner",
        "en": "Red wine, white wine, champagne",
        "GI": 0
    },
    {
        "foodTags": "Sausage",
        "de": "Wurst (Salami, Würstchen, etc.), Schinken",
        "en": "Sausage (salami, sausages, etc.), ham",
        "GI": 0
    },
    {
        "foodTags": "Salami",
        "de": "Wurst (Salami, Würstchen, etc.), Schinken",
        "en": "Sausage (salami, sausages, etc.), ham",
        "GI": 0
    },
    {
        "foodTags": "Ham",
        "de": "Wurst (Salami, Würstchen, etc.), Schinken",
        "en": "Sausage (salami, sausages, etc.), ham",
        "GI": 0
    },
    {
        "foodTags": "Seafood",
        "de": "Meeresfrüchte",
        "en": "Seafood",
        "GI": 0
    },
    {
        "foodTags": "Mussels",
        "de": "Muscheln",
        "en": "Seafood (shrimps, mussels, oysters)",
        "GI": 0
    },
    {
        "foodTags": "Shrimps",
        "de": "Meeresfrüchte (Garnelen, Muscheln, Austern)",
        "en": "Seafood (shrimps, mussels, oysters)",
        "GI": 0
    },
    {
        "foodTags": "Mayonnaise",
        "de": "Mayonnaise (Eier, Öl, Senf)",
        "en": "Mayonnaise (eggs, oil, mustard)",
        "GI": 0
    },
    {
        "foodTags": "Margarine",
        "de": "Margarine",
        "en": "Margarine",
        "GI": 0
    },
    {
        "foodTags": "Eggs",
        "de": "Eier",
        "en": "Eggs",
        "GI": 0
    },
    {
        "foodTags": "Tea",
        "de": "Tee",
        "en": "Tea",
        "GI": 0
    },
    {
        "foodTags": "Coffee",
        "de": "Kaffee",
        "en": "Coffee",
        "GI": 0
    },
    {
        "foodTags": "Poultry (chicken, turkey, etc.)",
        "de": "Geflügel (Hähnchen, Pute, etc.)",
        "en": "Poultry (chicken, turkey, etc.)",
        "GI": 0
    },
    {
        "foodTags": "Beef (steak, fillet)",
        "de": "Rind (Steak, Filet)",
        "en": "Beef (steak, fillet)",
        "GI": 0
    },
    {
        "foodTags": "Sour cream, crème fraîche/",
        "de": "Sauerrahm, Crème fraîche/",
        "en": "Sour cream, crème fraîche/",
        "GI": 0
    },
    {
        "foodTags": "Soy sauce without sugar and colourings",
        "de": "Sojasauce ohne Zucker und Farbstoffe",
        "en": "Soy sauce without sugar and colourings",
        "GI": 0
    },
    {
        "foodTags": "Oil (olive oil, sunflower oil, etc.)",
        "de": "Öl (Olivenöl, Sonnenblumenöl, etc.)",
        "en": "Oil (olive oil, sunflower oil, etc.)",
        "GI": 0
    },
    {
        "foodTags": "Crustaceans (lobster, crabs, crawfish)",
        "de": "Krustentiere (Hummer, Krabben, Languste)",
        "en": "Crustaceans (lobster, crabs, crawfish)",
        "GI": 5
    },
    {
        "foodTags": "Spices, herbs (pepper, parsley, basil, oregano, cinnamon, vanilla, etc.)",
        "de": "Gewürze, Kräuter (Pfeffer, Petersilie, Basilikum, Oregano, Zimt, Vanille, etc.)",
        "en": "Spices, herbs (pepper, parsley, basil, oregano, cinnamon, vanilla, etc.)",
        "GI": 5
    },
    {
        "foodTags": "Vinegar",
        "de": "Essig",
        "en": "Vinegar",
        "GI": 5
    },
    {
        "foodTags": "Balsamic vinegar",
        "de": "Balsamico Essig",
        "en": "Balsamic vinegar",
        "GI": 5
    },
    {
        "foodTags": "Avocado",
        "de": "Avocado",
        "en": "Avocado",
        "GI": 10
    },
    {
        "foodTags": "Lupine",
        "de": "Lupine (Süßlupine)",
        "en": "Lupine (sweet lupine)",
        "GI": 15
    },
    {
        "foodTags": "Wheat",
        "de": "Kleie (Weizen, Hafer ...)",
        "en": "Bran (wheat, oats ...)",
        "GI": 15
    },
    {
        "foodTags": "Agave syrup",
        "de": "Agavensirup",
        "en": "Agave syrup",
        "GI": 15
    },
    {
        "foodTags": "Asparagus",
        "de": "Spargel",
        "en": "Asparagus",
        "GI": 15
    },
    {
        "foodTags": "Cucumber",
        "de": "Gurke",
        "en": "Cucumber",
        "GI": 15
    },
    {
        "foodTags": "Broccoli",
        "de": "Brokkoli",
        "en": "Broccoli",
        "GI": 15
    },
    {
        "foodTags": "Olives",
        "de": "Oliven",
        "en": "Olives",
        "GI": 15
    },
    {
        "foodTags": "Almonds",
        "de": "Mandeln",
        "en": "Almonds",
        "GI": 15
    },
    {
        "foodTags": "Onions",
        "de": "Zwiebeln",
        "en": "Onions",
        "GI": 15
    },
    {
        "foodTags": "Mushrooms",
        "de": "Pilze",
        "en": "Mushrooms",
        "GI": 15
    },
    {
        "foodTags": "Soya",
        "de": "Soja",
        "en": "Soya",
        "GI": 15
    },
    {
        "foodTags": "Tofu",
        "de": "Tofu",
        "en": "Tofu",
        "GI": 15
    },
    {
        "foodTags": "Ginger",
        "de": "Ingwer",
        "en": "Ginger",
        "GI": 15
    },
    {
        "foodTags": "Radish",
        "de": "Radieschen, Rettich",
        "en": "Radish, radish",
        "GI": 15
    },
    {
        "foodTags": "Brussels sprouts",
        "de": "Rosenkohl",
        "en": "Brussels sprouts",
        "GI": 15
    },
    {
        "foodTags": "Chicory",
        "de": "Chicoree",
        "en": "Chicory",
        "GI": 15
    },
    {
        "foodTags": "Pesto",
        "de": "Pesto",
        "en": "Pesto",
        "GI": 15
    },
    {
        "foodTags": "Pine nuts",
        "de": "Pinienkerne",
        "en": "Pine nuts",
        "GI": 15
    },
    {
        "foodTags": "Rhubarb",
        "de": "Rhabarber",
        "en": "Rhubarb",
        "GI": 15
    },
    {
        "foodTags": "Fennel",
        "de": "Fenchel",
        "en": "Fennel",
        "GI": 15
    },
    {
        "foodTags": "Celery",
        "de": "Stangensellerie",
        "en": "Celery",
        "GI": 15
    },
    {
        "foodTags": "Pepperoni",
        "de": "Pepperoni",
        "en": "Pepperoni",
        "GI": 15
    },
    {
        "foodTags": "Pistachios",
        "de": "Pistazien",
        "en": "Pistachios",
        "GI": 15
    },
    {
        "foodTags": "Peppers",
        "de": "Paprika",
        "en": "Peppers",
        "GI": 15
    },
    {
        "foodTags": "Sauerkraut",
        "de": "Sauerkraut",
        "en": "Sauerkraut",
        "GI": 15
    },
    {
        "foodTags": "Shallot",
        "de": "Schalotte",
        "en": "Shallot",
        "GI": 15
    },
    {
        "foodTags": "Currants, black",
        "de": "Johannisbeeren, schwarz",
        "en": "Currants, black",
        "GI": 15
    },
    {
        "foodTags": "Pickles",
        "de": "Essiggurken",
        "en": "Pickles",
        "GI": 15
    },
    {
        "foodTags": "carob flour",
        "de": "Johannisbrotmehl (Carobpulver)",
        "en": "carob flour (carob powder)",
        "GI": 15
    },
    {
        "foodTags": "Spinach",
        "de": "Spinat",
        "en": "Spinach",
        "GI": 15
    },
    {
        "foodTags": "Courgette",
        "de": "Zucchini",
        "en": "Courgette",
        "GI": 15
    },
    {
        "foodTags": "spring onion",
        "de": "Frühlingszwiebel",
        "en": "spring onion",
        "GI": 15
    },
    {
        "foodTags": "Leeks",
        "de": "Lauch",
        "en": "Leeks",
        "GI": 15
    },
    {
        "foodTags": "Nuts",
        "de": "Nüsse",
        "en": "Nuts",
        "GI": 15
    },
    {
        "foodTags": "Salat",
        "de": "Salat",
        "en": "Salat",
        "GI": 15
    },
    {
        "foodTags": "cabbage",
        "de": "Kohl, Kraut",
        "en": "cabbage, cabbage",
        "GI": 15
    },
    {
        "foodTags": "Peanuts",
        "de": "Erdnüsse",
        "en": "Peanuts",
        "GI": 15
    },
    {
        "foodTags": "Sorrel",
        "de": "Sauerampfer",
        "en": "Sorrel",
        "GI": 15
    },
    {
        "foodTags": "Rungs",
        "de": "Sprossen",
        "en": "Rungs",
        "GI": 15
    },
    {
        "foodTags": "Physalis",
        "de": "Physalis, Kapstachelbeere",
        "en": "Physalis, Cape gooseberry",
        "GI": 15
    },
    {
        "foodTags": "Grain",
        "de": "Getreide, gekeimt",
        "en": "Grain, germinated",
        "GI": 15
    },
    {
        "foodTags": "Cauliflower",
        "de": "Blumenkohl",
        "en": "Cauliflower",
        "GI": 15
    },
    {
        "foodTags": "Tempeh",
        "de": "Tempeh",
        "en": "Tempeh",
        "GI": 15
    },
    {
        "foodTags": "runner beans",
        "de": "Stangenbohnen",
        "en": "runner beans",
        "GI": 15
    },
    {
        "foodTags": "Sugar pea pod",
        "de": "Zuckererbsenschote",
        "en": "Sugar pea pod",
        "GI": 15
    },
    {
        "foodTags": "Wheat germs",
        "de": "Weizenkeime",
        "en": "Wheat germs",
        "GI": 15
    },
    {
        "foodTags": "Ratatouille",
        "de": "Ratatouille",
        "en": "Ratatouille",
        "GI": 20
    },
    {
        "foodTags": "Lemon juice",
        "de": "Zitronensaft, ohne Zucker",
        "en": "Lemon juice, without sugar",
        "GI": 20
    },
    {
        "foodTags": "Cocoa powder",
        "de": "Kakaopulver, ohne Zucker",
        "en": "Cocoa powder, without sugar",
        "GI": 20
    },
    {
        "foodTags": "Auber",
        "de": "Auber",
        "en": "Auber",
        "GI": 20
    },
    {
        "foodTags": "Soy yoghurt",
        "de": "Sojajoghurt (natur)",
        "en": "Soy yoghurt (natural)",
        "GI": 20
    },
    {
        "foodTags": "Bamboo Shoots",
        "de": "Bambussprossen",
        "en": "Bamboo Shoots",
        "GI": 20
    },
    {
        "foodTags": "Carrots",
        "de": "Karotten, roh",
        "en": "Carrots, raw",
        "GI": 20
    },
    {
        "foodTags": "Chocolate",
        "de": "Schokolade, schwarz (über 85 % Kakaogehalt)",
        "en": "Chocolate, black (over 85% cocoa content)",
        "GI": 20
    },
    {
        "foodTags": "Palm Hearts",
        "de": "Palmherzen",
        "en": "Palm Hearts",
        "GI": 20
    },
    {
        "foodTags": "Artichoke",
        "de": "Artischocke",
        "en": "Artichoke",
        "GI": 20
    },
    {
        "foodTags": "Acerola cherry, Antillean cherry",
        "de": "Acerolakirsche, Antillenkirsche",
        "en": "Acerola cherry, Antillean cherry",
        "GI": 20
    },
    {
        "foodTags": "Soy Cream",
        "de": "Soja-Sahne",
        "en": "Soy Cream",
        "GI": 20
    },
    {
        "foodTags": "Tamari sauce",
        "de": "Tamarisoße (ohne Zucker oder Süßstoff)",
        "en": "Tamari sauce (without sugar or sweetener)",
        "GI": 20
    },
    {
        "foodTags": "Fructose",
        "de": "Fruktose, Fruchtzucker (Montignac®)",
        "en": "Fructose, fructose (Montignac®)",
        "GI": 20
    },
    {
        "foodTags": "Lemon",
        "de": "Zitrone",
        "en": "Lemon",
        "GI": 20
    },
    {
        "foodTags": "Jam",
        "de": "Konfitüre, Marmelade, ohne Zucker (Montignac®)",
        "en": "Jam, Marmalade, without sugar (Montignac®)",
        "GI": 20
    },
    {
        "foodTags": "Almonds",
        "de": "Mandeln, gemahlen",
        "en": "Almonds, ground",
        "GI": 20
    },
    {
        "foodTags": "Hazelnut",
        "de": "Haselnuss, gemahlen",
        "en": "Hazelnut, ground",
        "GI": 20
    },
    {
        "foodTags": "Chocolate",
        "de": "Schokolade, schwarz (über 70 % Kakaogehalt)",
        "en": "Chocolate, black (over 70% cocoa content)",
        "GI": 25
    },
    {
        "foodTags": "Peanut puree, unsweetened",
        "de": "Erdnussmus, ungezuckert",
        "en": "Peanut puree, unsweetened",
        "GI": 25
    },
    {
        "foodTags": "Raspberry",
        "de": "Himbeere, frisch",
        "en": "Raspberry, fresh",
        "GI": 25
    },
    {
        "foodTags": "Almond paste",
        "de": "Mandelmus, ungezuckert (aus ganzen Mandeln)",
        "en": "Almond paste, unsweetened (made from whole almonds)",
        "GI": 25
    },
    {
        "foodTags": "Hazelnut",
        "de": "Haselnuss",
        "en": "Hazelnut",
        "GI": 25
    },
    {
        "foodTags": "Hummus (vegetarian spread made from chickpeas)",
        "de": "Hummus (vegetarischer Brotaufstrich aus Kichererbsen)",
        "en": "Hummus (vegetarian spread made from chickpeas)",
        "GI": 25
    },
    {
        "foodTags": "Cashew kernels",
        "de": "Cashewkerne",
        "en": "Cashew kernels",
        "GI": 25
    },
    {
        "foodTags": "Blackberries",
        "de": "Brombeeren",
        "en": "Blackberries",
        "GI": 25
    },
    {
        "foodTags": "Hazelnut puree, unsweetened",
        "de": "Haselnussmus, ungezuckert",
        "en": "Hazelnut puree, unsweetened",
        "GI": 25
    },
    {
        "foodTags": "Lenses, green",
        "de": "Linsen, grün",
        "en": "Lenses, green",
        "GI": 25
    },
    {
        "foodTags": "Blueberries",
        "de": "Heidelbeeren",
        "en": "Blueberries",
        "GI": 25
    },
    {
        "foodTags": "Gooseberry",
        "de": "Stachelbeere",
        "en": "Gooseberry",
        "GI": 25
    },
    {
        "foodTags": "Grapefruit, fresh",
        "de": "Grapefruit, frisch",
        "en": "Grapefruit, fresh",
        "GI": 25
    },
    {
        "foodTags": "Strawberries, fresh",
        "de": "Erdbeeren, frisch",
        "en": "Strawberries, fresh",
        "GI": 25
    },
    {
        "foodTags": "Pumpkin seeds",
        "de": "Kürbiskerne",
        "en": "Pumpkin seeds",
        "GI": 25
    },
    {
        "foodTags": "Cherries",
        "de": "Kirschen",
        "en": "Cherries",
        "GI": 25
    },
    {
        "foodTags": "Currants, red",
        "de": "Johannisbeeren, rot",
        "en": "Currants, red",
        "GI": 25
    },
    {
        "foodTags": "Soya flour",
        "de": "Sojamehl",
        "en": "Soya flour",
        "GI": 25
    },
    {
        "foodTags": "Mung beans",
        "de": "Mungobohnen",
        "en": "Mung beans",
        "GI": 25
    },
    {
        "foodTags": "Beans, green (flageolet)",
        "de": "Bohnenkerne, grün (Flageolet)",
        "en": "Beans, green (flageolet)",
        "GI": 25
    },
    {
        "foodTags": "Grains of barley, coarse",
        "de": "Gerstengraupen, grob",
        "en": "Grains of barley, coarse",
        "GI": 25
    },
    {
        "foodTags": "Split peas",
        "de": "Spalterbsen",
        "en": "Split peas",
        "GI": 25
    },
    {
        "foodTags": "goji berry",
        "de": "Goji Beere",
        "en": "goji berry",
        "GI": 25
    },
    {
        "foodTags": "pęczak",
        "de": "pęczak",
        "en": "pęczak",
        "GI": 25
    },
    {
        "foodTags": "Mandarins, clementines",
        "de": "Mandarinen, Clementinen",
        "en": "Mandarins, clementines",
        "GI": 30
    },
    {
        "foodTags": "White beans, pearl beans",
        "de": "Weiße Bohnen, Perlbohnen",
        "en": "White beans, pearl beans",
        "GI": 30
    },
    {
        "foodTags": "Tomato",
        "de": "Tomate",
        "en": "Tomato",
        "GI": 30
    },
    {
        "foodTags": "Garlic",
        "de": "Knoblauch",
        "en": "Garlic",
        "GI": 30
    },
    {
        "foodTags": "Jam, without sugar",
        "de": "Marmelade, ohne Zucker",
        "en": "Jam, without sugar",
        "GI": 30
    },
    {
        "foodTags": "Beans, green",
        "de": "Bohnen, grün",
        "en": "Beans, green",
        "GI": 30
    },
    {
        "foodTags": "Soy milk",
        "de": "Sojamilch",
        "en": "Soy milk",
        "GI": 30
    },
    {
        "foodTags": "Apple, dried",
        "de": "Apfel, getrocknet",
        "en": "Apple, dried",
        "GI": 30
    },
    {
        "foodTags": "Lenses, brown",
        "de": "Linsen, braun",
        "en": "Lenses, brown",
        "GI": 30
    },
    {
        "foodTags": "Raw beetroot",
        "de": "Rote Bete, roh",
        "en": "Raw beetroot",
        "GI": 30
    },
    {
        "foodTags": "passion fruit, passion fruit, grenadilla",
        "de": "Passionsfrucht, Maracuja, Grenadille",
        "en": "passion fruit, passion fruit, grenadilla",
        "GI": 30
    },
    {
        "foodTags": "Almond milk",
        "de": "Mandelmilch",
        "en": "Almond milk",
        "GI": 30
    },
    {
        "foodTags": "Curd, not drained",
        "de": "Quark, nicht abgetropft",
        "en": "Curd, not drained",
        "GI": 30
    },
    {
        "foodTags": "Milk from milk powder",
        "de": "Milch aus Milchpulver",
        "en": "Milk from milk powder",
        "GI": 30
    },
    {
        "foodTags": "Soy Noodles",
        "de": "Sojanudeln",
        "en": "Soy Noodles",
        "GI": 30
    },
    {
        "foodTags": "Milk (full-fat or low-fat)",
        "de": "Milch (vollfett oder fettarm)",
        "en": "Milk (full-fat or low-fat)",
        "GI": 30
    },
    {
        "foodTags": "White beetroot, raw",
        "de": "Weiße Rübe, roh",
        "en": "White beetroot, raw",
        "GI": 30
    },
    {
        "foodTags": "Lenses, yellow",
        "de": "Linsen, gelb",
        "en": "Lenses, yellow",
        "GI": 30
    },
    {
        "foodTags": "Black salsifies",
        "de": "Schwarzwurzeln",
        "en": "Black salsifies",
        "GI": 30
    },
    {
        "foodTags": "Pear, fresh",
        "de": "Birne, frisch",
        "en": "Pear, fresh",
        "GI": 30
    },
    {
        "foodTags": "Oat milk (uncooked)",
        "de": "Hafermilch (ungekocht)",
        "en": "Oat milk (uncooked)",
        "GI": 30
    },
    {
        "foodTags": "Barley barley, fine (pearl barley)",
        "de": "Gerstengraupen, fein (Perlgraupen)",
        "en": "Barley barley, fine (pearl barley)",
        "GI": 30
    },
    {
        "foodTags": "Apricots, dried",
        "de": "Aprikosen, getrocknet",
        "en": "Apricots, dried",
        "GI": 30
    },
    {
        "foodTags": "Pumpernickel (Montignac®)",
        "de": "Pumpernickel (Montignac®)",
        "en": "Pumpernickel (Montignac®)",
        "GI": 32
    },
    {
        "foodTags": "Wholemeal bread (Montignac®)",
        "de": "Vollkornbrot (Montignac®)",
        "en": "Wholemeal bread (Montignac®)",
        "GI": 34
    },
    {
        "foodTags": "Sprouted bread (from germinated grain)",
        "de": "Sprossenbrot (aus gekeimtem Getreide)",
        "en": "Sprouted bread (from germinated grain)",
        "GI": 35
    },
    {
        "foodTags": "Pomegranate, fresh",
        "de": "Granatapfel, frisch",
        "en": "Pomegranate, fresh",
        "GI": 35
    },
    {
        "foodTags": "Banana, light green",
        "de": "Banane, leicht grün",
        "en": "Banana, light green",
        "GI": 35
    },
    {
        "foodTags": "Amaranth",
        "de": "Amarant",
        "en": "Amaranth",
        "GI": 35
    },
    {
        "foodTags": "Yogurt",
        "de": "Joghurt",
        "en": "Yogurt",
        "GI": 35
    },
    {
        "foodTags": "Tomatoes, dried",
        "de": "Tomaten, getrocknet",
        "en": "Tomatoes, dried",
        "GI": 35
    },
    {
        "foodTags": "Plum, fresh",
        "de": "Pflaume, frisch",
        "en": "Plum, fresh",
        "GI": 35
    },
    {
        "foodTags": "Quinoa",
        "de": "Quinoa",
        "en": "Quinoa",
        "GI": 35
    },
    {
        "foodTags": "Tomato juice",
        "de": "Tomatensaft",
        "en": "Tomato juice",
        "GI": 35
    },
    {
        "foodTags": "Chickpeas",
        "de": "Kichererbsen",
        "en": "Chickpeas",
        "GI": 35
    },
    {
        "foodTags": "Apricots, fresh",
        "de": "Aprikosen, frisch",
        "en": "Apricots, fresh",
        "GI": 35
    },
    {
        "foodTags": "apple puree, apple compote",
        "de": "Apfelmus, Apfelkompott",
        "en": "apple puree, apple compote",
        "GI": 35
    },
    {
        "foodTags": "Yeast",
        "de": "Hefe",
        "en": "Yeast",
        "GI": 35
    },
    {
        "foodTags": "Orange, fresh",
        "de": "Orange, frisch",
        "en": "Orange, fresh",
        "GI": 35
    },
    {
        "foodTags": "Almond puree, unsweetened (from shelled almonds)",
        "de": "Mandelmus, ungezuckert (aus geschälten Mandeln)",
        "en": "Almond puree, unsweetened (from shelled almonds)",
        "GI": 35
    },
    {
        "foodTags": "Mustard, hot",
        "de": "Senf, scharf",
        "en": "Mustard, hot",
        "GI": 35
    },
    {
        "foodTags": "Beans, black",
        "de": "Bohnen, schwarz",
        "en": "Beans, black",
        "GI": 35
    },
    {
        "foodTags": "Apple, fresh",
        "de": "Apfel, frisch",
        "en": "Apple, fresh",
        "GI": 35
    },
    {
        "foodTags": "Beans, red",
        "de": "Bohnen, rot",
        "en": "Beans, red",
        "GI": 35
    },
    {
        "foodTags": "Adzuki beans",
        "de": "Adzuki-Bohnen",
        "en": "Adzuki beans",
        "GI": 35
    },
    {
        "foodTags": "Soup noodles made from durum wheat",
        "de": "Suppennudeln aus Hartweizen",
        "en": "Soup noodles made from durum wheat",
        "GI": 35
    },
    {
        "foodTags": "Sunflower seeds",
        "de": "Sonnenblumenkerne",
        "en": "Sunflower seeds",
        "GI": 35
    },
    {
        "foodTags": "Brewer's yeast",
        "de": "Bierhefe",
        "en": "Brewer's yeast",
        "GI": 35
    },
    {
        "foodTags": "Fig, fresh",
        "de": "Feige, frisch",
        "en": "Fig, fresh",
        "GI": 35
    },
    {
        "foodTags": "Wasa Delicious (24 % fibre content)",
        "de": "Wasa Köstlich (24 % Ballaststoffgehalt)",
        "en": "Wasa Delicious (24 % fibre content)",
        "GI": 35
    },
    {
        "foodTags": "Tomato sauce, without sugar",
        "de": "Tomatensoße, ohne Zucker",
        "en": "Tomato sauce, without sugar",
        "GI": 35
    },
    {
        "foodTags": "Falafel (from chickpeas)",
        "de": "Falafel (aus Kichererbsen)",
        "en": "Falafel (from chickpeas)",
        "GI": 35
    },
    {
        "foodTags": "Ice cream (with fruit sugar)",
        "de": "Eiscreme (mit Fruchtzucker)",
        "en": "Ice cream (with fruit sugar)",
        "GI": 35
    },
    {
        "foodTags": "Wild rice",
        "de": "Wildreis",
        "en": "Wild rice",
        "GI": 35
    },
    {
        "foodTags": "Nectarine",
        "de": "Nektarine",
        "en": "Nectarine",
        "GI": 35
    },
    {
        "foodTags": "Linseed/sesame/poppy, whole",
        "de": "Leinsamen/Sesam/Mohn, ganz",
        "en": "Linseed/sesame/poppy, whole",
        "GI": 35
    },
    {
        "foodTags": "Chickpea flour",
        "de": "Kichererbsenmehl",
        "en": "Chickpea flour",
        "GI": 35
    },
    {
        "foodTags": "Cherimoya, cinnamon apple, annon fruit",
        "de": "Cherimoya, Zimtapfel, Annonenfrucht",
        "en": "Cherimoya, cinnamon apple, annon fruit",
        "GI": 35
    },
    {
        "foodTags": "Cassoulet (French bean and meat stew)",
        "de": "Cassoulet (franz. Bohnen-Fleisch-Eintopf)",
        "en": "Cassoulet (French bean and meat stew)",
        "GI": 35
    },
    {
        "foodTags": "Beans, Borlotti",
        "de": "Bohnen, Borlotti",
        "en": "Beans, Borlotti",
        "GI": 35
    },
    {
        "foodTags": "Chick peas (canned)",
        "de": "Kichererbsen (Dose)",
        "en": "Chick peas (canned)",
        "GI": 35
    },
    {
        "foodTags": "Peach, fresh",
        "de": "Pfirsich, frisch",
        "en": "Peach, fresh",
        "GI": 35
    },
    {
        "foodTags": "Celery, raw",
        "de": "Sellerie, roh",
        "en": "Celery, raw",
        "GI": 35
    },
    {
        "foodTags": "Quince, fresh",
        "de": "Quitte, frisch",
        "en": "Quince, fresh",
        "GI": 35
    },
    {
        "foodTags": "Peas, fresh",
        "de": "Erbsen, frisch",
        "en": "Peas, fresh",
        "GI": 35
    },
    {
        "foodTags": "Chocolate bar, without sugar (Montignac®)",
        "de": "Schokoladenriegel, ohne Zucker (Montignac®)",
        "en": "Chocolate bar, without sugar (Montignac®)",
        "GI": 35
    },
    {
        "foodTags": "Maize, original (India)",
        "de": "Mais, ursprünglicher (Indien)",
        "en": "Maize, original (India)",
        "GI": 35
    },
    {
        "foodTags": "Peas, fresh",
        "de": "Erbsen, frisch",
        "en": "Peas, fresh",
        "GI": 35
    },
    {
        "foodTags": "Coconut",
        "de": "Kokosnuss",
        "en": "Coconut",
        "GI": 35
    },
    {
        "foodTags": "Coconut, ground",
        "de": "Kokosnuss, gemahlen",
        "en": "Coconut, ground",
        "GI": 35
    },
    {
        "foodTags": "Emmer (old grain variety)",
        "de": "Emmer (alte Getreidesorte)",
        "en": "Emmer (old grain variety)",
        "GI": 40
    },
    {
        "foodTags": "Quince jelly (without sugar)",
        "de": "Quittengelee (ohne Zucker)",
        "en": "Quince jelly (without sugar)",
        "GI": 40
    },
    {
        "foodTags": "Pepino, melon pear",
        "de": "Pepino, Melonenbirne",
        "en": "Pepino, melon pear",
        "GI": 40
    },
    {
        "foodTags": "Yam Root",
        "de": "Jamswurzel",
        "en": "Yam Root",
        "GI": 40
    },
    {
        "foodTags": "Ravioli (made from durum wheat)",
        "de": "Ravioli (aus Hartweizen)",
        "en": "Ravioli (made from durum wheat)",
        "GI": 40
    },
    {
        "foodTags": "Apple juice, unsweetened",
        "de": "Apfelsaft, ungezuckert",
        "en": "Apple juice, unsweetened",
        "GI": 40
    },
    {
        "foodTags": "Carrot juice, without sugar",
        "de": "Karottensaft, ohne Zucker",
        "en": "Carrot juice, without sugar",
        "GI": 40
    },
    {
        "foodTags": "Sesammus, tahini",
        "de": "Sesammus, Tahin",
        "en": "Sesammus, tahini",
        "GI": 40
    },
    {
        "foodTags": "Broad beans, raw",
        "de": "Dicke Bohnen, roh",
        "en": "Broad beans, raw",
        "GI": 40
    },
    {
        "foodTags": "Plums, dried",
        "de": "Pflaumen, getrocknet",
        "en": "Plums, dried",
        "GI": 40
    },
    {
        "foodTags": "Oats",
        "de": "Hafer",
        "en": "Oats",
        "GI": 40
    },
    {
        "foodTags": "Coconut milk",
        "de": "Kokosmilch",
        "en": "Coconut milk",
        "GI": 40
    },
    {
        "foodTags": "Carrots",
        "de": "Karotten, gekocht",
        "en": "Carrots, cooked",
        "GI": 40
    },
    {
        "foodTags": "Cider",
        "de": "Apfelwein, trocken",
        "en": "Cider, dry",
        "GI": 40
    },
    {
        "foodTags": "Wholemeal pasta, al dente",
        "de": "Vollkornnudeln, al dente",
        "en": "Wholemeal pasta, al dente",
        "GI": 40
    },
    {
        "foodTags": "kamut, wholemeal",
        "de": "Kamut, Vollkorn",
        "en": "kamut, wholemeal",
        "GI": 40
    },
    {
        "foodTags": "Beans, red (tin)",
        "de": "Bohnen, rot (Dose)",
        "en": "Beans, red (tin)",
        "GI": 40
    },
    {
        "foodTags": "wholemeal bread (100 %) with yeast/sour dough",
        "de": "Vollkornbrot (100 %) mit Hefe/Sauerteig",
        "en": "wholemeal bread (100 %) with yeast/sour dough",
        "GI": 40
    },
    {
        "foodTags": "Matzen (unleavened flat bread, wholemeal flour)",
        "de": "Matzen (ungesäuertes Fladenbrot, Vollkornmehl)",
        "en": "Matzen (unleavened flat bread, wholemeal flour)",
        "GI": 40
    },
    {
        "foodTags": "Sorbet, without sugar",
        "de": "Sorbet, ohne Zucker",
        "en": "Sorbet, without sugar",
        "GI": 40
    },
    {
        "foodTags": "Sandwich biscuits made from wholemeal flour, without sugar",
        "de": "Sandgebäck aus Vollkornmehl, ohne Zucker",
        "en": "Sandwich biscuits made from wholemeal flour, without sugar",
        "GI": 40
    },
    {
        "foodTags": "Peanut Butter",
        "de": "Erdnussbutter",
        "en": "Peanut Butter",
        "GI": 40
    },
    {
        "foodTags": "Chicory (drink)",
        "de": "Zichorie (Getränk)",
        "en": "Chicory (drink)",
        "GI": 40
    },
    {
        "foodTags": "Oat flakes, coarse",
        "de": "Haferflocken, grob",
        "en": "Oat flakes, coarse",
        "GI": 40
    },
    {
        "foodTags": "Falafel (made from beans)",
        "de": "Falafel (aus Bohnen)",
        "en": "Falafel (made from beans)",
        "GI": 40
    },
    {
        "foodTags": "Quinoa flour",
        "de": "Quinoamehl",
        "en": "Quinoa flour",
        "GI": 40
    },
    {
        "foodTags": "Buckwheat pancakes",
        "de": "Buchweizen Pfannkuchen",
        "en": "Buckwheat pancakes",
        "GI": 40
    },
    {
        "foodTags": "Buckwheat Pasta",
        "de": "Buchweizen Pasta",
        "en": "Buckwheat Pasta",
        "GI": 40
    },
    {
        "foodTags": "Spaghetti, wholemeal, cooked al dente",
        "de": "Spaghetti, Vollkorn, al dente gekocht",
        "en": "Spaghetti, wholemeal, cooked al dente",
        "GI": 40
    },
    {
        "foodTags": "Durum wheat, dry, pre-cooked (10 minutes cooking time)",
        "de": "Hartweizen, trocken, vorgegart (10 Min. Kochzeit)",
        "en": "Durum wheat, dry, pre-cooked (10 minutes cooking time)",
        "GI": 45
    },
    {
        "foodTags": "Emmer wholemeal flour (old type of grain)",
        "de": "Emmer-Vollkornmehl (alte Getreidesorte)",
        "en": "Emmer wholemeal flour (old type of grain)",
        "GI": 45
    },
    {
        "foodTags": "Blé, pilpil de",
        "de": "Blé, pilpil de",
        "en": "Blé, pilpil de",
        "GI": 45
    },
    {
        "foodTags": "Mango juice, without sugar",
        "de": "Mangosaft, ohne Zucker",
        "en": "Mango juice, without sugar",
        "GI": 45
    },
    {
        "foodTags": "Grape juice (unsugared)",
        "de": "Traubensaft (ungezuckert)",
        "en": "Grape juice (unsugared)",
        "GI": 45
    },
    {
        "foodTags": "Capellini (thin spaghetti)",
        "de": "Capellini (dünne Spaghetti)",
        "en": "Capellini (thin spaghetti)",
        "GI": 45
    },
    {
        "foodTags": "Grapefruit juice, unsugared",
        "de": "Grapefruitsaft, ungezuckert",
        "en": "Grapefruit juice, unsugared",
        "GI": 45
    },
    {
        "foodTags": "Orange juice, sugar free",
        "de": "Orangensaft, zuckerfrei",
        "en": "Orange juice, sugar free",
        "GI": 45
    },
    {
        "foodTags": "Banana, jaune (sans taches noires)",
        "de": "Banane, jaune (sans taches noires)",
        "en": "Banana, jaune (sans taches noires)",
        "GI": 45
    },
    {
        "foodTags": "Plantain, raw",
        "de": "Kochbanane, roh",
        "en": "Plantain, raw",
        "GI": 45
    },
    {
        "foodTags": "Couscous, wholemeal",
        "de": "Couscous, Vollkorn",
        "en": "Couscous, wholemeal",
        "GI": 45
    },
    {
        "foodTags": "Tomato sauce (with sugar)",
        "de": "Tomatensoße (mit Zucker)",
        "en": "Tomato sauce (with sugar)",
        "GI": 45
    },
    {
        "foodTags": "Grapes, fresh",
        "de": "Trauben, frisch",
        "en": "Grapes, fresh",
        "GI": 45
    },
    {
        "foodTags": "Lactose",
        "de": "Milchzucker",
        "en": "Lactose",
        "GI": 45
    },
    {
        "foodTags": "Kamut bread",
        "de": "Kamutbrot",
        "en": "Kamut bread",
        "GI": 45
    },
    {
        "foodTags": "Kamut wholemeal flour",
        "de": "Kamut-Vollkornmehl",
        "en": "Kamut wholemeal flour",
        "GI": 45
    },
    {
        "foodTags": "whole grain toast, without sugar",
        "de": "Vollkorntoast, ohne Zucker",
        "en": "whole grain toast, without sugar",
        "GI": 45
    },
    {
        "foodTags": "Peas (canned)",
        "de": "Erbsen (Dose)",
        "en": "Peas (canned)",
        "GI": 45
    },
    {
        "foodTags": "Wholemeal bulgur (cooked)",
        "de": "Vollkornbulgur (gekocht)",
        "en": "Wholemeal bulgur (cooked)",
        "GI": 45
    },
    {
        "foodTags": "Cranberries",
        "de": "Preiselbeeren",
        "en": "Cranberries",
        "GI": 45
    },
    {
        "foodTags": "Wholemeal cereals, without sugar",
        "de": "Vollkorncerealien, ohne Zucker",
        "en": "Wholemeal cereals, without sugar",
        "GI": 45
    },
    {
        "foodTags": "Spelt (whole grain)",
        "de": "Dinkel (Vollkorn)",
        "en": "Spelt (whole grain)",
        "GI": 45
    },
    {
        "foodTags": "Spelt (whole grain)",
        "de": "Dinkel (Vollkorn)",
        "en": "Spelt (whole grain)",
        "GI": 45
    },
    {
        "foodTags": "Fruit spread (jam), without sugar",
        "de": "Fruchtaufstrich (Konfitüre), ohne Zucker",
        "en": "Fruit spread (jam), without sugar",
        "GI": 45
    },
    {
        "foodTags": "Muesli",
        "de": "Müsli",
        "en": "Muesli",
        "GI": 45
    },
    {
        "foodTags": "Pumpernickel",
        "de": "Pumpernickel",
        "en": "Pumpernickel",
        "GI": 45
    },
    {
        "foodTags": "Spaghetti, cooked al dente (5 minutes)",
        "de": "Spaghetti, al dente gekocht (5 Minuten)",
        "en": "Spaghetti, cooked al dente (5 minutes)",
        "GI": 45
    },
    {
        "foodTags": "Basmati rice, wholemeal",
        "de": "Basmatireis, Vollkorn",
        "en": "Basmati rice, wholemeal",
        "GI": 45
    },
    {
        "foodTags": "Whole-wheat flour",
        "de": "Weizenvollkornmehl",
        "en": "Whole-wheat flour",
        "GI": 45
    },
    {
        "foodTags": "Banana, green",
        "de": "Banane, grün",
        "en": "Banana, green",
        "GI": 45
    },
    {
        "foodTags": "Tamarind, sweet",
        "de": "Tamarinde, süß",
        "en": "Tamarind, sweet",
        "GI": 50
    },
    {
        "foodTags": "Pineapple (canned)",
        "de": "Ananas (Dose)",
        "en": "Pineapple (canned)",
        "GI": 50
    },
    {
        "foodTags": "Peach (canned, sugared)",
        "de": "Pfirsich (Dose, gezuckert)",
        "en": "Peach (canned, sugared)",
        "GI": 50
    },
    {
        "foodTags": "Pineapple juice, unsweetened",
        "de": "Ananassaft, ungezuckert",
        "en": "Pineapple juice, unsweetened",
        "GI": 50
    },
    {
        "foodTags": "Basmati rice, long grain",
        "de": "Basmatireis, Langkorn",
        "en": "Basmati rice, long grain",
        "GI": 50
    },
    {
        "foodTags": "Mango",
        "de": "Mango",
        "en": "Mango",
        "GI": 50
    },
    {
        "foodTags": "Bulgur (cooked )",
        "de": "Bulgur (gekocht )",
        "en": "Bulgur (cooked )",
        "GI": 50
    },
    {
        "foodTags": "Sushi",
        "de": "Sushi",
        "en": "Sushi",
        "GI": 50
    },
    {
        "foodTags": "Surimi",
        "de": "Surimi",
        "en": "Surimi",
        "GI": 50
    },
    {
        "foodTags": "Jerusalem artichoke, earth pear",
        "de": "Topinambur, Erdbirne",
        "en": "Jerusalem artichoke, earth pear",
        "GI": 50
    },
    {
        "foodTags": "Muesli, no sugar",
        "de": "Müsli, ohne Zucker",
        "en": "Muesli, no sugar",
        "GI": 50
    },
    {
        "foodTags": "Khaki",
        "de": "Kaki",
        "en": "Khaki",
        "GI": 50
    },
    {
        "foodTags": "kiwi",
        "de": "Kiwi",
        "en": "kiwi",
        "GI": 50
    },
    {
        "foodTags": "Sweet potatoes",
        "de": "Süßkartoffeln",
        "en": "Sweet potatoes",
        "GI": 50
    },
    {
        "foodTags": "Litchi/lychee, fresh",
        "de": "Litschi/Lychee, frisch",
        "en": "Litchi/lychee, fresh",
        "GI": 50
    },
    {
        "foodTags": "Natural rice",
        "de": "Naturreis",
        "en": "Natural rice",
        "GI": 50
    },
    {
        "foodTags": "Wholemeal pasta",
        "de": "Vollkornnudeln",
        "en": "Wholemeal pasta",
        "GI": 50
    },
    {
        "foodTags": "Figs, dried",
        "de": "Feigen, getrocknet",
        "en": "Figs, dried",
        "GI": 50
    },
    {
        "foodTags": "Pineapple (fresh fruit)",
        "de": "Ananas (frische Frucht)",
        "en": "Pineapple (fresh fruit)",
        "GI": 50
    },
    {
        "foodTags": "Bread with quinoa (approx. 65 % quinoa)",
        "de": "Brot mit Quinoa (ca. 65 % Quinoa)",
        "en": "Bread with quinoa (approx. 65 % quinoa)",
        "GI": 50
    },
    {
        "foodTags": "Buckwheat, whole grain (dark grain)",
        "de": "Buchweizen, Vollkorn (dunkles Korn)",
        "en": "Buckwheat, whole grain (dark grain)",
        "GI": 50
    },
    {
        "foodTags": "Soy yoghurt (flavoured)",
        "de": "Sojajoghurt (aromatisiert)",
        "en": "Soy yoghurt (flavoured)",
        "GI": 50
    },
    {
        "foodTags": "Wholegrain rye bread (100 %)",
        "de": "Roggenvollkornbrot (100 %)",
        "en": "Wholegrain rye bread (100 %)",
        "GI": 50
    },
    {
        "foodTags": "Chayote, pureed",
        "de": "Chayote, püriert",
        "en": "Chayote, pureed",
        "GI": 50
    },
    {
        "foodTags": "Cranberry/Juice, unsugared",
        "de": "Preiselbeer/Heidelbeersaft, ungezuckert",
        "en": "Cranberry/Juice, unsugared",
        "GI": 50
    },
    {
        "foodTags": "Biscuits made from wholemeal flour, without sugar",
        "de": "Kekse aus Vollkornmehl, ohne Zucker",
        "en": "Biscuits made from wholemeal flour, without sugar",
        "GI": 50
    },
    {
        "foodTags": "Couscous (whole grain semolina)",
        "de": "Couscous (Vollkorngries)",
        "en": "Couscous (whole grain semolina)",
        "GI": 50
    },
    {
        "foodTags": "Macaroni (from durum wheat)",
        "de": "Makkaroni (aus Hartweizen)",
        "en": "Macaroni (from durum wheat)",
        "GI": 50
    },
    {
        "foodTags": "Banana, jaune (taches noires)",
        "de": "Banane, jaune (taches noires)",
        "en": "Banana, jaune (taches noires)",
        "GI": 50
    },
    {
        "foodTags": "Fonio",
        "de": "Fonio",
        "en": "Fonio",
        "GI": 50
    },
    {
        "foodTags": "Sweet corn",
        "de": "Zuckermais",
        "en": "Sweet corn",
        "GI": 55
    },
    {
        "foodTags": "Maple syrup",
        "de": "Ahornsirup",
        "en": "Maple syrup",
        "GI": 55
    },
    {
        "foodTags": "Pizza",
        "de": "Pizza",
        "en": "Pizza",
        "GI": 55
    },
    {
        "foodTags": "Banana, ripe",
        "de": "Banane, reif",
        "en": "Banana, ripe",
        "GI": 55
    },
    {
        "foodTags": "Mustard, sweet",
        "de": "Senf, süß",
        "en": "Mustard, sweet",
        "GI": 55
    },
    {
        "foodTags": "Ketchup",
        "de": "Ketchup",
        "en": "Ketchup",
        "GI": 55
    },
    {
        "foodTags": "Common medlar",
        "de": "Mispel",
        "en": "Common medlar",
        "GI": 55
    },
    {
        "foodTags": "Sand pastry (flour, butter, sugar)",
        "de": "Sandgebäck (Mehl, Butter, Zucker)",
        "en": "Sand pastry (flour, butter, sugar)",
        "GI": 55
    },
    {
        "foodTags": "Rice, red",
        "de": "Reis, rot",
        "en": "Rice, red",
        "GI": 55
    },
    {
        "foodTags": "Tagliatelle, soft cooked",
        "de": "Tagliatelle, weich gekocht",
        "en": "Tagliatelle, soft cooked",
        "GI": 55
    },
    {
        "foodTags": "Chicory syrup",
        "de": "Chicorée-Sirup",
        "en": "Chicory syrup",
        "GI": 55
    },
    {
        "foodTags": "Manioc, bitter",
        "de": "Maniok, bitter",
        "en": "Manioc, bitter",
        "GI": 55
    },
    {
        "foodTags": "Manioc, sweet",
        "de": "Maniok, süß",
        "en": "Manioc, sweet",
        "GI": 55
    },
    {
        "foodTags": "Dates",
        "de": "Datteln",
        "en": "Dates",
        "GI": 55
    },
    {
        "foodTags": "Spaghetti, white, soft boiled",
        "de": "Spaghetti, weiß, weich gekocht",
        "en": "Spaghetti, white, soft boiled",
        "GI": 55
    },
    {
        "foodTags": "Pears, canned",
        "de": "Birnen, Konserve",
        "en": "Pears, canned",
        "GI": 55
    },
    {
        "foodTags": "Rice, puffed",
        "de": "Reis, gepufft",
        "en": "Rice, puffed",
        "GI": 60
    },
    {
        "foodTags": "Chips",
        "de": "Chips",
        "en": "Chips",
        "GI": 60
    },
    {
        "foodTags": "Coke, lemonades, soft drinks",
        "de": "Cola, Limonaden, Erfrischungsgetränke",
        "en": "Coke, lemonades, soft drinks",
        "GI": 60
    },
    {
        "foodTags": "Croissant",
        "de": "Croissant",
        "en": "Croissant",
        "GI": 60
    },
    {
        "foodTags": "Couscous",
        "de": "Couscous",
        "en": "Couscous",
        "GI": 60
    },
    {
        "foodTags": "Milk Bread",
        "de": "Milchbrot",
        "en": "Milk Bread",
        "GI": 60
    },
    {
        "foodTags": "Porridge, cooked from oatmeal",
        "de": "Porridge, gekocht aus Haferflocken",
        "en": "Porridge, cooked from oatmeal",
        "GI": 60
    },
    {
        "foodTags": "Semolina (durum wheat)",
        "de": "Grieß (aus Hartweizen)",
        "en": "Semolina (durum wheat)",
        "GI": 60
    },
    {
        "foodTags": "Rice, long grain",
        "de": "Reis, Langkorn",
        "en": "Rice, long grain",
        "GI": 60
    },
    {
        "foodTags": "Ice cream, sugared",
        "de": "Eiscreme, gezuckert",
        "en": "Ice cream, sugared",
        "GI": 60
    },
    {
        "foodTags": "Ovaltine",
        "de": "Ovomaltine",
        "en": "Ovaltine",
        "GI": 60
    },
    {
        "foodTags": "Chestnuts, chestnuts",
        "de": "Maronen, Esskastanien",
        "en": "Chestnuts, chestnuts",
        "GI": 60
    },
    {
        "foodTags": "Lasagne (made from durum wheat)",
        "de": "Lasagne (aus Hartweizen)",
        "en": "Lasagne (made from durum wheat)",
        "GI": 60
    },
    {
        "foodTags": "Chocolate powder, sweetened",
        "de": "Schokoladenpulver, gezuckert",
        "en": "Chocolate powder, sweetened",
        "GI": 60
    },
    {
        "foodTags": "Rice from the Camargue",
        "de": "Reis aus der Camargue",
        "en": "Rice from the Camargue",
        "GI": 60
    },
    {
        "foodTags": "honey",
        "de": "Honig",
        "en": "honey",
        "GI": 60
    },
    {
        "foodTags": "Chinese rice noodles",
        "de": "Chinesische Reisnudeln",
        "en": "Chinese rice noodles",
        "GI": 60
    },
    {
        "foodTags": "Mars®, Snickers®, Nuts",
        "de": "Mars®, Snickers®, Nuts®, etc.",
        "en": "Mars®, Snickers®, Nuts",
        "GI": 60
    },
    {
        "foodTags": "Wholemeal flour",
        "de": "Vollkornmehl",
        "en": "Wholemeal flour",
        "GI": 60
    },
    {
        "foodTags": "Mayonnaise (industrially produced, sugared)",
        "de": "Mayonnaise (industriell hergestellt, gezuckert)",
        "en": "Mayonnaise (industrially produced, sugared)",
        "GI": 60
    },
    {
        "foodTags": "Fruit cocktail in sugar syrup, canned",
        "de": "Fruchtcocktail in Zuckersirup, Konserve",
        "en": "Fruit cocktail in sugar syrup, canned",
        "GI": 60
    },
    {
        "foodTags": "Papaya",
        "de": "Papaya",
        "en": "Papaya",
        "GI": 60
    },
    {
        "foodTags": "Pumpkin (various)",
        "de": "Kürbis (verschiedene)",
        "en": "Pumpkin (various)",
        "GI": 65
    },
    {
        "foodTags": "Jam, sugared",
        "de": "Marmelade, gezuckert",
        "en": "Jam, sugared",
        "GI": 65
    },
    {
        "foodTags": "Potatoes cooked with skin (water, steam)",
        "de": "Kartoffeln mit Schale gegart (Wasser, Dampf)",
        "en": "Potatoes cooked with skin (water, steam)",
        "GI": 65
    },
    {
        "foodTags": "multigrain bread",
        "de": "Mehrkornbrot",
        "en": "multigrain bread",
        "GI": 65
    },
    {
        "foodTags": "brown bread (with yeast)",
        "de": "Graubrot (mit Hefe)",
        "en": "brown bread (with yeast)",
        "GI": 65
    },
    {
        "foodTags": "Beetroot, cooked",
        "de": "Rote Bete, gekocht",
        "en": "Beetroot, cooked",
        "GI": 65
    },
    {
        "foodTags": "Raisins",
        "de": "Rosinen",
        "en": "Raisins",
        "GI": 65
    },
    {
        "foodTags": "Quince jelly (with sugar)",
        "de": "Quittengelee (mit Zucker)",
        "en": "Quince jelly (with sugar)",
        "GI": 65
    },
    {
        "foodTags": "Breadfruit (breadfruit tree)",
        "de": "Brotfrucht (Brotfruchtbaum)",
        "en": "Breadfruit (breadfruit tree)",
        "GI": 65
    },
    {
        "foodTags": "Sorbet, sugared",
        "de": "Sorbet, gezuckert",
        "en": "Sorbet, sugared",
        "GI": 65
    },
    {
        "foodTags": "Rye bread (30 % rye)",
        "de": "Roggenbrot (30 % Roggen)",
        "en": "Rye bread (30 % rye)",
        "GI": 65
    },
    {
        "foodTags": "Muesli (sweetened with sugar or honey)",
        "de": "Müsli (mit Zucker oder Honig gesüßt)",
        "en": "Muesli (sweetened with sugar or honey)",
        "GI": 65
    },
    {
        "foodTags": "Melon, honeydew melon",
        "de": "Melone, Honigmelone",
        "en": "Melon, honeydew melon",
        "GI": 65
    },
    {
        "foodTags": "Chocolate rolls",
        "de": "Schokobrötchen",
        "en": "Chocolate rolls",
        "GI": 65
    },
    {
        "foodTags": "Dried sugar cane juice",
        "de": "Getrockneter Zuckerrohrsaft",
        "en": "Dried sugar cane juice",
        "GI": 65
    },
    {
        "foodTags": "Chestnut flour",
        "de": "Kastanienmehl",
        "en": "Chestnut flour",
        "GI": 65
    },
    {
        "foodTags": "Spelt",
        "de": "Dinkel",
        "en": "Spelt",
        "GI": 65
    },
    {
        "foodTags": "Apricots (tin, with sugar)",
        "de": "Aprikosen (Dose, mit Zucker)",
        "en": "Apricots (tin, with sugar)",
        "GI": 65
    },
    {
        "foodTags": "Jam, sugared",
        "de": "Konfitüre, gezuckert",
        "en": "Jam, sugared",
        "GI": 65
    },
    {
        "foodTags": "Broad beans, cooked",
        "de": "Dicke Bohnen, gekocht",
        "en": "Broad beans, cooked",
        "GI": 65
    },
    {
        "foodTags": "Flour 50 % wholemeal",
        "de": "Mehl 50 % Vollkorn",
        "en": "Flour 50 % wholemeal",
        "GI": 65
    },
    {
        "foodTags": "Noodles from wholemeal rice flour",
        "de": "Nudeln aus Vollkornreismehl",
        "en": "Noodles from wholemeal rice flour",
        "GI": 65
    },
    {
        "foodTags": "Chestnut flour",
        "de": "Kastanienmehl",
        "en": "Chestnut flour",
        "GI": 65
    },
    {
        "foodTags": "Cane sugar",
        "de": "Rohrzucker",
        "en": "Cane sugar",
        "GI": 65
    },
    {
        "foodTags": "Corn, cooked",
        "de": "Mais, gekocht",
        "en": "Corn, cooked",
        "GI": 65
    },
    {
        "foodTags": "Sugar, white (sucrose)",
        "de": "Zucker, weiß (Saccharose)",
        "en": "Sugar, white (sucrose)",
        "GI": 70
    },
    {
        "foodTags": "Popcorn (without sugar)",
        "de": "Popcorn (ohne Zucker)",
        "en": "Popcorn (without sugar)",
        "GI": 70
    },
    {
        "foodTags": "Cornmeal",
        "de": "Maismehl",
        "en": "Cornmeal",
        "GI": 70
    },
    {
        "foodTags": "Risotto",
        "de": "Risotto",
        "en": "Risotto",
        "GI": 70
    },
    {
        "foodTags": "Rice, white, standard",
        "de": "Reis, weiß, Standard",
        "en": "Rice, white, standard",
        "GI": 70
    },
    {
        "foodTags": "Tacos",
        "de": "Tacos",
        "en": "Tacos",
        "GI": 70
    },
    {
        "foodTags": "Chocolate bar, sugary",
        "de": "Schokoladenriegel, zuckerhaltig",
        "en": "Chocolate bar, sugary",
        "GI": 70
    },
    {
        "foodTags": "Gnocchi",
        "de": "Gnocchi",
        "en": "Gnocchi",
        "GI": 70
    },
    {
        "foodTags": "Pasta, noodles (made from common wheat)",
        "de": "Teigwaren, Nudeln (aus Weichweizen)",
        "en": "Pasta, noodles (made from common wheat)",
        "GI": 70
    },
    {
        "foodTags": "molasses, syrup",
        "de": "Melasse, Sirup",
        "en": "molasses, syrup",
        "GI": 70
    },
    {
        "foodTags": "Cereals, refined, sugared",
        "de": "Cerealien, raffiniert, gezuckert",
        "en": "Cereals, refined, sugared",
        "GI": 70
    },
    {
        "foodTags": "Corn porridge, polenta",
        "de": "Maisbrei, Polenta",
        "en": "Corn porridge, polenta",
        "GI": 70
    },
    {
        "foodTags": "Rusk",
        "de": "Zwieback",
        "en": "Rusk",
        "GI": 70
    },
    {
        "foodTags": "Bagels",
        "de": "Bagels",
        "en": "Bagels",
        "GI": 70
    },
    {
        "foodTags": "Biscuit",
        "de": "Biskuit",
        "en": "Biscuit",
        "GI": 70
    },
    {
        "foodTags": "Raw sugar",
        "de": "Rohzucker",
        "en": "Raw sugar",
        "GI": 70
    },
    {
        "foodTags": "Plantain (cooked)",
        "de": "Kochbanane (gekocht)",
        "en": "Plantain (cooked)",
        "GI": 70
    },
    {
        "foodTags": "Baguette, white bread",
        "de": "Baguette, Weißbrot",
        "en": "Baguette, white bread",
        "GI": 70
    },
    {
        "foodTags": "rice bread",
        "de": "Reisbrot",
        "en": "rice bread",
        "GI": 70
    },
    {
        "foodTags": "Brioche",
        "de": "Brioche",
        "en": "Brioche",
        "GI": 70
    },
    {
        "foodTags": "Boiled potatoes",
        "de": "Salzkartoffeln",
        "en": "Boiled potatoes",
        "GI": 70
    },
    {
        "foodTags": "Beer",
        "de": "Bier",
        "en": "Beer",
        "GI": 70
    },
    {
        "foodTags": "Millet",
        "de": "Hirse",
        "en": "Millet",
        "GI": 70
    },
    {
        "foodTags": "Swede, rutabaga (cooked)",
        "de": "Kohlrübe, Steckrübe (gekocht)",
        "en": "Swede, rutabaga (cooked)",
        "GI": 70
    },
    {
        "foodTags": "Amaranth, puffed",
        "de": "Amarant, gepufft",
        "en": "Amaranth, puffed",
        "GI": 70
    },
    {
        "foodTags": "Ravioli (made from common wheat)",
        "de": "Ravioli (aus Weichweizen)",
        "en": "Ravioli (made from common wheat)",
        "GI": 70
    },
    {
        "foodTags": "polenta, corn semolina",
        "de": "Polenta, Maisgrieß",
        "en": "polenta, corn semolina",
        "GI": 70
    },
    {
        "foodTags": "Bread, unleavened (from white flour)",
        "de": "Brot, ungesäuert (aus Weißmehl)",
        "en": "Bread, unleavened (from white flour)",
        "GI": 70
    },
    {
        "foodTags": "Boiled potatoes",
        "de": "Pellkartoffeln",
        "en": "Boiled potatoes",
        "GI": 70
    },
    {
        "foodTags": "Jasmine rice (scented rice)",
        "de": "Jasminreis (Duftreis)",
        "en": "Jasmine rice (scented rice)",
        "GI": 70
    },
    {
        "foodTags": "Swede, yellow, rutabaga",
        "de": "Kohlrübe, gelbe, Steckrübe",
        "en": "Swede, yellow, rutabaga",
        "GI": 70
    },
    {
        "foodTags": "Watermelon",
        "de": "Wassermelone",
        "en": "Watermelon",
        "GI": 75
    },
    {
        "foodTags": "Hamburger roll",
        "de": "Hamburgerbrötchen",
        "en": "Hamburger roll",
        "GI": 75
    },
    {
        "foodTags": "Lasagne (made from common wheat)",
        "de": "Lasagne (aus Weichweizen)",
        "en": "Lasagne (made from common wheat)",
        "GI": 75
    },
    {
        "foodTags": "White toast",
        "de": "Weißes Toastbrot",
        "en": "White toast",
        "GI": 75
    },
    {
        "foodTags": "Donuts, doughnuts, doughnuts",
        "de": "Donuts, Berliner, Krapfen",
        "en": "Donuts, doughnuts, doughnuts",
        "GI": 75
    },
    {
        "foodTags": "Fast cooked rice",
        "de": "Schnellkochreis",
        "en": "Fast cooked rice",
        "GI": 75
    },
    {
        "foodTags": "Waffles (with sugar)",
        "de": "Waffeln (mit Zucker)",
        "en": "Waffles (with sugar)",
        "GI": 75
    },
    {
        "foodTags": "Pumpkin (giant pumpkin)",
        "de": "Kürbis (Riesenkürbis)",
        "en": "Pumpkin (giant pumpkin)",
        "GI": 75
    },
    {
        "foodTags": "Riz, farine de (complète)",
        "de": "Riz, farine de (complète)",
        "en": "Riz, farine de (complète)",
        "GI": 75
    },
    {
        "foodTags": "Sports drinks",
        "de": "Sportgetränke",
        "en": "Sports drinks",
        "GI": 75
    },
    {
        "foodTags": "Mashed potatoes (homemade)",
        "de": "Kartoffelpüree (selbst zubereitet)",
        "en": "Mashed potatoes (homemade)",
        "GI": 80
    },
    {
        "foodTags": "Crackers made from white flour",
        "de": "Crackers made from white flour",
        "en": "Crackers made from white flour",
        "GI": 80
    },
    {
        "foodTags": "Maizena",
        "de": "Maizena",
        "en": "Maizena",
        "GI": 85
    },
    {
        "foodTags": "White flour",
        "de": "Weißmehl",
        "en": "White flour",
        "GI": 85
    },
    {
        "foodTags": "rice pudding, sweetened",
        "de": "Milchreis, gezuckert",
        "en": "rice pudding, sweetened",
        "GI": 85
    },
    {
        "foodTags": "rice pudding, rice cake",
        "de": "Reispudding, Reiskuchen",
        "en": "rice pudding, rice cake",
        "GI": 85
    },
    {
        "foodTags": "Rice milk",
        "de": "Reismilch",
        "en": "Rice milk",
        "GI": 85
    },
    {
        "foodTags": "Boiled turnip, cooked",
        "de": "Weiße Rübe, gekocht",
        "en": "Boiled turnip, cooked",
        "GI": 85
    },
    {
        "foodTags": "Celery (tuber), cooked",
        "de": "Sellerie (Knolle), gekocht",
        "en": "Celery (tuber), cooked",
        "GI": 85
    },
    {
        "foodTags": "Tapioca",
        "de": "Tapioka",
        "en": "Tapioca",
        "GI": 85
    },
    {
        "foodTags": "Parsnip",
        "de": "Pastinake",
        "en": "Parsnip",
        "GI": 85
    },
    {
        "foodTags": "Cornflakes, corn flakes",
        "de": "Cornflakes, Maisflocken",
        "en": "Cornflakes, corn flakes",
        "GI": 85
    },
    {
        "foodTags": "Arrow Root Flour",
        "de": "Pfeilwurzelmehl (Arrow Root)",
        "en": "Arrow Root Flour",
        "GI": 85
    },
    {
        "foodTags": "White bread without gluten",
        "de": "Weißbrot ohne Gluten",
        "en": "White bread without gluten",
        "GI": 90
    },
    {
        "foodTags": "Mashed potatoes (instant flakes)",
        "de": "Kartoffelpüree (Instantflocken)",
        "en": "Mashed potatoes (instant flakes)",
        "GI": 90
    },
    {
        "foodTags": "Glutinous rice, containing gluten",
        "de": "Klebreis, glutenhaltig",
        "en": "Glutinous rice, containing gluten",
        "GI": 90
    },
    {
        "foodTags": "Potatoes, baked with skin",
        "de": "Kartoffeln, gebacken mit Schale",
        "en": "Potatoes, baked with skin",
        "GI": 90
    },
    {
        "foodTags": "Rice flour",
        "de": "Reismehl",
        "en": "Rice flour",
        "GI": 95
    },
    {
        "foodTags": "Potato starch",
        "de": "Kartoffelstärke",
        "en": "Potato starch",
        "GI": 95
    },
    {
        "foodTags": "Potato gratin, fried potatoes",
        "de": "Kartoffelgratin, Bratkartoffeln",
        "en": "Potato gratin, fried potatoes",
        "GI": 95
    },
    {
        "foodTags": "French fries",
        "de": "Pommes frites",
        "en": "French fries",
        "GI": 95
    },
    {
        "foodTags": "Maltodextrin",
        "de": "Maltodextrin",
        "en": "Maltodextrin",
        "GI": 95
    },
    {
        "foodTags": "Maize starch",
        "de": "Maisstärke",
        "en": "Maize starch",
        "GI": 95
    },
    {
        "foodTags": "Rice syrup",
        "de": "Reissirup",
        "en": "Rice syrup",
        "GI": 95
    },
    {
        "foodTags": "Starch",
        "de": "Stärke, modifiziert",
        "en": "Starch, modified",
        "GI": 100
    },
    {
        "foodTags": "dextrose",
        "de": "Glukose (Traubenzucker)",
        "en": "Glucose (dextrose)",
        "GI": 100
    },
    {
        "foodTags": "Glucose syrup",
        "de": "Glukosesirup",
        "en": "Glucose syrup",
        "GI": 100
    },
    {
        "foodTags": "wheat syrup",
        "de": "Weizensirup",
        "en": "wheat syrup",
        "GI": 100
    },
    {
        "foodTags": "Corn syrup",
        "de": "Maissirup",
        "en": "Corn syrup",
        "GI": 115
    }
]

export default GItwo