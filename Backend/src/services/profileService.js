const { supabase,supabaseAdmin } = require('../config/supabase');

// @ts-ignore
exports.createProfile=async(userId,email,name,grade,location,school,role,subjects,language_preference)=>{
   try{
      // Use supabaseAdmin for backend operations
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
       
      }]).select().single();

      if(error) {
        console.error('Create profile error:', error);
        throw error;
      }
      return data;
   }
   catch(error){
      console.error('Create profile error:', error);
      throw error;
   }
}
exports.getProfile=async(userId)=>{
    try {
      // Use supabaseAdmin to bypass RLS since this is a backend operation
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single(); // Get single result instead of array
        
      if (error) {
        console.log('Supabase query error:', error); // More detailed logging
        throw error;
      }
      
      // Log the result for debugging
      console.log('Profile data found:', data);
      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
}


// @ts-ignore
exports.updateProfile=async(userId, updates)=> {
    try {
      const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        console.error('Update profile error:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
};


// Check if user has completed their profile setup
exports.checkProfileCompletion = async (userId) => {
    try {
        // Get the user's profile using supabaseAdmin
        const { data: profile, error } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            if (error.code === 'PGRST116') { // Record not found
                return {
                    isComplete: false,
                    message: 'Profile not found'
                };
            }
            throw error;
        }

        if (!profile) {
            return {
                isComplete: false,
                message: 'Profile not found'
            };
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
            const value = profile[field];
            if (Array.isArray(value)) {
                return !value || value.length === 0;
            }
            return !value || (typeof value === 'string' && value.trim() === '');
        });
        
        const isComplete = missingFields.length === 0;
        
        if (isComplete) {
            try {
                // Use supabaseAdmin for consistency
                const { data, error } = await supabaseAdmin
                    .from('profiles')
                    .update({
                        profile_completed: true,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', userId)
                    .select()
                    .single();

                if (error) {
                    console.error('Error updating profile completion status:', error);
                    throw error;
                }
                console.log('Profile marked as complete:', data);
            } catch (error) {
                console.error('Error updating profile completion status:', error);
                throw error;
            }
        } else {
            // If profile is incomplete, ensure profile_complete is false
            try {
                await supabaseAdmin
                    .from('profiles')
                    .update({
                        profile_completed: false,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', userId);
            } catch (error) {
                console.error('Error updating profile incompletion status:', error);
            }
        }

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
       
 