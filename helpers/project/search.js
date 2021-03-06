const db = require('../db');

const search = async (terms) => {
	// null are inital value
	// if argument is not passed then default value is null 
	let {
		ProjectID = null,
		ObjectiveID = null,
    ProjectTitle = null,
    ProjectDesc = null,
    ProjectStartDate = null,
    ProjectEndDate = null,
    ProjectStatusID = null,
    CreateBy = null, 
    UpdateBy = null, 
    SortOrder = null, 
    OrgID = null
	} = terms;

	// placeholders if needed later
	const CreateDate = null;
	const UpdateDate = null;

  // if value exists then quote string, otherwise send null 
  ProjectTitle = ProjectTitle ? `'${ProjectTitle}'` : null;
  ProjectDesc = ProjectDesc ? `'${ProjectDesc}'` : null;
  ProjectStartDate = ProjectStartDate ? `'${ProjectStartDate}'` : null;
  ProjectEndDate = ProjectEndDate ? `'${ProjectEndDate}'` : null;


  try {
    const result = await db.query(
      `CALL usp_Projects_Search(
        ${ProjectID},
        ${ObjectiveID},
        ${ProjectTitle},
        ${ProjectDesc},
        ${ProjectStartDate},
        ${ProjectEndDate},
        ${ProjectStatusID},
        null,
        null,
        ${CreateBy},
        ${UpdateBy},
        ${SortOrder},
        ${OrgID}
      );
		`);

    return result[0];

  } catch(err) {
    console.log(err)
    return {
      statusCode: err.statusCode || 500, 
      error: err.error || 'server error'
		}
	}

}

module.exports = { search };