/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 389:
/***/ ((module) => {

	module.exports = eval("require")("@actions/core");


	/***/ }),
	
	/***/ 977:
	/***/ ((module) => {
	
	module.exports = eval("require")("@actions/github");
	
	
	/***/ }),
	
	/***/ 441:
	/***/ ((module) => {
	
	module.exports = eval("require")("node-fetch");
	
	
	/***/ })
	
	/******/ 	});
	/************************************************************************/
	/******/ 	// The module cache
	/******/ 	var __webpack_module_cache__ = {};
	/******/ 	
	/******/ 	// The require function
	/******/ 	function __nccwpck_require__(moduleId) {
	/******/ 		// Check if module is in cache
	/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
	/******/ 		if (cachedModule !== undefined) {
	/******/ 			return cachedModule.exports;
	/******/ 		}
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = __webpack_module_cache__[moduleId] = {
	/******/ 			// no module.id needed
	/******/ 			// no module.loaded needed
	/******/ 			exports: {}
	/******/ 		};
	/******/ 	
	/******/ 		// Execute the module function
	/******/ 		var threw = true;
	/******/ 		try {
	/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
	/******/ 			threw = false;
	/******/ 		} finally {
	/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
	/******/ 		}
	/******/ 	
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/ 	
	/************************************************************************/
	/******/ 	/* webpack/runtime/compat */
	/******/ 	
	/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
	/******/ 	
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
	(() => {
	const fetch = __nccwpck_require__(441);
	const core = __nccwpck_require__(389);
	const github = __nccwpck_require__(977);
	
	async function run() {
	  const GITHUB_TOKEN = core.getInput('GITHUB_TOKEN');
	  const TENOR_TOKEN = core.getInput('TENOR_TOKEN');
	
	  const randomPos = Math.round(Math.random() * 1000);
	  const url = `https://api.tenor.com/v1/search?q=thank%20you&pos=${randomPos}&limit=1&media_filter=minimal&contentfilter=high&key=${TENOR_TOKEN}`;
	  const response = await fetch(url);
	  const { results } = await response.json();
	  const gifUrl = results[0].media[0].tinygif.url;
	
	  const octokit = github.getOctokit(GITHUB_TOKEN);
	
	  const { context = {} } = github;
	  const { pull_request } = context.payload;
	
	  await octokit.issues.createComment({
		...context.repo,
		issue_number: pull_request.number,
		body: `Thank you for submitting a pull request! We will try to review this as soon as we can.\n\n<img src="${gifUrl}" alt="thank you" />`
	  });
	}
	
	run();
	})();
	
	module.exports = __webpack_exports__;
	/******/ })()
	;