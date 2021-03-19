const db = require('../../data/db-config')

function find() { // EXERCISE A
  /*
    1A- Study the SQL query below running it in SQLite Studio against `data/schemes.db3`.
    What happens if we change from a LEFT join to an INNER join?

    ~we would lose the 'have fun' scheme, as it currently doesnt have any steps.

      SELECT
          sc.*,
          count(st.step_id) as number_of_steps
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      GROUP BY sc.scheme_id
      ORDER BY sc.scheme_id ASC;

    2A- When you have a grasp on the query go ahead and build it in Knex.
    Return from this function the resulting dataset.
  */
  return db('schemes')
  .leftJoin('steps', 'schemes.scheme_id', 'steps.scheme_id' )
  .select('schemes.*').count('steps.step_id', {as: 'number_of_steps'})
  .groupBy('schemes.scheme_id')
  .orderBy('schemes.scheme_id', 'asc')

}

async function findById(scheme_id) { // EXERCISE B
  
  // const schemeSteps = await db('schemes')
  // .leftJoin('steps', 'schemes.scheme_id', 'steps.scheme_id' )
  // .select('schemes.scheme_name', 'steps.*')
  // .where(`schemes.scheme_id`, scheme_id)
  // .orderBy('steps.step_number', 'asc')

  const schemes = await db('schemes')

  const schemeStepsFiltered = await db('schemes')
  .leftJoin('steps', 'schemes.scheme_id', 'steps.scheme_id' )
  .select('steps.step_id', 'steps.step_number', 'steps.instructions')
  .where(`schemes.scheme_id`, scheme_id)
  .orderBy('steps.step_number', 'asc')
  
  const schemeObj = {...schemes[scheme_id - 1], steps: schemeStepsFiltered}
  if(!schemeObj.scheme_name){
    return null
  }

  if(!schemeObj.steps[0].step_id){
    const emptyScheme = {...schemeObj, steps: []}
    return emptyScheme
  } else {
    return schemeObj
  }

  // if(schemeObj.steps.length === 0) {
  //   console.log('test')
  //   return 7
  // } else {
  //   return schemeObj
  // }

  
  
  /*
    1B- Study the SQL query below running it in SQLite Studio against `data/schemes.db3`:

      SELECT
          sc.scheme_name,
          st.*
      FROM schemes as sc
      LEFT JOIN steps as st
          ON sc.scheme_id = st.scheme_id
      WHERE sc.scheme_id = 1
      ORDER BY st.step_number ASC;

    2B- When you have a grasp on the query go ahead and build it in Knex
    making it parametric: instead of a literal `1` you should use `scheme_id`.

    3B- Test in Postman and see that the resulting data does not look like a scheme,
    but more like an array of steps each including scheme information:

      [
        {
          "scheme_id": 1,
          "scheme_name": "World Domination",
          "step_id": 2,
          "step_number": 1,
          "instructions": "solve prime number theory"
        },
        {
          "scheme_id": 1,
          "scheme_name": "World Domination",
          "step_id": 1,
          "step_number": 2,
          "instructions": "crack cyber security"
        },
        // etc
      ]

    4B- Using the array obtained and vanilla JavaScript, create an object with
    the structure below, for the case _when steps exist_ for a given `scheme_id`:

      {
        "scheme_id": 1,
        "scheme_name": "World Domination",
        "steps": [
          {
            "step_id": 2,
            "step_number": 1,
            "instructions": "solve prime number theory"
          },
          {
            "step_id": 1,
            "step_number": 2,
            "instructions": "crack cyber security"
          },
          // etc
        ]
      }

    5B- This is what the result should look like _if there are no steps_ for a `scheme_id`:

      {
        "scheme_id": 7,
        "scheme_name": "Have Fun!",
        "steps": []
      }
  */
}

function findSteps(scheme_id) { // EXERCISE C
  /*
    1C- Build a query in Knex that returns the following data.
    The steps should be sorted by step_number, and the array
    should be empty if there are no steps for the scheme:

      [
        {
          "step_id": 5,
          "step_number": 1,
          "instructions": "collect all the sheep in Scotland",
          "scheme_name": "Get Rich Quick"
        },
        {
          "step_id": 4,
          "step_number": 2,
          "instructions": "profit",
          "scheme_name": "Get Rich Quick"
        }
      ]


      select
        st.step_id, st.step_number, st.instructions, sc.scheme_name
      from steps as st
      join schemes as sc
        on sc.scheme_id = st.scheme_id
      where st.scheme_id = 2
      order by step_number
  */

  return db('steps')
  .join('schemes', 'schemes.scheme_id', 'steps.scheme_id' )
  .select('steps.step_id', 'steps.step_number', 'steps.instructions', 'schemes.scheme_name')
  .where(`steps.scheme_id`, scheme_id)
  .orderBy('steps.step_number', 'asc')
}

async function add(scheme) { // EXERCISE D
  /*
    1D- This function creates a new scheme and resolves to _the newly created scheme_.
  */

  return db('schemes').insert(scheme)
}

function addStep(scheme_id, step) { // EXERCISE E
  /*
    1E- This function adds a step to the scheme with the given `scheme_id`
    and resolves to _all the steps_ belonging to the given `scheme_id`,
    including the newly created one.
  */
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}
