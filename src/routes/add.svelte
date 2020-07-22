<script>
import {slide, fade} from "svelte/transition";

let input = '';
let wordsSuccess = false;
let wordsFail = false;

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


let addWords = (words) => {
        // async request 
    fetch('/add', {
		method: 'POST',  
		headers: {
		'Accept' : 'application/json, text/plain, */*', 
		'Content-Type': 'application/json',
 		},  
		body: JSON.stringify(words_json)
	})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		if (data.success){
			wordsSuccess = true;
			wordsFail = false;
			// show all words correct
			console.log("Success in adding words")
		}
		else{
			wordsSuccess = false;
			wordsFail = true;
		}
	})
	.catch((error) => {
		console.error('Error:', error);
	});
}


$: formatted_words = formatWords(input);

$: words_json = {"words" : formatted_words};

 
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

        <a href="/" class="btn btn-bd-download d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3 add-item">
            Check Words
        </a>
        </ul>
    </header>


    <h1 class="text-center heading">Add to the dictionary</h1>
    <!-- If all words are right: -->

    {#if wordsSuccess}
    <div transition:fade class="alert alert-success words-status" role="alert">
        New words are now added!
    </div>
    {/if}

    {#if wordsFail}
        <div transition:fade class="alert alert-danger words-status" role="alert">
            Failed to add words! Try again.
        </div>
    {/if}

    <!-- <div class="alert alert-info" role="alert">
        <h5>These words are already in the dictionary:</h5>

        Salam, papalam, xuy, pizda 
    </div> -->
 
    
    <div class="input-group">
        <div class="input-group-prepend">
        <span></span>
        </div>
        <textarea class="form-control" bind:value={input} aria-label="With textarea" placeholder="Enter your words or text."></textarea>
    </div> 

    <div class="form-group">
    <label for="exampleFormControlFile1">File with words or text</label>
    <input type="file" class="form-control-file" id="exampleFormControlFile1">
    </div>

    <div class="button-container text-center">
        <input type="submit" class="btn btn-outline-primary text-center check-button" on:click={addWords} value="Add Words">
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
				{formatWords(input).map((word) => ' ' + word)}
				{:else}
				No words entered yet!
				{/if}

			</div>
			</div>
		</div>
	</div> 

    



</div>
    
 