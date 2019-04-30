let SCORE = 0;
let BESTTIMEsec = 0;
let BESTTIMEmin = 0;
let TIMEsec = 0;
let TIMEmin = 0;
let COUNTsec = 0;
let COUNTframes = 0;
let cubeY = 450; //середины дорожек на 210 450 и 690
let cubeMOVEUP = false;
let cubeMOVEDOWN = false;
let cubeDY = 20;
let cubeDYCOUNT = 0;
let ZNAKPLUS = 200;
let ZNAKMINUS = 200;
let Y1;
let Y2;
let Y3;
let Y4;
let Y5;
let Yz = 450;
let CHECK1 = 0;
let CHECK2 = 0;
let CHECK3 = 0;
let CHECK4 = 0;
let CHECK5 = 0;
let CHECKz = 0;
let X1 = 1350;
let X2 = 1350 + 300;
let X3 = 1350 + 300 + 300;
let X4 = 1350 + 300 + 300 + 300;
let X5 = 1350 + 300 + 300 + 300 + 300;
let Xz = 1500;
let Ystart = [210, 690];
let DX = 2;
let DXd = 0.0025;
let NUM1;
let NUM2;
let NUM3;
let NUM4;
let NUM5;
let ZNAKI = [-1, 1];
let ZNAK;
let ZNAKREVERSE = 1; //если 1 то плюс сверху, если -1 то минус сверху
let CHECKZNAKREVERSE = 0; //проверка столкновений со знаком переворота
let Yplus = 210;
let Yminus = 690;
let Zsmena;
let NUMrplus = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let NUMrminus = [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16, -17, -18, -19, -20];
let COLOR = ['#0064ff', '#ff9b00', '#009b00', '#ff009b', '#6400ff', '#9b00ff', '#ff6400', '#009bff'];
let COLOR1;
let COLOR2;
let COLOR3;
let COLOR4;
let COLOR5;
let CATCHcube1 = false;
let CATCHcube2 = false;
let CATCHcube3 = false;
let CATCHcube4 = false;
let CATCHcube5 = false;
let CATCHcubez = false;
let WIN = ['А ты крут!', 'Супер! Ещё разок?', 'Твоя арифметика на высоте!', 'Браво! А слабо повторить?', 'Зал тебе рукоплещет!'];
let LOSE = ['Ойойоооой...', 'Почти получилось!...', 'Жаль, а ты был так близок!', 'Судьба не на твоей стороне...', 'Зато ты красивый(ая) :)'];
let KEYcolor = 200;
let WINphrase;
let LOSEphrase;

function setup() {
	//вначале определяем масштаб, чтобы подстроить исходный холст под любой монитор:
	if (windowHeight < windowWidth) {
		if (windowHeight < 900) {
			L = windowHeight / 900;
		} else { //здесь я делаю так, что увеличичиваться масштаб не может даже на любых бОльших мониторах (макимальное значение стороны холста остается 900)
			L = 1;
		}
	} else {
		if (windowWidth < 1200) {
			L = windowWidth / 1200;
		} else { //здесь я делаю так, что увеличичиваться масштаб не может даже на любых бОльших мониторах (макимальное значение стороны холста остается 1200)
			L = 1;
		}
	}
	//и вот теперь создаем холст в этом масштабе:
	createCanvas(1200 * L, 900 * L);

	COLOR1 = color(random(COLOR));
	COLOR2 = color(random(COLOR));
	COLOR3 = color(random(COLOR));
	COLOR4 = color(random(COLOR));
	COLOR5 = color(random(COLOR));

	ZNAK = random(ZNAKI);
	if (ZNAK > 0) NUM1 = random(NUMrplus);
	else NUM1 = random(NUMrminus);
	ZNAK = random(ZNAKI);
	if (ZNAK > 0) NUM2 = random(NUMrplus);
	else NUM2 = random(NUMrminus);
	ZNAK = random(ZNAKI);
	if (ZNAK > 0) NUM3 = random(NUMrplus);
	else NUM3 = random(NUMrminus);
	ZNAK = random(ZNAKI);
	if (ZNAK > 0) NUM4 = random(NUMrplus);
	else NUM4 = random(NUMrminus);
	ZNAK = random(ZNAKI);
	if (ZNAK > 0) NUM5 = random(NUMrplus);
	else NUM5 = random(NUMrminus);

	Y1 = random(Ystart);
	Y2 = random(Ystart);
	Y3 = random(Ystart);
	Y4 = random(Ystart);
	Y5 = random(Ystart);
	
	WINphrase=random(WIN);
	LOSEphrase=random(LOSE);

	frameRate(60);
}

