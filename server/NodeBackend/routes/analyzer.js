const { default: axios } = require("axios");
const express = require('express');
const router = express.Router();
const fs = require('fs');

const apiUrl = "https://api.videoindexer.ai";
const accountId = "f16e0959-bf49-4d6a-81a3-8d2f57d5bd84" 
const accountLocation = "trial"; // replace with the account's location, or with “trial” if this is a trial account
const apiKey = "0abf11ef787d49508e4c0f199a2b3edb"; 
let videoUrl;

const getAccessToken = async () => { 
    const queryParams = {
        allowEdit: "true"
    }
    return axios({
        method: "get",
        url: `${apiUrl}/auth/${accountLocation}/Accounts/${accountId}/AccessToken?allowEdit=true`,
        headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
        }
    }).then(res => {
        return res;
    })
}

const sleep = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms)
    })
}

const uploadVideo = (_videoUrl, accessToken) => {
    return axios({
        method: "post",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data'
        },
        url: `${apiUrl}/${accountLocation}/Accounts/${accountId}/Videos?accessToken=${accessToken}&name=new_name&description=some_description&privacy=private&partition=some_partition&videoUrl=${_videoUrl}`,
        // data: content,
    }).catch((err) => console.error(err))
}

const getVideoAccessToken = (videoId) => {
    return axios({
        method: `get`,
        headers: {
            "Ocp-Apim-Subscription-Key": apiKey,
        },
        url: `${apiUrl}/auth/${accountLocation}/Accounts/${accountId}/Videos/${videoId}/AccessToken?allowEdit=true`
    })
}

const getVideoStatus = (videoAccessToken, videoId) => {
    return axios({
        method: 'get',
        url: `${apiUrl}/${accountLocation}/Accounts/${accountId}/Videos/${videoId}/Index?accessToken=${videoAccessToken}&language=English`
    })
}

const getVideoAnalysis = async (url) => {
    videoUrl = url;
    const {data: accessToken} = await getAccessToken()
    const uploadResponse = await uploadVideo(videoUrl, accessToken)
    const videoId = uploadResponse.data["id"]
    const videoAccessTokenResponse = await getVideoAccessToken(videoId);
    const videoAccessToken = videoAccessTokenResponse.data
    let indexResponse;

    while (true) {
        await sleep(10000)
        indexResponse = await getVideoStatus(videoAccessToken, videoId);
        console.log(indexResponse.data.videos)

        const videoState = indexResponse.data.videos[0].state
        if (videoState === 'Processed') {
            console.log(indexResponse.data.videos[0].insights)
            break;
        }

        if (videoState === 'Uploaded') {
            console.log("Upload Success")
            break;
        }
    }

    return indexResponse.data.videos[0].insights;
}

router.post("/", async (req, res) => {
    const result = await getVideoAnalysis(req.body.urlLink);
    res.send(result);
})

module.exports = router;