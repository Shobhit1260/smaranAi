const profileService = require('../services/profileService');
const ResponseHandler = require('../utils/responseHandler');



// @ts-ignore

exports.createProfile=async(req,res)=>{
  try{
    const { name, grade, location, school, role, subjects, language_preference, mentor } = req.body;
    const userId=req.user.id;
    const email=req.user.email;
    const profile=await profileService.createProfile(userId,email,name,grade,location,school,role,subjects,language_preference,mentor);
    return ResponseHandler.success(res,{profile},'Profile created successfully');
    
  }
  catch(error){
    console.error('Create profile controller error:', error);
    return ResponseHandler.error(res, 'Failed to create profile');
  }
  
}
exports.getMyProfile=async(req,res)=>{
    try {
      const userId = req.user.id;
      const profile = await profileService.getProfile(userId);
        
      return ResponseHandler.success(res, { profile });
    } catch (error) {
      console.error('Get profile controller error:', error);
      return ResponseHandler.error(res, 'Failed to fetch profile');
    }
  }

 // @ts-ignore
 exports.updateMyProfile=async(req, res) =>{
    try {
      const userId = req.user.id;
      const updates = {};

      if (req.body.fullName) updates.full_name = req.body.fullName;
      if (req.body.grade) updates.grade = req.body.grade;

      const updatedProfile = await profileService.updateProfile(userId, updates);

      return ResponseHandler.success(
        res,
        { profile: updatedProfile },
        'Profile updated successfully'
      );
    } catch (error) {
      console.error('Update profile controller error:', error);
      return ResponseHandler.error(res, 'Failed to update profile');
    }
  }

exports.hasCompletedProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const hasCompleted = await profileService.checkProfileCompletion(userId);
        return ResponseHandler.success(res, { hasCompleted });
    } catch (error) {
        return ResponseHandler.error(res, 'Failed to check profile completion');
    }
}  

  