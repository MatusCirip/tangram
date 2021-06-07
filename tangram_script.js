var hracia_plocha;
var stvorecCerveny;
var trojuholnik2;
var trojuholnik3;
var trojuholnik4; 
var trojuholnik5; 
var trojuholnik6;
var kosodlznik1;
var farba;
var farba2;
var pohyb;
var offset;
var xpos; //mousedown - poloha na platne pri kliknuti
var ypos; //mousedown - poloha na platne pri kliknuti
var pomoc = 0;//pocitanie pripadov pri vyhodnocovani ci je dobre zlozena
var zaciatok; //timer na zaciatku
var koniec; //timer na konci
var poloha_x_stara = 0;
var poloha_y_stara = 0;
var poloha_x_nova;
var poloha_y_nova;

function startGame() {

    //realne tangram objekty
    hracia_plocha = new stvorec(200, 200, "black", 400, 55);
    stvorecCerveny = new stvorec(71, 71, "red", 520, 335);
    trojuholnik2 = new trojuholnik(260, 425, 160, 325, 360, 325, "DarkMagenta");
    trojuholnik3 = new trojuholnik(120, 325, 220, 425, 20, 425, "DarkOrange");
    trojuholnik4 = new trojuholnik(680, 375, 630, 325, 630, 425, "DarkRed");
    trojuholnik5 = new trojuholnik(380, 425, 480, 425, 380, 325, "Gold");
    trojuholnik6 = new trojuholnik(720, 375, 770, 325, 770, 425, "LawnGreen");
    kosodlznik1 = new kosodlznik(810, 405, 860, 355, 960, 355, 910, 405, "MediumBlue");

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        var d = new Date();
        zaciatok = d.getTime();
        this.canvas.width = 1000;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        var target = document.getElementById("target");
        //document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        target.insertBefore(this.canvas, target.childNodes[0]);
        //document.getElementById("target").appendChild(this.canvas);  
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('mousedown', function (e){
                //var canvas = document.getElementById("canvas");
                var ctx = myGameArea.canvas.getContext("2d");
                //xpos = Math.round((e.pageX) - (document.getElementById("target").style.left));
                //xpos = Math.round((e.pageY) - (document.getElementById("target").style.top));
                offset = $("#target").offset();
               //alert("Top: " + x.top + " Left: " + x.left);
                xpos = (e.pageX - offset.left) - ((e.pageX - offset.left) % 10);
                ypos = (e.pageY - offset.top) - ((e.pageY - offset.top) % 10);
                
                //alert(document.getElementById("target").style.left + document.getElementById("target").style.top);
                
                var imgData = ctx.getImageData(xpos, ypos, 1, 1);
                farba = imgData.data[0] + "," + imgData.data[1] + "," + imgData.data[2];
                farba2 = farba;
                pohyb = 1;
                console.log(farba);
        });
        window.addEventListener('mousemove', function (e) {
            if (pohyb == 1){
            myGameArea.x = (e.pageX - offset.left) - ((e.pageX - offset.left) % 10);
            myGameArea.y = (e.pageY - offset.top) - ((e.pageY - offset.top) % 10);
            //console.log(myGameArea.x + "        " + myGameArea.y);
        }
        });
        window.addEventListener('mouseup', function (e){
                //var canvas = document.getElementById("canvas");
                //var ctx = myGameArea.canvas.getContext("2d");
                myGameArea.x = 0;
                myGameArea.y = 0;

                if ((xpos == (e.pageX - offset.left) - ((e.pageX - offset.left) % 10)) && (ypos == (e.pageY - offset.top) - ((e.pageY - offset.top) % 10))) {
                        switch (farba){
                            case "255,0,0":
                                stvorecCerveny.angle += 45 * Math.PI / 180;
                                break;
                            case "139,0,139":
                                trojuholnik2.angle += 45 * Math.PI / 180;
                                break;   
                            case "255,140,0":
                                trojuholnik3.angle += 45 * Math.PI / 180;
                                break;   
                            case "139,0,0":
                                trojuholnik4.angle += 45 * Math.PI / 180;
                                break;     
                            case "255,215,0":
                                trojuholnik5.angle += 45 * Math.PI / 180;
                                break;  
                            case "124,252,0":
                                trojuholnik6.angle += 45 * Math.PI / 180;
                                break; 
                            case "0,0,205":
                                kosodlznik1.angle += 45 * Math.PI / 180;
                                break; 
                        } 
                }
                pohyb = 0;
                farba = 0;
                poloha_x_stara = 0;
                poloha_y_stara = 0;
                

                //overenie ci su utvary poskladane na mieste dobre
                for (var i = 400; i < 600; i += 9) {
                    for (var j = 55; j < 255; j += 9) {
                        var ctx = myGameArea.canvas.getContext("2d");
                        var imgData = ctx.getImageData(i, j, 1, 1);
                        if ((imgData.data[0] == 0) && (imgData.data[2] == 0) && (imgData.data[2] == 0))
                            //alert("nieje poskladane");
                            //pomoc++;
                            return;
                    }
                }
                var g = new Date();
                koniec = g.getTime();
               SkoncilSi();
               //alert("je poskladane");
               //console.log(pomoc);
        })

    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function stvorec(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.x = x;
    this.y = y; 
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.fillRect((this.width / -2) + (width /2), (this.height / -2) + (height /2), this.width, this.height);     
        ctx.restore();   
    }   

}


