import jwt from "jsonwebtoken";

const generateToken = (res, userID) => {
    // Create jwt
    const token = jwt.sign(
        { userID }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "30d" }
    );

    // Create httyOnly cookie fro jwt token
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 1000 
    });
};

export default generateToken;