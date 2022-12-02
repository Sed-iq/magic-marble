// const API_URL = 'http://localhost:3000';
const API_URL = 'https://magic-marble-api.herokuapp.com';
// const WEB_URL = 'http://localhost:3001';
const WEB_URL = 'https://squid-app-mtjl8.ondigitalocean.app';

const GetUser = async (socket) => {
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

const RegisterUser = async (username, password, confirmPassword) => {
    if (!username || !password || !confirmPassword) {
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
        return true;
    } else {
        alert(data.error);
        return false;
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
        return true;
    } else {
        alert(data.error);
        return null;
    }
}

const UpdateUser = async (socket, username) => {
    const user = await GetUser(socket);
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
                    return true;
                }
                else {
                    alert(data.error);
                    return false;
                }
            }
            else {
                alert('Username is required');
                return false;
            }
        }
        else {
            alert('No changes made');
            return false;
        }
    }
    else {
        alert('User not found');
        return null;
    }
}

const DeleteUser = async (socket) => {
    if (window.confirm("Are you sure to delete your account?")) {
        const user = await GetUser(socket);
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
                return true;
            }
            else {
                alert(data.error);
                return false;
            }
        }
        else {
            alert('User not found');
            return null;
        }
    }
}

const CreateTournament = async (socket, name, description, rules, tournamentType, prizeAndDistribution, timePerMove, timeBetweenRounds, maxParticipants, optionalLink, dateTime) => {
    const user = await GetUser(socket);
    if (user) {
        if (user.isAdmin) {
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
                        userId: user.id,
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
                    return true;
                }
                else {
                    alert(data.error);
                    return false;
                }
            }
            else {
                alert("Fill all required fields");
                return false;
            }
        }
        else {
            alert("Only admin can create tournament");
            return false;
        }
    }
    else {
        alert('You must be logged in to create a tournament');
        return null;
    }
}

const UpdateTournament = async (socket, tournamentId, name, description, rules, tournamentType, prizeAndDistribution, timePerMove, timeBetweenRounds, maxParticipants, dateTime, optionalLink) => {
    const user = await GetUser(socket);
    if (user) {
        if (user.isAdmin) {
            if (name.length > 0 && description.length > 0 && rules.length > 0 && prizeAndDistribution.length > 0 && timePerMove.length > 0 && timeBetweenRounds.length > 0 && maxParticipants.length > 0 && dateTime.length > 0) {
                const date = new Date(dateTime);
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
                        userId: user.id,
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
                    return true;
                }
                else {
                    alert(data.error);
                    return false;
                }
            }
            else {
                alert("Fill all required fields");
                return false;
            }
        }
        else {
            alert("Only admin can create tournament");
            return false;
        }
    }
    else {
        alert('You must be logged in to update a tournament');
        return null;
    }
}

const DeleteTournament = async (socket, tournamentId) => {
    const user = await GetUser(socket);
    if (user) {
        if (user.isAdmin) {
            if (window.confirm('Are you sure to delete this tournament?')) {
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
                    return true;
                }
                else {
                    alert(data.error);
                }
            }
        }
        else {
            alert('You are not admin');
            return false;
        }
    }
    else {
        alert('You must be logged in to delete a tournament');
        return null;
    }
}

const GetATournament = async (socket, tournamentId) => {
    const user = await GetUser(socket);
    if (user) {
        const response = await fetch(`${API_URL}/getTournament/?userId=${user.id}&tournamentId=${tournamentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        if (!data.error) {
            return data.tournament;
        }
        else {
            return null;
        }
    }
    else {
        alert('You must be logged in to delete a tournament');
        return null;
    }
}

const AdminGetAllTournaments = async (socket, status) => {
    const user = await GetUser(socket);
    if (user) {
        if (user.isAdmin) {
            const response = await fetch(`${API_URL}/getAllTournaments/?userId=${user.id}&status=${status}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (!data.error) {
                return data.tournaments;
            }
            else {
                return null;
            }
        }
        else {
            alert('You are not admin');
            return null;
        }
    }
    else {
        alert('You must be logged in to delete a tournament');
        return null;
    }
}

const PlayerGetAllTournaments = async (socket, status, purpose) => {
    const user = await GetUser(socket);
    if (user) {
        if (!user.isAdmin) {
            const response = await fetch(`${API_URL}/${purpose}/?userId=${user.id}&status=${status}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (!data.error) {
                return data.tournaments;
            }
            else {
                return null;
            }
        }
        else {
            alert('You are not player');
            return null;
        }
    }
    else {
        alert('You must be logged in to delete a tournament');
        return null;
    }
}

const JoinTournament = async (socket, id) => {
    if (window.confirm("Are you sure to join this tournament?")) {
        const user = await GetUser(socket);
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
                return true;
            }
            else {
                alert(data.error);
                return false;
            }
        }
        else {
            alert('You must be logged in to join a tournament');
            return null;
        }
    }
}

const LeaveTournament = async (socket, id) => {
    if (window.confirm("Are you sure you want to leave this tournament?")) {
        const user = await GetUser(socket);
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
                return true;
            }
            else {
                alert(data.error);
                return false;
            }
        }
        else {
            alert('You must be logged in to leave a tournament');
            return null;
        }
    }
}

const GetAllPlayers = async (socket) => {
    const user = await GetUser(socket);
    if (user) {
        if (user.isAdmin) {
            const response = await fetch(`${API_URL}/getAllPlayers/?userId=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if (!data.error) {
                return data.players;
            }
            else {
                return false;
            }
        }
        else {
            alert('You are not admin');
            return null;
        }
    }
    else {
        alert('You must be logged in to get all players');
        return null;
    }
}

const GetAdminDashboardData = async (socket) => {
    const user = await GetUser(socket);
    if (user) {
        if (user.isAdmin) {
            const response = await fetch(`${API_URL}/getAdminDashboardData/?userId=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!data.error) {
                return data;
            }
            else {
                return false;
            }
        }
        else {
            alert('You are not admin');
            return null;
        }
    }
    else {
        alert('You must be logged in to get dashboard data');
        return null;
    }
}

const GetPlayerDashboardData = async (socket) => {
    const user = await GetUser(socket);
    if (user) {
        if (!user.isAdmin) {
            const response = await fetch(`${API_URL}/getPlayerDashboardData/?userId=${user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (!data.error) {
                return data;
            }
            else {
                return false;
            }
        }
        else {
            alert('You are not player');
            return null;
        }
    }
    else {
        alert('You must be logged in to get dashboard data');
        return null;
    }
}


export {
    API_URL,
    WEB_URL,
    GetUser,
    RegisterUser,
    LoginUser,
    UpdateUser,
    DeleteUser,
    CreateTournament,
    UpdateTournament,
    DeleteTournament,
    GetATournament,
    AdminGetAllTournaments,
    PlayerGetAllTournaments,
    JoinTournament,
    LeaveTournament,
    GetAllPlayers,
    GetAdminDashboardData,
    GetPlayerDashboardData
}