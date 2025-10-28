const { supabase,supabaseAdmin } = require('../config/supabase');

// @ts-ignore
exports.createProfile=async(userId,email,name,grade,location,school,role,subjects,language_preference,mentor)=>{
   try{
      const {data,error}=await supabase
      .from('profiles')
      .insert([{
        id:userId,
        name,
        grade,
        location,
        school,
        role,
        subjects,
        language_preference,
        mentor
      }]).select().single();
      if(error) throw error;
      return data;
   }
   catch(error){
      console.error('Create profile error:', error);
      throw error;
   }
}
exports.getProfile=async(userId)=>{
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId);
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
}


// @ts-ignore
exports.updateProfile=async(userId, updates)=> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
};

// Check if user has completed their profile setup
exports.checkProfileCompletion = async (userId) => {
    try {
        // Get the user's profile
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        console.log("Profile data fetched for completion check:", profile);
        if (error) {
            if (error.code === 'PGRST116') { // Record not found
                return {
                    isComplete: false,
                    message: 'Profile not found'
                };
            }
            throw error;
        }

        // Check if all required fields are present
        const requiredFields = [
            'name',
            'grade',
            'location',
            'school',
            'role',
            'subjects',
            'language_preference'
        ];

        const missingFields = requiredFields.filter(field => {
            // Special handling for arrays (subjects and language_preference)
            if (Array.isArray(profile[field])) {
                return !profile[field] || profile[field].length === 0;
            }
            // For other fields, check if they exist and are not empty strings
            return !profile[field] || profile[field].trim() === '';
        });
        console.log("Missing fields:", missingFields);
        const isComplete = missingFields.length === 0;

        return {
            isComplete,
            missingFields: missingFields.length > 0 ? missingFields : undefined,
            message: isComplete 
                ? 'Profile is complete' 
                : `Incomplete profile. Missing fields: ${missingFields.join(', ')}`
        };

    } catch (error) {
        console.error('Check profile completion error:', error);
        throw error;
    }
}
       
 