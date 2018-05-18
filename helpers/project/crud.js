const db = require('../db');

const get = async (id) => {

  try {
    // if ID return single project, else return all projects
    const result = id ? await db.query(`CALL usp_Projects_Get(${id})`) : await db.query(`CALL usp_Projects_GetAll()`);
    if(id) {
      // if ID is present return single doc
      return !!result.length ? result[0][0] : {};
    }
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
    ObjectiveID,
    ProjectTitle,
    ProjectDesc,
    ProjectStartDate,
    ProjectEndDate,
    ProjectStatusID,
    CreateDate,
    UpdateDate,
    CreateBy, 
    UpdateBy, 
    SortOrder, 
    OrgID
  } = project;

  try {
    const result = await db.query(
      `CALL usp_Projects_Add(
        @paramProjectID,
        ${ObjectiveID},
        '${ProjectTitle}',
        '${ProjectDesc}',
        '${ProjectStartDate}',
        '${ProjectEndDate}',
        ${ProjectStatusID},
        '${CreateDate}',
        '${UpdateDate}',
        ${CreateBy},
        ${UpdateBy},
        ${SortOrder},
        ${OrgID}
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
  const {
    ProjectID,
    ObjectiveID,
    ProjectTitle,
    ProjectDesc,
    ProjectStartDate,
    ProjectEndDate,
    ProjectStatusID,
    CreateDate,
    UpdateDate,
    CreateBy, 
    UpdateBy, 
    SortOrder, 
    OrgID
  } = project;

  if(!ProjectID) throw {statusCode: 400, error: 'you must provide projectid'};

  try {
    const result = await db.query(
      `CALL usp_Projects_Update(
        ${ProjectID},
        ${ObjectiveID},
        '${ProjectTitle}',
        '${ProjectDesc}',
        '${ProjectStartDate}',
        '${ProjectEndDate}',
        ${ProjectStatusID},
        '${CreateDate}',
        '${UpdateDate}',
        ${CreateBy},
        ${UpdateBy},
        ${SortOrder},
        ${OrgID}
      );
    `);

    return 'success';

  } catch(err) {

    console.log(err)
    return {
      statusCode: err.statusCode || 500, 
      error: err.error || 'server error'
    }

  }

}

// delete is reserved word
const deleteProject = async (id) => {

  try {
    if(!id) throw {statusCode: 400, error: 'you must provide id'};
    await db.query(`CALL usp_Projects_Delete(${id})`);
    return 'success';
  } catch(err) {
    return {
      statusCode: err.statusCode || 500, 
      error: error || 'server error'
    }
  }

}

module.exports = { get, add, update, deleteProject };