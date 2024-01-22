const {redisClient} = require("../database/rediesConect");


class Controller{
    handleErrorThrow(res,err){
        console.error(err);
        res.status(500).send();
    }
    textApi(req,res){
        try {
            return res.send('Hello World!') //"Hello World!" 를 출력되게 해준다.
        } catch (err){
            this.handleErrorThrow(res,err)
        }
    }
    requestSend(req,res){
        try {
            const data = {
                data: {name: 'eqweqeqweqweqwe'}
            }
            return res.status(200).json({
                message:'qweqeqwe',
                result: data
            })
        } catch (err){
            this.handleErrorThrow(res,err)
        }
    }

    requestPostId(req,res){
        try {
            const { id, name, value } = req.body;
            res.json({ message: 'success', data: { id, name, value} });
        } catch (err){
            this.handleErrorThrow(res,err)
        }
    }

    async getRedisRequest(req, res) {
        try {
            const data = await redisClient.get('k_one');  // 비동기 함수를 기다립니다.
            if (data) {
                res.json({ message:'success', data: Number(data) });  // data가 있으면
            } else {
                res.json({ message:'fail' });  // data가 없으면
            }
        } catch (error) {
            this.handleErrorThrow(res,err)
        }
    }
}
module.exports.controller = new Controller();