import programService from "../services/programService.js";

export const getPrograms = async (req, res, next) => {
  try {
    const filters = { type: req.query.type };
    const results = await programService.listPrograms(filters);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const addProgram = async (req, res, next) => {
  try {
    const created = await programService.addProgram(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

export const getProgramDetail = async (req, res, next) => {
  try {
    const programId = req.params.id;
    const type = req.query.type || "movie";
    const detail = await programService.getProgramDetail(programId, type);
    res.json(detail);
  } catch (error) {
    next(error);
  }
};

export const searchPrograms = async (req, res, next) => {
  try {
    const searchParams = {
      type: req.query.type || "movie",
      category: req.query.category,
      language: req.query.language,
      query: req.query.query,
    };
    const results = await programService.searchPrograms(searchParams);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getTopRatedPrograms = async (req, res, next) => {
  try {
    const type = req.query.type || "movie";
    const results = await programService.getTopRatedPrograms(type);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

export const getAnimatedPrograms = async (req, res, next) => {
  try {
    const type = req.query.type || "movie";
    const results = await programService.getAnimatedPrograms(type);
    res.json(results);
  } catch (error) {
    next(error);
  }
};