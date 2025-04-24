import authService from "../services/authService.js";

const buildCookieOptions = (rememberMe) => ({
  httpOnly: true,
  secure: true,
  sameSite: "None",
  ...(rememberMe && { maxAge: 60 * 60 * 1000 })
});

const register = async (req, res, next) => {
  try {
    const { email, phone, password, role } = req.body;
    const registrationData = await authService.registerUser({ email, phone, password, role });
    res.status(201).json(registrationData);
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { user, token } = await authService.loginUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,           
      sameSite: "None",      
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { password, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ user: userWithoutPassword });
  } catch (err) {
    next(err);
  }
};

const getMe = (req, res) => {
  res.status(200).json({
    message: "User authenticated",
    user: req.user,
  });
};

export {
  register,
  login,
  getMe
};
