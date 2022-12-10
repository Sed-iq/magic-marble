import React, { useEffect } from 'react';

import { GetUser } from '../../utils';

export default function Rules({ socketId, username, isAdmin, changeUrl }) {
    useEffect(() => {
        const asyncFunc = async () => {
            if (socketId) {
                const user = await GetUser(socketId);
                if (!user || user.isAdmin === true) {
                    changeUrl('/login');
                }
            }
        }
        asyncFunc();
    }, [socketId]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Game Rules
                </h2>
                <div className="px-4 py-3 mb-4 rounded-lg shadow-md bg-pink-500">
                    <p className="text-sm text-white">
                        Rules for game that how to play and how to win.
                    </p>
                </div>
                <div className="px-4 py-3 mb-8 rounded-lg shadow-md bg-gray-800">
                    <h4 className="mb-4 font-semibold text-gray-300">
                        Rules
                    </h4>
                    <div className='flex gap-2 mb-4 align-middle'>
                        <h1 className="my-auto text-2xl font-semibold text-gray-200">
                            1
                        </h1>
                        <div className="grid md:grid-cols-2 align-middle my-auto px-4 py-3 bg-gray-900 rounded-md text-gray-300 w-full">
                            <p className='my-auto'>Each player is dealt 10 marbles at start.</p>
                            <div className='mx-auto md:mx-0 my-auto w-20 grid grid-cols-5 gap-1'>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 mb-4 align-middle'>
                        <h1 className="my-auto text-2xl font-semibold text-gray-200">
                            2
                        </h1>
                        <div className="grid md:grid-cols-2 align-middle my-auto px-4 py-3 bg-gray-900 rounded-md text-gray-300 w-full">
                            <p className='my-auto'>There are only 2 players (i.e./ 'Hider' and 'Guesser'). Players change roles after each round.</p>
                            <div className='mx-auto md:mx-0 my-auto'>
                                <svg width="155" height="56" viewBox="0 0 155 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M102.653 36V21.4545H105.728V27.456H111.971V21.4545H115.039V36H111.971V29.9915H105.728V36H102.653ZM117.518 36V25.0909H120.544V36H117.518ZM119.038 23.6847C118.588 23.6847 118.202 23.5355 117.88 23.2372C117.563 22.9342 117.404 22.572 117.404 22.1506C117.404 21.7339 117.563 21.3764 117.88 21.0781C118.202 20.7751 118.588 20.6236 119.038 20.6236C119.488 20.6236 119.871 20.7751 120.188 21.0781C120.51 21.3764 120.671 21.7339 120.671 22.1506C120.671 22.572 120.51 22.9342 120.188 23.2372C119.871 23.5355 119.488 23.6847 119.038 23.6847ZM126.987 36.1776C126.158 36.1776 125.408 35.9645 124.736 35.5384C124.068 35.1075 123.538 34.4754 123.145 33.642C122.756 32.804 122.562 31.7765 122.562 30.5597C122.562 29.3097 122.764 28.2704 123.166 27.4418C123.568 26.6084 124.104 25.9858 124.771 25.5739C125.443 25.1572 126.18 24.9489 126.98 24.9489C127.591 24.9489 128.1 25.053 128.507 25.2614C128.919 25.465 129.25 25.7206 129.501 26.0284C129.757 26.3314 129.951 26.6297 130.084 26.9233H130.176V21.4545H133.194V36H130.211V34.2528H130.084C129.942 34.5559 129.74 34.8565 129.48 35.1548C129.224 35.4484 128.89 35.6922 128.479 35.8864C128.071 36.0805 127.574 36.1776 126.987 36.1776ZM127.946 33.7699C128.434 33.7699 128.845 33.6373 129.182 33.3722C129.523 33.1023 129.783 32.7259 129.963 32.2429C130.148 31.7599 130.24 31.1941 130.24 30.5455C130.24 29.8968 130.15 29.3333 129.97 28.8551C129.79 28.3769 129.53 28.0076 129.189 27.7472C128.848 27.4867 128.434 27.3565 127.946 27.3565C127.449 27.3565 127.03 27.4915 126.689 27.7614C126.348 28.0312 126.09 28.4053 125.915 28.8835C125.739 29.3617 125.652 29.9157 125.652 30.5455C125.652 31.1799 125.739 31.741 125.915 32.2287C126.095 32.7116 126.353 33.0904 126.689 33.3651C127.03 33.6349 127.449 33.7699 127.946 33.7699ZM140.654 36.2131C139.531 36.2131 138.566 35.9858 137.756 35.5312C136.951 35.072 136.331 34.4233 135.895 33.5852C135.459 32.7424 135.242 31.7457 135.242 30.5952C135.242 29.473 135.459 28.4882 135.895 27.6406C136.331 26.7931 136.944 26.1326 137.735 25.6591C138.53 25.1856 139.463 24.9489 140.533 24.9489C141.253 24.9489 141.923 25.0649 142.543 25.2969C143.168 25.5241 143.712 25.8674 144.176 26.3267C144.645 26.786 145.01 27.3636 145.27 28.0597C145.53 28.7509 145.661 29.5606 145.661 30.4886V31.3196H136.449V29.4446H142.813C142.813 29.009 142.718 28.6231 142.529 28.2869C142.339 27.9508 142.076 27.688 141.74 27.4986C141.409 27.3045 141.023 27.2074 140.583 27.2074C140.123 27.2074 139.716 27.3139 139.361 27.527C139.011 27.7353 138.736 28.017 138.537 28.3722C138.338 28.7225 138.236 29.1132 138.232 29.544V31.3267C138.232 31.8665 138.331 32.3329 138.53 32.7259C138.734 33.1188 139.02 33.4219 139.389 33.6349C139.759 33.848 140.197 33.9545 140.703 33.9545C141.039 33.9545 141.347 33.9072 141.627 33.8125C141.906 33.7178 142.145 33.5758 142.344 33.3864C142.543 33.197 142.694 32.965 142.798 32.6903L145.597 32.875C145.455 33.5473 145.164 34.1345 144.723 34.6364C144.288 35.1335 143.724 35.5218 143.033 35.8011C142.346 36.0758 141.553 36.2131 140.654 36.2131ZM147.635 36V25.0909H150.568V26.9943H150.682C150.881 26.3172 151.215 25.8059 151.683 25.4602C152.152 25.1098 152.692 24.9347 153.303 24.9347C153.454 24.9347 153.618 24.9441 153.793 24.9631C153.968 24.982 154.122 25.008 154.254 25.0412V27.7259C154.112 27.6832 153.916 27.6454 153.665 27.6122C153.414 27.5791 153.184 27.5625 152.976 27.5625C152.531 27.5625 152.133 27.6596 151.783 27.8537C151.437 28.0431 151.163 28.3082 150.959 28.6491C150.76 28.9901 150.661 29.383 150.661 29.8281V36H147.635Z" fill="#AD3FBF" />
                                    <path d="M10.3056 26.1562C10.2061 25.8106 10.0665 25.5052 9.88654 25.2401C9.70662 24.9702 9.48645 24.7429 9.22603 24.5582C8.97035 24.3688 8.67679 24.2244 8.34535 24.125C8.01864 24.0256 7.65643 23.9759 7.2587 23.9759C6.51533 23.9759 5.86192 24.1605 5.29847 24.5298C4.73976 24.8991 4.30415 25.4366 3.99165 26.142C3.67915 26.8428 3.5229 27.6998 3.5229 28.7131C3.5229 29.7263 3.67679 30.5881 3.98455 31.2983C4.29232 32.0085 4.72792 32.5507 5.29137 32.9247C5.85482 33.294 6.52006 33.4787 7.28711 33.4787C7.98313 33.4787 8.57736 33.3556 9.06978 33.1094C9.56694 32.8584 9.94573 32.5057 10.2061 32.0511C10.4713 31.5966 10.6039 31.0592 10.6039 30.4389L11.2289 30.5312H7.47887V28.2159H13.5655V30.0483C13.5655 31.3267 13.2956 32.4252 12.7559 33.3438C12.2161 34.2576 11.4727 34.9631 10.5257 35.4602C9.57878 35.9527 8.4945 36.1989 7.2729 36.1989C5.90927 36.1989 4.71135 35.8982 3.67915 35.2969C2.64696 34.6908 1.84203 33.8314 1.26438 32.7188C0.691465 31.6013 0.405007 30.2756 0.405007 28.7415C0.405007 27.5625 0.575462 26.5114 0.916371 25.5881C1.26201 24.66 1.74497 23.8741 2.36523 23.2301C2.9855 22.5862 3.70756 22.0961 4.53143 21.7599C5.35529 21.4238 6.24781 21.2557 7.20898 21.2557C8.03285 21.2557 8.79989 21.3764 9.51012 21.6179C10.2203 21.8546 10.8501 22.1908 11.3993 22.6264C11.9533 23.062 12.4055 23.5805 12.7559 24.1818C13.1062 24.7784 13.3311 25.4366 13.4306 26.1562H10.3056ZM22.8145 31.3551V25.0909H25.84V36H22.9352V34.0185H22.8216C22.5753 34.6577 22.1658 35.1714 21.5929 35.5597C21.0247 35.9479 20.331 36.142 19.5119 36.142C18.7827 36.142 18.1412 35.9763 17.5872 35.6449C17.0332 35.3134 16.6 34.8423 16.2875 34.2315C15.9797 33.6207 15.8234 32.8892 15.8187 32.0369V25.0909H18.8443V31.4972C18.849 32.1411 19.0218 32.6501 19.3627 33.0241C19.7037 33.3982 20.1606 33.5852 20.7335 33.5852C21.0981 33.5852 21.439 33.5024 21.7562 33.3366C22.0734 33.1662 22.3291 32.9152 22.5233 32.5838C22.7221 32.2524 22.8192 31.8428 22.8145 31.3551ZM33.2317 36.2131C32.1096 36.2131 31.1436 35.9858 30.334 35.5312C29.5291 35.072 28.9088 34.4233 28.4732 33.5852C28.0376 32.7424 27.8198 31.7457 27.8198 30.5952C27.8198 29.473 28.0376 28.4882 28.4732 27.6406C28.9088 26.7931 29.522 26.1326 30.3127 25.6591C31.1081 25.1856 32.0409 24.9489 33.111 24.9489C33.8307 24.9489 34.5007 25.0649 35.1209 25.2969C35.7459 25.5241 36.2904 25.8674 36.7544 26.3267C37.2232 26.786 37.5878 27.3636 37.8482 28.0597C38.1086 28.7509 38.2388 29.5606 38.2388 30.4886V31.3196H29.0272V29.4446H35.3908C35.3908 29.009 35.2961 28.6231 35.1067 28.2869C34.9173 27.9508 34.6545 27.688 34.3184 27.4986C33.9869 27.3045 33.601 27.2074 33.1607 27.2074C32.7014 27.2074 32.2942 27.3139 31.9391 27.527C31.5887 27.7353 31.3141 28.017 31.1152 28.3722C30.9164 28.7225 30.8146 29.1132 30.8098 29.544V31.3267C30.8098 31.8665 30.9093 32.3329 31.1081 32.7259C31.3117 33.1188 31.5982 33.4219 31.9675 33.6349C32.3368 33.848 32.7748 33.9545 33.2814 33.9545C33.6176 33.9545 33.9254 33.9072 34.2047 33.8125C34.4841 33.7178 34.7232 33.5758 34.9221 33.3864C35.1209 33.197 35.2724 32.965 35.3766 32.6903L38.1749 32.875C38.0328 33.5473 37.7417 34.1345 37.3013 34.6364C36.8657 35.1335 36.3023 35.5218 35.611 35.8011C34.9244 36.0758 34.1313 36.2131 33.2317 36.2131ZM49.29 28.2017L46.5201 28.3722C46.4727 28.1354 46.3709 27.9223 46.2147 27.733C46.0584 27.5388 45.8525 27.3849 45.5968 27.2713C45.3458 27.1529 45.0452 27.0938 44.6948 27.0938C44.226 27.0938 43.8307 27.1932 43.5087 27.392C43.1867 27.5862 43.0257 27.8466 43.0257 28.1733C43.0257 28.4337 43.1299 28.6539 43.3382 28.8338C43.5466 29.0137 43.9041 29.1581 44.4107 29.267L46.3851 29.6648C47.4457 29.8826 48.2364 30.233 48.7573 30.7159C49.2781 31.1989 49.5385 31.8333 49.5385 32.6193C49.5385 33.3343 49.3278 33.9616 48.9064 34.5014C48.4898 35.0412 47.9168 35.4626 47.1877 35.7656C46.4632 36.0639 45.6275 36.2131 44.6806 36.2131C43.2364 36.2131 42.0859 35.9124 41.2289 35.3111C40.3766 34.705 39.8771 33.8812 39.7303 32.8395L42.7061 32.6832C42.7961 33.1236 43.0139 33.4598 43.3596 33.6918C43.7052 33.919 44.1479 34.0327 44.6877 34.0327C45.218 34.0327 45.6441 33.9309 45.9661 33.7273C46.2928 33.5189 46.4585 33.2514 46.4632 32.9247C46.4585 32.6501 46.3425 32.4252 46.1152 32.25C45.888 32.0701 45.5376 31.9328 45.0641 31.8381L43.1749 31.4616C42.1096 31.2486 41.3165 30.8793 40.7956 30.3537C40.2795 29.8281 40.0215 29.1581 40.0215 28.3438C40.0215 27.643 40.2109 27.0393 40.5897 26.5327C40.9732 26.026 41.5106 25.6354 42.2019 25.3608C42.8979 25.0862 43.7123 24.9489 44.6451 24.9489C46.0229 24.9489 47.1072 25.2401 47.8979 25.8224C48.6934 26.4048 49.1574 27.1979 49.29 28.2017ZM60.5204 28.2017L57.7505 28.3722C57.7032 28.1354 57.6014 27.9223 57.4451 27.733C57.2889 27.5388 57.0829 27.3849 56.8272 27.2713C56.5763 27.1529 56.2756 27.0938 55.9252 27.0938C55.4565 27.0938 55.0611 27.1932 54.7392 27.392C54.4172 27.5862 54.2562 27.8466 54.2562 28.1733C54.2562 28.4337 54.3604 28.6539 54.5687 28.8338C54.777 29.0137 55.1345 29.1581 55.6412 29.267L57.6156 29.6648C58.6762 29.8826 59.4669 30.233 59.9877 30.7159C60.5086 31.1989 60.769 31.8333 60.769 32.6193C60.769 33.3343 60.5583 33.9616 60.1369 34.5014C59.7202 35.0412 59.1473 35.4626 58.4181 35.7656C57.6937 36.0639 56.858 36.2131 55.911 36.2131C54.4669 36.2131 53.3163 35.9124 52.4593 35.3111C51.6071 34.705 51.1075 33.8812 50.9608 32.8395L53.9366 32.6832C54.0266 33.1236 54.2444 33.4598 54.59 33.6918C54.9357 33.919 55.3784 34.0327 55.9181 34.0327C56.4484 34.0327 56.8746 33.9309 57.1966 33.7273C57.5233 33.5189 57.689 33.2514 57.6937 32.9247C57.689 32.6501 57.573 32.4252 57.3457 32.25C57.1184 32.0701 56.7681 31.9328 56.2946 31.8381L54.4054 31.4616C53.34 31.2486 52.5469 30.8793 52.0261 30.3537C51.51 29.8281 51.252 29.1581 51.252 28.3438C51.252 27.643 51.4413 27.0393 51.8201 26.5327C52.2037 26.026 52.7411 25.6354 53.4324 25.3608C54.1284 25.0862 54.9428 24.9489 55.8755 24.9489C57.2534 24.9489 58.3377 25.2401 59.1284 25.8224C59.9238 26.4048 60.3878 27.1979 60.5204 28.2017ZM67.6458 36.2131C66.5236 36.2131 65.5577 35.9858 64.748 35.5312C63.9431 35.072 63.3229 34.4233 62.8873 33.5852C62.4516 32.7424 62.2338 31.7457 62.2338 30.5952C62.2338 29.473 62.4516 28.4882 62.8873 27.6406C63.3229 26.7931 63.936 26.1326 64.7267 25.6591C65.5222 25.1856 66.455 24.9489 67.525 24.9489C68.2447 24.9489 68.9147 25.0649 69.535 25.2969C70.16 25.5241 70.7045 25.8674 71.1685 26.3267C71.6373 26.786 72.0018 27.3636 72.2623 28.0597C72.5227 28.7509 72.6529 29.5606 72.6529 30.4886V31.3196H63.4412V29.4446H69.8049C69.8049 29.009 69.7102 28.6231 69.5208 28.2869C69.3314 27.9508 69.0686 27.688 68.7324 27.4986C68.401 27.3045 68.0151 27.2074 67.5748 27.2074C67.1155 27.2074 66.7083 27.3139 66.3532 27.527C66.0028 27.7353 65.7282 28.017 65.5293 28.3722C65.3304 28.7225 65.2286 29.1132 65.2239 29.544V31.3267C65.2239 31.8665 65.3233 32.3329 65.5222 32.7259C65.7258 33.1188 66.0123 33.4219 66.3816 33.6349C66.7509 33.848 67.1889 33.9545 67.6955 33.9545C68.0317 33.9545 68.3394 33.9072 68.6188 33.8125C68.8981 33.7178 69.1373 33.5758 69.3361 33.3864C69.535 33.197 69.6865 32.965 69.7907 32.6903L72.589 32.875C72.4469 33.5473 72.1557 34.1345 71.7154 34.6364C71.2798 35.1335 70.7163 35.5218 70.025 35.8011C69.3385 36.0758 68.5454 36.2131 67.6458 36.2131ZM74.6273 36V25.0909H77.5605V26.9943H77.6742C77.873 26.3172 78.2069 25.8059 78.6756 25.4602C79.1444 25.1098 79.6841 24.9347 80.2949 24.9347C80.4464 24.9347 80.6098 24.9441 80.785 24.9631C80.9602 24.982 81.1141 25.008 81.2466 25.0412V27.7259C81.1046 27.6832 80.9081 27.6454 80.6571 27.6122C80.4062 27.5791 80.1766 27.5625 79.9682 27.5625C79.5231 27.5625 79.1254 27.6596 78.775 27.8537C78.4294 28.0431 78.1548 28.3082 77.9512 28.6491C77.7523 28.9901 77.6529 29.383 77.6529 29.8281V36H74.6273Z" fill="#3FA0BF" />
                                    <path d="M116.101 11.9949C116.65 11.9394 117.05 11.4489 116.995 10.8994L116.089 1.94506C116.034 1.39557 115.543 0.995175 114.994 1.05074C114.444 1.10631 114.044 1.5968 114.1 2.14628L114.904 10.1057L106.945 10.9106C106.396 10.9661 105.995 11.4566 106.051 12.0061C106.106 12.5556 106.597 12.956 107.146 12.9004L116.101 11.9949ZM39.6097 11.7926C43.7547 8.60419 57.1028 2 76.5 2V0C56.6972 0 42.912 6.72914 38.3903 10.2074L39.6097 11.7926ZM76.5 2C100.796 2 112.065 9.07899 115.368 11.7747L116.632 10.2253C112.935 7.20672 101.204 0 76.5 0V2Z" fill="#D9D9D9" />
                                    <path d="M38.8994 44.0051C38.3499 44.0606 37.9495 44.5511 38.0051 45.1006L38.9106 54.0549C38.9661 54.6044 39.4566 55.0048 40.0061 54.9493C40.5556 54.8937 40.956 54.4032 40.9004 53.8537L40.0955 45.8943L48.0549 45.0894C48.6044 45.0339 49.0048 44.5434 48.9493 43.9939C48.8937 43.4444 48.4032 43.044 47.8537 43.0996L38.8994 44.0051ZM115.39 44.2074C111.245 47.3958 97.8972 54 78.5 54V56C98.3028 56 112.088 49.2709 116.61 45.7926L115.39 44.2074ZM78.5 54C54.2043 54 42.9346 46.921 39.6324 44.2253L38.3676 45.7747C42.0654 48.7933 53.7957 56 78.5 56V54Z" fill="#D9D9D9" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 mb-4 align-middle'>
                        <h1 className="my-auto text-2xl font-semibold text-gray-200">
                            3
                        </h1>
                        <div className="grid md:grid-cols-2 align-middle my-auto px-4 py-3 bg-gray-900 rounded-md text-gray-300 w-full">
                            <p className='my-auto'>Objective of the game is to collect all of your opponent’s marbles.</p>
                            <div className='flex align-middle gap-3'>
                                <p className='text-2xl my-auto font-bold'>+ 10</p>
                                <div className='mx-auto md:mx-0 my-auto w-20 grid grid-cols-5 gap-1'>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 mb-4 align-middle'>
                        <h1 className="my-auto text-2xl font-semibold text-gray-200">
                            4
                        </h1>
                        <div className="grid md:grid-cols-2 align-middle my-auto px-4 py-3 bg-gray-900 rounded-md text-gray-300 w-full">
                            <p className='my-auto'>Each round, players have to pick a number from 1 to 10 from their stack. Guesser's objective is to correctly predict if Hider's number is odd or even.</p>
                            <div className='mx-auto md:mx-0 my-auto text-xl font-bold gap-1 grid grid-cols-10'>
                                <div className='text-center'>
                                    <div>1</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                        <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>2</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                        <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>3</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                        <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>4</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                        <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>5</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                        <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>6</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>7</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>8</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>9</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <div>10</div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 mb-4 align-middle'>
                        <h1 className="my-auto text-2xl font-semibold text-gray-200">
                            5
                        </h1>
                        <div className="grid md:grid-cols-2 align-middle my-auto px-4 py-3 bg-gray-900 rounded-md text-gray-300 w-full">
                            <p className='my-auto'>The prize is determined by the amount of marbles Guesser wagered.</p>
                            <div className='mx-auto md:mx-0 flex align-middle gap-3'>
                                <p className='text-2xl my-auto font-bold'>+ (1-10)</p>
                                <div className='my-auto w-5 h-5 bg-gray-300 rounded-full'></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 mb-4 align-middle'>
                        <h1 className="my-auto text-2xl font-semibold text-gray-200">
                            6
                        </h1>
                        <div className="grid md:grid-cols-2 align-middle my-auto px-4 py-3 bg-gray-900 rounded-md text-gray-300 w-full">
                            <p className='my-auto'>If one of the Players is left with only 1 marble, he can only assume the Guesser role.</p>
                            <div className='mx-auto md:mx-0 my-auto text-2xl font-bold text-[#3FA0BF]'>
                                Guesser
                            </div>
                        </div>
                    </div>
                    <div className='ml-5 mb-4 align-middle'>
                        <h1 className="my-auto text-2xl font-semibold text-gray-200">
                            Example
                        </h1>
                        <div className='flex align-middle gap-2'>
                            <div className='bg-gray-700 my-auto w-fit p-3 rounded-md text-gray-300'>
                                <div><span className='text-[#D962EC] font-bold'>Hider</span> chooses 3 marbles</div>
                                <div className='flex mt-4'>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                        <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    </div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                        <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    </div>
                                    <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                        <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='my-auto'>
                                <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.0607 13.0607C29.6464 12.4749 29.6464 11.5251 29.0607 10.9393L19.5147 1.3934C18.9289 0.807611 17.9792 0.807611 17.3934 1.3934C16.8076 1.97919 16.8076 2.92893 17.3934 3.51472L25.8787 12L17.3934 20.4853C16.8076 21.0711 16.8076 22.0208 17.3934 22.6066C17.9792 23.1924 18.9289 23.1924 19.5147 22.6066L29.0607 13.0607ZM0 13.5H28V10.5H0V13.5Z" fill="#D9D9D9" />
                                </svg>
                            </div>
                            <div className='bg-gray-700 flex my-auto w-fit p-3 rounded-md text-gray-300'>
                                <div><span className='text-[#3FA0BF] font-bold'>Guesser</span> correctly reckons that his opponent would choose an odd number and bets 2</div>
                                <div className='flex mt-4 flex-col gap-2'>
                                    <div className='flex gap-2'>
                                        <svg width="56" height="24" viewBox="0 0 56 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="0.5" y="0.5" width="55" height="23" rx="10.5" stroke="#D9D9D9" />
                                            <circle cx="44" cy="12" r="10" fill="#D9D9D9" />
                                        </svg>
                                        <p className='font-bold'>Odd</p>
                                    </div>
                                    <div className='flex w-fit'>
                                        <div className='mx-auto border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                            <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                        </div>
                                        <div className='mx-auto ml-1 border-2 w-6 h-6 border-gray-300 grid place-content-center rounded-full'>
                                            <div className='w-4 h-4 bg-gray-300 rounded-full'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='my-auto'>
                                <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M29.0607 13.0607C29.6464 12.4749 29.6464 11.5251 29.0607 10.9393L19.5147 1.3934C18.9289 0.807611 17.9792 0.807611 17.3934 1.3934C16.8076 1.97919 16.8076 2.92893 17.3934 3.51472L25.8787 12L17.3934 20.4853C16.8076 21.0711 16.8076 22.0208 17.3934 22.6066C17.9792 23.1924 18.9289 23.1924 19.5147 22.6066L29.0607 13.0607ZM0 13.5H28V10.5H0V13.5Z" fill="#D9D9D9" />
                                </svg>
                            </div>
                            <div className='bg-gray-700 my-auto w-fit p-3 rounded-md text-gray-300'>
                                <div>Result: <span className='text-[#3FA0BF] font-bold'>Guesser</span> wins 2 marbles.</div>
                                <div className='flex mt-4 mx-auto w-fit gap-2'>
                                    <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                                    <div className='w-6 h-6 bg-gray-300 rounded-full'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}