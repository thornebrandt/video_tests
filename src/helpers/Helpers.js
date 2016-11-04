let Helper = {
	init(){
		console.log("init");
		String.prototype.toMMSS = function () {
			let mili_num = parseInt(this, 10);
			let sec_num = Math.floor(mili_num / 1000);
		    let hours   = Math.floor(sec_num / 3600);
		    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
		    let seconds = sec_num - (hours * 3600) - (minutes * 60);
		    if (seconds < 10) {seconds = "0"+seconds;}
		    return minutes+':'+seconds;
		}
	}
}

module.exports = Helper;