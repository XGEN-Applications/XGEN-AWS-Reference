const { query } = require('../db');

const get = async (id) => {

  // if ID return single project, else return all projects
  const result = id ? await query(`CALL usp_Projects_Get(${id})`) : await query(`CALL usp_Projects_GetAll()`);
  if(id) {
    // if ID is present return single doc
    return !!result.length ? result[0][0] : {};
  }
  return !!result.length ? result[0] : [];

}

const add = async (project) => {

  let {
    ObjectiveID = null,
    ProjectTitle = null,
    ProjectDesc = null,
    ProjectStartDate = null,
    ProjectEndDate = null,
    ProjectStatusID = null,
    CreateDate = null,
    UpdateDate = null,
    CreateBy = null, 
    UpdateBy = null, 
    SortOrder = null, 
    OrgID = null
  } = project;

  // if value exists then quote string, otherwise send null 
  ProjectTitle = ProjectTitle ? `'${ProjectTitle}'` : null;
  ProjectDesc = ProjectDesc ? `'${ProjectDesc}'` : null;
  ProjectStartDate = ProjectStartDate ? `'${ProjectStartDate}'` : `'${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;
  ProjectEndDate = ProjectEndDate ? `'${ProjectEndDate}'` :`'${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;
  CreateDate = CreateDate ? `'${CreateDate}'` : `'${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;
  UpdateDate = UpdateDate ? `'${UpdateDate}'` : `'${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;

  CreateBy = CreateBy ? Number(CreateBy) : CreateBy;
  UpdateBy = UpdateBy ? Number(UpdateBy) : UpdateBy;
  SortOrder = SortOrder ? Number(SortOrder) : SortOrder;
  OrgID = OrgID ? Number(OrgID) : OrgID;
  ObjectiveID = ObjectiveID ? Number(ObjectiveID) : ObjectiveID;


  const result = await query(
    `CALL usp_Projects_Add(
      @paramProjectID,
      ${ObjectiveID},
      ${ProjectTitle},
      ${ProjectDesc},
      ${ProjectStartDate},
      ${ProjectEndDate},
      ${ProjectStatusID},
      ${CreateDate},
      ${UpdateDate},
      ${CreateBy},
      ${UpdateBy},
      ${SortOrder},
      ${OrgID}
    );
    
    select @paramProjectID;    
  `);

  return { ProjectID: result[1][0]['@paramProjectID']};

}

const update = async (project) => {
  let {
    ProjectID = null,
    ObjectiveID = null,
    ProjectTitle = null,
    ProjectDesc = null,
    ProjectStartDate = null,
    ProjectEndDate = null,
    ProjectStatusID = null,
    CreateDate = null,
    UpdateDate = null,
    CreateBy = null, 
    UpdateBy = null, 
    SortOrder = null, 
    OrgID = null
  } = project;

  if(!ProjectID) throw {statusCode: 400, error: 'you must provide projectid'};

  // if value exists then quote string, otherwise send null 
  ProjectTitle = ProjectTitle ? `'${ProjectTitle}'` : null;
  ProjectDesc = ProjectDesc ? `'${ProjectDesc}'` : null;
  ProjectStartDate = ProjectStartDate ? `'${ProjectStartDate}'` : `'${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;
  ProjectEndDate = ProjectEndDate ? `'${ProjectEndDate}'` :`'${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;
  CreateDate = CreateDate ? `'${CreateDate}'` : `'${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;
  UpdateDate = UpdateDate ? `'${UpdateDate}'` : `'${new Date().toISOString().slice(0, 19).replace('T', ' ')}'`;

  CreateBy = CreateBy ? Number(CreateBy) : CreateBy;
  UpdateBy = UpdateBy ? Number(UpdateBy) : UpdateBy;
  SortOrder = SortOrder ? Number(SortOrder) : SortOrder;
  OrgID = OrgID ? Number(OrgID) : OrgID;
  ObjectiveID = ObjectiveID ? Number(ObjectiveID) : ObjectiveID;

 
  const result = await query(
    `CALL usp_Projects_Update(
      ${ProjectID},
      ${ObjectiveID},
      ${ProjectTitle},
      ${ProjectDesc},
      ${ProjectStartDate},
      ${ProjectEndDate},
      ${ProjectStatusID},
      ${CreateDate},
      ${UpdateDate},
      ${CreateBy},
      ${UpdateBy},
      ${SortOrder},
      ${OrgID}
    );
  `);

  return 'success';

}

// delete is reserved word
const deleteProject = async (id) => {
  if(!id) throw {statusCode: 400, error: 'you must provide id'};
  await query(`CALL usp_Projects_Delete(${id})`);
  return 'success';

}

module.exports = { get, add, update, deleteProject };