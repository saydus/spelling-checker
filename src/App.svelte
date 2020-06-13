
<script>

</script>

<div class="container">
                
	<header class="navbar">
		<ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex"> 

		<a href="/" class="btn btn-bd-download d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3 add-item">
			Add Words
		</a>
		</ul>
	</header>


	<h1 class="text-center heading">Spelling Checker</h1>
	<!-- If all words are right: -->


	<div class="alert alert-success words-status" role="alert">
		All words are correct!
	</div>


	<div class="input-group">
		<div class="input-group-prepend">
		  <span></span>
		</div>
		<textarea class="form-control" aria-label="With textarea" placeholder="Enter your text here."></textarea>
	</div> 
	<div class="button-container text-center">
		<button type="button" class="btn btn-outline-primary text-center check-button">Check</button>
	</div>


	<div class="alert alert-danger" role="alert">
		<h5>These words are not in the library:</h5>

		Salam, papalam, xuy, pizda
		<br> 
		<form action="/add">
		<input type="hidden" value="Salam, papalam, xuy, pizda" >
		<input type="submit" class="btn btn-outline-primary submit-btn" value="Add these words">
		</form> 
	</div>

</div>
 

 