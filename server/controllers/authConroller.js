import authService from "../services/authService.js";

const buildCookieOptions = (rememberMe) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  ...(rememberMe && { maxAge: 60 * 60 * 1000 }) 
});

export const register = async (req, res, next) => {
  try {
    const { body } = req;
    const registration = await authService.registerUser(body);
    res.status(201).json(registration);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password, rememberMe } = req.body;
    const { user, token } = await authService.loginUser({ username, password });
    res.cookie("token", token, buildCookieOptions(rememberMe));
    res.status(200).json({ message: "Successfully logged in", user });
  } catch (error) {
    next(error);
  }
};