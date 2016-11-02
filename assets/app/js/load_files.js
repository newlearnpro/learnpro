/**************/
/********** audio tracks with part
 ***************/
var audioTrackTasks = new Howl({
    //src: ['assets/app/audio/tasks.mp3', 'assets/app/audio/tasks.ogg'],
    src: ['assets/app/audio/tasks.mp3'],
    sprite: {
        task1: [0, 6000],
        task2: [7300, 6700],
        task3: [14800, 7000],
        task4: [22500, 6000],
        task5: [29500, 6000],
        task6: [37000, 7000],
        task7: [45500, 6500],
        task8: [53000, 6000],
        task9: [59700, 6000],
        task10: [66800, 7000]
    }
});

var audioTrackHints = new Howl({
    //src: ['assets/app/audio/hints.mp3', 'assets/app/audio/hints.ogg'],
    src: ['assets/app/audio/hints.mp3'],
    sprite: {
        be_attentive: [0, 3000],
        dont_hurry: [9800, 3000],
        good: [14000, 1300],
        go_forward: [15300, 1000],
        good_go_forward: [14000, 2300],
        very_slowly: [16400, 3500],
        wrong: [20000, 1000],
        repeat: [21000, 1000],
        try_again: [22400, 1200],
        tru: [24000, 1200],
        go_next: [25500, 3200],
        bravo1: [29500, 1000],
        bravo2: [31000, 1500],
        bravo3: [33000, 1500],
        very_well1: [35200, 1500],
        very_well2: [37200, 1800],
    }
});

/*******************end audio track with parts****************/


/**************/
/********** load audio and picture files
 ***************/
kontra.loadAssets(
    'assets/common/img/req1.png',
    'assets/common/img/next.png',
    'assets/common/img/refresh.png',
    'assets/app/audio/hints.mp3',
    'assets/app/audio/tasks.mp3',
    'images/number_1_1.png',
    'images/number_1_2.png',
    'images/number_1_3.png',
    'images/number_4_1.png',
    'images/number_4_2.png',
    'images/number_4_3.png',
    'images/number_4_4.png',
    'images/number_4_5.png',
    'images/number_4_6.png',
    'images/number_8_1.png',
    'images/number_8_2.png',
    'images/number_8_3.png'
).then(
    function finishCallback() {
       //   $("#done").text("Finished loading all assets.");
    },
    function errorCallback(err) {
        //  $("#cons_error").text(err.message);
    },
    function progressCallback(progress) {
        //  $("#console").text("Loaded " + progress.loaded + " of " + progress.total + " assets.");
        //  console.log("Loaded " + progress.loaded + " of " + progress.total + " assets.");
        //   console.log(progress)
    });
/*******************end load audio and picture files****************/