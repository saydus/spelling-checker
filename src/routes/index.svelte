<script>
	import { fade } from "svelte/transition";

	let input = "";
	let incorrectWords = [];

	let getLettersOnly = (word) => {
		// Replace all non-numeric
		return word.replace(/[^a-zA-Z_]/g, "").toLowerCase();
	};

	let splitWords = (words) => {
		// Use regular expression to split by comma or whitespace
		return words.split(/[. ,:]+/);
	};

	let formatWords = (str) => {
		return splitWords(str).map(getLettersOnly).filter(Boolean);
	};

	$: formatted_words = formatWords(input);
	$: words_json = { words: formatted_words };

	let displayCorrect = false;
	let displayIncorrect = false;

	let checkWords = () => {
		// async request
		fetch("/check", {
			method: "POST",
			headers: {
				Accept: "application/json, text/plain, */*",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(words_json),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.allCorrect) {
					// show all words correct
					displayCorrect = true;
					displayIncorrect = false;
				} else {
					displayCorrect = false;
					displayIncorrect = true;

					// show incorrect words
					incorrectWords = data.words;
				}
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};
</script>

<style>
	.btn.btn-link {
		color: #007bff;
	}

	.btn.btn-link:hover {
		background: #f8f8f8;
	}

	.btn.btn-link:active {
		background: #f8f8f8;
	}
	.btn.btn-link:focus {
		background: #f8f8f8;
		border: none;
		box-shadow: none;
	}
</style>

<div class="container">
	<header class="navbar">
		<ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
			<a
				href="/add"
				class="btn btn-bd-download d-none d-lg-inline-block add-item">
				Add Words
			</a>
		</ul>
	</header>

	<h1 class="text-center heading">Spelling Checker</h1>
	<!-- If all words are right: -->

	{#if displayCorrect}
		<div
			transition:fade
			class="alert alert-success words-status"
			role="alert">
			All words are correct!
		</div>
	{/if}

	{#if displayIncorrect}
		<div transition:fade class="alert alert-danger" role="alert">
			<h5>These words are not in the library:</h5>
			{incorrectWords.map((word) => ' ' + word)}
			<br />
			<form action="/addfast" method="POST">
				<input type="hidden" name="words" value={incorrectWords} />
				<input
					type="submit"
					class="btn btn-outline-primary submit-btn"
					value="Add these words immediately" />
			</form>
		</div>
	{/if}

	<div class="input-group">
		<div class="input-group-prepend"><span /></div>
		<textarea
			class="form-control"
			bind:value={input}
			aria-label="With textarea"
			placeholder="Enter your text here." />
	</div>
	<div class="button-container text-center">
		<button
			type="button"
			class="btn btn-outline-primary text-center check-button"
			on:click={checkWords}>Check</button>
	</div>

	<!-- Show only if words are entered -->
	<div id="accordion">
		<div class="card">
			<div class="card-header" id="headingOne">
				<h5 class="mb-0">
					<span
						class="btn btn-link"
						data-toggle="collapse"
						data-target="#collapseOne"
						aria-expanded="true"
						aria-controls="collapseOne">Words entered:</span>
				</h5>
			</div>

			<div
				id="collapseOne"
				class="collapse show"
				aria-labelledby="headingOne"
				data-parent="#accordion">
				<div class="card-body">
					{#if input.length != 0}
						{formatted_words.map((word) => ' ' + word)}
					{:else}No words entered yet!{/if}
				</div>
			</div>
		</div>
	</div>
</div>
