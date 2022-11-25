/*
    *Register Class*
    Each page class has three functions:
    - constructor (optional): contains the page's data
    - load (optional): loads the page
    - render: renders the page,
    One variable:
    - urls: an array of urls that the page will be rendered on (you can add more than one urls)

    We can own functions and variables in the class, and use them in the other functions.
*/

export default class Register {
    constructor() {
        this.urls = ['/register'];
    }
    async onLoad() {
        document.getElementById('registerBtn').addEventListener('click',async ()=>{
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            await RegisterUser(username,password,confirmPassword);
        });
    }
    onRender() {
        return `
        <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
            <div class="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <div class="flex flex-col overflow-y-auto">
                    <div class="flex items-center justify-center p-6 sm:p-12">
                        <div class="w-full">
                            <h1 class="mb-4 text-4xl text-center font-semibold text-gray-700 dark:text-gray-200">
                                Register
                            </h1>
                            <label class="block text-sm">
                                <span class="text-gray-700 dark:text-gray-400">Username</span>
                                <input
                                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="someone" type="text" id="username" />
                            </label>
                            <label class="block mt-4 text-sm">
                                <span class="text-gray-700 dark:text-gray-400">Password</span>
                                <input
                                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="***************" type="password" id="password" />
                            </label>
                            <label class="block mt-4 text-sm">
                                <span class="text-gray-700 dark:text-gray-400">
                                    Confirm password
                                </span>
                                <input
                                    class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                    placeholder="***************" type="password" id="confirmPassword" />
                            </label>

                            <div class="flex mt-6 text-sm">
                                <label class="flex items-center dark:text-gray-400">
                                    <input type="checkbox"
                                        class="text-purple-600 form-checkbox focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray" />
                                    <span class="ml-2">
                                        I agree to the
                                        <span class="underline">privacy policy</span>
                                    </span>
                                </label>
                            </div>
                            <button
                                id="registerBtn" class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
                                Register
                            </button>

                            <p class="mt-4">
                                <button class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" 
                                onclick="ChangeUrl('/login')">
                                    Already have an account? Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}