// import programService from "../services/programService.js";

// export const getPrograms = async (req, res, next) => {
//   try {
//     const filters = { type: req.query.type };
//     const results = await programService.listPrograms(filters);
//     res.json(results);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addProgram = async (req, res, next) => {
//   try {
//     const created = await programService.addProgram(req.body);
//     res.status(201).json(created);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getProgramDetail = async (req, res, next) => {
//   try {
//     const programId = req.params.id;
//     const type = req.query.type || "movie";
//     const detail = await programService.getProgramDetail(programId, type);
//     res.json(detail);
//   } catch (error) {
//     next(error);
//   }
// };

// export const searchPrograms = async (req, res, next) => {
//   try {
//     const searchParams = {
//       type: req.query.type || "movie",
//       category: req.query.category,
//       language: req.query.language,
//       query: req.query.query,
//     };
//     const results = await programService.searchPrograms(searchParams);
//     res.json(results);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getTopRatedPrograms = async (req, res, next) => {
//   try {
//     const type = req.query.type || "movie";
//     const results = await programService.getTopRatedPrograms(type);
//     res.json(results);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAnimatedPrograms = async (req, res, next) => {
//   try {
//     const type = req.query.type || "movie";
//     const results = await programService.getAnimatedPrograms(type);
//     res.json(results);
//   } catch (error) {
//     next(error);
//   }
// };

import programService from "../services/programService.js";

// שליפת כל התוכניות (אפשר עם פילטרים)
export const getPrograms = async (req, res, next) => {
  try {
    const filters = {
      type: req.query.type,
      language: req.query.language,
      category: req.query.category,
    };
    const results = await programService.listPrograms(filters);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

// יצירת תוכנית (Admin בלבד)
export const addProgram = async (req, res, next) => {
  try {
    const created = await programService.addProgram(req.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
};

// פרטי תוכנית לפי מזהה
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

// חיפוש תוכניות לפי קריטריונים: שפה, קטגוריה, מחרוזת חיפוש
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

// תכנים הכי מדורגים
export const getTopRatedPrograms = async (req, res, next) => {
  try {
    const type = req.query.type || "movie";
    const results = await programService.getTopRatedPrograms(type);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

// תכנים באנימציה
export const getAnimatedPrograms = async (req, res, next) => {
  try {
    const type = req.query.type || "movie";
    const results = await programService.getAnimatedPrograms(type);
    res.json(results);
  } catch (error) {
    next(error);
  }
};
