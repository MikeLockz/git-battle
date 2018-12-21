import axios from 'axios';

const id = 'e3eb41f5e35dad679b8b';
const sec = 'a5bea461e73747cba4190b9e287be77fe8698645';
const params = `?client_id=${id}&client_secret=${sec}`;

function getProfile(username) {
    return axios.get(`https://api.github.com/users/${username}${params}`)
        .then(({ data }) => data);
}

function getRepos(username) {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

function getStarCount(repos) {
    return repos.data.reduce((count, { stargazers_count }) => count + stargazers_count, 0);
}

function calculateScore({ followers }, repos) {
    return (followers * 3) + getStarCount(repos);
}

function handleError(error) {
    console.warn(error);
    return null;
}

function getUserData(player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([profile, repos]) => ({
        profile,
        score: calculateScore(profile, repos)
    }));
}

function sortPlayers(players) {
    // returns array with highest score first
    return players.sort((a,b) => b.score - a.score);
}

export function battle (players) {
    return Promise.all(players.map(getUserData))
        .then(sortPlayers)
        .catch(handleError)
}

export function fetchPopularRepos (language) {
    const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

    return axios.get(encodedURI)
        .then(({ data }) => data.items);
}