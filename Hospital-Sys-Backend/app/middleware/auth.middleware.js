const { resGenerator } = require("../helpers/methods");
const userModel = require("../db/models/user.model");
const jwt = require("jsonwebtoken");
const checkUser = async (token) => {
  const decoded = jwt.verify(token, process.env.JWTKEY);
  const user = await userModel.findOne({
    _id: decoded._id,
    "tokens.token": token,
  });
  if (!user) throw new Error("user not found");
  return user;
};
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = await checkUser(token);
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    resGenerator(res, 500, e.message, "unauthorized");
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = await checkUser(token);
    if (user.type != "admin") throw new Error("you are not admin");
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    resGenerator(res, 500, e.message, "unauthorized");
  }
};

const authDoctor = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const user = await checkUser(token);
    if (user.type != "doctor") throw new Error("you are not a doctor");
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    resGenerator(res, 500, e.message, "unauthorized");
  }
};

const authNurse = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "nurse") throw new Error("you are not a nurse");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };

  const authPharmacist = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "pharmacist") throw new Error("you are not a pharmacist");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };

  const authLabTechnician = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "labTechnician") throw new Error("you are not a labTechnician");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };
  const authPatient = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "patient") throw new Error("you are not a patient");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };

  const authAdminDoc = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "admin" && user.type != "doctor") throw new Error("you are neither admin nor doctor");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };
  const authAdminPatient = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "admin" && user.type != "patient") throw new Error("you are neither admin nor patient");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };
  const authAdminLabTechnician = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "admin" && user.type != "labTechnician") throw new Error("you are neither admin nor labTechnician");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };
  const authAdminPharmacist = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "admin" && user.type != "pharmacist") throw new Error("you are neither admin nor pharmacist");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };
  const authAdminNurse = async (req, res, next) => {
    try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const user = await checkUser(token);
      if (user.type != "admin" && user.type != "nurse") throw new Error("you are neither admin nor nurse");
      req.user = user;
      req.token = token;
      next();
    } catch (e) {
      resGenerator(res, 500, e.message, "unauthorized");
    }
  };
  
module.exports = {authAdminDoc, authAdminNurse, authAdminPharmacist, authAdminLabTechnician, authAdminPatient, auth, authAdmin, authDoctor, authNurse, authPharmacist, authLabTechnician, authPatient };
