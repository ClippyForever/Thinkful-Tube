
const  URL_UTUBE = 'https://www.googleapis.com/youtube/v3/search';
$(function ()
{
	//console.log('asd');
handleSubmit();

});

function handleSubmit()
{

	$('form').submit(function (event)
	{
	
		event.preventDefault();
	 const getQ = $(this).find('#submit');
	 const passQ = getQ.val();
	getQ.val('');
	getDataFromAPI(passQ, displayQ);
	handlePage(passQ, displayQ);
	});
}

function displayQ(data)
{
	console.log(data);
var a = data.items.map(function (item, index)
{
	return renderJ(item,index);
});
a += `<button id="prev" value="${data.prevPageToken}">Previous</button><button id="next" value="${data.nextPageToken}">Next</button>`;
$('.js-out').html(a);
}


function getDataFromAPI(term,callback,token)
{
	console.log(term);
	const setting = {
		url : URL_UTUBE,
		data : {
			part: 'snippet',
			key: 'AIzaSyChtjOYxzy6GYjXZDuOv9eMOsxMxNoEmEM',
			q : `${term} in:name`,
		
			per_page :5,
			pageToken: token,

		},
		dataType: 'json',
		type: 'GET',
		success: callback
	};
 $.ajax(setting);
}

function handlePage(passQ,displayQ)
{
$('body').on('click','button' , function(){
   getDataFromAPI(passQ,displayQ, $(this).attr('value'));
});
}

function renderJ(itemJ,index)
{
	return `<div><h3>${index}. ${itemJ.snippet.title}</h3>
	<a href="https://www.youtube.com/watch?v=${itemJ.id.videoId}"><img src="${itemJ.snippet.thumbnails.default.url}">
	</a></div>`
}