function draw() {
	scale(L);

	//фон!!!!
	background(255 / 2);
	noStroke();
	fill(255);
	rect(0, 0, 1200, 900);

	//показатели
	push();

	textAlign(LEFT, CENTER);
	textSize(50);
	fill(0);

	text('Timer:  ' + TIMEmin + ':' + TIMEsec, 50, 50);
	if (COUNTframes === 60) {
		TIMEsec++;
		COUNTsec++;
		COUNTframes = 0;
	}
	if (COUNTsec === 60) {
		TIMEmin++;
		COUNTsec = 0;
		TIMEsec = 0;
	}

	text('Best time:  ' + BESTTIMEmin + ':' + BESTTIMEsec, 800, 50);

	textAlign(CENTER, CENTER);
	fill('#ff9b00');
	textSize(90);
	text(SCORE, 600, 70);

	pop();

	// ДЛЯ ПРОВЕРКИ БЕГУНКА:	
	textSize(20);
	fill(0);
	//	text(cubeMOVEUP,50,50);
	//	text(cubeMOVEDOWN,50,80);
	//	text(cubeY,50,110);

	push(); //игровое поле
	translate(0, 50);
	push(); //бегунок
	noFill();
	stroke(230);
	strokeWeight(5);
	push();
	translate(0,-85);
	line(0, 210, width / L, 210);
	line(0, 450, width / L, 450);
	line(0, 690, width / L, 690);
	pop();
	push();
	translate(0,85);
	line(0, 210, width / L, 210);
	line(0, 450, width / L, 450);
	line(0, 690, width / L, 690);
	pop();
	stroke(0);
	strokeWeight(10);
	rectMode(CENTER);
	rect(150, cubeY, 150, 150, 50);
	pop();

	push(); //знаки математические
	fill(ZNAKPLUS);
	rectMode(CENTER);
	rect(150, Yplus, 30, 100, 10);
	rect(150, Yplus, 100, 30, 10);
	fill(ZNAKMINUS);
	rectMode(CENTER);
	rect(150, Yminus, 100, 30, 10);
	pop();

	pop(); //конец игрового поля

	//if (keyIsPressed === true && keyCode === UP_ARROW) cubeMOVEUP=true;
	//if (keyIsPressed === true && keyCode === DOWN_ARROW) cubeMOVEDOWN=true;

	//настраиваем управление бегунком и его анимацию

	if (cubeMOVEUP === true) {
		cubeY = cubeY - cubeDY;
		cubeDYCOUNT++;
	}

	if (cubeMOVEDOWN === true) {
		cubeY = cubeY + cubeDY;
		cubeDYCOUNT++;
	}

	if (cubeDYCOUNT === 12) {
		cubeMOVEUP = false;
		cubeMOVEDOWN = false;
		cubeDYCOUNT = 0;
	}

	if (cubeY === Yplus) ZNAKPLUS = 0;
	else ZNAKPLUS = 200;
	if (cubeY === Yminus) ZNAKMINUS = 0;
	else ZNAKMINUS = 200;

	push(); //кубики с числами и центральный (со сменой знаков)
	translate(0, 50);
	noStroke();
	rectMode(CENTER);
	textAlign(CENTER, CENTER);
	textSize(100);

	//куб для смены знаков

	if ((Yz === cubeY) && (Xz <= 225) && (Xz >= 150)) { //если куб с числом попал в промежуток, на кот0ром его можно поймать, он исчезает
		CATCHcubez = true;
		if (CHECKz === 0) {
			Zsmena = Yminus;
			Yminus = Yplus;
			Yplus = Zsmena;
		}
		CHECKz++; //переменная проверки поимки куба становится отличной от нуля
	}
	if ((CHECKz > 0) && (Xz < 255) && (Xz > -100)) CATCHcubez = true; //если куб покинул участок поимки, но переменная проверки поимки говорит, что он пойман, куб остается невидимым
	else {
		CATCHcubez = false; //видимость возвращается!
		CHECKz = 0; //переменна проверки поимки куба снова обнуляется
	}
	if (CATCHcubez === false) { //рисуем сам кубик
		fill(180);
		rect(Xz, Yz, 150, 150, 50);
		push();
		stroke(255, 40, 0);
		strokeWeight(5);
		fill(255, 40, 0);
		rect(Xz - 30, Yz - 10, 10, 80, 3); //левая стрелка (ВНИЗ)
		rect(Xz + 30, Yz + 10, 10, 80, 3); //левая стрелка (ВНИЗ)
		pop();
		push(); //наконечники стрелок
		stroke(255, 40, 0);
		strokeWeight(10);
		strokeJoin(ROUND);
		fill(255, 40, 0);
		triangle(Xz - 15, Yz + 35, Xz - 45, Yz + 35, Xz - 30, Yz + 50); //левая стрелка (ВНИЗ)
		triangle(Xz + 15, Yz - 35, Xz + 45, Yz - 35, Xz + 30, Yz - 50); //левая стрелка (ВНИЗ)
		pop();
	}

	//числовые кубы (5 штук)

	if ((Y1 === cubeY) && (X1 <= 225) && (X1 >= 150)) { //если куб с числом попал в промежуток, на кот0ром его можно поймать, он исчезает
		CATCHcube1 = true;
		CHECK1++; //переменная проверки поимки куба становится отличной от нуля
		if (Y1 === Yplus) SCORE = SCORE + NUM1;
		else SCORE = SCORE - NUM1;
		NUM1 = 0;
	}
	if ((CHECK1 > 0) && (X1 < 255) && (X1 > -100)) CATCHcube1 = true; //если куб покинул участок поимки, но переменная проверки поимки говорит, что он пойман, куб остается невидимым
	else {
		CATCHcube1 = false; //видимость возвращается!
		CHECK1 = 0; //переменна проверки поимки куба снова обнуляется
	}
	if (CATCHcube1 === false) {
		fill(COLOR1);
		rect(X1, Y1, 150, 150, 50);
		fill(0);
		text(NUM1, X1, Y1 + 5);
	}

	if ((Y2 === cubeY) && (X2 <= 225) && (X2 >= 150)) { //если куб с числом попал в промежуток, на кот0ром его можно поймать, он исчезает
		CATCHcube2 = true;
		CHECK2++; //переменная проверки поимки куба становится отличной от нуля
		if (Y2 === Yplus) SCORE = SCORE + NUM2;
		else SCORE = SCORE - NUM2;
		NUM2 = 0;
	}
	if ((CHECK2 > 0) && (X2 < 255) && (X2 > -100)) CATCHcube2 = true; //если куб покинул участок поимки, но переменная проверки поимки говорит, что он пойман, куб остается невидимым
	else {
		CATCHcube2 = false; //видимость возвращается!
		CHECK2 = 0; //переменна проверки поимки куба снова обнуляется
	}
	if (CATCHcube2 === false) {
		fill(COLOR2);
		rect(X2, Y2, 150, 150, 50);
		fill(0);
		text(NUM2, X2, Y2 + 5);
	}

	if ((Y3 === cubeY) && (X3 <= 225) && (X3 >= 150)) { //если куб с числом попал в промежуток, на кот0ром его можно поймать, он исчезает
		CATCHcube3 = true;
		CHECK3++; //переменная проверки поимки куба становится отличной от нуля
		if (Y3 === Yplus) SCORE = SCORE + NUM3;
		else SCORE = SCORE - NUM3;
		NUM3 = 0;
	}
	if ((CHECK3 > 0) && (X3 < 255) && (X3 > -100)) CATCHcube3 = true; //если куб покинул участок поимки, но переменная проверки поимки говорит, что он пойман, куб остается невидимым
	else {
		CATCHcube3 = false; //видимость возвращается!
		CHECK3 = 0; //переменна проверки поимки куба снова обнуляется
	}
	if (CATCHcube3 === false) {
		fill(COLOR3);
		rect(X3, Y3, 150, 150, 50);
		fill(0);
		text(NUM3, X3, Y3 + 5);
	}

	if ((Y4 === cubeY) && (X4 <= 225) && (X4 >= 150)) { //если куб с числом попал в промежуток, на кот0ром его можно поймать, он исчезает
		CATCHcube4 = true;
		CHECK4++; //переменная проверки поимки куба становится отличной от нуля
		if (Y4 === Yplus) SCORE = SCORE + NUM4;
		else SCORE = SCORE - NUM4;
		NUM4 = 0;
	}
	if ((CHECK4 > 0) && (X4 < 255) && (X4 > -100)) CATCHcube4 = true; //если куб покинул участок поимки, но переменная проверки поимки говорит, что он пойман, куб остается невидимым
	else {
		CATCHcube4 = false; //видимость возвращается!
		CHECK4 = 0; //переменна проверки поимки куба снова обнуляется
	}
	if (CATCHcube4 === false) {
		fill(COLOR4);
		rect(X4, Y4, 150, 150, 50);
		fill(0);
		text(NUM4, X4, Y4 + 5);
	}

	if ((Y5 === cubeY) && (X5 <= 225) && (X5 >= 150)) { //если куб с числом попал в промежуток, на кот0ром его можно поймать, он исчезает
		CATCHcube5 = true;
		CHECK5++; //переменная проверки поимки куба становится отличной от нуля
		if (Y5 === Yplus) SCORE = SCORE + NUM5;
		else SCORE = SCORE - NUM5;
		NUM5 = 0;
	}
	if ((CHECK5 > 0) && (X5 < 255) && (X5 > -100)) CATCHcube5 = true; //если куб покинул участок поимки, но переменная проверки поимки говорит, что он пойман, куб остается невидимым
	else {
		CATCHcube5 = false; //видимость возвращается!
		CHECK5 = 0; //переменна проверки поимки куба снова обнуляется
	}
	if (CATCHcube5 === false) {
		fill(COLOR5);
		rect(X5, Y5, 150, 150, 50);
		fill(0);
		text(NUM5, X5, Y5 + 5);
	}

	//задаем случайные начальные параметры после достижения кубиками границы холста (левой)

	if (Xz <= -150) {
		Xz = 1500;
		CATCHcubez = false;
	}

	if (X1 <= -150) {
		COLOR1 = color(random(COLOR));
		ZNAK = random(ZNAKI);
		if (ZNAK > 0) NUM1 = random(NUMrplus);
		else NUM1 = random(NUMrminus);
		Y1 = random(Ystart);
		X1 = 1350;
		CATCHcube = false;
	}

	if (X2 <= -150) {
		COLOR2 = color(random(COLOR));
		ZNAK = random(ZNAKI);
		if (ZNAK > 0) NUM2 = random(NUMrplus);
		else NUM2 = random(NUMrminus);
		Y2 = random(Ystart);
		X2 = 1350;
		CATCHcube = false;
	}

	if (X3 <= -150) {
		COLOR3 = color(random(COLOR));
		ZNAK = random(ZNAKI);
		if (ZNAK > 0) NUM3 = random(NUMrplus);
		else NUM3 = random(NUMrminus);
		Y3 = random(Ystart);
		X3 = 1350;
		CATCHcube = false;
	}

	if (X4 <= -150) {
		COLOR4 = color(random(COLOR));
		ZNAK = random(ZNAKI);
		if (ZNAK > 0) NUM4 = random(NUMrplus);
		else NUM4 = random(NUMrminus);
		Y4 = random(Ystart);
		X4 = 1350;
		CATCHcube = false;
	}

	if (X5 <= -150) {
		COLOR5 = color(random(COLOR));
		ZNAK = random(ZNAKI);
		if (ZNAK > 0) NUM5 = random(NUMrplus);
		else NUM5 = random(NUMrminus);
		Y5 = random(Ystart);
		X5 = 1350;
		CATCHcube = false;
	}

	//двигаем кубики с числами:
	X1 = X1 - DX;
	X2 = X2 - DX;
	X3 = X3 - DX;
	X4 = X4 - DX;
	X5 = X5 - DX;
	Xz = Xz - DX * 0.8;

	//придаем им ускорение:
	DX = DX + DXd;

	pop();

	//КОНЕЦ ИГРЫ:

	if (SCORE > 100) { //если игра завершена
		DX = 0;
		DXd = 0;
		if (SCORE === 101) { //в случае победы
			if ((BESTTIMEmin===0)&&(BESTTIMEsec===0)){
				BESTTIMEmin = TIMEmin;
				BESTTIMEsec = TIMEsec;
			}
			else {
				if (TIMEmin < BESTTIMEmin) {
					BESTTIMEmin = TIMEmin;
					BESTTIMEsec = TIMEsec;
				} else if ((TIMEmin === BESTTIMEmin) && (TIMEsec < BESTTIMEsec)) {
					BESTTIMEsec = TIMEsec;
				}
			}
			push(); //поле победы
			translate(width / 2, height / 2);
			fill('#009b00');
			rectMode(CENTER);
			rect(0, 0, 700, 500, 70);
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(30);
			text(WINphrase, 0, -200);
			textSize(250);
			text(SCORE, 0, 0);
			strokeWeight(10);
			stroke(255);
			fill(KEYcolor);
			rect(0, 170, 300, 60, 30);
			fill(30);
			textSize(25);
			noStroke();
			text('ХОЧУ ПОВТОРИТЬ!', 0, 173);
			pop();
		} else { //в случае поражения
			push(); //поле поражения
			translate(width / 2, height / 2);
			fill(225, 40, 0);
			rectMode(CENTER);
			rect(0, 0, 700, 500, 70);
			fill(255);
			textAlign(CENTER, CENTER);
			textSize(30);
			text(LOSEphrase, 0, -200);
			textSize(250);
			text(SCORE, 0, 0);
			strokeWeight(10);
			stroke(255);
			fill(KEYcolor);
			rect(0, 170, 300, 60, 30);
			fill(30);
			textSize(25);
			noStroke();
			text('ХОЧУ ПОВТОРИТЬ!', 0, 173);
			pop();
		}

		if ((mouseX>=(width / 2-150))&&(mouseX<=(width / 2+150))&&(mouseY>=(height / 2+170-30))&&(mouseY<=(height / 2+170+30))) KEYcolor=220;
		else KEYcolor=200;

		if (mouseIsPressed===true) {
			if (mouseButton===LEFT) {
				if ((mouseX>=(width / 2-150))&&(mouseX<=(width / 2+150))&&(mouseY>=(height / 2+170-30))&&(mouseY<=(height / 2+170+30))) {
					KEYcolor=170;
				}
			}
		}
		
	} else { //если игра не завершена
		COUNTframes++;
		WINphrase=random(WIN);
		LOSEphrase=random(LOSE);
	}
	
//	if (SCORE < 102) SCORE++; //ДЛЯ ПРОВЕРКИ КОНЦА ИГРЫ!
}

