const db = require('../db');

const get = async () => {

  try {
    const result = await db.query(`CALL PlanHuddleProd.usp_Projects_GetAll()`);
    return !!result.length ? result[0] : [];
  } catch(err) {
    return {
      statusCode: err.statusCode || 500, 
      error: 'server error'
    }
  }

}

const add = async (project) => {

  const {
    paramObjectiveID,
    paramProjectTitle,
    paramProjectDesc,
    paramProjectStartDate,
    paramProjectEndDate,
    paramProjectStatusID,
    paramCreateDate,
    paramUpdateDate,
    paramCreateBy, 
    paramUpdateBy, 
    paramSortOrder, 
    paramOrgID
  } = project;

  try {
    const result = await db.query(
      `CALL usp_Projects_Add(
        @paramProjectID,
        ${paramObjectiveID},
        '${paramProjectTitle}',
        '${paramProjectDesc}',
        '${paramProjectStartDate}',
        '${paramProjectEndDate}',
        ${paramProjectStatusID},
        '${paramCreateDate}',
        '${paramUpdateDate}',
        ${paramCreateBy},
        ${paramUpdateBy},
        ${paramSortOrder},
        ${paramOrgID}
      );
      
      select @paramProjectID;    
    `);

    return { ProjectID: result[1][0]['@paramProjectID']};

  } catch(err) {

    console.log(err)
    return {
      statusCode: err.statusCode || 500, 
      error: 'server error'
    }

  }

}


const update = async (project) => {

  try {
    await db.query(`CALL PlanHuddleProd.usp_Projects_Update()`);
    return 'success';
  } catch(err) {
    return {
      statusCode: err.statusCode || 500, 
      error: 'server error'
    }
  }

}

// delete is reserved word
const deleteProject = async (id) => {

  try {
    await db.query(`CALL PlanHuddleProd.usp_Projects_Delete()`);
    return 'success';
  } catch(err) {
    return {
      statusCode: err.statusCode || 500, 
      error: 'server error'
    }
  }

}

module.exports = { get, add, update, deleteProject };