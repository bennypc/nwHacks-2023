const { default: axios } = require("axios");
const express = require('express');
const router = express.Router();

const apiKey = '0a7c3721-a12f-48f3-8fa6-f3208018e76b';

const getUploadUrl = (videoUrl) => {
    console.log('here')
    return axios({
      method: "POST",
      url: `https://livepeer.studio/api/asset/import`,
      data: JSON.stringify({ url: videoUrl, name: "test" }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      }
    })
  }

  const upload = async (url) => {
    return axios({
      method: 'PUT',
      url: url,
      headers: {
        'Content-Type': 'video/mp4',
      },
      data: { binary: "https://firebasestorage.googleapis.com/v0/b/nwhacks2023-5f0e8.appspot.com/o/IMG_1711.MOV?alt=media&token=7fea6cf9-59de-4f22-b137-310f6a53b00e"}
    })
  }

// const uploadAsset = async () => {
//   const {data: uploadUrl} = await getUploadUrl();
//   // const directUpload = await uploadAsset(uploadUrl);
//   return directUpload;
// }

const getAssets = async (findUrl) => {
    return axios({
      method: "GET",
      url: "https://livepeer.studio/api/asset",
      headers: {
       Authorization: `Bearer ${apiKey}`,
      }
    })
}

router.post("/", async (req, res) => {
  console.log(req);
  const urlLink = req.body.urlLink;
  const name = req.body.name;
  console.log(urlLink);
  const response = await getUploadUrl(urlLink, name);
  const assets = await getAssets(response.data.url);
  res.send(assets.data);
})

module.exports = router;