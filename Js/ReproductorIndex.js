window.onload = function(){

	const	player 		    = document.querySelector('#audioPlayer');
	const	timeRemaining = document.querySelector('#time');

	if(isNaN(player.duration)){
		return timeRemaining.textContent = 'Refresh !!';
	}

	const	repeatBtn     = document.querySelector('#replayBtn');
	const	muteBtn       = document.querySelector('#volume');
	const	progressBar   = document.querySelector('#progressbar');
	const	playPauseBtn  = document.querySelector('#playBtn');
			
	player.addEventListener('timeupdate', timeupdate , false);
	repeatBtn.addEventListener('click', repeat , false);
	muteBtn.addEventListener('click', mute,false);
	progressBar.addEventListener('click', ProgressBarClick, false);
	player.addEventListener('progress',buffered, false);
	playPauseBtn.addEventListener('click', PlayPause, false);
		
	timeRemaining.textContent = timer();

	function timer(){
    var timeleft  = Math.ceil(player.duration - player.currentTime);
    var	m         = Math.floor(timeleft / 60);
    var	s         = Math.floor(timeleft % 60);
    if(s < 10){
      s = '0' + s;
    }
    return m +':'+ s;
	}

	function PlayPause(e){
		if(player.paused){
			player.play();
			e.target.className = "iconicfill-pause btn";
		}
		else{
			player.pause();
			e.target.className = "iconicfill-play btn";
		}
	}

	function mute(e){
		if(!player.muted){
			player.muted = true;
			e.target.className = "iconicfill-volume-mute btn";
		}
		else{
			player.muted = false;
			e.target.className = "iconicfill-volume btn";
		}
	}

	function ProgressBarClick(e){			
		var playerContainer = document.querySelector('#wrapper');
		var	r = ((( e.pageX - playerContainer.getBoundingClientRect().left) / 280) * 100);
		player.currentTime = player.duration * r / 100;
	}

	function timeupdate() {	
		var progressbar = document.getElementById('progress-amount');
	  progressbar.style.width = ((player.currentTime / player.duration) * 100) + "%";
	  timeRemaining.textContent = timer();
	  if(progressbar.style.width == '100%'){
	  	playPauseBtn.className = "iconicfill-play btn";
	  }
	}

	function repeat(e){
		if(!player.loop){
			player.loop = true;
			e.target.style.color = "#FF9393";
		}
		else{
			player.loop = false;
			e.target.style.color = "#FFF";
		}
	}

	function buffered(){
		var bufferedEnd = player.buffered.end(player.buffered.length - 1);
		document.getElementById('buffered-amount').style.width = ((bufferedEnd / player.duration)*100) + "%";
	}
}