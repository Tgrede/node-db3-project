const { userParams } = require('../../data/db-config')
const Schemes = require('./scheme-model')
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try{
    const idToCheck = req.params.scheme_id

    // const allSchemes = await Schemes.find()

    // console.log(allSchemes)

    // const scheme_id_arr = allSchemes.filter(scheme => {
    //   scheme.scheme_id
    // })

    // console.log(scheme_id_arr)

    // if(scheme_id_arr.length === 0){
    //   res.status(404).json({message: `scheme with scheme_id ${idToCheck} not found`})
    // } else {
    //   next()
    // }

    const scheme = await Schemes.findById(idToCheck)
    if(!scheme){
      res.status(404).json({message: `scheme with scheme_id ${idToCheck} not found`})
    }else{
      next()
    }
  }catch(err){
    next(err)
  }

  // if(!scheme){
  //   res.status(404).json({message: `scheme with scheme_id ${idToCheck} not found`})
  // }else{
  //   next()
  // }
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async (req, res, next) => { 
  const schemeName = req.body.scheme_name
  const allSchemes = await Schemes.find()
  const schemeNames = allSchemes.map(scheme => {
    return scheme.scheme_name === schemeName
  })



  console.log(schemeNames)
  console.log(schemeName)
  if(!schemeName || schemeNames.includes(true)){
    res.status(400).json({message:'invalid scheme_name'})
  }else{
    next()
  }


}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async (req, res, next) => {
 next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