function trojuholnik( x, y, x2, y2, x3, y3, color) {
    this.angle = 0;
    this.x = x;
    this.y = y; 
    this.x2 = x2;
    this.y2 = y2; 
    this.x3 = x3;
    this.y3 = y3; 
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(0,0);
        ctx.lineTo(this.x2 - this.x, this.y2 - this.y);
        ctx.lineTo(this.x3 - this.x, this.y3 - this.y);
        ctx.lineTo(0,0);
        ctx.closePath();
        ctx.fill();     
        ctx.restore();   
    }   

}

function kosodlznik(x, y, x2, y2, x3, y3, x4, y4, color) {
    this.angle = 0;
    this.x = x;
    this.y = y; 
    this.x2 = x2;
    this.y2 = y2; 
    this.x3 = x3;
    this.y3 = y3; 
    this.x4 = x4;
    this.y4 = y4;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);        
        ctx.rotate(this.angle);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(0,0);
        ctx.lineTo(this.x2 - this.x, this.y2 - this.y);
        ctx.lineTo(this.x3 - this.x, this.y3 - this.y);
        ctx.lineTo(this.x4 - this.x, this.y4 - this.y);
        ctx.lineTo(0,0);
        ctx.closePath();
        ctx.fill();     
        ctx.restore();   
    }   

}




