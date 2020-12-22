import axios from 'axios';

export default axios.create({
    baseURL: 'https://visual-scorecard-server.herokuapp.com/',
});

