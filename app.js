let colors = []
let context = undefined
let body = undefined
let playing = 'none'
let state = {playing: 'none'}
let previous = undefined
let noise = {'white': undefined, 'pink': undefined, 'brown': undefined}

function updateState(selected){
    previous = playing
    if(playing == selected){
        playing = 'none'
    }else{
        playing = selected
    }
    updateUI()
}

function updateUI(prevState){
    colors.forEach(function(color){
        if(color.id == playing){
            body.style.backgroundColor = window.getComputedStyle(color).backgroundColor
            color.className = "playing noise-color"   
        }else if('none' == playing){
            body.style.backgroundColor = ""
            color.className = "noise-color"  
        }else{
            color.className = "noise-color" 
        }
    })
    updateSound()
}

function updateSound(){
    if(previous != "none"){
        noise[previous].disconnect(context.destination)
        if(playing != "none")
         noise[playing].connect(context.destination)
    }else{
         noise[playing].connect(context.destination)
    }
}

function colorClicked(event){
    updateState(event.target.id)
}
/**
 * TODO: Refactor Noise creation to one function to limit changes for adding a new noise.
 */
function main(){
    body = document.getElementsByTagName('body')[0]
    colors = Array.from(document.getElementsByClassName('noise-color'))
    colors.forEach(function(color){
        color.addEventListener('click', colorClicked)
    })
    context = new AudioContext();
    noise["white"] = context.createWhiteNoise()
    noise["brown"] = context.createBrownNoise()
    noise["pink"] = context.createPinkNoise()
}

window.onload = main


