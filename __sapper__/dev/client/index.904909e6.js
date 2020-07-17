import { S as SvelteComponentDev, i as init, d as dispatch_dev, s as safe_not_equal, v as validate_slots, g as globals, e as element, t as text, a as space, c as claim_element, b as children, f as claim_text, h as detach_dev, j as claim_space, k as attr_dev, l as add_location, m as insert_dev, n as append_dev, o as set_input_value, p as listen_dev, q as set_data_dev, r as noop, u as run_all } from './client.a1fadddc.js';

/* src/routes/index.svelte generated by Svelte v3.23.2 */

const { console: console_1 } = globals;
const file = "src/routes/index.svelte";

// (135:4) {:else}
function create_else_block(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("No words entered yet!");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "No words entered yet!");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(135:4) {:else}",
		ctx
	});

	return block;
}

// (133:4) {#if input.length != 0}
function create_if_block(ctx) {
	let t_value = /*formatted_words*/ ctx[2].map(func) + "";
	let t;

	const block = {
		c: function create() {
			t = text(t_value);
		},
		l: function claim(nodes) {
			t = claim_text(nodes, t_value);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*formatted_words*/ 4 && t_value !== (t_value = /*formatted_words*/ ctx[2].map(func) + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(133:4) {#if input.length != 0}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div10;
	let header;
	let ul;
	let a;
	let t0;
	let t1;
	let h1;
	let t2;
	let t3;
	let div0;
	let t4;
	let t5;
	let div1;
	let h50;
	let t6;
	let t7;
	let t8;
	let t9;
	let br;
	let t10;
	let form;
	let input0;
	let t11;
	let input1;
	let t12;
	let div3;
	let div2;
	let span0;
	let t13;
	let textarea;
	let t14;
	let div4;
	let button;
	let t15;
	let t16;
	let div9;
	let div8;
	let div5;
	let h51;
	let span1;
	let t17;
	let t18;
	let div7;
	let div6;
	let mounted;
	let dispose;

	function select_block_type(ctx, dirty) {
		if (/*input*/ ctx[0].length != 0) return create_if_block;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block = current_block_type(ctx);

	const block = {
		c: function create() {
			div10 = element("div");
			header = element("header");
			ul = element("ul");
			a = element("a");
			t0 = text("Add Words");
			t1 = space();
			h1 = element("h1");
			t2 = text("Spelling Checker");
			t3 = space();
			div0 = element("div");
			t4 = text("All words are correct!");
			t5 = space();
			div1 = element("div");
			h50 = element("h5");
			t6 = text("These words are not in the library:");
			t7 = space();
			t8 = text(/*incorrectWords*/ ctx[1]);
			t9 = space();
			br = element("br");
			t10 = space();
			form = element("form");
			input0 = element("input");
			t11 = space();
			input1 = element("input");
			t12 = space();
			div3 = element("div");
			div2 = element("div");
			span0 = element("span");
			t13 = space();
			textarea = element("textarea");
			t14 = space();
			div4 = element("div");
			button = element("button");
			t15 = text("Check");
			t16 = space();
			div9 = element("div");
			div8 = element("div");
			div5 = element("div");
			h51 = element("h5");
			span1 = element("span");
			t17 = text("Words entered:");
			t18 = space();
			div7 = element("div");
			div6 = element("div");
			if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div10 = claim_element(nodes, "DIV", { class: true });
			var div10_nodes = children(div10);
			header = claim_element(div10_nodes, "HEADER", { class: true });
			var header_nodes = children(header);
			ul = claim_element(header_nodes, "UL", { class: true });
			var ul_nodes = children(ul);
			a = claim_element(ul_nodes, "A", { href: true, class: true });
			var a_nodes = children(a);
			t0 = claim_text(a_nodes, "Add Words");
			a_nodes.forEach(detach_dev);
			ul_nodes.forEach(detach_dev);
			header_nodes.forEach(detach_dev);
			t1 = claim_space(div10_nodes);
			h1 = claim_element(div10_nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t2 = claim_text(h1_nodes, "Spelling Checker");
			h1_nodes.forEach(detach_dev);
			t3 = claim_space(div10_nodes);
			div0 = claim_element(div10_nodes, "DIV", { class: true, role: true });
			var div0_nodes = children(div0);
			t4 = claim_text(div0_nodes, "All words are correct!");
			div0_nodes.forEach(detach_dev);
			t5 = claim_space(div10_nodes);
			div1 = claim_element(div10_nodes, "DIV", { class: true, role: true });
			var div1_nodes = children(div1);
			h50 = claim_element(div1_nodes, "H5", {});
			var h50_nodes = children(h50);
			t6 = claim_text(h50_nodes, "These words are not in the library:");
			h50_nodes.forEach(detach_dev);
			t7 = claim_space(div1_nodes);
			t8 = claim_text(div1_nodes, /*incorrectWords*/ ctx[1]);
			t9 = claim_space(div1_nodes);
			br = claim_element(div1_nodes, "BR", {});
			t10 = claim_space(div1_nodes);
			form = claim_element(div1_nodes, "FORM", { action: true });
			var form_nodes = children(form);
			input0 = claim_element(form_nodes, "INPUT", { type: true, value: true });
			t11 = claim_space(form_nodes);
			input1 = claim_element(form_nodes, "INPUT", { type: true, class: true, value: true });
			form_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t12 = claim_space(div10_nodes);
			div3 = claim_element(div10_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			span0 = claim_element(div2_nodes, "SPAN", {});
			children(span0).forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			t13 = claim_space(div3_nodes);

			textarea = claim_element(div3_nodes, "TEXTAREA", {
				class: true,
				"aria-label": true,
				placeholder: true
			});

			children(textarea).forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			t14 = claim_space(div10_nodes);
			div4 = claim_element(div10_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			button = claim_element(div4_nodes, "BUTTON", { type: true, class: true });
			var button_nodes = children(button);
			t15 = claim_text(button_nodes, "Check");
			button_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t16 = claim_space(div10_nodes);
			div9 = claim_element(div10_nodes, "DIV", { id: true });
			var div9_nodes = children(div9);
			div8 = claim_element(div9_nodes, "DIV", { class: true });
			var div8_nodes = children(div8);
			div5 = claim_element(div8_nodes, "DIV", { class: true, id: true });
			var div5_nodes = children(div5);
			h51 = claim_element(div5_nodes, "H5", { class: true });
			var h51_nodes = children(h51);

			span1 = claim_element(h51_nodes, "SPAN", {
				class: true,
				"data-toggle": true,
				"data-target": true,
				"aria-expanded": true,
				"aria-controls": true
			});

			var span1_nodes = children(span1);
			t17 = claim_text(span1_nodes, "Words entered:");
			span1_nodes.forEach(detach_dev);
			h51_nodes.forEach(detach_dev);
			div5_nodes.forEach(detach_dev);
			t18 = claim_space(div8_nodes);

			div7 = claim_element(div8_nodes, "DIV", {
				id: true,
				class: true,
				"aria-labelledby": true,
				"data-parent": true
			});

			var div7_nodes = children(div7);
			div6 = claim_element(div7_nodes, "DIV", { class: true });
			var div6_nodes = children(div6);
			if_block.l(div6_nodes);
			div6_nodes.forEach(detach_dev);
			div7_nodes.forEach(detach_dev);
			div8_nodes.forEach(detach_dev);
			div9_nodes.forEach(detach_dev);
			div10_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a, "href", "/add");
			attr_dev(a, "class", "btn btn-bd-download d-none d-lg-inline-block add-item");
			add_location(a, file, 85, 2, 1391);
			attr_dev(ul, "class", "navbar-nav flex-row ml-md-auto d-none d-md-flex");
			add_location(ul, file, 83, 2, 1326);
			attr_dev(header, "class", "navbar");
			add_location(header, file, 82, 1, 1300);
			attr_dev(h1, "class", "text-center heading");
			add_location(h1, file, 92, 1, 1512);
			attr_dev(div0, "class", "alert alert-success words-status");
			attr_dev(div0, "role", "alert");
			add_location(div0, file, 96, 1, 1603);
			add_location(h50, file, 101, 2, 1748);
			add_location(br, file, 103, 2, 1814);
			attr_dev(input0, "type", "hidden");
			input0.value = "Salam, papalam, xuy, pizda";
			add_location(input0, file, 105, 2, 1845);
			attr_dev(input1, "type", "submit");
			attr_dev(input1, "class", "btn btn-outline-primary submit-btn");
			input1.value = "Add these words";
			add_location(input1, file, 106, 2, 1905);
			attr_dev(form, "action", "/add");
			add_location(form, file, 104, 2, 1822);
			attr_dev(div1, "class", "alert alert-danger");
			attr_dev(div1, "role", "alert");
			add_location(div1, file, 100, 1, 1700);
			add_location(span0, file, 112, 4, 2081);
			attr_dev(div2, "class", "input-group-prepend");
			add_location(div2, file, 111, 2, 2043);
			attr_dev(textarea, "class", "form-control");
			attr_dev(textarea, "aria-label", "With textarea");
			attr_dev(textarea, "placeholder", "Enter your text here.");
			add_location(textarea, file, 114, 2, 2106);
			attr_dev(div3, "class", "input-group");
			add_location(div3, file, 110, 1, 2015);
			attr_dev(button, "type", "button");
			attr_dev(button, "class", "btn btn-outline-primary text-center check-button");
			add_location(button, file, 117, 2, 2286);
			attr_dev(div4, "class", "button-container text-center");
			add_location(div4, file, 116, 1, 2241);
			attr_dev(span1, "class", "btn btn-link svelte-dap1bh");
			attr_dev(span1, "data-toggle", "collapse");
			attr_dev(span1, "data-target", "#collapseOne");
			attr_dev(span1, "aria-expanded", "true");
			attr_dev(span1, "aria-controls", "collapseOne");
			add_location(span1, file, 126, 4, 2567);
			attr_dev(h51, "class", "mb-0");
			add_location(h51, file, 125, 3, 2545);
			attr_dev(div5, "class", "card-header");
			attr_dev(div5, "id", "headingOne");
			add_location(div5, file, 124, 3, 2500);
			attr_dev(div6, "class", "card-body");
			add_location(div6, file, 131, 3, 2840);
			attr_dev(div7, "id", "collapseOne");
			attr_dev(div7, "class", "collapse show");
			attr_dev(div7, "aria-labelledby", "headingOne");
			attr_dev(div7, "data-parent", "#accordion");
			add_location(div7, file, 130, 3, 2738);
			attr_dev(div8, "class", "card");
			add_location(div8, file, 123, 2, 2478);
			attr_dev(div9, "id", "accordion");
			add_location(div9, file, 122, 1, 2455);
			attr_dev(div10, "class", "container");
			add_location(div10, file, 80, 0, 1258);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div10, anchor);
			append_dev(div10, header);
			append_dev(header, ul);
			append_dev(ul, a);
			append_dev(a, t0);
			append_dev(div10, t1);
			append_dev(div10, h1);
			append_dev(h1, t2);
			append_dev(div10, t3);
			append_dev(div10, div0);
			append_dev(div0, t4);
			append_dev(div10, t5);
			append_dev(div10, div1);
			append_dev(div1, h50);
			append_dev(h50, t6);
			append_dev(div1, t7);
			append_dev(div1, t8);
			append_dev(div1, t9);
			append_dev(div1, br);
			append_dev(div1, t10);
			append_dev(div1, form);
			append_dev(form, input0);
			append_dev(form, t11);
			append_dev(form, input1);
			append_dev(div10, t12);
			append_dev(div10, div3);
			append_dev(div3, div2);
			append_dev(div2, span0);
			append_dev(div3, t13);
			append_dev(div3, textarea);
			set_input_value(textarea, /*input*/ ctx[0]);
			append_dev(div10, t14);
			append_dev(div10, div4);
			append_dev(div4, button);
			append_dev(button, t15);
			append_dev(div10, t16);
			append_dev(div10, div9);
			append_dev(div9, div8);
			append_dev(div8, div5);
			append_dev(div5, h51);
			append_dev(h51, span1);
			append_dev(span1, t17);
			append_dev(div8, t18);
			append_dev(div8, div7);
			append_dev(div7, div6);
			if_block.m(div6, null);

			if (!mounted) {
				dispose = [
					listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[4]),
					listen_dev(button, "click", /*checkWords*/ ctx[3], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*incorrectWords*/ 2) set_data_dev(t8, /*incorrectWords*/ ctx[1]);

			if (dirty & /*input*/ 1) {
				set_input_value(textarea, /*input*/ ctx[0]);
			}

			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(div6, null);
				}
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div10);
			if_block.d();
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const func = word => " " + word;

function instance($$self, $$props, $$invalidate) {
	let input = "";

	let getLettersOnly = word => {
		// Replace all non-numeric 
		return word.replace(/[^a-zA-Z_]/g, "").toLowerCase();
	};

	let splitWords = words => {
		// Use regular expression to split by comma or whitespace
		return words.split(/[. ,:]+/);
	}; // return words.split(/(?:,| )+/);  found this on the web 

	let formatWords = str => {
		return splitWords(str).map(getLettersOnly).filter(Boolean);
	};

	let checkWords = () => {
		// async request 
		fetch("/check", {
			method: "POST",
			headers: {
				"Accept": "application/json, text/plain, */*",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(words_json)
		}).then(response => response.json()).then(data => {
			console.log(data);

			if (data.allCorrect) ; // show all words correct
			// show incorrect words
		}).catch(error => {
			console.error("Error:", error);
		});
	};

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	let { $$slots = {}, $$scope } = $$props;
	validate_slots("Routes", $$slots, []);

	function textarea_input_handler() {
		input = this.value;
		$$invalidate(0, input);
	}

	$$self.$capture_state = () => ({
		input,
		getLettersOnly,
		splitWords,
		formatWords,
		checkWords,
		incorrectWords,
		formatted_words,
		words_json
	});

	$$self.$inject_state = $$props => {
		if ("input" in $$props) $$invalidate(0, input = $$props.input);
		if ("getLettersOnly" in $$props) getLettersOnly = $$props.getLettersOnly;
		if ("splitWords" in $$props) splitWords = $$props.splitWords;
		if ("formatWords" in $$props) $$invalidate(8, formatWords = $$props.formatWords);
		if ("checkWords" in $$props) $$invalidate(3, checkWords = $$props.checkWords);
		if ("incorrectWords" in $$props) $$invalidate(1, incorrectWords = $$props.incorrectWords);
		if ("formatted_words" in $$props) $$invalidate(2, formatted_words = $$props.formatted_words);
		if ("words_json" in $$props) words_json = $$props.words_json;
	};

	let incorrectWords;
	let formatted_words;
	let words_json;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*input*/ 1) {
			 $$invalidate(2, formatted_words = formatWords(input));
		}

		if ($$self.$$.dirty & /*formatted_words*/ 4) {
			 words_json = { "words": formatted_words };
		}
	};

	 $$invalidate(1, incorrectWords = "");
	return [input, incorrectWords, formatted_words, checkWords, textarea_input_handler];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguOTA0OTA5ZTYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvaW5kZXguc3ZlbHRlIl0sInNvdXJjZXNDb250ZW50IjpbIlxuPHNjcmlwdD5cbmxldCBpbnB1dCA9ICcnO1xuJDogaW5jb3JyZWN0V29yZHMgPSAnJztcblxubGV0IGdldExldHRlcnNPbmx5ID0gKHdvcmQpID0+IHtcblx0Ly8gUmVwbGFjZSBhbGwgbm9uLW51bWVyaWMgXG5cdHJldHVybiB3b3JkLnJlcGxhY2UoL1teYS16QS1aX10vZywgJycpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmxldCBzcGxpdFdvcmRzID0gKHdvcmRzKSA9PiB7XG5cdC8vIFVzZSByZWd1bGFyIGV4cHJlc3Npb24gdG8gc3BsaXQgYnkgY29tbWEgb3Igd2hpdGVzcGFjZVxuXHRyZXR1cm4gd29yZHMuc3BsaXQoL1suICw6XSsvKVxuXHQvLyByZXR1cm4gd29yZHMuc3BsaXQoLyg/Oix8ICkrLyk7ICBmb3VuZCB0aGlzIG9uIHRoZSB3ZWIgXG59XG5cblxubGV0IGZvcm1hdFdvcmRzID0gKHN0cikgPT4ge1xuXHRyZXR1cm4gc3BsaXRXb3JkcyhzdHIpLm1hcChnZXRMZXR0ZXJzT25seSkuZmlsdGVyKEJvb2xlYW4pO1xufVxuJDogZm9ybWF0dGVkX3dvcmRzID0gZm9ybWF0V29yZHMoaW5wdXQpO1xuXG4kOiB3b3Jkc19qc29uID0ge1wid29yZHNcIiA6IGZvcm1hdHRlZF93b3Jkc307XG5cbmxldCBjaGVja1dvcmRzID0gKCkgPT4ge1xuICAgIC8vIGFzeW5jIHJlcXVlc3QgXG4gICAgZmV0Y2goJy9jaGVjaycsIHtcblx0XHRtZXRob2Q6ICdQT1NUJywgIFxuXHRcdGhlYWRlcnM6IHtcblx0XHQnQWNjZXB0JyA6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonLCBcblx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuIFx0XHR9LCAgXG5cdFx0Ym9keTogSlNPTi5zdHJpbmdpZnkod29yZHNfanNvbilcblx0fSlcblx0LnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuXHQudGhlbihkYXRhID0+IHtcblx0XHRjb25zb2xlLmxvZyhkYXRhKTtcblx0XHRpZiAoZGF0YS5hbGxDb3JyZWN0KXtcblx0XHRcdC8vIHNob3cgYWxsIHdvcmRzIGNvcnJlY3Rcblx0XHR9XG5cdFx0ZWxzZXtcblx0XHRcdC8vIHNob3cgaW5jb3JyZWN0IHdvcmRzXG5cblx0XHR9XG5cblx0fSlcblx0LmNhdGNoKChlcnJvcikgPT4ge1xuXHRcdGNvbnNvbGUuZXJyb3IoJ0Vycm9yOicsIGVycm9yKTtcblx0fSk7XG59XG4gXG5cblxuPC9zY3JpcHQ+XG5cblxuPHN0eWxlPlxuXG4uYnRuLmJ0bi1saW5re1xuXHRjb2xvcjogIzAwN2JmZjtcbn1cblxuLmJ0bi5idG4tbGluazpob3Zlcntcblx0YmFja2dyb3VuZDogI2Y4ZjhmODtcbn1cblxuLmJ0bi5idG4tbGluazphY3RpdmV7XG5cdGJhY2tncm91bmQ6ICNmOGY4Zjg7IFxufVxuLmJ0bi5idG4tbGluazpmb2N1c3tcblx0YmFja2dyb3VuZDogI2Y4ZjhmODtcblx0Ym9yZGVyOiBub25lO1xuXHRib3gtc2hhZG93OiBub25lO1xufVxuXG5cblxuIFxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIFxuXHQ8aGVhZGVyIGNsYXNzPVwibmF2YmFyXCI+XG5cdFx0PHVsIGNsYXNzPVwibmF2YmFyLW5hdiBmbGV4LXJvdyBtbC1tZC1hdXRvIGQtbm9uZSBkLW1kLWZsZXhcIj4gXG5cblx0XHQ8YSBocmVmPVwiL2FkZFwiIGNsYXNzPVwiYnRuIGJ0bi1iZC1kb3dubG9hZCBkLW5vbmUgZC1sZy1pbmxpbmUtYmxvY2sgYWRkLWl0ZW1cIj5cblx0XHRcdEFkZCBXb3JkcyBcblx0XHQ8L2E+XG5cdFx0PC91bD5cblx0PC9oZWFkZXI+XG5cblxuXHQ8aDEgY2xhc3M9XCJ0ZXh0LWNlbnRlciBoZWFkaW5nXCI+U3BlbGxpbmcgQ2hlY2tlcjwvaDE+XG5cdDwhLS0gSWYgYWxsIHdvcmRzIGFyZSByaWdodDogLS0+XG5cblxuXHQ8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtc3VjY2VzcyB3b3Jkcy1zdGF0dXNcIiByb2xlPVwiYWxlcnRcIj5cblx0XHRBbGwgd29yZHMgYXJlIGNvcnJlY3QhXG5cdDwvZGl2PlxuXHRcdFxuXHQ8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIgcm9sZT1cImFsZXJ0XCI+XG5cdFx0PGg1PlRoZXNlIHdvcmRzIGFyZSBub3QgaW4gdGhlIGxpYnJhcnk6PC9oNT5cblx0XHR7aW5jb3JyZWN0V29yZHN9XG5cdFx0PGJyPiBcblx0XHQ8Zm9ybSBhY3Rpb249XCIvYWRkXCI+XG5cdFx0PGlucHV0IHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIlNhbGFtLCBwYXBhbGFtLCB4dXksIHBpemRhXCIgPlxuXHRcdDxpbnB1dCB0eXBlPVwic3VibWl0XCIgY2xhc3M9XCJidG4gYnRuLW91dGxpbmUtcHJpbWFyeSBzdWJtaXQtYnRuXCIgdmFsdWU9XCJBZGQgdGhlc2Ugd29yZHNcIj5cblx0XHQ8L2Zvcm0+IFxuXHQ8L2Rpdj5cblxuXHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cblx0XHQ8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXAtcHJlcGVuZFwiPlxuXHRcdCAgPHNwYW4+PC9zcGFuPlxuXHRcdDwvZGl2PlxuXHRcdDx0ZXh0YXJlYSBjbGFzcz1cImZvcm0tY29udHJvbFwiIGJpbmQ6dmFsdWU9e2lucHV0fSBhcmlhLWxhYmVsPVwiV2l0aCB0ZXh0YXJlYVwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgeW91ciB0ZXh0IGhlcmUuXCI+PC90ZXh0YXJlYT5cblx0PC9kaXY+IFxuXHQ8ZGl2IGNsYXNzPVwiYnV0dG9uLWNvbnRhaW5lciB0ZXh0LWNlbnRlclwiPlxuXHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGJ0bi1vdXRsaW5lLXByaW1hcnkgdGV4dC1jZW50ZXIgY2hlY2stYnV0dG9uXCIgb246Y2xpY2s9e2NoZWNrV29yZHN9PkNoZWNrPC9idXR0b24+XG5cdDwvZGl2PlxuXG5cblx0PCEtLSBTaG93IG9ubHkgaWYgd29yZHMgYXJlIGVudGVyZWQgLS0+IFxuXHQ8ZGl2IGlkPVwiYWNjb3JkaW9uXCI+XG5cdFx0PGRpdiBjbGFzcz1cImNhcmRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiIGlkPVwiaGVhZGluZ09uZVwiPlxuXHRcdFx0PGg1IGNsYXNzPVwibWItMFwiPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJ0biBidG4tbGlua1wiIGRhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIiBkYXRhLXRhcmdldD1cIiNjb2xsYXBzZU9uZVwiIGFyaWEtZXhwYW5kZWQ9XCJ0cnVlXCIgYXJpYS1jb250cm9scz1cImNvbGxhcHNlT25lXCI+V29yZHMgZW50ZXJlZDo8L3NwYW4+XG5cdFx0XHQ8L2g1PlxuXHRcdFx0PC9kaXY+XG5cblx0XHRcdDxkaXYgaWQ9XCJjb2xsYXBzZU9uZVwiIGNsYXNzPVwiY29sbGFwc2Ugc2hvd1wiIGFyaWEtbGFiZWxsZWRieT1cImhlYWRpbmdPbmVcIiBkYXRhLXBhcmVudD1cIiNhY2NvcmRpb25cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cblx0XHRcdFx0eyNpZiBpbnB1dC5sZW5ndGggIT0gMH1cblx0XHRcdFx0e2Zvcm1hdHRlZF93b3Jkcy5tYXAoKHdvcmQpID0+IFwiIFwiICsgd29yZCl9XG5cdFx0XHRcdHs6ZWxzZX1cblx0XHRcdFx0Tm8gd29yZHMgZW50ZXJlZCB5ZXQhXG5cdFx0XHRcdHsvaWZ9XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj4gXG5cdFxuXG5cblxuPC9kaXY+ICJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQXFJSyxHQUFlLElBQUMsR0FBRzs7Ozs7Ozs7Ozs7Ozs7bUZBQW5CLEdBQWUsSUFBQyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQURmLEdBQUssSUFBQyxNQUFNLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0E5QnZCLEdBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tEQUFkLEdBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1Q0FZNEIsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBR3lDLEdBQVU7Ozs7Ozs7eUVBZmxHLEdBQWM7Ozt3Q0FZNEIsR0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBbUJ4QixJQUFJLElBQUssR0FBRyxHQUFHLElBQUk7OztLQW5JekMsS0FBSyxHQUFHLEVBQUU7O0tBR1YsY0FBYyxHQUFJLElBQUk7O1NBRWxCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsRUFBRSxXQUFXOzs7S0FHL0MsVUFBVSxHQUFJLEtBQUs7O1NBRWYsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTOzs7S0FLekIsV0FBVyxHQUFJLEdBQUc7U0FDZCxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLE9BQU87OztLQU10RCxVQUFVOztFQUVWLEtBQUssQ0FBQyxRQUFRO0dBQ2hCLE1BQU0sRUFBRSxNQUFNO0dBQ2QsT0FBTztJQUNQLFFBQVEsRUFBRyxtQ0FBbUM7SUFDOUMsY0FBYyxFQUFFLGtCQUFrQjs7R0FFbEMsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVTtLQUUvQixJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQzlCLElBQUksQ0FBQyxJQUFJO0dBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJOztPQUNaLElBQUksQ0FBQyxVQUFVOztLQVNuQixLQUFLLENBQUUsS0FBSztHQUNaLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUs7Ozs7Ozs7Ozs7Ozs7O0VBbUVjLEtBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkE5Ri9DLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSzs7OztJQUVuQyxVQUFVLEtBQUksT0FBTyxFQUFHLGVBQWU7Ozs7a0JBbkJ2QyxjQUFjLEdBQUcsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=