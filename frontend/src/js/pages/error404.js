/*
    *Error 404 Class*
    Each page class has three functions:
    - constructor (optional): contains the page's data
    - load (optional): loads the page
    - render: renders the page,
    One variable:
    - urls: an array of urls that the page will be rendered on (you can add more than one urls)

    We can own functions and variables in the class, and use them in the other functions.
*/

export default class Error404 {
    constructor() {
    }
    onLoad() {
    }
    onRender() {
        return `
        <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div class="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div class="flex flex-col overflow-y-auto">
                    <div class="flex items-center justify-center p-6 sm:p-12">
                        <div class="w-full">
                            <h1 class="mb-4 text-center text-4xl font-semibold text-gray-700 dark:text-gray-200">
                                Error 404
                            </h1>
                            <p class="mb-4 text-center text-sm text-gray-800 dark:text-gray-200">
                                Page not found :(
                            </p>
                            <div class="flex gap-2 items-center justify-center">
                                <button class="w-1/2 px-4 py-2 mt-6 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                    onclick="ChangeUrl('/')">
                                    Go to home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}