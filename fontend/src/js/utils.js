/*
    This file is added as simple script file with html not module
    So we need to export functions to use in other files
*/


// const API_URL = 'http://localhost:3000';
const API_URL = 'https://magic-marble-api.herokuapp.com'
// const API_URL = 'https://marbles-game-api.herokuapp.com';
// const WEB_URL = 'http://localhost:5173';
const WEB_URL = 'https://magic-marble-api.herokuapp.com';
// const WEB_URL = 'https://illustrious-bombolone-823bb2.netlify.app';

let socket = null;
const SetSocket = (newSocket) => {
    socket = newSocket;
};
const GetSocket = () => {
    return socket;
};

// Some generic Funcitons
const ChangeUrl = (url) => {
    window.history.pushState({}, null, url);
    window.dispatchEvent(new Event('popstate'));
}

const DateToAgo = (dateTime) => {
    let date = new Date(dateTime);
    const currentDate = new Date();
    const year = currentDate.getFullYear() - date.getFullYear();
    const month = currentDate.getMonth() - date.getMonth();
    const day = currentDate.getDate() - date.getDate();
    if (year > 0) {
        return year + " Year Ago";
    }
    else if (month > 0) {
        return month + " Month Ago";
    }
    else if (day > 0) {
        return day + " Day Ago";
    }
    else {
        return "Today";
    }
}

const ConvertTime12to24 = (time12h) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes, miliseconds] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    if (hours < 10) {
        hours = '0' + hours;
    }
    return `${hours}:${minutes}:${miliseconds}`;
}

const Logout = () => {
    localStorage.removeItem('token');
    ChangeUrl('/login');
}

const GetHtmlElement = (querry) => {
    return document.querySelector(querry);
};

const CreateHtmlElemment = (tag, innerHtml, id = null, classes = []) => {
    const element = document.createElement(tag);
    element.innerHTML = innerHtml;
    if (id) element.id = id;
    if (classes.length > 0) element.classList.add(...classes);
    return element;
}


// Other functions
const RegisterUser = async (username, password, confirmPassword) => {
    if (username === '' || password === '' || confirmPassword === '') {
        alert('Please enter username and password');
        return;
    }
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const data = await response.json();
    if (!data.error) {
        alert(data.message);
        ChangeUrl('/login');
    } else {
        alert(data.error);
        ChangeUrl('/register');
    }
}

const LoginUser = async (username, password) => {
    if (username === '' || password === '') {
        alert('Please enter username and password');
        return;
    }
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    });
    const data = await response.json();
    if (!data.error) {
        localStorage.setItem('token', JSON.stringify(data.token));
        const user = await GetUser();
        if (user.isAdmin) {
            ChangeUrl('/admin/dashboard');
        }
        if (!user.isAdmin) {
            ChangeUrl('/player/dashboard');
        }
    } else {
        alert(data.error);
        ChangeUrl('/login');
    }
}

const UpdateUser = async (username, url) => {
    const user = await GetUser();
    if (user) {
        if (user.username !== username) {
            if (username.length > 0) {
                const response = await fetch(`${API_URL}/updateUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        username: username
                    })
                });
                const data = await response.json();
                if (!data.error) {
                    alert('Username updated successfully');
                    ChangeUrl(url);
                }
                else {
                    alert(data.error);
                }
            }
            else {
                alert('Username is required');
            }
        }
        else {
            alert('No changes made');
        }
    }
    else {
        alert('User not found');
        ChangeUrl('/login');
    }
}

const DeleteUser = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
        const user = await GetUser();
        if (user) {
            const response = await fetch(`${API_URL}/deleteUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id
                })
            });
            const data = await response.json();
            if (!data.error) {
                localStorage.removeItem('token');
                ChangeUrl('/login');
            }
            else {
                alert(data.error);
            }
        }
        else {
            alert('User not found');
            ChangeUrl('/login');
        }
    }
}

