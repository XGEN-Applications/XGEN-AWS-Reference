const db = require('./db');

const current = async (id) => {

  try {
    const result = await db.query(`CALL PlanHuddleProd.usp_Projects_GetAll()`);
    return !!result.length ? result[0] : {};
  } catch(err) {
    return {
      statusCode: err.statusCode || 500, 
      error: 'server error'
    }
  }

}

module.exports = current;