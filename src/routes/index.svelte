
<script>
let input = '';

let getLettersOnly = (word) => {
	// Replace all non-numeric 
	return word.replace(/[^a-zA-Z_]/g, '').toLowerCase();
}

let splitWords = (words) => {
	// Use regular expression to split by comma or whitespace
	return words.split(/[. ,:]+/)
	// return words.split(/(?:,| )+/);  found this on the web 
}

let formatWords = (str) => {
	return splitWords(str).map(getLettersOnly).filter(Boolean);
}
$: formatted_words = formatWords(input).map((word) => ' ' + word);

$: words_json = {"words" : formatted_words};

let checkWords = () => {
    // async request 
    fetch('/check', {
		method: 'POST', // *GET, POST, PUT, DELETE, etc. 
		headers: {
		'Content-Type': 'application/json',
		// 'Content-Type': 'text/plain' 
		}, 
		// body: JSON.stringify(input) // body data type must match "Content-Type" header
		body: JSON.stringify(words_json),
		// body: formatted_words
	})
	.then(response => response.json())
	.then(data => {
		console.log('Success:', data);
	})
	.catch((error) => {
		console.error('Error:', error);
	});
}
 


</script>


<style>

a.btn.btn-link{
	color: #007bff;
}

a.btn.btn-link:hover{
	background: #f8f8f8;

}

a.btn.btn-link:active{
	background: #f8f8f8; 
}
a.btn.btn-link:focus{
	background: #f8f8f8;
	border: none;
	box-shadow: none;
}



 
</style>

<div class="container">
                
	<header class="navbar">
		<ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex"> 

		<a href="/add" class="btn btn-bd-download d-none d-lg-inline-block add-item">
			Add Words 
		</a>
		</ul>
	</header>


	<h1 class="text-center heading">Spelling Checker</h1>
	<!-- If all words are right: -->


	<div class="alert alert-success words-status" role="alert">
		All words are correct!
	</div>
		
	<div class="alert alert-danger" role="alert">
		<h5>These words are not in the library:</h5>
		{input}
		<br> 
		<form action="/add">
		<input type="hidden" value="Salam, papalam, xuy, pizda" >
		<input type="submit" class="btn btn-outline-primary submit-btn" value="Add these words">
		</form> 
	</div>

	<div class="input-group">
		<div class="input-group-prepend">
		  <span></span>
		</div>
		<textarea class="form-control" bind:value={input} aria-label="With textarea" placeholder="Enter your text here."></textarea>
	</div> 
	<div class="button-container text-center">
		<button type="button" class="btn btn-outline-primary text-center check-button" on:click={checkWords}>Check</button>
	</div>


	<!-- Show only if words are entered --> 
	<div id="accordion">
		<div class="card">
			<div class="card-header" id="headingOne">
			<h5 class="mb-0">
				<a class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Words entered:</a>
			</h5>
			</div>

			<div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
			<div class="card-body">
				{#if input.length != 0}
				{formatted_words}
				{:else}
				No words entered yet!
				{/if}
			</div>
			</div>
		</div>
	</div> 
	



</div> 