function updateGameArea() {
    myGameArea.clear();
    
    if (myGameArea.x && myGameArea.y) {

        poloha_x_nova = myGameArea.x - xpos - poloha_x_stara;
        poloha_y_nova = myGameArea.y - ypos - poloha_y_stara;
        console.log("poloha x: " + poloha_x_nova + "         poloha y: " + poloha_y_nova);


        switch (farba){
            case "255,0,0":
                stvorecCerveny.x += poloha_x_nova;
                stvorecCerveny.y += poloha_y_nova;
                break;   
            case "139,0,139":
                trojuholnik2.x3 += poloha_x_nova;
                trojuholnik2.y3 += poloha_y_nova;
                trojuholnik2.x2 += poloha_x_nova;
                trojuholnik2.y2 += poloha_y_nova;

                trojuholnik2.x += poloha_x_nova;
                trojuholnik2.y += poloha_y_nova;
                break;
            case "255,140,0":
                trojuholnik3.x3 += poloha_x_nova;
                trojuholnik3.y3 += poloha_y_nova;
                trojuholnik3.x2 += poloha_x_nova;
                trojuholnik3.y2 += poloha_y_nova;

                trojuholnik3.x += poloha_x_nova;
                trojuholnik3.y += poloha_y_nova;
                break;
            case "139,0,0":
                trojuholnik4.x3 += poloha_x_nova;
                trojuholnik4.y3 += poloha_y_nova;
                trojuholnik4.x2 += poloha_x_nova;
                trojuholnik4.y2 += poloha_y_nova;

                trojuholnik4.x += poloha_x_nova;
                trojuholnik4.y += poloha_y_nova;
                break;
            case "255,215,0":
        //        trojuholnik5.x3 = (trojuholnik5.x3 + poloha_x_nova) - ((trojuholnik5.x3 + poloha_x_nova) % 10);
          //      trojuholnik5.y3 = (trojuholnik5.y3 + poloha_y_nova) - ((trojuholnik5.y3 + poloha_y_nova) % 10);
            //    trojuholnik5.x2 = (trojuholnik5.x2 + poloha_x_nova) - ((trojuholnik5.x2 + poloha_x_nova) % 10);
              //  trojuholnik5.y2 = (trojuholnik5.y2 + poloha_y_nova) - ((trojuholnik5.y2 + poloha_y_nova) % 10);
                //trojuholnik5.x = (trojuholnik5.x + poloha_x_nova) - ((trojuholnik5.x + poloha_x_nova) % 10);
               // trojuholnik5.y = (trojuholnik5.y + poloha_y_nova) - ((trojuholnik5.y + poloha_y_nova) % 10);

                trojuholnik5.x3 += poloha_x_nova;
                trojuholnik5.y3 += poloha_y_nova;
                trojuholnik5.x2 += poloha_x_nova;
                trojuholnik5.y2 += poloha_y_nova;

                trojuholnik5.x += poloha_x_nova;
                trojuholnik5.y += poloha_y_nova;
                break;
            case "124,252,0":
                trojuholnik6.x3 += poloha_x_nova;
                trojuholnik6.y3 += poloha_y_nova;
                trojuholnik6.x2 += poloha_x_nova;
                trojuholnik6.y2 += poloha_y_nova;

                trojuholnik6.x += poloha_x_nova;
                trojuholnik6.y += poloha_y_nova;
                break;
            case "0,0,205":
                kosodlznik1.x3 += poloha_x_nova;
                kosodlznik1.y3 += poloha_y_nova;
                kosodlznik1.x2 += poloha_x_nova;
                kosodlznik1.y2 += poloha_y_nova;
                kosodlznik1.x4 += poloha_x_nova;
                kosodlznik1.y4 += poloha_y_nova;

                kosodlznik1.x += poloha_x_nova;
                kosodlznik1.y += poloha_y_nova;
                break;
        }

        poloha_y_stara += poloha_y_nova;
        poloha_x_stara += poloha_x_nova;
    }

   hracia_plocha.update();
   stvorecCerveny.update();
   trojuholnik2.update();
   trojuholnik3.update();
   trojuholnik4.update();
   trojuholnik5.update();
   trojuholnik6.update();
   kosodlznik1.update();

   switch (farba2){
    case "255,0,0":
        stvorecCerveny.update();
        break;   
    case "139,0,139":
        trojuholnik2.update();
        break;
    case "255,140,0":
        trojuholnik3.update();
        break;
    case "139,0,0":
        trojuholnik4.update();
        break;
    case "255,215,0":
        trojuholnik5.update();
        break;
    case "124,252,0":
        trojuholnik6.update();
        break;
    case "0,0,205":
        kosodlznik1.update();
        break;
    }
}


function Hraj(){
    document.getElementById("zaciatokHry").style.display = "none";
    startGame();
}

function SkoncilSi(){
    myGameArea.canvas.style.display = "none";
    document.getElementById("koniecHry").style.display = "block";
    var dlzka = koniec - zaciatok;
    var milisek = dlzka % 1000;
    dlzka -= milisek;
    dlzka /= 1000;
    var sekundy = dlzka % 60;
    dlzka -= sekundy;
    dlzka /= 60;
    if (dlzka < 1)
        document.getElementById("cas").innerHTML = sekundy + ' sekund'; 
    else document.getElementById("cas").innerHTML = dlzka + ' minut a ' + sekundy + ' sekund';// + milisek;
}

function znovu(){
    document.getElementById("koniecHry").style.display = "none";
    myGameArea.canvas.style.display = "block";
    startGame();
}