const GetUser = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        // get user info
        if (socket) {
            const response = await fetch(`${API_URL}/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'SocketId': socket.id
                }
            });

            const data = await response.json();
            if (!data.error) {
                return data.user;
            }
        }
    }
    return null;
}

const CreateTournament = async (userId, name, description, rules, tournamentType, prizeAndDistribution, timePerMove, timeBetweenRounds, maxParticipants, optionalLink, dateTime) => {
    if (name.length > 0 && description.length > 0 && rules.length > 0 && prizeAndDistribution.length > 0 && timePerMove.length > 0 && timeBetweenRounds.length > 0 && maxParticipants.length > 0 && dateTime.length > 0) {
        const date = new Date(dateTime);
        if (date < new Date()) {
            alert('Date must be in future');
            return;
        }
        const response = await fetch(`${API_URL}/createTournament`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                name: name,
                description: description,
                rules: rules,
                tournamentType: tournamentType,
                prizeAndDistribution: prizeAndDistribution,
                timePerMove: timePerMove,
                timeBetweenRounds: timeBetweenRounds,
                maxPlayers: maxParticipants,
                startDateTime: date,
                optionalLink: optionalLink
            })
        });
        const data = await response.json();
        if (!data.error) {
            alert('Tournament created successfully');
            ChangeUrl('/admin/tournaments/create')
        }
        else {
            alert(data.error);
        }
    }
    else {
        alert("Fill all required fields");
    }
}

const UpdateTournament = async (userId, tournamentId, name, description, rules, tournamentType, prizeAndDistribution, timePerMove, timeBetweenRounds, maxParticipants, dateTime, optionalLink) => {
    if (name.length > 0 && description.length > 0 && rules.length > 0 && prizeAndDistribution.length > 0 && timePerMove.length > 0 && timeBetweenRounds.length > 0 && maxParticipants.length > 0 && dateTime.length > 0) {
        console.log(dateTime)
        const date = new Date(dateTime);
        console.log(date);
        console.log(new Date());
        console.log(date < new Date());
        if (date < new Date()) {
            alert('Date must be in future');
            return;
        }
        const response = await fetch(`${API_URL}/updateTournament`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                tournamentId: tournamentId,
                name: name,
                tournamentType: tournamentType,
                description: description,
                rules: rules,
                prizeAndDistribution: prizeAndDistribution,
                timePerMove: timePerMove,
                timeBetweenRounds: timeBetweenRounds,
                maxPlayers: maxParticipants,
                startDateTime: date,
                optionalLink: optionalLink
            })
        });
        const data = await response.json();
        if (!data.error) {
            alert('Tournament edited successfully');
            ChangeUrl('/admin/tournaments/edit?tournamentId=' + tournamentId);
        }
        else {
            alert(data.error);
        }
    }
    else {
        alert("Fill all required fields");
    }
}

const DeleteTournament = async (tournamentId, url) => {
    const user = await GetUser();
    if (user) {
        if (user.isAdmin) {
            if (confirm('Are you sure you want to delete this tournament?')) {
                const response = await fetch(`${API_URL}/deleteTournament/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        tournamentId: tournamentId,
                        userId: user.id
                    })
                });
                const data = await response.json();
                if (!data.error) {
                    alert(data.message);
                    ChangeUrl(url);
                }
                else {
                    alert(data.error);
                }
            }
        }
        else {
            alert('You are not admin');
        }
    }
    else {
        alert('You must be logged in to delete a tournament');
    }
}

const JoinTournament = async (id, url) => {
    if (confirm("Are you sure to join this tournament?")) {
        const user = await GetUser();
        if (user) {
            const response = await fetch(`${API_URL}/joinTournament`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    tournamentId: id
                })
            });
            const data = await response.json();
            if (!data.error) {
                alert(data.message);
                ChangeUrl(url);
            }
            else {
                alert(data.error);
            }
        }
        else {
            alert('You must be logged in to join a tournament');
            ChangeUrl('/login');
        }
    }
}

const LeaveTournament = async (id, url) => {
    if (confirm("Are you sure you want to leave this tournament?")) {
        const user = await GetUser();
        if (user) {
            const response = await fetch(`${API_URL}/leaveTournament`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.id,
                    tournamentId: id
                })
            });
            const data = await response.json();
            if (!data.error) {
                alert(data.message);
                ChangeUrl(url);
            }
            else {
                alert(data.error);
            }
        }
        else {
            alert('You must be logged in to leave a tournament');
            ChangeUrl('/login');
        }
    }
}

// alpine js init -- this is used for Web UI
const data = () => {
    function getThemeFromLocalStorage() {
        // if user already changed the theme, use it
        if (window.localStorage.getItem('dark')) {
            return JSON.parse(window.localStorage.getItem('dark'))
        }

        // else return their preferences
        return (
            !!window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        )
    }

    function setThemeToLocalStorage(value) {
        window.localStorage.setItem('dark', value)
    }

    return {
        dark: getThemeFromLocalStorage(),
        toggleTheme() {
            this.dark = !this.dark
            setThemeToLocalStorage(this.dark)
        },
        isSideMenuOpen: false,
        toggleSideMenu() {
            this.isSideMenuOpen = !this.isSideMenuOpen
        },
        closeSideMenu() {
            this.isSideMenuOpen = false
        },
        isNotificationsMenuOpen: false,
        toggleNotificationsMenu() {
            this.isNotificationsMenuOpen = !this.isNotificationsMenuOpen
        },
        closeNotificationsMenu() {
            this.isNotificationsMenuOpen = false
        },
        isProfileMenuOpen: false,
        toggleProfileMenu() {
            this.isProfileMenuOpen = !this.isProfileMenuOpen
        },
        closeProfileMenu() {
            this.isProfileMenuOpen = false
        },
        isPagesMenuOpen: false,
        togglePagesMenu() {
            this.isPagesMenuOpen = !this.isPagesMenuOpen
        },
        // Modal
        isModalOpen: false,
        trapCleanup: null,
    }
}