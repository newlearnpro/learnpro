"use strict";
$(document).ready(function() {


    var task = new Task();
    var taskFinish = false;
    var taskNumber = 1;
    var taskNumberVersion = 1;
    var secondImg = false;	
    var arrAlpha = [];
    var marginLeft = parseInt($("#graph").css("margin-left"));
    var marginTop = parseInt($("#graph").css("margin-top"));
    var aniLength = [0, 53, 71, 68, 55, 58, 58, 68, 50, 71, 50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 47, 28, 52, 52, 56,0,0];
    var arrNumCoordX = [
        [0],
        [190 + marginLeft],
        [184 + marginLeft],
        [206 + marginLeft],
        [284 + marginLeft],
        [238 + marginLeft],
        [376 + marginLeft],
        [184 + marginLeft],
        [250 + marginLeft],
        [376 + marginLeft],
        [350 + marginLeft],
        [224 + marginLeft],
        [122 + marginLeft],
        [122 + marginLeft],
        [224 + marginLeft],
        [224 + marginLeft],
        [230 + marginLeft],
        [120 + marginLeft],
        [88 + marginLeft],
        [116 + marginLeft],
        [90 + marginLeft],
		
		[190 + marginLeft],
		[28 + marginLeft],
		[28 + marginLeft],
		[362 + marginLeft],
		[28 + marginLeft],
		
        [226 + marginLeft, 116 + marginLeft, 338 + marginLeft]
    ];
    var arrNumCoordY = [
        [0],
        [190 + marginTop],
        [110 + marginTop],
        [86 + marginTop],
        [6 + marginTop],
        [4 + marginTop],
        [68 + marginTop],
        [52 + marginTop],
        [24 + marginTop],
        [82 + marginTop],
        [2 + marginTop],
        [90 + marginTop],
        [56 + marginTop],
        [94 + marginTop],
        [70 + marginTop],
        [48 + marginTop],
        [70 + marginTop],
        [274 + marginTop],
        [230 + marginTop],
        [320 + marginTop],
        [302 + marginTop],
		
		[26 + marginTop],
		[188 + marginTop],
		[20 + marginTop],
		[20 + marginTop],
		[146 + marginTop],
		
        [90 + marginTop, 298 + marginTop, 300 + marginTop]
    ];
    var arrNumCoordX_step2 = [
        [0],
        [0],
        [0],
        [0],
        [376 + marginLeft],
        [242 + marginLeft],
        [0],
        [214 + marginLeft],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],
		[28 + marginLeft],[0],[0],[0],[28 + marginLeft]
    ];
    var arrNumCoordY_step2 = [
        [0],
        [0],
        [0],
        [0],
        [120 + marginTop],
        [4 + marginTop],
        [0],
        [194 + marginTop],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],
		[188 + marginTop],[0],[0],[0],[232 + marginTop]
    ];

    var wrong_v = 0;
    var dragg = [];
    var ok = "";

    var posLR = [0],
        posTB = [0],
        leftPos = 10,
        topPos = 10,
        posLR2 = [0],
        posTB2 = [0],
        leftPos2 = 20,
        topPos2 = 20;



    task.canvasImg(taskNumber);



    $("#taskPicture").parent().append("<div id='taskMenuPictureGroup'>");
    for (let i = 1; i <= 26; i++) {
        $("#taskMenuPictureGroup").append("<img class='taskMenuPicture' src='images/animate/ani_" + i + "/ani_" + i + "_" + aniLength[i] + ".png' />");
        setTimeout(function() {
            $(".taskMenuPicture").eq(10 - i).css({
                right: 8 + (i * 48)
            });
        }, 100);
    }






    $("#taskPicture").bind("click", function() {
        $(".taskMenuPicture").slideToggle();
    });
    $(".taskMenuPicture").bind("click", function() {
        $("#taskPicture").attr("src", $(this).attr("src"));
        $(".taskMenuPicture").fadeOut(100);
        $(".start_draw").detach();
        $("#graph_save_picures").empty();
        taskNumber = $(this).index() + 1;
        var randPoint = Math.floor(Math.random() * arrNumCoordX[taskNumber].length);
        taskNumberVersion = 1;
        wrong_v = 0;
        dragg = [];
        ok = "";
        arrAlpha = [];
        task.getCleen();

        if (taskNumber <= 25) {
            task.canvasImg(taskNumber);
            tskSelect(arrNumCoordX[taskNumber][0], arrNumCoordY[taskNumber][0]);
        } else {
            task.canvasImg(taskNumber, randPoint + 1);
            tskSelect(arrNumCoordX[taskNumber][randPoint], arrNumCoordY[taskNumber][randPoint]);
        }
    });
    tskSelect(arrNumCoordX[taskNumber][0], arrNumCoordY[taskNumber][0]);


    $("#requirement_ref").bind("click", function() {
        audioTrackTasks.stop().play('task' + taskNumber);
    });



    function tskSelect(coordX, coordY) {
        var animatePicNUM = 2;
        $("#taskPicture").css("display", "none");
        $("#animate_group").empty().append("<img id='animate_pic' src='images/animate/ani_" + taskNumber + "/ani_" + taskNumber + "_1.png' / > ");


        function animateTimer() {
            var deferred = new $.Deferred();
            deferred.resolve();
            return deferred.promise();
        }
        animateTimer().done(function() {
            $("#animate_group").css({
                width: 320,
                height: 410,
                top: parseInt($("#graph").css("margin-top")),
                left: parseInt($("#graph").css("margin-left"))
            });
            var inter = setInterval(function() {

                animatePicNUM++;

                $("#animate_pic").attr("src", "images/animate/ani_" + taskNumber + "/ani_" + taskNumber + "_" + animatePicNUM + ".png");
                if (animatePicNUM >= aniLength[taskNumber]) {

                    animateTimerStop();

                    setTimeout(function() {
                        $("#taskPicture").fadeIn();
                        creatStartDraw(coordX, coordY);
                        $("#animate_group").animate({
                            width: 200,
                            height: 200,
                            top: 70,
                            left: 480,
                        }, 300);
                        $("#animate_pic").animate({
                            width: 200,
                            height: 200,
                        }, 300).queue(function() {
                            $("#animate_pic").bind("click", function() {

                                $(".start_draw").detach();
                                tskSelect(coordX, coordY);
                                $(this).unbind("click");
                            });
                        });
                    }, 10);
                }
            }, 10);

            function animateTimerStop() {
                clearInterval(inter);
            }
        });
    }





    $("#refresh").on("click", function() {
        audioTrackTasks.stop();
        $(".start_draw").detach();
        arrAlpha = [];
        dragg = [];

        if (secondImg === false) {
            task.getCleen();
            if ((((taskNumber < 4 || taskNumber === 6) || (taskNumber > 7 && taskNumber <= 25)) && taskNumberVersion < 4) || ((taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) && taskNumberVersion < 7) || (taskNumber > 25 && taskNumberVersion < 2)) {
                task.canvasImg(taskNumber, taskNumberVersion);
                creatStartDraw(arrNumCoordX[taskNumber][0], arrNumCoordY[taskNumber][0]);
            }
        } else if (secondImg === true) {
            if ((taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) && taskNumberVersion > 6) {
                task.getCleen();
            }
            if ((taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) && taskNumberVersion < 7) {
                task.canvasImg(taskNumber, taskNumberVersion);
                creatStartDraw(arrNumCoordX_step2[taskNumber][0], arrNumCoordY_step2[taskNumber][0]);
            }

        }
    });

    function creatStartDraw(left, top) {
        var taskInArray = [];
        var seconds = 0,
            mrglf = 0,
            mrgtp = 0;
        ok = "";

        $("#graph").after("<div class='start_draw'></div>");
        $(".start_draw").eq(0).css({
            left: left,
            top: top
        });

        if ($(window).width() < 768) {
            mrglf = 0, mrgtp = 0;
        } else if ($(window).width() >= 768) {
            mrglf = 64, mrgtp = 38;
        }

        $(window).resize(function() {
            if (mrglf == 0) {
                $(".start_draw").css({
                    "left": left + parseInt($("#graph").css("margin-left")),
                    "top": top + parseInt($("#graph").css("margin-top"))
                });
            } else if (mrglf == 64 && $(window).width() >= 768) {
                $(".start_draw").css({
                    "left": left,
                    "top": top
                });
            } else if (mrglf == 64 && $(window).width() < 768) {
                $(".start_draw").css({
                    "left": left - mrglf,
                    "top": top - mrgtp
                });
            }
        });


        $(".start_draw").draggable({
            //containment: "#graph",
            containment: "#graphContainer",
            cursor: "pointer",
            cursorAt: {
                left: 10,
                top: 10
            },
            start: function(event, ui) {
                ui.helper.css({
                    width: 20,
                    height: 20,
                });
            },
            drag: function(event, ui) {
                var pixel = task.getCanvas().getImageData((ui.helper.offset().left - parseInt($("#graph").offset().left)) + 10, (ui.helper.offset().top - parseInt($("#graph").offset().top)) + 10, 410, 410);
                var data = pixel.data;
                var rgba = 'rgba(' + data[0] + ',' + data[1] +
                    ',' + data[2] + ',' + data[3] + ')';

                arrAlpha.push(data[3]);
                //    console.log(rgba)

                if (data[0] == 250 && data[1] == 255 && data[2] == 245) {
                    dragg = [1];
                    //   console.log(dragg);
                } else if (data[0] == 250 && data[1] == 255 && data[2] == 246) {
                    if (dragg.length == 1) {
                        dragg = [1, 2];
                        //   console.log(dragg);
                    }
                } else if (data[0] == 250 && data[1] == 255 && data[2] == 247) {
                    if (dragg.length == 2) {
                        dragg = [1, 2, 3];
                        //   console.log(dragg);
                    }
                }
                var dede = [];

                if (data[0] == 251 && data[1] == 255 && (data[2] >= 245 && data[2] <= 255)) {
                    dragg.push(data[2]);

                    $.each(dragg, function(i, el) {
                        if ($.inArray(el, taskInArray) === -1) taskInArray.push(el);
                    });
                    // console.log(taskInArray)
                    //   dede.push(taskInArray)
                    //   console.log(dede);
                }
                // /////////////// console.clear();
                ////////////////  console.log(taskInArray)




                posLR.unshift(ui.helper.offset().left);
                posTB.unshift(ui.helper.offset().top);
                posLR.splice(2, 2);
                posTB.splice(2, 2);

                posLR2.unshift(ui.helper.offset().left);
                posTB2.unshift(ui.helper.offset().top);
                posLR2.splice(2, 2);
                posTB2.splice(2, 2);


                if (posLR[0] >= posLR[1]) {
                    leftPos = 8;
                } else if (posLR[0] < posLR[1]) {
                    leftPos = 12;
                }
                if (posTB[0] >= posTB[1]) {
                    topPos = 8;
                } else if (posTB[0] < posTB[1]) {
                    topPos = 12;
                }

                if (posLR2[0] >= posLR2[1]) {
                    leftPos2 = 7;
                } else if (posLR2[0] < posLR2[1]) {
                    leftPos2 = 13;
                }
                if (posTB2[0] >= posTB2[1]) {
                    topPos2 = 7;
                } else if (posTB2[0] < posTB2[1]) {
                    topPos2 = 13;
                }



                task.draw(parseFloat($(".start_draw").css("left")) + leftPos - marginLeft - 5, (parseFloat($(".start_draw").css("top")) + topPos) - marginTop - 5);
                task.getCleen(parseFloat($(".start_draw").css("left")) + leftPos2 - marginLeft, parseFloat($(".start_draw").css("top")) + topPos2 - marginTop, 1.3, 1.3);


                /****************************/
                if (task.find(arrAlpha, 0) == -1 && ((data[0] == 255 && data[1] == 0 && data[2] == 0) || (data[0] == 255 && data[1] == 255 && data[2] == 240))) {
                    $("#graph").after("<div id='start_draw_container'></div>");
                    $("#start_draw_container").css({
                        left: ui.position.left,
                        top: ui.position.top
                    });


                    if ((taskNumber === 1 && dragg.length === 1) || (taskNumber === 2) || (taskNumber === 3) || (taskNumber === 6 && dragg.length === 2) || (taskNumber === 8 && dragg.length === 3) || (taskNumber === 9 && dragg.length === 2) || (taskNumber === 10 && dragg.length === 2) || (taskNumber === 11 && dragg.length === 2) || (taskNumber === 12 && dragg.length === 2) || (taskNumber === 13 && dragg.length === 2) || (taskNumber === 14 && dragg.length === 2) || (taskNumber === 15 && dragg.length === 2)  || (taskNumber === 16 && dragg.length === 2)  || (taskNumber === 17) || (taskNumber === 18 && dragg.length === 2) || (taskNumber === 19) || (taskNumber === 20) || (taskNumber === 22) || (taskNumber === 23 && dragg.length === 1) || (taskNumber === 24 && dragg.length === 1)) {
                        wrong_v = 0;
                        ok = "ok";
                        ui.helper.hide();
                        ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
                        taskNumberVersion++;
                        secondImg = false;
                        taskFinish = true;

                        setTimeout(function() {
                            taskFinish = false;
                            task.canvasImgSave();
                            switch (taskNumberVersion) {
                                case 2:					
                                    audioTrackHints.play('go_forward');
                                    break;						
                                case 3:
                                    audioTrackHints.play('good_go_forward');
                                    break;
                                case 4:
                                    /*$("#animate_group").animate({
                                        backgroundColor: "green"
                                    }, 1500);*/
                                    audioTrackHints.play('go_next');
                                    //  $("#graph").fadeOut()
                                    break;
                            }
                        }, 100);
                    }
                    if ((taskNumber === 4) || (taskNumber === 5 && dragg.length === 1) || (taskNumber === 7) || (taskNumber === 21) || (taskNumber === 25)) {
                        /*  $("#graph").after("<div id='start_draw_container'></div>");
                          $("#start_draw_container").css({
                              left: ui.position.left,
                              top: ui.position.top
                          });
                          wrong_v = 0;
                          ok = "ok";
                          ui.helper.hide();
                          ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
                          taskNumberVersion++;*/
                        wrong_v = 0;
                        ok = "ok";
                        ui.helper.hide();
                        ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
                        taskNumberVersion++;
                        secondImg = true;
                        taskFinish = false;
                        setTimeout(function() {
                            taskFinish = false;
                            switch (taskNumberVersion) {
                                case 3:
                                    task.canvasImgSave();
									
                                    audioTrackHints.play('go_forward');									
                                    secondImg = false;
								
                                    break;
                                case 5:
                                    task.canvasImgSave();
                                    audioTrackHints.play('good_go_forward');
                                    secondImg = false;
                                    break;
                                case 7:
                                    /*$("#animate_group").animate({
                                        backgroundColor: "green"
                                    }, 1500);*/
                                    task.canvasImgSave();
                                    audioTrackHints.play('go_next');
                                    break;
                            }
                        }, 100);

                    }
                    if ((taskNumber === 26 && taskInArray.length === 4)) {
                        wrong_v = 0;
                        ok = "ok";
                        ui.helper.hide();
                        ui.helper.draggable('option', 'containment', '#start_draw_container').data('ui-draggable')._setContainment();
                        taskNumberVersion++;
                        secondImg = false;
                        taskFinish = true;
                        setTimeout(function() {
                            taskFinish = false;
                            //   task.canvasImgSave();
                            audioTrackHints.play('go_next');
                        }, 100);
                    }
                }

                /****************************/
                /****************************************************************************************/
                /****************************************************************************************/
                /****************************************************************************************/
				if(audioTrackHints._sounds[0]._ended == true){
					if (data[2] === 250) {
						
							audioTrackHints.play('dont_hurry');
					
					}

                /*** when you enter other field, will be message 'do it right' ***/
              //  if (task.find(arrAlpha, 0) == -1 && data[0] == 255 && data[1] == 255 && data[2] == 250) {
				//  console.log(rgba);
					if (data[0] === 0 && data[1] === 0 && data[2] === 0 &&  data[3] > 0 && data[3] < 255) {					
						
							audioTrackHints.play('be_attentive');
										
					}
				
				
                    seconds++;
					console.clear();
					console.log(seconds);
                    if (((taskNumber === 1) && seconds === 500) || ((taskNumber === 2 || taskNumber === 3 || taskNumber === 5) && seconds === 700) || (taskNumber === 4 && seconds === 300)) {
                        audioTrackHints.play('very_slowly');
                    }
				}
                
            },
            stop: function(event, ui) {
                $(".start_draw, #start_draw_container").detach();
                task.lastX = parseFloat($(".start_draw").css("left")) + 6;
                task.lastY = parseFloat($(".start_draw").css("top")) + 10;
                if (taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) {
                    setTimeout(function() {
                        $("#refresh").trigger("click");
                    }, 100);
                } else {
                    setTimeout(function() {
                        $("#refresh").trigger("click");
                    }, 1500);
                }
                if (taskFinish == false) {
                    wrong_v++;
                    if (ok == "") {
                        audioTrackHints.play('try_again');
                        if (taskNumber === 4 || taskNumber === 5 || taskNumber === 7 || taskNumber === 21 || taskNumber === 25) {
                            //    console.log(taskNumberVersion)
                            if (taskNumberVersion === 2 || taskNumberVersion === 4 || taskNumberVersion === 6) {
                                secondImg = false;
                                taskNumberVersion--;
                                setTimeout(function() {
                                    task.canvasImg(taskNumber, taskNumberVersion);
                                }, 100);
                            }
                        }
                    }
                    if (wrong_v >= 5) {
                        audioTrackHints.play('wrong');
                        $("#part_laboratory").hide("explode", {
                            pieces: 16
                        }, 1000);
                    }
                }
            }
        });
    }
    // creatStartDraw(arrNumCoordX[taskNumber][0], arrNumCoordY[taskNumber][0]);





    $("#graph").droppable({
        accept: ".start_draw",
    });


    $("#graph, #part_laboratory_head").draggable({
        grid: [5000, 5000]
    });


});