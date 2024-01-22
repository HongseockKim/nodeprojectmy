const express = require('express') //③번 단계에서 다운받았던 express 모듈을 가져온다.
const cors = require('cors');
const Controller = require('./api/controller');
const {controller} = require("./api/controller");
const http = require("http");
const {redisClient} = require("./database/rediesConect");
const app = express() //가져온 express 모듈의 function을 이용해서 새로운 express 앱을 만든다. 🔥
const router = express.Router();
const port = 9095 //포트는 4000번 해도되고, 5000번 해도 된다. -> 이번엔 5000번 포트를 백 서버로 두겠다.

app.use(
    cors({
    origin: '*'
}),
    express.json(),
)

router.get('/someRoute', (req, res) => {
    controller.getRedisRequest(req,res)
});

router.get('/send', (req, res) => {
    controller.requestSend(req, res)
});

router.post('/postId', (req, res) => {
    controller.requestPostId(req, res)
});

app.get('/', (req, res) => { //express 앱(app)을 넣고, root directory에 오면,
    controller.textApi(req,res);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
app.use('/api', router); // Add this line
module.exports.router = router;