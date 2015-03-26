// index.js

var REST_DBENV = 'api/dbinfo';
var REST_TABLELIST = 'api/tablelist';
var REST_TWITTERENV = 'api/twitterinfo';
var REST_COUNT = 'api/twittercount';
var KEY_ENTER = 13;


function toggleDatabaseInfo(){
	var dbnode = document.getElementById('dbinfo');
	dbnode.style.display = dbnode.style.display == 'none' ? '' : 'none';
	var twitter = document.getElementById('twitterinfo');
	twitter.style.display = 'none';
}


function toggleTwitterInfo(){
	var twitter = document.getElementById('twitterinfo');
	twitter.style.display = twitter.style.display == 'none' ? '' : 'none';
	var dbnode = document.getElementById('dbinfo');
	dbnode.style.display = 'none';
}

function toggleCountButton(contentnode){
	var button = document.getElementById('countbutton');
	if (contentnode.value.length > 0){
		button.disabled = false;
	}else{
		button.disabled = true;
	}
	document.getElementById('numtweets').innerHTML = '<br/>No tweets selected...<br/><br/>';
	document.getElementById('numtweets').className = 'redArea';
}


function countTweets(){
	var countURL = REST_COUNT + '?q=' + encodeURIComponent(document.getElementById('tweetquery').value);
	xhrGet(countURL, function(count){
		
				console.log(count);
				if (count.search.results > 0){
					document.getElementById('numtweets').innerHTML = '<br/>' + count.search.results + ' tweets available...<br/><br/>';
					document.getElementById('numtweets').className = 'greenArea';
				}else{
					document.getElementById('numtweets').innerHTML = '<br/>No tweets available...<br/><br/>';
					document.getElementById('numtweets').className = 'redArea';
				}
				toggleLoadButton(document.getElementById('tablename'));
				
		}, function(err){
		console.error(err);
	});
}


function toggleLoadButton(contentnode){
	var button = document.getElementById('loadbutton');
	var numtweets = document.getElementById('numtweets');
	if (contentnode.value.length > 0 && numtweets.className == 'greenArea'){
		button.disabled = false;
	}else{
		button.disabled = true;
	}
}


function loadTweets(){
	// TODO
	document.getElementById('progress').innerHTML = '<br/>Not yet implemented...<br/><br/>';
	document.getElementById('progress').className = 'greenArea';
}


function updateDatabaseInfo(){
	xhrGet(REST_DBENV, function(dbinfo){

				console.log(dbinfo);
				document.getElementById('envDbServiceName').innerHTML = dbinfo.name;
				document.getElementById('envDbName').innerHTML = dbinfo.db;
				document.getElementById('envDbHost').innerHTML = dbinfo.host;
				document.getElementById('envDbPort').innerHTML = dbinfo.port;

	}, function(err){
		console.error(err);
	});
}


function updateTwitterInfo(){
	xhrGet(REST_TWITTERENV, function(twitterinfo){

				console.log(twitterinfo);
				document.getElementById('envTwitterServiceName').innerHTML = twitterinfo.name;
				document.getElementById('envTwitterHost').innerHTML = twitterinfo.host;
				document.getElementById('envTwitterPort').innerHTML = twitterinfo.port;

	}, function(err){
		console.error(err);
	});
}


function refreshTableList(){
	xhrGet(REST_TABLELIST, function(tablelist){

				console.log(tablelist);
				var tidx = 0;
				var tmax = tablelist.count;
				var content = '<p></p><select name="Tables"  size="4">\n';
				// copy table names up to the length of the HTML table
				while (tidx<tmax){
					content += '<option values="' + tablelist.body[tidx].name + '">' + tablelist.body[tidx].name + '</option>\n';
					tidx++;
				}
				content += '</select>';
				document.getElementById('tablelist').innerHTML = content;
				
	}, function(err){
		console.error(err);
	});
}


updateDatabaseInfo();
updateTwitterInfo();
refreshTableList();

