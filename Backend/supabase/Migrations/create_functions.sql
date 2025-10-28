CREATE OR REPLACE FUNCTION public.update_last_login(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET last_login = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user profile with role
CREATE OR REPLACE FUNCTION public.get_user_profile(user_id UUID)
RETURNS TABLE (
  id UUID,
  full_name TEXT,
  email TEXT,
  role user_role,
  grade grade_level,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.full_name,
    p.email,
    p.role,
    p.grade,
    p.last_login,
    p.created_at
  FROM public.profiles p
  WHERE p.id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```
