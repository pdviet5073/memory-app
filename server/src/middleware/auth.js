import jwt from "jsonwebtoken"

//        VÍ DỤ
//khi nguời dùng muốn like 1 bài viết
//click vào button like  ==> đi tới auth middleware () 
//sẽ check xem ng dùng có quyền hay không
// auth middleware () sẽ  xác nhận hoặc từ chối 
//cuối cùng sẽ gọi đến controllers...

//khi làm 1 việc gì đó thì sẽ kiểm tra xem token có hợp lệ hay không
const auth = async (req, res, next) => {
    try {
        //tách mã thông báo, sau chữ "Bearer" khi truyền ở redux/api
        const token  =  req.headers.authorization.split(' ')[1]

        //Nếu độ dài token > 500 === google auth 
        //đăng nhập thủ công
         const isCustomAth = token.length <500

        //tạo biến chứa mã giải
        let decodeData;

        //trường hợp đăng nhập thủ công
        if(token && isCustomAth){
            //giải mã từ token thông qua privatekey: 
            //trường hợp này "test" là privatekey đc tạo ra khi đăng nhập
            decodeData = jwt.verify(token, "test")

            //lấy id của người dùng
            req.userId = decodeData?.id
        }
        else{
            decodeData =  jwt.decode(token)

            req.userId = decodeData?.sub
        }
        next()

    } catch (error) {
        
    }
}

export default auth