function mouseReleased() {
	if ((mouseButton===LEFT)&&(SCORE>100)) {
		if ((mouseX>=(width / 2-150))&&(mouseX<=(width / 2+150))&&(mouseY>=(height / 2+170-30))&&(mouseY<=(height / 2+170+30))) {
			SCORE = 0;
			DX = 2;
			DXd = 0.0025;
			COUNTframes=0;
			TIMEmin = 0;
			TIMEsec = 0;
			cubeY = 450;
			X1 = 1350;
			X2 = 1350 + 300;
			X3 = 1350 + 300 + 300;
			X4 = 1350 + 300 + 300 + 300;
			X5 = 1350 + 300 + 300 + 300 + 300;
			Xz = 1500;
			
			COLOR1 = color(random(COLOR));
			COLOR2 = color(random(COLOR));
			COLOR3 = color(random(COLOR));
			COLOR4 = color(random(COLOR));
			COLOR5 = color(random(COLOR));

			ZNAK = random(ZNAKI);
			if (ZNAK > 0) NUM1 = random(NUMrplus);
			else NUM1 = random(NUMrminus);
			ZNAK = random(ZNAKI);
			if (ZNAK > 0) NUM2 = random(NUMrplus);
			else NUM2 = random(NUMrminus);
			ZNAK = random(ZNAKI);
			if (ZNAK > 0) NUM3 = random(NUMrplus);
			else NUM3 = random(NUMrminus);
			ZNAK = random(ZNAKI);
			if (ZNAK > 0) NUM4 = random(NUMrplus);
			else NUM4 = random(NUMrminus);
			ZNAK = random(ZNAKI);
			if (ZNAK > 0) NUM5 = random(NUMrplus);
			else NUM5 = random(NUMrminus);

			Y1 = random(Ystart);
			Y2 = random(Ystart);
			Y3 = random(Ystart);
			Y4 = random(Ystart);
			Y5 = random(Ystart);
		}
	}
}

function keyPressed() {

	if ((SCORE < 101) && (cubeY === 690 || cubeY === 450) && (key === 'w' || key === 'ц'|| keyCode===UP_ARROW)) {
		cubeMOVEUP = true;
	}
	if ((SCORE < 101) && (cubeY === 210 || cubeY === 450) && (key === 's' || key === 'ы' || keyCode===DOWN_ARROW)) {
		cubeMOVEDOWN = true;
	}
}