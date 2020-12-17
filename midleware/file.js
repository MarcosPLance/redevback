const AWS = require('aws-sdk')
const config = require('config')
const fs = require('fs')
const slugfy = require('../service/slugfy')


module.exports = async function (req, res, next){
    
    try{
    const BUCKET_NAME = process.env.S3_BUCKET_NAME || config.get('S3_BUCKET_NAME')

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_KEY_ID || config.get("AWS_KEY_ID"),
        secretAccessKey: process.env.AWS_SECRET_KEY || config.get("AWS_SECRET_KEY")
    })

    const folder = req.baseUrl.replace("/","")
    if(!req.files){
        next()
    }else{
        let picture = req.files.picture
        const name = slugfy(picture.name)
        req.body.picture_name = name
    
        if(picture.mimetype.includes('image/')){
            const file = await picture.mv(`./uploads/${name}`)
            const params = {
                Bucket: BUCKET_NAME,
                ACL: 'public-read',
                Key: `${folder}/${name}`,
                Body: fs.createReadStream(`./uploads/${name}`)
            }

            s3.upload(params, function(err, data){
                if(err){
                    console.error(err)
                    res.status(500).send(err)
                }else{
                    console.log(`File uploaded. ${data.Location}`)
                    fs.unlinkSync(`./uploads/${name}`)
                    next()
                }
            })
        }else{
            res.status(400).send("Invalid Format")
        }
    }
    }catch(err){
        console.error(err)
        res.status(500).send("Falta alguma informação")
    }

}