
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.23.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/App.svelte generated by Svelte v3.23.1 */

    const file = "src/App.svelte";

    function create_fragment(ctx) {
    	let div10;
    	let header;
    	let ul;
    	let a0;
    	let t1;
    	let h1;
    	let t3;
    	let div0;
    	let t5;
    	let div2;
    	let div1;
    	let span;
    	let t6;
    	let textarea;
    	let t7;
    	let div3;
    	let button;
    	let t9;
    	let div4;
    	let h50;
    	let t11;
    	let t12;
    	let t13;
    	let br;
    	let t14;
    	let form;
    	let input0;
    	let t15;
    	let input1;
    	let t16;
    	let div9;
    	let div8;
    	let div5;
    	let h51;
    	let a1;
    	let t18;
    	let div7;
    	let div6;
    	let t19;
    	let t20_value = /*formatWords*/ ctx[1](/*input*/ ctx[0]) + "";
    	let t20;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div10 = element("div");
    			header = element("header");
    			ul = element("ul");
    			a0 = element("a");
    			a0.textContent = "Add Words";
    			t1 = space();
    			h1 = element("h1");
    			h1.textContent = "Spelling Checker";
    			t3 = space();
    			div0 = element("div");
    			div0.textContent = "All words are correct!";
    			t5 = space();
    			div2 = element("div");
    			div1 = element("div");
    			span = element("span");
    			t6 = space();
    			textarea = element("textarea");
    			t7 = space();
    			div3 = element("div");
    			button = element("button");
    			button.textContent = "Check";
    			t9 = space();
    			div4 = element("div");
    			h50 = element("h5");
    			h50.textContent = "These words are not in the library:";
    			t11 = space();
    			t12 = text(/*input*/ ctx[0]);
    			t13 = space();
    			br = element("br");
    			t14 = space();
    			form = element("form");
    			input0 = element("input");
    			t15 = space();
    			input1 = element("input");
    			t16 = space();
    			div9 = element("div");
    			div8 = element("div");
    			div5 = element("div");
    			h51 = element("h5");
    			a1 = element("a");
    			a1.textContent = "Words entered:";
    			t18 = space();
    			div7 = element("div");
    			div6 = element("div");
    			t19 = text("Following words are being checked: ");
    			t20 = text(t20_value);
    			attr_dev(a0, "href", "/");
    			attr_dev(a0, "class", "btn btn-bd-download d-none d-lg-inline-block add-item");
    			add_location(a0, file, 48, 2, 705);
    			attr_dev(ul, "class", "navbar-nav flex-row ml-md-auto d-none d-md-flex");
    			add_location(ul, file, 46, 2, 640);
    			attr_dev(header, "class", "navbar");
    			add_location(header, file, 45, 1, 614);
    			attr_dev(h1, "class", "text-center heading");
    			add_location(h1, file, 55, 1, 823);
    			attr_dev(div0, "class", "alert alert-success words-status");
    			attr_dev(div0, "role", "alert");
    			add_location(div0, file, 59, 1, 914);
    			add_location(span, file, 66, 4, 1076);
    			attr_dev(div1, "class", "input-group-prepend");
    			add_location(div1, file, 65, 2, 1038);
    			attr_dev(textarea, "class", "form-control");
    			attr_dev(textarea, "aria-label", "With textarea");
    			attr_dev(textarea, "placeholder", "Enter your text here.");
    			add_location(textarea, file, 68, 2, 1101);
    			attr_dev(div2, "class", "input-group");
    			add_location(div2, file, 64, 1, 1010);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "btn btn-outline-primary text-center check-button");
    			add_location(button, file, 71, 2, 1281);
    			attr_dev(div3, "class", "button-container text-center");
    			add_location(div3, file, 70, 1, 1236);
    			add_location(h50, file, 76, 2, 1434);
    			add_location(br, file, 78, 2, 1491);
    			attr_dev(input0, "type", "hidden");
    			input0.value = "Salam, papalam, xuy, pizda";
    			add_location(input0, file, 80, 2, 1522);
    			attr_dev(input1, "type", "submit");
    			attr_dev(input1, "class", "btn btn-outline-primary submit-btn");
    			input1.value = "Add these words";
    			add_location(input1, file, 81, 2, 1582);
    			attr_dev(form, "action", "/add");
    			add_location(form, file, 79, 2, 1499);
    			attr_dev(div4, "class", "alert alert-danger");
    			attr_dev(div4, "role", "alert");
    			add_location(div4, file, 75, 1, 1386);
    			attr_dev(a1, "class", "btn btn-link svelte-5f4xul");
    			attr_dev(a1, "data-toggle", "collapse");
    			attr_dev(a1, "data-target", "#collapseOne");
    			attr_dev(a1, "aria-expanded", "true");
    			attr_dev(a1, "aria-controls", "collapseOne");
    			add_location(a1, file, 90, 4, 1846);
    			attr_dev(h51, "class", "mb-0");
    			add_location(h51, file, 89, 3, 1824);
    			attr_dev(div5, "class", "card-header");
    			attr_dev(div5, "id", "headingOne");
    			add_location(div5, file, 88, 3, 1779);
    			attr_dev(div6, "class", "card-body");
    			add_location(div6, file, 95, 3, 2113);
    			attr_dev(div7, "id", "collapseOne");
    			attr_dev(div7, "class", "collapse show");
    			attr_dev(div7, "aria-labelledby", "headingOne");
    			attr_dev(div7, "data-parent", "#accordion");
    			add_location(div7, file, 94, 3, 2011);
    			attr_dev(div8, "class", "card");
    			add_location(div8, file, 87, 2, 1757);
    			attr_dev(div9, "id", "accordion");
    			add_location(div9, file, 86, 1, 1734);
    			attr_dev(div10, "class", "container");
    			add_location(div10, file, 43, 0, 572);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div10, anchor);
    			append_dev(div10, header);
    			append_dev(header, ul);
    			append_dev(ul, a0);
    			append_dev(div10, t1);
    			append_dev(div10, h1);
    			append_dev(div10, t3);
    			append_dev(div10, div0);
    			append_dev(div10, t5);
    			append_dev(div10, div2);
    			append_dev(div2, div1);
    			append_dev(div1, span);
    			append_dev(div2, t6);
    			append_dev(div2, textarea);
    			set_input_value(textarea, /*input*/ ctx[0]);
    			append_dev(div10, t7);
    			append_dev(div10, div3);
    			append_dev(div3, button);
    			append_dev(div10, t9);
    			append_dev(div10, div4);
    			append_dev(div4, h50);
    			append_dev(div4, t11);
    			append_dev(div4, t12);
    			append_dev(div4, t13);
    			append_dev(div4, br);
    			append_dev(div4, t14);
    			append_dev(div4, form);
    			append_dev(form, input0);
    			append_dev(form, t15);
    			append_dev(form, input1);
    			append_dev(div10, t16);
    			append_dev(div10, div9);
    			append_dev(div9, div8);
    			append_dev(div8, div5);
    			append_dev(div5, h51);
    			append_dev(h51, a1);
    			append_dev(div8, t18);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, t19);
    			append_dev(div6, t20);

    			if (!mounted) {
    				dispose = listen_dev(textarea, "input", /*textarea_input_handler*/ ctx[2]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*input*/ 1) {
    				set_input_value(textarea, /*input*/ ctx[0]);
    			}

    			if (dirty & /*input*/ 1) set_data_dev(t12, /*input*/ ctx[0]);
    			if (dirty & /*input*/ 1 && t20_value !== (t20_value = /*formatWords*/ ctx[1](/*input*/ ctx[0]) + "")) set_data_dev(t20, t20_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div10);
    			mounted = false;
    			dispose();
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

    function instance($$self, $$props, $$invalidate) {
    	let splitWords = words => {
    		// Use regular expression to split by comma or whitespace
    		return words.split(/(?:,| )+/);
    	};

    	let getLettersOnly = word => {
    		// Replace all non-numeric 
    		return word.replace(/\W/g, "");
    	};

    	let formatWords = str => {
    		return splitWords(str).map(getLettersOnly);
    	};

    	let input = "";
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;
    	validate_slots("App", $$slots, []);

    	function textarea_input_handler() {
    		input = this.value;
    		$$invalidate(0, input);
    	}

    	$$self.$capture_state = () => ({
    		splitWords,
    		getLettersOnly,
    		formatWords,
    		input
    	});

    	$$self.$inject_state = $$props => {
    		if ("splitWords" in $$props) splitWords = $$props.splitWords;
    		if ("getLettersOnly" in $$props) getLettersOnly = $$props.getLettersOnly;
    		if ("formatWords" in $$props) $$invalidate(1, formatWords = $$props.formatWords);
    		if ("input" in $$props) $$invalidate(0, input = $$props.input);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [input, formatWords, textarea_input_handler];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
