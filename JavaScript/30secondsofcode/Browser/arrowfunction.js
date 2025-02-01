const toggleElements = document.querySelectorAll('.toggle');
toggleElements.forEach(el => {
	el.addEventListner('click',function(){
		this.classList.toggle('active');
	});
})

