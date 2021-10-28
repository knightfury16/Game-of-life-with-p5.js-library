class Button{
    
    // let playButton;
    // let stopButton;
    // let randomButton;
    // let resetButton;

    constructor()
    {
        let sp = createSpan();

        // Play button
        let playButton = createButton("Play");
        playButton.parent(sp);
        playButton.attribute('class','button-6');

        // Stop button
        let stopButton = createButton("Stop");
        stopButton.parent(sp);
        stopButton.attribute('class','button-6');

        //Random button
        let randomButton = createButton("random");
        randomButton.parent(sp);
        randomButton.attribute('class','button-6');


        //Reset button
        let resetButton = createButton("reset");
        resetButton.parent(sp);
        resetButton.attribute('class','button-6');


    }

    play(){
        
        this.playButton.mousePressed(function() {
            // play = true;
            // loop();
            console.log("play button is pressed.")
        });
        console.log("Play function end");
    }

    
}